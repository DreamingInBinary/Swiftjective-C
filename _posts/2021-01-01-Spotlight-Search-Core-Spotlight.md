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
Expose your app's data to Spotlight Search using <code>NSUserActivity</code>.

```swift
import Foundation
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
        let videogame = videogames.first!
        let attributeSet = CSSearchableItemAttributeSet(contentType: .content)
        attributeSet.title = videogame.name
        attributeSet.relatedUniqueIdentifier = videogame.id.uuidString
        
        let searchableItem = CSSearchableItem(uniqueIdentifier: videogame.id.uuidString,
                                              domainIdentifier: "com.example.demo.videoGame",
                                              attributeSet: attributeSet)

        // 3
        CSSearchableIndex.default().indexSearchableItems([searchableItem]) { error in
            if let error = error {
                print("Issue indexing video game: \(error)")
            } else {
                print("Video game was indexed.")
            }
        }
    }
}
```

Now, the first video game model ("Mass Effect") is shown in search:

{% include lazyLoadImage.html image="/assets/images/snips/snip_useractivity_demo.gif" altText="Demo of Core Spotlight search" %}

### The Breakdown

**Step 1**<br />
First, identify what you want to expose with spotlight search. Typically, this is some sort of user data in your app. Here, we'll be exposing our video game view model.

**Step 2**<br />
To index with Core Spotlight, we need to use three things. For step 2, let's cover the first two:

1. `CSSearchableItemAttributeSet`: This groups a set of related data to search that's related by the `UTType` you give it. This could be one of Apple's several built in options, such as `.movie` or `.audio` or you can make your own. You'll want to give it a `title` and `relatedUniqueIdentifier`.<br />
2. `CSSearchableItem`: This represents an individual item to search, associated back to an attribute set. Together, these two objects describe an item that'll be searched. It's a bit different than using `NSUserAcitivty` in that, among other things, some of the metadata is spread across two different objects instead of one.<br />
   

**Step 3**<br />
Finally, using `CSSearchableIndex`'s default instance, this class will perform the actual indexing. You can index more items at once if you need, as it takes in `Array<CSSearchableItem>`. The closure lets you know if things were indexed properly.

Unlike the `NSUserActivity` approach, Core Spotlight APIs don’t require a user to visit the indexed content before it gets indexed. However, they don't have some capabilities such as donating it to Siri or weighting its position in search relative to the amount of times its viewed. But, it's perfectly valid to use both APIs in tandem.

Until next time ✌️