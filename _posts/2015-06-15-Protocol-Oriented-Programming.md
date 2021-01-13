---
layout: post
tags: ["Swift"]
title: "Protocol Oriented Programming"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "The infamous WWDC session introduced us to 'Protocol Oriented Programming'. Really, though - what is it?"
image: /assets/images/logo.png
---
Managing complexities. At its heart, that's what makes programming extremely difficult.

More complexity == More Bugs.

The art of development is inherently complex. And now we've Swift 2.0, which _really_ wants to help engineers minimize complexities in codebases the world over. And, thankfully, it can.

Meet Swift 2.0. Our profession's first protocol-oriented programming language[^1].

### Section 1: In which we ask: What?

Apple has decreed that Swift is primarily a Protocol Oriented language. In truth, it's really a mix of object oriented programming, functional programming, and now protocol oriented programming. Which begs the question:

_What does it mean to be protocol oriented?_

As best as I can tell, it boils down to allowing protocols to be extended. As the paradigm matures, a clearer definition of what it means to be protocol oriented will, too.

Much like polymorphism is to many programmers, it's easy to show it in practice but sometimes difficult to compose into words. Given that, let's refer to the Swift standard library. Much of it has been either initially written or refactored to work this way:
```swift
let ints = [1,2,3,4,5]

//Swift 1  
map(filter(ints, {$0 % 1 == 0}), {$0 + 1})

//Swift 2  
ints.map({$0 + 1}).filter({$0 % 1 == 0})
```
The second implementation is possible because of protocol extensions.

Extending classes is a common practice and power of modern programming. As developers, we learn this concept very early on in our education. Since day one, we've been able to provide default implementations and extend both structs and classes:
```swift
class foo  
{  
    func bar()  
    {  
        print("Calling bar")  
    }  
}

class box : foo {}

let aFoo = foo()  
let aBox = box()

aFoo.bar()  
aBox.bar()
```
Standard stuff for even the novice developer. Swift, however, extends this capability to protocols:
```swift
extension StringLiteralConvertible  
{  
    var caps:String  
    {  
        return self.description.capitalizedString  
    }  
}

let t = "the traveled cocoa touch developer's guide"

//The Traveled Cocoa Touch Developer's Guide  
print(t.description.caps)
```
### Section 2: In which we ask: Why?

Of the four pillars of Object Oriented Programming, none is more hotly contested in terms of implementation than inheritance. Abstraction, polymorphism, and encapsulation all have clearly defined use cases.

Yet, some developers will evangelize the power of inheritance for clarity. Others still will condemn such a pattern, citing the loss of single responsibility and the burden of ineffective refactoring.

No matter, why would one want to deal with protocols in lieu of classes? Per Apple itself — it's better abstraction. In addition, code becomes more efficient because protocol extensions allows for statically typed checks instead of doing so at runtime.

In essence, protocol extensions allow Swift developers to enhance an entire set of types without tweaking individual subclasses, structs, or enumerations. And, well, that's powerful. Code can become less complex.

And really, that's the end game. If we can foster code bases that are functional to begin with yet accessible to mutate — we've won.

### Section 3: In which we tie up loose ends.

This is a startling change, make no mistake. Developers are now encouraged to start adding functionality first with a protocol, and then move to classes only if need be. Given this new approach, how does one identify when to use a class?

When one desires implicit sharing _or_ the framework demands it.

### Wrapping Up

That's a short list. Swift is certainly implying that developers should use Swift as instructed. As Dave Abrahams put it:

* Protocols > Superclasses
* Protocol extensions = magic (almost)

Until next time ✌️.

[^1]: Find the associated playground "Crustacean" [here][1], as well as the [lecture][2].
[1]: https://developer.apple.com/sample-code/wwdc/2015/?q=
[2]: https://developer.apple.com/videos/wwdc/2015/?id=408
