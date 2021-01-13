---
layout: post
tags: ["Swift"]
title: "CollectionDifference"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Another core piece of functionality arrived in Swift 5.1 - built in diffing. Let's take a look."
image: /assets/images/logo.png
---

In the not so distant past, it was a foregone conclusion that developers would eventually fall back to the jackhammer when it came to table or collection views: `reloadData`. 

The reasons why were simple:

1) Getting a diff of what's changed in your data was hard, and <br />
2) Mapping that with the right index paths was even harder. 

But the payoff was always worth it, a buttery smooth batch reload in your interface. And hey - you can't make an omelet without crackin' a few eggs.

Fast forward to today, and we can thankfully say that WWDC 2019 mercifully addressed both pain points. Today, let's take a look at `CollectionDifference`, a lightweight way to calculate the once elusive diff mentioned in reason #1 above.

### The Little Struct That Could
`CollectionDifference` arrived in Swift 5.1 by way of [SE-0240][1]. Authors Scott Perry and Kyle Macomber wanted a way to "provide an interchange format for diffs as well as diffing/patching functionality for appropriate collection types."

Perhaps the most telling part of their proposal, though, is where they state the following:

> Representing, manufacturing, and applying transactions between states today requires writing a lot of error-prone code.

You don't say.

Thankfully, they took the problem to task and what we arrive at is `CollectionDifference` - a struct that houses insertions and removals that describe the delta between two ordered collections:

```swift
struct CollectionDifference<ChangeElement>
```

Perhaps the highest compliment I can extend it is that the API is easy on the eyes (uncommon for diffing libraries). As we'll see, it's typically a one or two line affair to get a diff and apply it, context depending.

{% include prettyBlockquote.html text="Keep in mind this diffing capability is for _ordered_ collections only. In Swift, this is any collection conforming <a href=\"https://developer.apple.com/documentation/swift/bidirectionalcollection\">`BidirectionalCollection`</a>." %}

Performance-wise, the worst you can expect is O(n * m) - where _n_ represents the count of the first collection, and _m_ the other. You do have some influence here. If your elements conform to `Hashable` (and why the heck wouldn't they - we got diffable data source this year which requires it) or the collection share many common elements, expect the diff to perform better.

Either way, since Swift is an ever-mutating project, the diffing performance has [already been improved][4] from its first incarnation by utilizing the [Myers algorithm][5].

### Diffin'
As an API consumer, if one simply needs to diff something and move about their day, then there are two essential functions to know about which are invoked from the collections themselves:

`difference(from:)`

and

`applying(_)`

One to generate a diff (giving us a `CollectionDifference`) and one to get the result of the diff by passing it in as a parameter:

```swift
let firstDraft = "It was the best of times..."
let secondDraft = "It was the worst of times..."

let diff = secondDraft.difference(from:firstDraft)
let finalDraft = firstDraft.applying(diff) // "It was the worst of times..."

// Or, reverse that

let diff = firstDraft.difference(from:secondDraft)
let finalDraft = secondDraft.applying(diff) // "It was the best of times..."
```
Also note that if you need to finely tune the diff, you can also supply a closure to return a boolean based on your own equality standards:

```swift
let foo = [1,2,3]
let bar = [1,2,3,4,5,6]

let diff = bar.difference(from: foo) { oldNum, newNum in
    return (oldNum + newNum) % 2 == 0
}
```

The flow is identifying what you want to compare, and then getting the results of the diff into a data structure to operate on. If that's all you need from `CollectionDifference`, then you can hang it up and call it a day. For the curious among us, let's look a little deeper.

### Change Enum
A `CollectionDifference` houses changes as represented by the `Change` enum. And, since Swift's enums are drunk with power, they house three important parts of the diff:

1) An `offset` Int. <br />
2) The `element` itself. <br />
3) An optional Int, `associatedWith`, that helps you track moves.

The last one is both interesting and important. In the diff, if it moved an existing element - that's actually a two-step dance. It's first a removal, and then an insertion. What `associatedWith` does it track the relationship between the two. This opens up some very nice UIKit-y scenarios.

This, however, requires a bit more work from a performance standpoint - thus the optional Int. We don't get very many free lunches in programming, and doubly so when it comes to diffing. So, if we want the associations, we ask for them by invoking `inferringMoves`.

For example, notice the association (represented by `move`) is nil in the following print statements:

```swift
let foo = ["A", "B", "D"]
let bar = ["B", "A", "D"]

let diff = bar.difference(from: foo)

for update in diff {
    switch update {
    case .remove(let offset, let letter, let move):
        print("Removed \(letter) at idx \(offset) and moved to \(String(describing: move))")
    case .insert(let offset, let letter, let move):
        print("Inserted \(letter) at idx \(offset) from \(String(describing: move))")
    }
}

/* Prints
Removed A at idx 0 and moved to nil
Inserted A at idx 1 from nil
*/

let baz = foo.applying(diff) // ["Z", "A", "C"]
```
The diff simply tells us that "A" at index 0 was removed, and "A" was inserted at index 1. But it doesn't tell us about any potential moves, just the end result. This makes sense because we're left with the true, and accurate, diff - so from an API perspective we shouldn't opt in to that extra work if it's not needed. 

If we do need it, notice how we get the associations by way of `inferringMoves`. Consider the exact code above, just with one changes in the for-loop:

```swift
for update in diff.inferringMoves { /* code */ }

/* Now prints
Removed A at idx 0 and moved to 1
Inserted A at idx 1 from 0
*/
```
Now, we can safely program against the moves. 

### Applications
While playing around with diffing, I toyed with a few applications for UIKit. 

**Batch Updates**<br />
If you're unable to move to [diffable data source][3], or you're just a complete glutton for pain - you can reasonably backport a diffing function with a little legwork for table and collection views. Since we know a non-nil association represents a move, we can map these over to index paths. 

For a single section table view, something like this works to produce a batch update:

```swift
var deletes:[IndexPath] = []
var inserts:[IndexPath] = []
var moves:[(from:IndexPath, to:IndexPath)] = []

for update in diff.inferringMoves() {
    switch update {
    case .remove(let offset, let element, let move):
        if let m = move {
            moves.append((IndexPath(row: offset, section: 0), IndexPath(row: m, section: 0)))
        } else {
            deletes.append(IndexPath(row: offset, section: 0))
        }
    case .insert(let offset, let element, let move):
        // If there's no move, it's a true insertion and not the result of a move.
        if move == nil {
            inserts.append(IndexPath(row: offset, section: 0))
        }
    }
}

self.tableView.performBatchUpdates({
    self.myData = self.myData.applying(diff) ?? []

    self.tableView.deleteRows(at: deletes, with: .left)
    self.tableView.insertRows(at: inserts, with: .right)
    
    moves.forEach { move in
        self.tableView.moveRow(at: move.from, to: move.to)
    }
    
}, completion: nil)
```

Trying that out on a little demo app, sure enough - I was treated to batch reloads. This process was painless compared to the hoops you had to ceremoniously jump through before, and then crash on edges cases while devolving back into our burn-it-all-down ways of `reloadData`:

{% include lazyLoadImage.html image="../assets/images/batch.gif" %}

**Fresh Interfaces**<br />
Another way to give your interface a dash of that _je ne sais quoi_ is to accurately represent the changes occuring with interface data. Think of an inbox type scenario where the user has seen X items, but Y items just came in from a network hit:

```swift
let currentItems = [1,2,3]
let newItems = [1,2,3,4,5,6]

let diff = newItems.difference(from: currentItems)
let newCount = diff.insertions.count

print("\(newCount) new items.") // 3 new items

label.text = "\(newCount) new items to view."
```

### Final Thoughts
Swift continues to benefit from a lot of talented engineers lending their handy work to the language. There is no denying that Cupertino & Friends'© open-source initiative has led to brilliant work from engineers outside their walls to be enjoyed by the masses. `CollectionDifference` is a textbook example.

Now, go forth and serve up diffs with a newfound level of equanimity as you do so.

Until next time ✌️.

[1]: https://github.com/apple/swift-evolution/blob/master/proposals/0240-ordered-collection-diffing.md
[3]: {{ site.url | append:"/Diffable-Datasource-Empty-View"}}
[4]: https://github.com/apple/swift/pull/25808
[5]: http://www.xmailserver.org/diff2.pdf
