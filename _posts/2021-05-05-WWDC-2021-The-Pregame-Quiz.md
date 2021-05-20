---
layout: post
tags: ["Trivia"]
title: "WWDC 2021: The Pregame Quiz"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "UPDATE ME"
image: /assets/images/logo.png
---
CHANGE DATE

The very first virtual dub dub is coming in hot one week from today! Will we get a juiced up version of Catalyst, a shot of stability to SwiftUI or will UIKit dark horse the whole show and get a mountain of new goodies?

We'll know soon in seven days, but until then let's gear up with the sixth annual Swiftjective-C WWDC Pregame Quiz!

If you'd like a quick primer on how this all works or how it got started, check out the first five quizzes from [2015][1] ,[2016][2], [2017][3] ,[2018][4], [2019][5] and [2020][6].

```swift
Now {
   Lets()
      .start()
}
```

### Ground Rules

There are three rounds, and the point break down is as follows:

* **Round 1** – 1 point each answer
* **Round 2** - 2 points each answer
* **Round 3** - 3 points each answer

The last question of each round is an optional wildcard question. Get it right, and your team gets **4** **points**, _but_ miss it and the team will be **deducted 2 points**.

### Round 1 — Xcode Xtras

**Question 1:**  
Our defacto I.D.E. for Apple development shipped its 1.0 release in fall 2003. What previous I.D.E. was it initially based on, developed by NeXT?

**Question 2:**  
We all savor the utility of Xcode's debugging back end, LLDB - but we didn't always have it. Starting with Xcode 5.0, LLDB took over as the primary debugging back end over which previous technology?

**Question 3:**  
Believe it or not, Xcode used to be a paid download. It wasn't until after 4.1 it was made free - what was its last sticker price before doing so?

**Question 4:** <br />
Let's go more recent. Which major version of Xcode was the first to be released with support for Swift - 4, 5, 6 or 7?

**Wildcard:**  
Swift Playgrounds was initially launched integrated into Xcode, but later took on its own life on iPadOS. Aimed at teaching newcomers code through fun, colorful tutorials based around controlling playful monsters on an island - what were the names of the three monsters included in the initial lessons?

### Round 2 — SwiftUI Stumpers

**Question 1:**  
One of SwiftUI's main draws is the live previewing canvas, ever updating as we type. As we make edits, Xcode compiles the SwiftUI `View` exclusively from the rest of the project. 

When it does, it injects the new implementation back into the running application using what Swift language feature?

**Question 2:**  
At first glance, one might assume SwiftUI's `View` type accepts variadic generics within its `Viewuilder` implementation:

```swift
var body: some View {
    HStack {
        Text("Sup")
        Text("Hi")
    }
}

var body: some View {
    VStack {
        Text("Sup")
        Text("Hi")
        Text("Yo")
    }
}
```

But it's actually powered via extensions, with how many different `buildBlock` implementations allowing up to X views to be included?

**Question 3:**  
SwiftUI was said to be called Amber internally at Apple, but to obfuscate it within the O.S. they put it under a framework named what?

**Question 4:** <br />
SwiftUI simply wouldn't be possible without Swift 5.1's feature set. What four core pieces of API added in that release make SwiftUI syntax like this possible?

```swift
var body: some View {
    Text("Hello World")
}
```

**Wildcard:**  
SwiftUI uses bindings and state property wrappers liberally to control tree diffs and UI updates. A common data type to represent progress is either a Double or Float.

If you were to write:

```swift
@State private var progress = 1.2
```

What the Swift compiler default this type to - a Double or a Float?

### Round 3 — Dub Dub Venues and History

**Question 1:**  
The first WWDC took place in Santa Clara in what year?

**Question 2:**  
Dub Dub has been officially held in three different locations, all starting with "San" - can you name them all?

**Question 3:**  
Which of these bands _hasn't_ performed at a WWDC bash?

**A:** The Barenaked Ladies<br />
**B:** Good Charlotte<br />
**C:** Fall Out Boy<br />
**D:** Paramore<br />

**Question 4:** <br />
At WWDC 2008, what product was announced that has since been labeled by Yahoo! News as "one of the biggest PR disasters in Apple history" and was officially discontinued in 2012?

**Wildcard:**  
Paper badges were the norm for WWDC badges for much of its history. Can you name the year they finally made the switch to plastic badges for the first time?

### Answer Key
<b>Round 1:</b>
1. [Project Builder, or PBX][6]
2. [The GNU Debugger, or GDB][7]
3. [$4.99. Not bad for an entire development suite.][8]
4. 6.0
5. Wildcard: Byte, Blue and Hopper!

<b>Round 2:</b>
1. [Dynamic Method Replacement][9]
2. [10][10]
3. [TimerSupport][11]
4. Function Builders, Opaque Return Types, Implicit Return Statements and Property Wrappers. I wrote about this [here][12].
5. Wildcard: A Double.

<b>Round 3:</b>
1. 1987, making dub dub a good 33 years old.
2. Santa Clara, San Francisco and San Jose.
3. D, Paramore.
4. MobileMe
5. Wildcard: 2009

[1]: {{ site.url | append:"/WWDC-2015-The-Pregame-Quiz" }}
[2]: {{ site.url | append:"/WWDC-2016-The-Pregame-Quiz" }}
[3]: {{ site.url | append:"/WWDC-2017-The-Pregame-Quiz" }}
[4]: {{ site.url | append:"/WWDC-2018-The-Pregame-Quiz" }}
[5]: {{ site.url | append:"/WWDC-2019-The-Pregame-Quiz" }}
[6]: {{ site.url | append:"/WWDC-2020-The-Pregame-Quiz" }}
 