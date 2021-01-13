---
layout: post
tags: ["Snips"]
title: "Diffable Datasource with UITableView"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Setup diffable datasource with UITableView."
framework:  UIKit
lastChecked: iOS 14
---

### The Scenario
Standing up diffable datasource with <code>UITableView</code>.

```swift
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
                       VideoGame(name: "ME: Remaster")]
}

// 2
typealias TableDataSource = UITableViewDiffableDataSource<Int, VideoGame>

class ViewController: UIViewController {
    
    let videogames: [VideoGame] = VideoGame.data
    let tableView = UITableView(frame: .zero, style: .insetGrouped)

    // 3
    lazy var datasource: TableDataSource = {
        let datasource = TableDataSource(tableView: tableView, cellProvider: { (tableView, indexPath, model) -> UITableViewCell? in
            let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
            cell.textLabel?.text = model.name
            return cell
        })
        
        return datasource
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.register(UITableViewCell.classForCoder(), forCellReuseIdentifier: "cell")
        view.addSubview(tableView)
        tableView.frame = view.bounds
        tableView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        // 4
        var snapshot = datasource.snapshot()
        snapshot.appendSections([0])
        snapshot.appendItems(videogames, toSection: 0)
        datasource.apply(snapshot)
    }
}
```
Which results in the populated table view:

{% include lazyLoadImage.html image="/assets/images/snips/snip_diff_tv_1.png" altText="Table view demo" %}
### The Breakdown

**Step 1**<br />
Diffable datasource requires its underlying model to conform to `hashable`, so we've got a simple model satisfying that requirement here:

```swift
// 1
struct VideoGame: Hashable {
    let id = UUID()
    let name: String
}

extension VideoGame {
    static var data = [VideoGame(name: "Mass Effect"), VideoGame(name: "Mass Effect 2"), VideoGame(name: "Mass Effect 3"), VideoGame(name: "ME: Andromeda"), VideoGame(name: "ME: Remaster"),]
}
```

**Step 2**<br />
Diffable datasource can look a bit daunting at initialization, so I find it much easier to read by leveraging a `typealias` for each one you use. While
certainly not a requirement, I do think it's worthwhile here:

```swift
// 2
typealias TableDataSource = UITableViewDiffableDataSource<Int, VideoGame>
```

Note that if you have multiple sections, the first argument (an `Int` here) will represent the different sections of the table view. In cases where you just have one,
or the sections have no real meaning in correlation with your data, it's perfectly fine to just a simple Integer type.

**Step 3**<br />
There are many different approaches to how developers tend to initialize a diffable datasource instance. Personally, my only main concern is avoiding an
implicitlly unwrapped optional for a variety of reasons. Regardless, you've got two main responsibilities here:

1. Pass in the table view instance
2. Handle what is essentially `cellForRow` within the `CellProvider` closure: Provide a hydrated `UITableViewCell` by using the index path and model passed in.
   
```swift 
// 3
lazy var datasource: TableDataSource = {
  let datasource = TableDataSource(tableView: tableView, cellProvider: { (tableView, indexPath, model) -> UITableViewCell? in
      let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
      cell.textLabel?.text = model.name
      return cell
  })
  
  return datasource
}()
```

**Step 4**<br />
Diffable datasource works with a snapshot concept. This is where its ease of use and powerful diffing comes from. Here, you only need to think about how the data should be modeled right now, in this instant. In this case, we've got what's essentially the first load of the data, so we'll pass everything in and apply it:

```swift
// 4
var snapshot = datasource.snapshot()
snapshot.appendSections([0])
snapshot.appendItems(videogames, toSection: 0)
datasource.apply(snapshot)
```

Until next time ✌️