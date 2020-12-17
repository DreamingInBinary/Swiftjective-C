---
layout: post
tags: ["UIKit"]
title: "Dealing with Home Indicator"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "View Controllers are notorious for the amount of responsibilities they have, but get ready for one more. Here's how to handle the home indicator."
image: /assets/images/logo.png
---
In a move that, well, [everyone saw coming][1] — Apple unveiled the iPhone X. And along with it, a new little bar that sits happily towards the bottom bezel that invokes nostalgic feelings of a physical home button. Less than a year later, almost every modern iOS device released post iPhone X also followed suit.

To consumers each new "notched" iOS device announced means a beautiful new marvel of both hardware and software to throw some dollars at come pre order time. But to a lot of developers, it initially meant _what am I supposed do what that thing_? The answer, thankfully, is quite simple.

This week, we'll look at what Apple has supplied us with to handle the home indicator.

### But First

It's not everyday we get new videos alongside a hardware announcement, and yet that's exactly what happened shortly thereafter:

{% twitter https://twitter.com/laurenstrehlow/status/907683394485575680 %}

In "[Designing for iPhone X][2]", long tenured Apple design guru Mike Stern lays down some ground rules. All things being equal, before you utilize the new functions below it's incumbent that you pump the brakes first to see if your use case fits the bill.

* Try to avoid interactive controls near the home indicator, especially those driven via gesture recognizers.
* Don't hide the indicator, add any adornments around it or generally attempt to change its appearance. Same goes for the camera bezel that's planted at the top of iPhone X, iPhone XS, etc.
* Typically you don't want to hide the home indicator unless you've got a passive viewing experience (i.e. videos, photo slideshow, etc.).

**TL;DR** — Apple says leave the poor indicator alone. Most of the time.

But, this post is about the other times 😉.

### UIViewController Additions

Whether you adore handling the status bar on a per controller basis or it was pure anathema to you, Apple has continued the trend of making such decisions on an instance by instance basis rather than opting for a global catch all design.

Hiding the home indicator works essentially the same way status bar handling does:
```swift  
class ViewController: UIViewController  
{  
    override func prefersHomeIndicatorAutoHidden() -> Bool  
    {  
        return true  
    }  
}
```
As mentioned, such scenarios are meant to be the outlier, and as such the default implementation returns false. There is, however, a particular comment in the documentation:

{% include prettyBlockquote.html text="The system takes your preference into account, but returning `YES` is not a guarantee that an indicator will be hidden." %}

There doesn't appear to be any mention of why or when UIKit would not respect your chosen preference, though it stands to reason that Apple will enforce what it thinks is best, when it thinks it's best — boolean values regardless. So, that should make for some fun Stack Overflow posts.

¯\\_(ツ)_/¯.

Also, this may seem obvious but could be a source of initial confusion. Take particular mention to the fact that the function's name ends with _autoHidden_ and not _hidden_, which is to say that returning true from here means that UIKit will hide the indicator when it's good and ready (normally, if the controller doesn't receive any touch events across the span of a few seconds), _not_ immediately.

### Signaling UIKit

Continuing with the status bar API parallels, simply overriding, or assigning to a variable conditionally controlling the overriden function, is not enough. We've yet another new addition to view controller's robust family of setNeedsSomethingDone functions:
```swift
class ViewController: UIViewController  
{  
    var shouldHideHomeIndicator = false
    
    override func prefersHomeIndicatorAutoHidden() -> Bool  
    {  
        return shouldHideHomeIndicator  
    }
    
    override func viewDidAppear(_ animated: Bool)  
    {  
        super.viewDidAppear(animated)  
        self.shouldHideHomeIndicator = true  
        self.setNeedsUpdateOfHomeIndicatorAutoHidden()  
    }  
}
```
This acts as a pass through function, as it simply signals to UIKit that we've changed the previous value selected for home indicator visibility. Unlike the status bar, though, this isn't _technically_ animatable since UIKit hides it on its own accord. So, code like this has no effect:
```swift
override func viewDidAppear(_ animated: Bool)  
{  
    super.viewDidAppear(animated)  
    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {               
        self.shouldHideHomeIndicator = true  
        UIView.animate(withDuration: 1, animations: {  
            self.setNeedsUpdateOfHomeIndicatorAutoHidden()  
            })  
        }  
    }
}
```
A simple assignment and a call to `setNeedsUpdateOfHomeIndicatorAutoHidden()` will perform a slight alpha fade regardless of whether or not its included within an animation block.

### Container Controllers

The last new addition to view controller is a mechanism to inform UIKit if a child view controller should dictate home indicator's visibility or not. If you've been around iOS long enough, you've likely harnessed container view controllers to better promote abstractions and encapsulation patterns.

These contained controllers might find themselves well near the bottom of the screen, and if so — you may want the home indicator to leave you alone. A simple override returning the instance that's obscured, or is doing the obscuring, addresses the issue:
```swift
override func childViewControllerForHomeIndicatorAutoHidden() -> UIViewController?  
{  
    return myChildController  
}
```
If you do indicate that a child controller should dictate visibility, it's also its responsibility to override the function we previously discussed:
```swift
class MyChildViewController: UIViewController  
{  
    override func prefersHomeIndicatorAutoHidden() -> Bool  
    {  
        return true  
    }  
}
```
The function's signature allows for a nil return value. If that's the case, UIKit will look to the current controller to make decisions here — and if you've opted to not override that function, that decision will be "Show the home indicator".

As this can also be a runtime decision, UIKit will again request that you invoke its pass through function we just touched on to inform the framework it should query `prefersHomeIndicatorAutoHidden()` once more:
```swift   
override func childViewControllerForHomeIndicatorAutoHidden() -> UIViewController?  
{  
    return myChildController  
}

func initializeChildController()  
{  
    myChildController = MyChildController()  
    self.setNeedsUpdateOfHomeIndicatorAutoHidden()  
}
```
And that's it.

Though one could view this as more thought process that will need to be applied to an everyday iOS occurrence (i.e. handling controllers), you'll find the API nearly identical to existing UIKit functions that handle similar problems.

### Update: Answers to Reader Questions

[**Fabian Kuenzel**][3] **asks:**

> Will the new home indicator also be laying on top of the bottom navigation of websites?

Answers to that are detailed [here](https://webkit.org/blog/7929/designing-websites-for-iphone-x/).

I'm not a web dev afifcionado these days, but there appears to be a meta tag that handles automatic insets:
```html
<meta name='viewport' content='initial-scale=1, viewport-fit=auto'>
```
The default value is _auto_, which should inset content — though you can override it to _cover_ which covers the whole viewport. Though, if you should opt to take the whole screen, a new CSS function, constant(), allows you to use pre-defined constants to put padding around elements that respect the safe area. This is akin to iOS' safeAreaLayoutGuide API.

An example from their post:
```html
.post {  
    padding: 12px;  
    padding-left: constant(safe-area-inset-left);  
    padding-right: constant(safe-area-inset-right);  
}
```
[**Bogdan**][4] **had more of a philosophical observation:**

> I don't understand why Apple didn't just leave the home indicator off by default, or at least give the user an option to turn it off. It's a nice feature to introduce new users to the phone, but eventually (like 10 minutes into using the phone) everyone will remember how to switch apps, and then it's just an annoying and distracting bar. Am I missing something?

That's a great point.

[Much like how the notch is more than a notch][5], and almost closer to part of the hardware and iPhone brand recognition, I think the software equivlant of that is the home indicator. It's part of its DNA, and additionally I'm betting Apple's thinking is that its prescence instills user confidence in the UX. It avoids the "Wait why is that gone now? When does it show? When does it hide? Can I still go back home now that it's now showing?" kind of things.

[**Will Kampmann**][6] **asks:**

> Do you know what will happen in full-screen apps like games? Will this home handle be invoked by two swipes like the notification and control centers are on normal iPhones?

There is an API to override this behavior, but Apple would really, really, _really_ like you not to. The one use case they mention where you might? Full screen games. Here's the Human Interface Guidelines on the matter:

> In rare cases, immersive apps like games might require custom screen-edge gestures that take priority over the system's gestures — the first swipe invokes the app-specific gesture and a second-swipe invokes the system gesture.

It's a simple override on any view controller:
```swift 
override func preferredScreenEdgesDeferringSystemGestures() -> UIRectEdge {  
    return .top  
}
```
### Wrapping Up

Ah, notch considerations.

Is it solely giggles and smiles for iOS engineers, or yet another view controller consideration to maintain and code against? Possibly a mix of the two. If time has taught us anything in the continuum of software development, it's that time elapsed + an ecosystem = new APIs. In today's smartphone landscape, it's a little more realistic to say time elapsed + Apple's ecosystem = new hardware = new APIs.

We made it through a taller iPhone. We pushed on through different resolutions. We can handle a small camera nub in navigation bars and a little 2 point bar near the bottom bezel too 💪.

Until next time ✌️.

[1]: https://daringfireball.net/linked/2017/09/10/bbc-confirmation
[2]: https://developer.apple.com/videos/play/fall2017/801/
[3]: https://medium.com/@fabiankuenzel
[4]: https://medium.com/@x0054
[5]: https://marco.org/2017/09/18/courage
[6]: https://medium.com/@willikampmann