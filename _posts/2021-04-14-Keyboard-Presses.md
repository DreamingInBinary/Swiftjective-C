---
layout: post
tags: ["Snips"]
title: "Respond to Keyboard Presses"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Respond to keyboard presses."
framework: UIKit
lastChecked: iOS 14
image: /assets/images/snips/snips.png
---

### The Scenario
Add support for keyboard presses in your app.

```swift
import UIKit

class KeyboardViewController: UIViewController {
    
}

// MARK: Keyboard Shortcuts
extension KeyboardViewController {
	// 1
    override func pressesBegan(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
        super.pressesBegan(presses, with: event)
        // 2
        presses.first?.key.flatMap{ onKeyPressed($0) }
    }
    
    // 3
    func onKeyPressed(_ key: UIKey) {
        switch key.keyCode {
        case .keyboardSpacebar:
            print("On spacebar pressed")
        case .keyboardN where key.modifierFlags.contains(.command):
            print("On N + Command pressed")
        default:
            break
        }
    }
}
```

### The Breakdown

**Step 1**<br />
Override touch handling events to respond to keyboard presses such as `pressesBegan(_ presses: Set<UIPress>, with event: UIPressesEvent?)`. In addition, you can also respond to its similar variants such as `pressesCancelled` or `pressesEnded`.

**Step 2**<br />
Since the set of `UIPress` objects will hold an instance of `UIKey?`, we `flatMap` out any nil instance since the touch event is not exclusive to keyboard presses.

**Step 3**<br />
Finally, we can switch on the `UIKey`'s `keyCode` property to respond to the ones we are interested in. Further, you can tack on a `where` clause to handle complex key press combinations.

Unlike adding [keyboard shortcuts][1]{:target="_blank"}, this technique is great for adhoc responses to the keyboard where it wouldn't make sense to register a `UIKeyCommand` for the things you're trying to do (i.e. move a character in a video game by using the W,A,S and D keys.).

Until next time ✌️

[1]: {{ site.url | append:"/Keyboard-Shortcuts" }}