---
layout: post
tags: ["Snips"]
title: "Adding Keyboard Shortcuts"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Add some keyboard shortcuts."
framework: UIKit
lastChecked: iOS 14
image: /assets/images/snips/snips.png
---

### The Scenario
Add support for keyboard shortcuts in your app using `UIKeycommand`.

```swift
import UIKit

class ViewController: UIViewController {
	// 1
    override var keyCommands: [UIKeyCommand]? {
        let search = UIKeyCommand(input: "s", modifierFlags: .command, action: #selector(openSearch))
        // 2
        search.discoverabilityTitle = "Search"

        return [search]
    }
    
    // 3
    @objc func openSearch() {
        
    }
}
```

### The Breakdown

**Step 1**<br />
Any `UIResponder` object allows for overriding its `keyCommands` property, most commonly this is going to be a `UIViewController`. From there, you supply it with an array of `UIKeyCommand` objects.

**Step 2**<br />
From there, give it a combination of keyboard shortcuts you'd like to expose. Keep in mind that the `discoverabilityTitle` property is what shows when the user holds down the command key to see any available keyboard shortcuts.

**Step 3**<br />
Finally, the `UIKeyCommand` class doesn't yet adopt the `UIAction` paradigm, so you'll need to fall back to the target-action pattern. Because of this, you'll need to mark your function with `@objc` if you're using Swift.

Unlike responding to pure [keyboard presses][1]{:target="_blank"}, this technique is suited for actions that you want to provide quick access to and register to the system so they'll show in places like on the iPad's keyboard shortcuts glossery. For more adhoc uses, such as moving a character around in a video game using the W,A,S and D keys, look to responding to keyboard presses instead.

Until next time ✌️

[1]: {{ site.url | append:"/Keyboard-Presses" }}