
---
layout: post
tags: ["UIKit"]
title: "iOS 14: Notable UIKit Additions"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "If you thought UIKit was getting pushed to the side with the rise of SwiftUI, you were wrong. There's a lot that's new, improved or revamped - let's take a look."
image: /assets/images/logo.png
---

During what was likely a WWDC to be remembered for years to come for several reasons, we got our look at what's next in Apple's world. iOS 14 is upon us, so let's dive back into our favorite(?) user interface framework, UIKit.

If you thought things were slowing down for UIKit in lieu of SwiftUI, well - that's clearly not happening. There's a lot to cover this year!

If you want to catch up on this series first, view the [iOS 11][1], [iOS 12][2]and [iOS 13][3] versions of this article.

For now, let's chat UIKit and iOS 14 niceties!

> If you want to take a peek at finer implementation details, check out Apple's robust sample code cataloging a lot of UIKit changes shown in this article [right here][4].

### Date and Time Picker
First, let's look at the free power ups. And nothing really embodies that more than the completely overhauled date picker. It went from serviceable to fully-featured.

With just this code alone:

```swift
private let picker = UIDatePicker(frame: .zero)
```

We went from this on iOS 13:

{% include lazyLoadImage.html image="../assets/images/iOS14_lamePicker.png" %}

To this:

{% include lazyLoadImage.html image="../assets/images/iOS14_juicedUpPicker.png" %}

For the most part, you just leave `UIDatePicker` alone and let it use the default style choice, `.automatic`. Though, I do see value in checking out the trait collection to swap between that and the new `.inline` style:

```swift
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    super.traitCollectionDidChange(previousTraitCollection)
    let isVerticallyCompact: Bool = traitCollection.verticalSizeClass == .compact
    datePicker.preferredDatePickerStyle = isVerticallyCompact ? .compact : .inline
}
```

Regardless, if you've got the `.inline` display, the picker will still do this context-y menuish transition to the full style as seen here:

{% include lazyLoadImage.html image="../assets/images/iOS14_toggleDatePicker.gif" %}

The pretty package comes with some house keeping, though. If you were using a date picker before, you were likely doing so under the assumption that it would show as the wheel style. If that's the case, it's gonna look all kinds of crazy right now - so go check it out in your own apps and either tweak the style or the way you're showing it.

For example, I was using the wheel style in Spend Stack, which you can see in the picture above in this article. However, building against iOS 14 nets me this result (with the nice, fully fleshed out version showing when a user taps on it):

{% include lazyLoadImage.html image="../assets/images/iOS14_datePickerBug.png" %}

### Color picker
There isn't so much to say here, other than _it's simply about freakin' time_. Using a color picker is UIKit-101 fare. You present the view controller, set a delegate and move on with life:

```swift
let colorPicker = UIColorPickerViewController()
colorPicker.delegate = self
colorPicker.supportsAlpha = true // Use NO if you want only opaque colors
colorPicker.selectedColor = UIColor.purple

// Optional delegate functions
func colorPickerViewControllerDidSelectColor(_ viewController: UIColorPickerViewController) {
    // Check out .selectedColor property
}

func colorPickerViewControllerDidFinish(_ viewController: UIColorPickerViewController) {
    // The delegate staple function, didFinish
}
```

Which nets you this:

{% include lazyLoadImage.html image="../assets/images/iOS14_colorPicker.png" %}

But hey - the selected color is also `.KVO` compliant, so why not mesh the old with the new and Combine it instead of using a lame delegate, amirite?

```swift
cancellable = colorPicker.publisher(for: \.selectedColor)
.sink() { [weak self] color in
    self?.view.backgroundColor = color
}
```

### The UIAction Revolution
It seems Apple's love affair with `UIAction` has a pointed purpose - it's simply used all over the joint now. 

Which is great, because you know what feels incredibly tedious to do in 2020? The target-action pattern. 

It was birthed in the days of yore and fits Objective-C's message sending paradigm extremely well - but whether you love the dino or hate it there's simply no denying Swift is where the puck is going.

As such, we can go from this:
```swift
override func viewDidLoad() {
    super.viewDidLoad()
    let navItem = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(dismissController))
    navigationItem.leftBarButtonItem = navItem
}
    
@objc func dismissController() {
    self.dismiss(animated: true)
}
```

To this:

```swift
override func viewDidLoad() {
    let dismiss = UIAction(title: "") { [weak self] action in
        self?.dismiss(animated: true)
    }
        
    let navItem = UIBarButtonItem(systemItem: .done, primaryAction: dismiss)
    navigationItem.leftBarButtonItem = navItem
}
```

It's hard for me to overstate how much better this approach feels. In some ways, it reminds of when the alert controller started supporting its block based approach as well. It's chef's kiss.

Anyways, you don't need to look far for UIKit controls that take `UIAction` in its initializers (pull down menus, contextual menus, bar button items, switches, etc).

Speaking of bar button items - they now accept menus as well: 

```swift
let tbMenu = UIMenu(title: "", children: /* UIActions */)
return UIBarButtonItem(image: UIImage(systemName: "list.number"), menu: buttonMenu)
```

This means it's now trivial to make the following UX demoed in the UIKIt Catalog for its toolbars:

{% include lazyLoadImage.html image="../assets/images/iOS14_toolbar.png" %}

Which is a good thing, because that type of thing seems to be pushed in favor of action sheets. In fact, you can pretty much toss a `UIMenu` or `UIAction` in just about anything in UIKit such as buttons:

```swift
let menu = UIMenu(title: "", children: [UIAction(title: "Trash It") { handler in print("Sup")}])
 
let button = UIButton(frame: CGRect(x: 50, y: 100, width: 100, height: 44))
button.setImage(UIImage(systemName: "trash"), for: .normal)
button.role = .normal
button.menu = menu

// If you don't set this, the button either fires via Target/Action or the UIAction it got
button.showsMenuAsPrimaryAction = true

view.addSubview(button)
```

Now, the button will toss up the ol' menu:

{% include lazyLoadImage.html image="../assets/images/iOS14_buttonMenu.gif" %}

### UIListContentView
There is a whole new way to configure what are now called "lists". For example, you can make what's basically a table view with a content list:

```swift
override func viewDidLoad() {
    super.viewDidLoad()
        
    var config:UIListContentConfiguration = UIListContentConfiguration.subtitleCell()
    config.text = "Test Cell"
    config.secondaryText = "Subtitle"
        
    let list:UIListContentView = UIListContentView(configuration: config)
    list.frame = view.bounds
        
    let stackView = UIStackView(frame: view.bounds)
    view.addSubview(stackView)
    stackView.addArrangedSubview(list)
}
```

{% include lazyLoadImage.html image="../assets/images/iOS14_contentList.png" %}

There's a new `UIViewConfigurationState` which, in turn, a `UICellConfigurationState` inherits from. These all play a part in the updates to how you can setup cells in both collection and table views, which I suspect will be the main topic in "[Modern Cell Configuration][5]"

### Sidebars
Look, `UISplitViewController` went absolutely nuts in this release. Just look at the diff:

{% include lazyLoadImage.html image="../assets/images/iOS14_diffSplit.png" %}

One reason why? Due to the new `.sidebar` stuff which allows for a three column layout. You see this all over in iOS 14 - for example Mail and Notes. And now, we've also got the whole new list thing going on in collection view. That's used heavily in the sidebar world.

But how do we handle all of that collapsing tomfoolery? Won't _that_ be a nightmare, even with diffable datasource?

No, of course it won't. You can diff things section by section now:
{% include lazyLoadImage.html image="../assets/images/iOS14_diffDiff.png" %}

You put it all together, and collection view with split view controller just became a go-to choice for many app's UX. 

### UIScribbleInteraction
Much like drag and drop and cursor effects work, there's a new interaction for the scribble mechanisms found on iPadOS. The good thing is that you don't need to do much of anything - as stock UIKit controls get the scribble stuff for free.

But, if you've got something more custom or need to have more control due to your own situation - doing so is easy enough:

```swift
class TestViewController: UIViewController, UIScribbleInteractionDelegate {    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let nosScribble = UIScribbleInteraction(delegate: self)
        let text = UITextField(frame: .zero)
        text.addInteraction(nosScribble)
    }
    
    func scribbleInteraction(_ interaction: UIScribbleInteraction, shouldBeginAt location: CGPoint) -> Bool {
        // You thought you could scribble and you.were.wrong.
        return false
    }
}
```

It's great to see Apple leverage similar API across the board now with these interaction delegates and `UIAction` being used across the board. If you figure out how one works, discovering the rest is easy.

### Bonus Round
- Nice little user interface idiom off of `UIDevice` - `.mac`. Though I will say the header is worded very specifically:
```swift
 @available(iOS 14.0, *)
 case mac = 5 // Optimized for Mac UI
```

Optimized _for_ mac? That doesn't outright say it _is_ a mac app. As more releases follow, I suspect the lines will only get more blurred as to what a mac app is anymore.

- The added `.automatic` style for a lot of controls. Basically, it allows for Catalyst apps to be macOS-y when they are on macOS, and iOS-y when they aren't.
- Pointer lock states are here, and are yet another thing to manage on a controller instance. You override `prefersPointerLocked` to return what you prefer, but like with the home indicator there's a chance it may not be honored. Also like the home indicator, status bar and other similar view controller things - you can request an update for this value:

```swift
setNeedsUpdateOfPrefersPointerLocked()
```
- There's a `title` property on `UISwitch` but I couldn't get it do anything on iOS. I assume this is respected only on macOS.
- There's a list layout for collection view now!

### Final Thoughts
UIKit got some serious juice in this release. I suspect it will for a long time, as SwiftUI is simply putting similar controls under its own wings in a declarative way without even needing a representable instance for a lot of these things.

Plus - my wish came true. Catalyst apps built on UIKit look better already on macOS by virtue of Apple's new design language that bring the two closely together. I'm down! As always, it's been my pleasure diving into UIKit's diffs on an annual basis. There's a lot to love here.

Until next time ✌️.

[1]: {{ site.url | append:"/iOS-11-notable-uikit-additions" }}
[2]: {{ site.url | append:"/iOS-12-notable-uikit-additions" }}
[3]: {{ site.url | append:"/iOS-13-notable-uikit-additions" }}
[4]: https://developer.apple.com/wwdc20/sample-code/
[5]: https://developer.apple.com/videos/play/wwdc2020/10027/

