---
layout: post
tags: ["Trivia"]
title: "WWDC 2021: The Pregame Quiz"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Apple has already shipped amazing things in the past month, so the floor is cleared. Let's gear up for a crazy dub dub with another official quiz!"
image: /assets/images/logo.png
---
And we're back! Another edition of the Swiftjective-C WWDC Pregame Quiz! While we wait to start round two of virtual dub dub, this year's quiz is coming at you fresh and ready. With so much shipped already from Cupertino & Friends©, it begs the question - _what are they clearing the keynote for?_

We'll know soon enough, but until then let's gear up with the **seventh** annual Swiftjective-C WWDC Pregame Quiz!

If you'd like a quick primer on how this all works or how it got started, check out the first six quizzes from [2015][1] ,[2016][2], [2017][3] ,[2018][4], [2019][5] and [2020][6].

```swift
let quizSub = quiz(publisherFor: .dubDubTwentyTwentyOne)
.sink { questions in 
   print("Lets do it! Here are the questions: \(questions)")
}
.store(in &subs)
```

### Ground Rules

There are three rounds, and the point break down is as follows:

* **Round 1** – 1 point each answer
* **Round 2** - 2 points each answer
* **Round 3** - 3 points each answer

The last question of each round is an optional wildcard question. Get it right, and your team gets **4** **points**, _but_ miss it and the team will be **deducted 2 points**.

### Round 1 - A History Lesson: The First iPhone 📱

**Question 1:** <br /> 
While the first iPhone was still a mystery to the rest of the world, even to those inside Apple, what was the codename it was known under internally at Apple?

**Question 2:** <br /> 
The iPhone actually _wasn't_ the first mobile phone to have iTunes on it. In fact, Apple collaborated another cell manufacturer to develop the ROKR E1, which had iTunes but was limited to 100 songs. Which carrier was it? 

**Question 3:** <br />
Before we had an official SDK for iPhoneOS, Jobs infamously promoted the use of web apps as a means to getting third party applications on the iPhone. What was the name of one of the very first of these apps (which was a shopping list)?

**Question 4:** <br />
A fellow named Michael Kovatch held a very important domain name that Apple needed for launch, and they eventually paid him $1,000,000 for it.

What was the name of it?

**Wildcard:**  
The first month the iPhone was out in the wild wasn't without issue. Which famous Youtube personality received a 300 page bill that had to be shipped in a box detailing their month's charges?

### Round 2 — Erm..."Epic" Questions 🙊

**Question 1:** <br />
During Fortnite's first two years on the App Store, Epic and Apple were enjoying a symbiotic relationship wherein Apple spent $1,000,000 of its own money to market the game.

How much money did Apple make from its App Store cut on Fortnite during these first two years?

**Question 2:**<br /> 
The age old discussion of whether or not to let App Stores within the App Store, like Microsoft's Project xCloud service, has been renewed with Apple vs Epic. 

Which highly prominent game changed their branding to reflect that its developers build "in game experiences" instead of games during the trial to avoid being labeled as an App Store within the App Store?

**Question 3:**<br />
In internal discussions regarding bringing iMessage to Android, Phill Schiller analogized the situation by mentioning another one of Apple's own marquee applications "lost on Windows because it wasn't a great Windows (redacted)...didn't innovate enough...spent $0 marketing...shipped one update a year".

Which application, still around today, was he talking about?

**Question 4:** <br />
Contrary to popular believe, macOS isn't immune to malware. In fact, there was malware which infected around 2,500 apps and 128 million customers that led to SourceDNA getting acquired by Apple. 

Which malware was it?

**Wildcard:**<br />
While Apple makes handsome margins on the App Store, which gaming console was revealed to have never turned a profit on hardware during the trial?

### Round 3 — Pour One Out for Forstall 🍻

**Question 1:** <br />
While developing the initial iPhone, Steve was given the choice of either "shrinking down the mac or enlarging the iPod" and two teams competed to win the iPhone using their approach. Forstall went the "shrink down the mac" route - who did he compete against that took the iPod route?

**Question 2:** <br />
Forstall argued to Phill Schiller that they should let Yahoo! include which API of theirs on iPhone in the early days, and that by doing so Apple would "take the high ground and compete"?

**Question 3:** <br />
Apple released a public apology over the launch of a premiere application alongside iOS 6 that was considered buggy and inaccurate. It's rumored that Forstall refused to sign the letter - which app was the letter apologizing for?

**Question 4:** <br />
A man of many talents, Forstall also has design chops in addition to software engineering skills. Which Mac user interface, whose success led to him being promoted to SVP in 2003, was he primarily in charge of?

**Wildcard:** <br />
Though he laid low after his departure from Apple, years later he took up another interest. What type of "product" did he become a co-producer of?

### Answer Key
<b>Round 1:</b>
1. Purple
2. Motorola. Also, Steve Jobs loathed the end product, which in part led to the iPhone.
3. Good ol' OneTrip - which you can still use [here!][12]
4. iphone.com
5. Wildcard: [iJustine][13]

<b>Round 2:</b>
1. [One HUNDRED million dollars][14]
2. [Roblox][8]
3. [Safari][9]
4. [XcodeGhost][10]
5. Wildcard: [Xbox][11]

<b>Round 3:</b>
1. Tony Fadell
2. [Yahoo!'s Widget Engine][7]
3. Maps
4. The Aqua User Interface, known for translucent icons and water-themed visual cues.
5. Wildcard: He does Broadway Plays! He co-produced Fun Home.

[1]: {{ site.url | append:"/WWDC-2015-The-Pregame-Quiz" }}
[2]: {{ site.url | append:"/WWDC-2016-The-Pregame-Quiz" }}
[3]: {{ site.url | append:"/WWDC-2017-The-Pregame-Quiz" }}
[4]: {{ site.url | append:"/WWDC-2018-The-Pregame-Quiz" }}
[5]: {{ site.url | append:"/WWDC-2019-The-Pregame-Quiz" }}
[6]: {{ site.url | append:"/WWDC-2020-The-Pregame-Quiz" }}
[7]: https://twitter.com/stroughtonsmith/status/1390804203900182530/photo/1
[8]: https://9to5mac.com/2021/05/15/after-being-put-in-the-middle-of-the-epic-vs-apple-case-roblox-says-its-developers-make-experiences-not-games/
[9]: https://twitter.com/PatrickMcGee_/status/1389632382244847623?s=20
[10]: https://en.wikipedia.org/wiki/XcodeGhost
[11]: https://www.businessinsider.com/apple-fortnite-epic-games-lawsuit-secrets-revealed-2021-5
[12]: https://mrgan.com/onetrip/apps/desktop.php?onetrip
[13]: https://en.wikipedia.org/wiki/300-page_iPhone_bill
[14]: https://www.cbsnews.com/news/epic-apple-lawsuit-what-we-learned/