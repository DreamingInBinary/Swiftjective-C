---
layout: post
tags: ["Snips"]
title: "Spotlight Search using NSUserActivity"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Expose data from Spotlight search using NSUserActivity."
framework:  Foundation
lastChecked: iOS 14
---
### The Scenario
Expose your app's data to Spotlight Search using the <code>Core Spotlight</code> framework.

```swift
import Foundation
import Intents
import UIKit

// 1
struct VideoGame: Hashable {
    let id = UUID()
    let name: String
}

extension VideoGame {
    static var data = [VideoGame(name: "Mass Effect"), 
                       VideoGame(name: "Mass Effect 2"), 
                       VideoGame(name: "Mass Effect 3"), 
                       VideoGame(name: "ME: Andromeda"), 
                       VideoGame(name: "ME: Remaster"),]
}

class ViewController: UIViewController {
    
    let videogames: [VideoGame] = VideoGame.data

    override func viewDidLoad() {
        super.viewDidLoad()

        let videogame = videogames.first!
        
        // 2
        let activity = NSUserActivity(activityType: "com.example.demo.videoGame")
        activity.title = videogame.name
        activity.userInfo = ["id": videogame.id]
        activity.persistentIdentifier = videogame.id.uuidString
        activity.isEligibleForSearch = true
        activity.isEligibleForPrediction = true
        activity.suggestedInvocationPhrase = "View \(videogame.name)"
        activity.keywords = NSSet(array: [videogame.name]) as! Set
        
        // 3
        self.userActivity = activity
    }
}
```

Now, the first video game model ("Mass Effect") is shown in search:

{% include lazyLoadImage.html image="/assets/images/snips/snip_useractivity_demo.gif" altText="Demo of Core Spotlight search" %}

### The Breakdown

**Step 1**<br />
First, identify what you want to expose with spotlight search. Typically, this is some sort of user data in your app. Here, we'll be exposing our video game view model.

**Step 2**<br />
Initialize a user activity instance and set relevant properties. View the documentation or header file to see all of them, but these are the ones I typically set. I'll list
them top to bottom:

1) `title`: What the indexed item will show up as in the results.<br />
2) `userInfo`: Common on iOS APIs, this dictionary allows you to store any metadata that'll help you later on. In this case, storing an identifier to find the model and open it is what we'll want to use it for.<br />
3) `persistentIdentifier`: A stable identifier for the activity. You'll want to set this, among other reasons, to be able to later delete it when it's no longer relevant.<br />
4) `isEligibleForSearch`: If this is set to `true`, the activity is added to the on device index. Here, we want it show up in search, so we've set it to `true`.<br />
5) `isEligibleForPrediction`: If set to `true`, Siri can suggest this user activity as a shortcut to the user.<br />
6) `suggestedInvocationPhrase`: Working in tandem with the above value, if the user creates their own shortcut from this activity, this phrase is what's suggested to them when it's made in the Shortcuts app.<br />
7) `keywords`: Just like it reads - this helps Spotlight search surface this activity when searching for it.<br />

**Step 3**<br />
Since we're in a view controller context, we've assigned this activity to the controller's `userActivity` property. Here, it's for demo purposes but in reality, it would make much more sense to set it when they were viewing a particular video game in this case. 

Also note that if we didn't set it on a view controller or `UIResponder` object, you'd want to instead invoke `becomeCurrent()` instead. In closing, using `NSUserActivity` to index items also allows you the option to make the data publicly indexed, off the user's device. Unlike the Core Spotlight approach using `CSSearchableItem`, the user needs to view or visit the data before it becomes indexed. It also becomes more weighted in search the more it's viewed. But, it's perfectly valid to use both APIs in tandem.

Until next time ✌️