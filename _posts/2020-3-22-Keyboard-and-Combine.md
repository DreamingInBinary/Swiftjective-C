---
layout: post
tags: ["Tech Notes"]
title: "Keyboard and Combine"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Handling the keyboard on iOS is a rite of passage if not also a little tiresome. Fortunately, Combine makes it better."
image: /assets/images/logo.png
---

While toiling about with some keyboard handling code in Spend Stack, I started to remember one import choice I made several months ago:

Spend Stack's minimum build target is iOS 13.

Which means my cup runneth over with Combine. So, today I'm sharing a little utility I wrote which brings the convenience of Combine into the world of `UIKeyboard`.

Normally, the flow to handle the keyboard looks a little like this, give or take:

```swift
let keyboardNotifications:[NSNotification.Name] = [UIResponder.keyboardWillShowNotification,
UIResponder.keyboardDidShowNotification,
UIResponder.keyboardWillHideNotification,
UIResponder.keyboardDidHideNotification]

let kbSelector = #selector(receivedKeyboardNotification(notification:))
keyboardNotifications.forEach {
    NotificationCenter.default.addObserver(self,
                                           selector: kbSelector,
                                           name: $0,
                                           object: nil)
}

@objc func receivedKeyboardNotification(notification: Notification) {
    // Get animation curve, rect or whatever else...
}
```

The two things I wanted to clean up were that:

**1)** That's a lot of code to just know when the keyboard is doing stuff and <br />
**2)** It would be nice to centralize getting all of the information about what's going on out of the `userInfo` dictionary into something tidier.

### Unify Keyboard Information
The latter part is easy enough. A little struct can go a long ways here:

```swift
enum KeyboardTransitionState {
    case unset, willShow, didShow, willHide, didHide
}

struct KeyboardState {
    var state:KeyboardTransitionState = .unset
    var height = 0.0
    var isVisible = false
    var frame:CGRect = CGRect.zero
    var animationDuration = 0.0

    // MARK: Private 
    private let frameEnd = UIResponder.keyboardFrameEndUserInfoKey
    private let animEnd = UIResponder.keyboardAnimationDurationUserInfoKey

    init(with note:Notification) {
        switch note.name {
        case UIResponder.keyboardWillShowNotification:
            state = .willShow
            let keyboardEndFrame = note.userInfo?[frameEnd] as! CGRect
            height = Double(keyboardEndFrame.size.height)
            
            let animationDurationValue = note.userInfo?[animEnd] as! NSNumber
            animationDuration = animationDurationValue.doubleValue
        break
        case UIResponder.keyboardDidShowNotification:
            state = .didShow
            isVisible = true
            
            let keyboardEndFrame = note.userInfo?[frameEnd] as! CGRect
            height = Double(keyboardEndFrame.size.height)
        break
        case UIResponder.keyboardWillHideNotification:
            state = .willHide
            let animationDurationValue = note.userInfo?[animEnd] as! NSNumber
            animationDuration = animationDurationValue.doubleValue
        break
        case UIResponder.keyboardDidHideNotification:
            state = .didHide
        break
        default:
            break
        }
    }
}

```

It's a smidge dirty and needs a bit of refactoring, but it's more than enough to try out a new approach with Combine.

### Combine It
In what's become a weekly practice for me, I had a problem and threw Combine at it. I'm not sure if that's a great sign or malpractice, regardless - here's how it shaped up (with a backport option for iOS 12):

```swift
class KeyboardHandler {
    let onChange:((KeyboardState) -> Void)
    private(set) var currentState:KeyboardState?
    
    @available(iOS 13.0, *)
    private lazy var kbSub:AnyCancellable? = AnyCancellable() {}
    private let keyboardNotifications:[NSNotification.Name] = [
        UIResponder.keyboardWillShowNotification,
        UIResponder.keyboardDidShowNotification,
        UIResponder.keyboardWillHideNotification,
        UIResponder.keyboardDidHideNotification]
    
    // MARK: Initializer

    init(with changeHandler:@escaping ((KeyboardState) -> Void)) {
        onChange = changeHandler
        
        if #available(iOS 13.0, *) {
            let nc = NotificationCenter.default
            kbSub = Publishers.MergeMany(
                keyboardNotifications.map { nc.publisher(for: $0) }
            )
            .sink(receiveValue: { (note) in
                self.currentState = KeyboardState(with: note)
                self.onChange(KeyboardState(with: note))
            })
        } else {
            let kbSelector = #selector(receivedKeyboardNotification(notification:))
            keyboardNotifications.forEach {
                NotificationCenter.default.addObserver(self,
                                                       selector: #kbSelector,
                                                       name: $0,
                                                       object: nil)
            }
        }
    }
    
    func unsubscribe() {
        if #available(iOS 13.0, *) {
            kbSub?.cancel()
        } else {
            NotificationCenter.default.removeObserver(self)
        }
    }
    
    //MARK: Private Functions

    @objc func receivedKeyboardNotification(notification: Notification) {
        currentState = KeyboardState(with: notification)
        onChange(KeyboardState(with: notification))
    }
}
```
There's likely a prettier path to merging all of the notifications, but I accepted my Combine naïveté and moved on. Further, one might not need all of em' either[^1]. 

### In Practice
So what's that leave us with? Well, a tidy little object that'll hide the messiness of keyboard handling away in a simple package:

```swift
private var kbHandler:KeyboardHandler?

// Later on in viewDidLoad, or wherever appropriate...
kbHandler = KeyboardHandler { state in
    let duration = state.animationDuration
    UIView.animate(withDuration: duration) {
        // Change table view offsets or whatever
    }
}
```


What's ironic is that after I had written this, I realized I could've done this approach years ago. In fact, Combine is abstracted away entirely to the caller.

But, it's just another example of how new API can make you look at age old problems in a new light. A problem well stated is a problem half solved I suppose.

Until next time ✌️.

[^1]: Update: Thanks to [Jasdev Singh](https://www.twitter.com/jasdev) for suggesting `mergeMany`.