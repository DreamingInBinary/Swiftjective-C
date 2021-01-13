---
layout: post
tags: ["SwiftUI"]
title: "Xcode Preview Snips"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Xcode Previews for SwiftUI has quite literally changed a decade old workflow. Here are the techniques I currently live by."
image: /assets/images/logo.png
---

For years, web developers have lamented how some of their workflows required them to hit two keys on macOS:

Command + R

And that was the only inconvenience in their path to see what the fruits of their labor would yield. Over on mobile, we've longed for such a minor roadblock to be the only thing in our path to refreshing our U.I. The pain was staggering - change one constraint in your layout code and then:

1) Build <br />
2) Run <br />
3) Xcode says that your device is locked (it's probably not) <br />
4) Clean the project <br />
5) You change the constant of the layout anchor, and Source Kit crashes <br />
6) Throw your mac out the window <br />
7) Pick your mac back up, apologize to it and start back at 1 <br />

Look, you know where I'm going with this. If you've adopted SwiftUI (or even if you haven't - view controllers apply here too) then you know Xcode Previews are more than a time saver. They are a fork in the road. There's no going back once you get hooked on that instant feedback.

Today, I'll share a few quick snips of my go-to previews. Some of these are already well known, tweeted and blogged about - but my topic for this post is _my favorite_ things to use with `PreviewProvider`, so I've included them anyways for posterity's sake. Let's take a look.

### PreviewLayout
<b>What does it do?</b> Force a size on the given container.<br />
<b>What's it good for?</b> Making your preview mimic a certain size that's realistic for your view, such as in a List scenario (i.e. cells in `UIKit` parlance). <br />

For example, suppose we were crafting a cell type of `View` for our app. SwiftUI will post it up on the selected device by default (a sensible choice for the majority of development) but we can leverage `PreviewLayout` to put it into a more reasonable canvas size. Notice the left versus right:

{% include lazyLoadImage.html image="../assets/images/pl1.jpg" %}

Further, one can impose a fixed size in addition to `.sizeThatFits`, or just take the device. But since Xcode Previews is drunk with power, why not show them all?

```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ContentView()
                .previewLayout(.sizeThatFits)
                .previewDisplayName(".sizeThatFits")
            ContentView()
                .previewLayout(.fixed(width: 320, height: 44))
                .previewDisplayName(".fixed(width: 320, height: 44)")
            ContentView()
                .previewLayout(.device)
                .previewDisplayName(".device")
        }
    }
}
```

{% include lazyLoadImage.html image="../assets/images/pl2.png" %}

{% include prettyBlockquote.html text="Why `Group` here? `PreviewLayout` doesn't conform to `CaseIterable` currently, which, as we'll see, lends itself perfectly to `ForEach`." %}

Next, let's hit on some pertinent environment values to preview against.

### ContentSizeCategory
<b>What does it do?</b> Specifies a content size for the preview, which drives the system's font sizes among other things. <br />
<b>What's it good for?</b> Ensuring your app shines with dynamic type settings. <br />

Dynamic type, at this point, shouldn't be a "nice to have" - I truly feel it's a "need to have". A cornerstone of an exceptional accessibility experience, testing for it used to be a chore - no more:

```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ForEach(ContentSizeCategory.allCases, id: \.self) { contentSize in
            ContentView()
            .previewLayout(.sizeThatFits)
            .previewDisplayName("\(contentSize)")
            .environment(\.sizeCategory, contentSize)
        }
    }

```

{% include lazyLoadImage.html image="../assets/images/cs1.png" %}

{% include prettyBlockquote.html text="Previews going a bit slow? Make sure you aren't going crazy in `didFinishLaunchingWithOptions` since Xcode will indeed invoke this when firing up Xcode Previews and kicking off the dynamic replacement dance." %}

I haven't found an elegant way to do this yet, but you can also ensure flipping from an `HStack` to a `VStack` in an accessibility setting (in terms of font size) looks fine, too:

```swift
@Environment(\.sizeCategory) var sizeCat //📏🐈 amirite?
    
var body: some View {
    if "\(sizeCat)".contains("accessibility") {
        // VStack
    } else {
        // HStack
    }
}
```

### ColorScheme
<b>What does it do?</b> Reports the current system color scheme, or the overridden value. <br />
<b>What's it good for?</b> Your app either Dark Modes or it doesn't Dark Mode, this is an easy way to confirm it. <br />

```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ForEach(ColorScheme.allCases, id: \.self) { color in
            ContentView()
            .previewLayout(.sizeThatFits)
            .previewDisplayName("\(color)")
            .environment(\.colorScheme, color)
        }
    }
}
```

{% include lazyLoadImage.html image="../assets/images/cscheme1.png" %}

### LayoutDirection
<b>What does it do?</b> Reports the system layout direction. <br />
<b>What's it good for?</b> Does your app act a fool in right-to-left languages? Find out by piping this environment value into a preview.<br />

```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ForEach(LayoutDirection.allCases, id: \.self) { direction in
            ContentView()
            .previewLayout(.sizeThatFits)
            .previewDisplayName("\(direction)")
            .environment(\.layoutDirection, direction)
        }
    }
}
```

{% include lazyLoadImage.html image="../assets/images/ld1.png" %}

Luckily, this one is trivial to get right if your app is mostly architected with SwiftUI. But, most aren't. So it is in 2020, some of us forgot to constrain labels to their leading and trailing edges instead of their right or left sides.

Being able to inject environment variables can claim back a mountain of previously lost productivity. This truly is a feedback loop that heretofore took one to many build and runs. So, in the name of Xcode, why not inject whatever outlandish requirement that might come your way.

Need to know if your app works in Sri Lanka, with dark mode on and accessibility bold text enabled? In the stone age we'd take a few trip to Settings.app but in our new age of enlightenment it's just a few quick lines of code:

```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
        .previewLayout(.sizeThatFits)
        .environment(\.locale, Locale(identifier: "si_LK"))
        .environment(\.legibilityWeight, .bold)
        .environment(\.colorScheme, .dark)
    }
}
```

{% include prettyBlockquote.html text="Some accessibility traits can't be overriden within previews as far as I know. For example, `public var accessibilityInvertColors: Bool { get }` can't be a writable key path due to its read only nature." %}

### View Models
View models can boost your workflow for all sorts of reasons. Separations of concerns, easier unit testing and in our case, an easy way to mock real data. We've all been bitten by our pixel perfect designs in Sketch that get trounced by the diversity in our user base once it's out in the wild, so let Xcode Previews be a shield against it.

Simply throw together a simple view model to reflect your actual data:

```swift
struct MorganFamViewModel: Identifiable, Hashable {
    var id:String
    var name:String
    var twitterHandle:String
    var assetName:String
    
    static func TestData() -> [MorganFamViewModel] {
        return /*View Model array from .plist, json, etc*/
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ForEach(MorganFamViewModel.TestData(), id: \.self) { morgan in
            ContentView(model: morgan)
            .previewLayout(.sizeThatFits)
        }
    }
}
```

{% include lazyLoadImage.html image="../assets/images/morgansxc.png" %}

### Bonus Round
Here are a few other possibilities that didn't quite make it in, but are helpful in their own right:

- Testing selection states.
- Toggling edit mode.
- Popping in your vanilla `UIKit` views or controllers. (Mattt wrote an excellent [entry][1] on this.)
- Or simply remembering that you can run the app itself within previews.

Also, while perhaps tangentially related, remember that you can fire up [SwiftUI within Playgrounds on your iPad][2]. The perfect cure for those late night spurts of creativity which used to require a trip to your mac.

### Final Thoughts
If Xcode Previews were a car, it would be a Tesla Roadster. Blazingly efficient, fast and once you experience it you don't want anything else. I mean, this the _the car_. But like any vehicle or tool, you learn the ins. You learn the outs. The quirks, the hacks.

And Xcode Previews has all of those things. 

But the time investment is minuscule in comparison to the time you save. We can lament about how they fail to refresh every now and then, toss up a painfully ambiguous error or what have you but remember - almost all of those things take less time to fix than it does for more most mature projects to build. So, harness your favorite previewing workflows (or steal the ones I've mentioned) and profit.

Until next time ✌️.

[1]: https://nshipster.com/swiftui-previews/
[2]: https://twitter.com/JordanMorgan10/status/1185565237510070272?s=20

