---
layout: post
tags: ["Tech Notes"]
title: "Dynamic Master Detail View Background Colors"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "In my quest to pretty up some of the rougher edges of Spend Stack, today I turn my attention to styling my interface in Master-Detail Views. Easy to describe, harder to do."
image: /assets/images/logo.png
---

One of my goals for the next update for Spend Stack was to tighten up the design of master detail scenarios, which are prevalent on macOS and iPadOS:

{% include lazyLoadImage.html image="../assets/images/mdv_things.png" %}

I've noticed that these apps typically have a subtle contrast between the master view and the detail view (though not all, as we'll see). I decided to follow a similar pattern as well, so I started poking around to see what other apps in the wild did for this kind of thing.

### The Examples
Let's take a quick tour of how Apple's stock apps handle the situation:

**Notes**<br />
{% include lazyLoadImage.html image="../assets/images/mdv_notes.png" %}

**Files**<br />
{% include lazyLoadImage.html image="../assets/images/mdv_files.png" %}

**News**<br />
{% include lazyLoadImage.html image="../assets/images/mdv_news.png" %}

**Mail**<br />
{% include lazyLoadImage.html image="../assets/images/mdv_mail.png" %}

**Messages**<br />
{% include lazyLoadImage.html image="../assets/images/mdv_messages.png" %}

**Reminders**<br />
{% include lazyLoadImage.html image="../assets/images/mdv_reminders.png" %}

I was surprised to see that quite a few of Cupertino & Friends'© apps tend to use the same background color. Still, Spend Stack's white on white in this scenario feels a little too jarring.

### The Implementation
It turns out, this is exactly the kind of task that really eats at you on updates. It was a fleeting thought I had (to address this) and I figured it wouldn't take more than thirty minutes. In software development, that and similar phrases are always famous last words. 

But as someone who took five years to release an app, I figured another shot of feature creep wouldn't hurt 🤠. 

After looking at Xcode's default master-detail view template (which has no accordances for this kind of thing), I quickly tested things out using `.secondaryBackground` for the master view - while keeping the detail view with `.primaryBackground`. This is similar to what Mail and Reminders do.

{% include prettyBlockquote.html text="If you aren't using SwiftUI and want this process to be forty times less painless - trying using the helpful utility app <a href=\"https://apps.apple.com/us/app/adaptivity-a/id1054670022\">Adaptivity</a> to quickly reference colors."  %}

```swift
- (void)traitCollectionDidChange:(UITraitCollection *)previousTraitCollection
{
    [super traitCollectionDidChange:previousTraitCollection];
    
    if ([self.traitCollection isDifferentThanTraitCollection:previousTraitCollection])
    {
        [[NSNotificationCenter defaultCenter] postNotificationName:SS_TRAIT_COLLECTION_CHANGED object:nil];
    }
    
    UIColor *color = [UIColor systemBackgroundColor];
    if (self.view.window.traitCollection.horizontalSizeClass == UIUserInterfaceSizeClassRegular) {
        color = [UIColor secondarySystemBackgroundColor];
    }
    
    self.view.backgroundColor = color;
    self.tableView.backgroundColor = color;
    // These methods do pretty much the same as above
    [self.toolbar updateBackgroundColor];
    [self.navigationController updateBackgroundColor];
}
```

Which gets me half way there:

{% include lazyLoadImage.html image="../assets/images/mdv_firstPass.png" %}

Not bad - but the subtleties start to creep in.

- I have to update the table view cells, easier said than done. They look okay in dark mode, but there isn't enough contrast in light mode.
- I also have to tackle both the navigation and tool bars (one of which has been busted since iOS 13, throwing me into several apoplectic fits).
- And, I have to dynamically switch out styles according to trait collection changes.

That last one can be a bit of a sticker. On iPadOS, you can quickly swap between a regular to compact horizontal trait collection for a number of reasons (namely, multitasking scenarios). In this case, I need to swap back and forth between the "old" style and the master view one:

{% include lazyLoadImage.html image="../assets/images/mdv_switch.png" %}

This means my navigation, tool bars and master view all need to a get little bit smarter, more configurable or use any other of the other platter of patterns available (delegates, dependency injections, blocks or what have you). These controllers are, as you may have surmised, still written in Objective-C. Regrettably, my new favorite toy, Combine is out of the question.

Alas, as with most of these kinds of tasks within `UIKit`, it's always a hop, skip and a step away from being as simple as checking the device idiom:

```objc
UIColor *fill = [UIColor systemBackgroundColor];
if (self.view.window.traitCollection.horizontalSizeClass == UIUserInterfaceSizeClassRegular)
{
    fill = [UIColor secondarySystemBackgroundColor];
}

UINavigationBarAppearance *navBarAppearance = [UINavigationBarAppearance new];
[navBarAppearance configureWithOpaqueBackground];
navBarAppearance.backgroundColor = fill;
navBarAppearance.largeTitleTextAttributes = @{NSForegroundColorAttributeName:[UIColor ssMainFontColor]};
self.navigationBar.standardAppearance = navBarAppearance;
self.navigationBar.compactAppearance = navBarAppearance;
self.navigationBar.scrollEdgeAppearance = navBarAppearance;

self.navigationBar.barTintColor = fill;

// Avoid bleed on push/pop
self.view.backgroundColor = navBarAppearance.backgroundColor;
```

That gets me closer, but I either have to propagate those changes to the table cell or check in their trait collection change events as well (the latter seems to be more appropriate, though I've yet to get that far yet).

There are many places where I don't want to occur, such as modals:

{% include lazyLoadImage.html image="../assets/images/mdv_modal.png" %}

Worse yet, my navigation and toolbars are all jank-town now. That's to be expected (as to this point, I've just hardcoded a new color in) but I feel like navigation bar's new API never quite does what I expect it to. For the life of me, I can't quite get my navigation bar to respect my `UINavigationBarAppearance` choices until it lays out its subviews.

Here, I purposely want the navigation bar to reflect the "old" styling, yet it doesn't update until it does another layout pass:

{% include lazyLoadImage.html image="../assets/images/mdv_nav.gif" %}

I use a subclassed `UINavigationBar` throughout Spend Stack (same for the toolbar) and I won't always want this behavior, so it's not as simple as trait collection bookkeeping. For now, I'm leaning towards a simple `bool` flag to pipe right into the initializer since I style each of them there, far earlier than any trait collection change might occur.

We'll see what happens, and of course - I'll have the final product in the next version of Spend Stack, version 1.2.

Until next time ✌️.