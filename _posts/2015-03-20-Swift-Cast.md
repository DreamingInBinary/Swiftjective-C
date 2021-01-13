---
layout: post
tags: ["Swift"]
title: "Casting"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "We'd all just as soon let the compiler do all the work, but sometimes casting is unavoidable. Here's how it can be used with Swift."
image: /assets/images/logo.png
---

as.

One little word can can carry so much weight. Swift bequeaths the two lettered word with several responsibilities, but its primary function is to convert.
Upcasts. Downcasts. Guranteed and forced casts.

A word with such gusto certainly deserves its own post. So it is, this week we’ll touch on casting with the as operator.

### Act 1: The Optional Cast

Let's take a look at _as _in its purest form, the optional cast.
```swift
class Post {}  
class MediumBlogEntry : Post {}

var entry = Post()

//Returns nil if unsuccessful  
entry as? MediumBlogEntry
```

Like most modern programming languages, it's well documented that a variable or constant of a certain class type could possibly represent an instance of a subclass behind the scenes. Due to this flexibility, it's often necessary to infer the correct type at runtime.

In swift, this is where the optional cast makes its money. When you perform optional casting, you are telling the compiler that you are aware that the cast could return nil. That's usually the smartest and safest way to proceed.

A common use case could be found when foraging through the hierarchy of view controllers.
```swift
class CustomViewController: UIViewController {}  
let controller = UIViewController()

if let myNavVC = controller.navigationController  
{  
    let topVC = myNavVC.topViewController as? CustomViewController  
}
```
Another situation that will leave you calling _as?_ by name is when one is casting against Any or AnyObject. These most certainly could produce nil, so the compiler will hastily inform you at build time that any casting with these two must of the optional variety.

### Act 2: The Guaranteed Cast

Of course, if you are feeling spritely you can always perform the reliable guaranteed cast. These are casts that the compiler can gurantee success, thus eliminating the need for any optionals. Though they be few and far between, they are certainly a welcome feature.

Brace yourself for an earth shattering example:
```swift
1 as Double
```
Though we may know and love 1 as an Int most of the time, swift can certainly verify that it could also manifest itself as a Double. The use case for this occurs when one is upcasting, that is, casting a class to one of its superclasses.

From our example earlier:
```swift
class Post {}  
class MediumBlogEntry : Post {}

var mediumPost:MediumBlogEntry = MediumBlogEntry()  
mediumPost as Post
```
### Act 3: Swift 1.2 Forced Conversion

As its name implies, swift keeps adding features or otherwise changing them at a blistering pace. Swift 1.2 provides to use the concept of a forced conversion, which manifests itself like so: _as!_.

Back to our scenario:
```swift
class Post {}  
class MediumBlogEntry : Post {}

var mediumPost:Post = MediumBlogEntry()

//MediumBlogEntry is not convertible to Post  
mediumPost as MediumBlogEntry

//But a forced downcast is allowed  
mediumPost as! MediumBlogEntry
```
Swift is trying to avoid one to experience a runtime trap. For this same reason, the following will work without any warning:
```swift
class Post {}  
class MediumBlogEntry : Post {}

var mediumPost = MediumBlogEntry()

//Upcast is just peachy  
mediumPost as Post
```
Apple has bluntly stated their stance on the matter. For lack of a better explanation, take it from the belly of the beast itself:

{% include prettyBlockquote.html text="It may be easiest to remember the pattern for these operators in Swift as: ! implies _\"this might trap,\"_while ? indicates _\"this might be nil.\"_" %}

### Closing Act: Final Words

Of course, it wouldn't be a T.T.I.D.G. post without a knock on switch statements in Objective-C. Swift allows you to utilize type checking and casting to carry out sophisticated switch cases.

As follows:
```swift
var assortedRandomness = [AnyObject]()  
assortedRandomness.append(1)  
assortedRandomness.append("Jordan")  
assortedRandomness.append(UIView())  
assortedRandomness.append(2.0)

for item in assortedRandomness  
{  
    switch item  
    {  
        case 1 as Int:  
        println("First item")  
        case let possibleName as String:  
        println("Second item")  
        case let aView as UIView:  
        println("Third Item")  
        case let val as Double where val > 3.0  
        println("Nope")  
        default:  
        println("Alls well that ends well, eh?")  
    }  
}
```
### Wrapping Up

I think we can all safely agree that's neat. If we harken back to the Objective-C syntax, our switch case becomes slightly less pleasant and certainly more verbose. Swift certainly allows for powerful evaluations disguised in a clean written manner.

That's it for this week. May the next seven days be filled with runtime type checking and casting _as!_ needed.

Until next time ✌️.
