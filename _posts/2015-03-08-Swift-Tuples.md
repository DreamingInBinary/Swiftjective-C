---
layout: post
tags: ["Swift"]
title: "Tuples"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Tuples can be a short stand in for tiny data constructs. When used properly, they can make your code a bit more opportunistic."
image: /assets/images/logo.png
---
Swift brought forth a modern light in a world predominately ruled by the techniques of yesteryear and C. Cocoa Touch has never had the newest bells and whistles in terms of raw programming features, but no matter, developers have gone on to create some of the world’s most meaningful software using it. 

But alas, it’s only become better with the addition of Swift’s feature set.
One such feature to keep around for a rainy day is the diverse and friendly tuple — our topic of discussion this week.

### Tuple /ˈtjʊpəl; ˈtʌpəl/
noun (TUH-pul)  
1. In programming languages, such as [Lisp][1], [Python][2], Linda, and others, a tuple is an ordered set of values.

At their core, tuples group multiple values into a single compound return type. They are intrinsically flexible, allowing any type (reference or value) to be contained within them. They tend to shine in scenarios where one needs to be intentional about a return type, yet the situation is too small or "one off" to create a wrapper class to do so.

Observe:
```swift
let http404Error = (404, "Not Found")
```
This is Apple's favorite use case to show off Tuples. Here, the tuple would return one compound type containing an Int and a String. When referring to such a type, it is semantically accurate to refer to it as a "tuple of type (Int, String)".

### Accessing Values

_Decomposing_ a tuple refers to the method in which you access its values. Let us veer away from Apple's demonstration and look at one straight from the real world:
```swift
class func setDetailsForCellAtIndexPath(idp:NSIndexPath) -> (text:String?, detailText:String?, image:UIImage?)  
{  
    let cellText = AccountsTableViewHelper.getCellText(idp)  
    let image = AccountsTableViewHelper.getCellImage(idp)  
    return (cellText.text, cellText.detailText, image?)  
}
```
This simplistic function helps solve the problem of the no-relation table view. You've seen these table views before, they exhibit signs of information that do not relate to one another in any fashion (i.e. "Rate App" and "Visit Us Online").

Tuples help solve this particular scenario rather nicely. Instead of creating a wrapper class to return an object with information each cell needs, a tuple is created with the cell's text, detail text, and an image — if applicable.

To decompose the value(s), we use syntax that mimcs that of accessing a first class object's members:
```swift
func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell  
{  
    var cell:UITableViewCell? = tableView.dequeueReusableCellWithIdentifier(REUSE_ID) as?UITableViewCell  
    var cellDetails = AccountsTableViewHelper.setDetailsForCellAtIndexPath(indexPath)
    
    //Decompose tuple for cell's data  
    cell!.textLabel?.text = cellDetails.text  
    cell!.detailTextLabel?.text = cellDetails.detailText  
    cell!.imageView?.image = cellDetails.image
    
    return cell!  
}
```
You can also be selective about which values you care about in a tuple. For instance, suppose there was a cell which did not require an image. These situations are tastefully handled by inserting _where_ the parameter you wish to ignore is:
```swift
var cellDetails = AccountsTableViewHelper.setDetailsForCellAtIndexPath(indexPath)

let (text, detailText, _) = cellDetails 
```
Going further, you can decompose a tuple using Array syntax as well:
```swift
var cellDetails = AccountsTableViewHelper.setDetailsForCellAtIndexPath(indexPath)

println("Cell text: (cellDetails.0)")  
println("Cell detail text: (cellDetails.1)")
```
### Syntactic Sugar

To maximize the benefits tuples afford us, it's good form to name the elements contained within them. To demonstrate, let us get quick and dirty:
```swift
let catDog = (cat:"🐱", dog:"🐶")  
println("By the beard of Zeus, that creature, it's most definitely half (catDog.cat) and half (catDog.dog)")
```
In this way, we are explicit about the values the tuple holds. Ambiguity in programming, especially in return types, only serves as a hindrance and home to a future bug.

### Being Responsible

Think before you fire. Tuples are here to aid you when need to return useful information about a function's outcome. They sanely group values together as we have discussed.

They are not, however, suited to be utilized as a complex data structure. If the data in question will persist past local scope, tuples are not the answer you are searching for. These situations indicate a use case for a class or structure.

### Wrapping Up
Like any feature introduced in a programming language, it's wise to study them in brief to know when they will help you. Tuples are no different. Learn them. Use them. Sometimes your data is just (better, together).

Until next time ✌️.

[1]: http://searchsoa.techtarget.com/definition/LISP
[2]: http://searchenterpriselinux.techtarget.com/definition/Python
[3]: https://cdn-images-1.medium.com/max/2000/1*8U0TIdYofOBTth16Haay2Q.png
