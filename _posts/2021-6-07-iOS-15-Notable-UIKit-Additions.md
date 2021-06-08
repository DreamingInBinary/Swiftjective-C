---
layout: post
tags: ["UIKit"]
title: "iOS 15: Notable UIKit Additions"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: FILL OUT"
image: /assets/images/logo.png
---

Well, if you thought UIKit was going to show any signs of slowing down, Apple has some news for [you][5] - it's not. Though SwiftUI continues to be a focus, as it should be, our venerable UI framework is better than it ever has been, replete with several meaningful changes. As is my annual tradition, let's peek at some of my favorites.

If you want to catch up on this series first, you can view the [iOS 11][1], [iOS 12][2], [iOS 13][3], and [iOS 14][4] versions of this article.

### Sheet Presentation
There are eventualities in life we all accept - death and taxes, for example. In iOS, it was _when will Apple finally give us an API for the bottom sheet controller_?

Lo, it's here! And beautiful.

Meet [UISheetPresentationController][6].

Setup is as easy configuring the presentation controller with a few options:

```swift
extension ViewController: UIViewControllerTransitioningDelegate {
    func presentationController(forPresented presented: UIViewController, presenting: UIViewController?, source: UIViewController) -> UIPresentationController? {
        let pc = UISheetPresentationController(presentedViewController: presented, presenting: presenting)
        pc.detents = [.medium()]
        pc.prefersGrabberVisible = true
        return pc
    }
}
```

Or, you can leverage the new adaptive sheet presentation controller to use it as popover when needed on iPadOS:

```swift
// The UISheetPresentationController instance this popover will adapt to in compact size classes. Access this instance to customize or adjust the adaptive sheet.
@property (nonatomic, readonly, strong) UISheetPresentationController *adaptiveSheetPresentationController API_AVAILABLE(ios(15.0)) API_UNAVAILABLE(tvos, watchos);
```

Which, in my opinion, gives you a bit more flexibility than leveraging the transitioning delegate route. It also sets you up for iPadOS presentations:

```swift
let test = DemoVC()
test.modalPresentationStyle = .popover
if let pop = test.popoverPresentationController {
    let sheet = pop.adaptiveSheetPresentationController
    sheet.detents = [.medium()]
    sheet.prefersGrabberVisible = true 
}

present(test, animated: true)
```

The system uses a concept called "detents", which only has two values right now, to determine its size:
```swift
// A system detent for a sheet that is approximately half the height of the screen, and is inactive in compact height.
+ (instancetype)mediumDetent;

// A system detent for a sheet at full height.
+ (instancetype)largeDetent;
```

They control if you want the sheet to present a lá Maps style, half showing, or go into the normal sheet presentation we've had since iOS 13. There are several configurables here, though, more than I expected. For example, you can have the sheet sized according to the preferred content size:

```swift
let test = DemoVC()
test.modalPresentationStyle = .popover
test.preferredContentSize = CGSize(width: 200, height: 200)
if let pop = test.popoverPresentationController {
    let sheet = pop.adaptiveSheetPresentationController
    pop.sourceView = self.button
    sheet.detents = [.medium()]
    sheet.prefersGrabberVisible = true
    sheet.widthFollowsPreferredContentSizeWhenEdgeAttached = true
}

present(test, animated: true)
```

Which gives us #TinySheet:
{% include lazyLoadImage.html image="../assets/images/iOS15_2.png" altText="A popover" %}

You can also tweak the corner radius, whether or not to attach to the container view's edges and more. Overall, this is just what the community needed, and wanted:

{% include lazyLoadImage.html image="../assets/images/iOS15_1.png" altText="A demo of sheet presentations" %}

#### CLLocationButton
This nifty new control, found in the new CoreLocationUI framework, helps you solve one problem quickly: Getting one-shot access to the user's location. If you've got a feature of your app where it makes sense to get a location temporarily, you'll want to use this[^1]:

```swift
let btnFrame = CGRect(x: 100, y: 100, width: 215, height: 54)
let locationBtn = CLLocationButton(frame: btnFrame)
locationBtn.icon = CLLocationButtonIcon.arrowFilled // Or outline
locationBtn.label = CLLocationButtonLabel.currentLocation
locationBtn.cornerRadius = (btnFrame.size.height/2).rounded()
view.addSubview(locationBtn)
```

With that, we've got a pretty location button:
{% include lazyLoadImage.html image="../assets/images/iOS15_3.png" altText="A demo of CLLocationButton" %}

When this is tapped, the system prompts the user about granting temporary access to their location. If they agree, your app gets `CLAuthorizationStatus.authorizedWhenInUse` permissions which expire when your app is no longer in use. From there, you can kick off all your location needs using the same code you always have.

You can tweak its `icon` and `label` properties to get predefined and fully localized iconography and text:

{% include lazyLoadImage.html image="../assets/images/iOS15_4.png" altText="A demo of different styles of CLLocatiomButton" %}

### UIKeyboardLayoutGuide
Not much to say here, aside from another _finally_! We now have a keyboard version of `UILayoutGuide`:

```swift
 testView.bottomAnchor.constraint(equalTo: view.keyboardLayoutGuide.topAnchor).isActive = true
```

But, what's the tricky part about constraining to the keyboard? The fact that it can float all over the joint, and get resized on the fly. Thankfully, Cupertino and Friends thought of this:

```swift
view.keyboardLayoutGuide.followsUndockedKeyboard = true
```

If that is, in fact, what you want. If this is false, the default value, then the guide's top anchor will reflect the view's bottom anchor of its safe area layout guide when the keyboard is off floating about.

### UIToolTipInteraction
There's new API to use tooltips, and it follows the "interaction" pattern that's been used more and more in UIKit. For example, it works almost identical to the pointer interactions:

```swift
class ViewController: UIViewController {
    private let button = UIButton()
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let square = UIView(frame: CGRect(x: 200, y: 200, width: 100, height: 100))
        square.backgroundColor = .red
        view.addSubview(square)
        
        let toolTip = UIToolTipInteraction()
        toolTip.delegate = self
        square.addInteraction(toolTip)
    }
}

extension ViewController: UIToolTipInteractionDelegate {
    // If both delegate methods are implemented, this one takes precedence
    func toolTipInteraction(_ interaction: UIToolTipInteraction, toolTipAt point: CGPoint) -> String? {
        return "Hi There - I'm showing a tooltip"
    }
    
    func toolTipInteraction(_ interaction: UIToolTipInteraction, toolTipAt point: CGPoint, boundingRect outRect: UnsafeMutablePointer<CGRect>) -> String? {
        return "Bounding rect delegate function"
    }
}
```
However, try as I might, I can't seem to get these delegate methods to fire on beta one. Though the header docs don't mention it, and it is certainly available on iOS, perhaps this only occurs for Catalyst apps?

### Image Decoding
A few years ago I [wrote about the hoops][7] you had to jump through to take less of a hit on image decoding. Now, there are built in methods to do this in a trivial fashion straight from ImageIO!

```swift
let thumbnailImg = UIImage(named: "Baylor")!
thumbnailImg.preparingThumbnail(of: CGSize(width: 200, height: 400)) 

// Or, do it async on a background thread
thumbnailImg.preparingThumbnail(of: CGSize(width: 200, height: 400)) {
    // Now dispatch back to main to use it
}
```

Also, you can tack a shape on to SF Symbols, which is very neat:
```swift
let trashCircle = UIImage(systemName: "trash", shape: .circle)
let imageView = UIImageView(image: trashCircle)
imageView.tintColor = .red
imageView.frame = CGRect(x: 100, y: 100, width: 200, height: 200)
view.addSubview(imageView)

let trashCircleSquare = UIImage(systemName: "trash", shape: .square)
let imageView2 = UIImageView(image: trashCircleSquare)
imageView2.tintColor = .red
imageView2.frame = CGRect(x: 100, y: 400, width: 200, height: 200)
view.addSubview(imageView2)
```

Which results in:

{% include lazyLoadImage.html image="../assets/images/iOS15_5.png" altText="Shape symbol vairants" %}

Though, if the shape variant isn't supported, it'll return nil. I can see this resulting in more flexibile user interfaces, it's a nice touch that I didn't really know I wanted, but can think of several use cases for.

### Final Thoughts
While none of us outside Cupertino and Friends are iOS 15 cognoscentis yet, we'll get there slowly, beta by beta. I'm impressed with this release, and it has several "nice" things. It reminds me of iOS 12, a rock solid release that was lighter on huge, new and my-summer-is-gone features. That's fine with me.

There are still plenty of interesting things in UIKit I haven't looked at yet, like the new button configurations which seem to allow for multiline text and other perks. It doesn't seem like UIKit has lost a step, so go boot up your beta and dig in! 

Of course, all of these will eventually find themselves in the [best-in-class][8] book too, and I can't wait to uncover ways to make all of these new APIs shine.

Until next time ✌️

[1]: {{ site.url | append:"/iOS-11-notable-uikit-additions" }}
[2]: {{ site.url | append:"/iOS-12-notable-uikit-additions" }}
[3]: {{ site.url | append:"/iOS-13-notable-uikit-additions" }}
[4]: {{ site.url | append:"/iOS-14-notable-uikit-additions" }}
[5]: http://codeworkshop.net/objc-diff/sdkdiffs/ios/15.0/UIKit.html
[6]: https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller
[7]: {{ site.url | append:"/optimizing-images" }}
[8]: https://bestinclassiosapp.com

[^1]: Or its SwiftUI variant, Location Button.