---
layout: post
tags: ["The Indie Dev Diaries"]
title: "Creating a Retail Demo for Apple"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Spend Stack was selected by Apple to be included as a retail demo on iPhones & iPads across the globe. Here's what the process was like."
image: /assets/images/logo.png
---

Through luck, determination and whatever other stereotypical noble quality you can conjure up, Apple selected [Spend Stack][1] to take part in their retail demo program. 

Yay! Right!? Just look at it!

{% include lazyLoadImage.html image="../assets/images/demoStore.jpeg" %}

Well, yes. Of course yes! 

But, if you hit the Googles for past experiences with this, you'll find quite a lot of tumbleweeds. This makes sense, because if you happen to scan the apps that are on retail iPhones and iPads at your local Best Buy, Apple Store, etc. - they tend to be apps that hail from Big Corp©. And rightfully so, they all are quality, well made apps with the team and budget to match.

Though, the everyman doesn't often appear there. And if they do, it typically tends to be in the form of a game. So today, I figured I'd spend this indie dev diary chronicling my experience with getting Spend Stack on iPhones and iPads across America 🇺🇸. Think of it as Spend Stack's official road tour 🚌.

Or, maybe more than America. I'm not really sure? I'll get into that later, as we'll see.

### The Reach Out
During some Saturday in December when I was hacking away at Spend Stack at local coffee shop, I noticed an email that stuck out. Its subject line spoke about an incredible marketing opportunity.

I thought it was spam 😅!

Thankfully, I took a closer look and saw the sender had a bonafide Apple domain. The message was simple enough. Someone from developer relations introduced themselves and laid out how the process works.

From there, you just dive into the ~15 page .pdf file they give you to point out the finer details. I will say, this guide was incredibly helpful. It had step-by-step pictures with call out glyphs to ensure you were getting logistical things done correctly (especially helpful when you get into the upload part of the process).

### The Prep
With my requirements in hand, I got to work! Luckily, this occurred over my Christmas break, where I am fortunate enough to take about three weeks off each year. I had quite a large update to Spend Stack planned for this time (which I'm in the middle of now) but the opportunity cost was worth the trade.

If you've spent any number of minutes with these demo apps at stores, you kind of know what to expect. A splash screen saying that's it a demo, pre-populated data and some features that are either taken out or gated by an alert controller saying it's unavailable.

In Spend Stack, all of this was easy enough. Instead of going through my designs and taking things out, I opted to keep them in so users would be aware they existed. I'd rather they hit a "You can't do this in the demo" alert than be none-the-wiser to some pretty great features that are core to Spend Stack (i.e. iCloud sharing and collaborating for lists).

The splash screen was quick to whip up - I originally was using the one I have shipped now, but it was easier to rip it out to make a more "to the point" variation:

{% include lazyLoadImage.html image="../assets/images/compareSplash.png" %}

If anything, I probably would've taken out the "Continue" button, as I noticed quite a few apps don't even use one.

### The Problems
I hit some issues along the way, though. The first and most challenging was around how I chose to tackle demo data. I need quite a bit of it. I wrote a list of lists (meta!) that I wanted to include to best showcase all of the things you can do with Spend Stack. I ended up with a solid line up, and each one was filled with relevant items, images, notes and more:

{% include lazyLoadImage.html image="../assets/images/listLists.png" %}

The issue was, I created these all in code for my first go around. And, well - it took about 5 seconds to create the database, drop existing data and populate these on the fly. That's a non-starter, obviously, as nobody except my Mom and (maybe) my wife would wait around for that. And even then, it would only be out of love 😅. 

I tried to turn some tricks with concurrency, but as is so often the case with programming - I stepped away from it and arrived at an answer. The epiphany came, and the solution was dead simple: simply ship the retail demo with a database. Spend Stack uses raw SQLite for data, and once I used the app and had a good set of dummy lists to work with - I simply found it within the file system on my mac and included it as part of the Xcode project. 

It booted lightning fast - done and done:

```swift
+ (NSString *)databaseFilePath
{
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSArray *directories = [fileManager URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask];
    NSString *documentPath = [directories.firstObject URLByAppendingPathComponent:@"spendStack.db"].path;
    
    return documentPath;
}
```

The other hiccup has to do with multiple spaces on iPadOS. When you ship these retail apps, you've got to wipe any data entered on them when the user is "done" with them. Done is quite ambiguous, and there's no concrete "when" defined. So, when a user backgrounds Spend Stack I reset everything:

```swift
- (void)sceneDidEnterBackground:(UIScene *)scene
{
    [self initateSelfDestructSequence];
}
```

The only fun thing is that when you open a new window, iOS also calls the same delegate method while the window is being setup. You can see this quite easily, and it makes sense I guess - iOS puts up that blurry view while another window slides in. So, I've got some jank there that I won't share publicly to help avoid any deleterious state bugs 😅 (spoiler, it's _totally_ not a simple GCD delay, no way).

Aside from that - uploading it App Store Connect gave me some fits. Try to hide your surprise 😜. It's a bit of a different flow, but again - the .pdf guide they give you really helped out here.

### The Uncertainty 
Once it was uploaded, all that was left to do was wait. I didn't really get much information on when and where it would be. Was this like App Store promo art, where you supply it and it might be lost to the dark ether of the App Store editorial team (still waiting for mine to be used 🤞😭🙃) or show up next week? I had no idea, so I figured I'd just point blank ask them.

The response?

An email telling me to gate one more feature with an alert 🤣. But, I guess that did mean they were going to use it! Shoot your shot, right?

Getting responses was a little difficult to be honest, and in some ways frustrating, because to smaller indies like me - this is a **big** deal! This is getting Apple's stamp of approval for your app! It's marketing! Validation! The list goes on. I wanted to know I was doing everything they needed.

Look, there could be a million reasons for why things work the way they do on the App Store and these kind of things. It could be out of certain individual's control. It's always easy to bemoan X or Y on the outside. 

I do know this - the rep I worked with was always kind when I chatted with them, and we cracked a few jokes back and forth. Plus, each person I've meet at W.W.D.C. on the App Store team was delightful, and the labs with them were a highlight. It feels like the key here is like anything else, you just need to build relationships to get things moving and I'm still working on that with the App Store folks.

All that to say - the reason for this tweet was half because I wanted to share the news with my fellows devs, and half because I wanted to get the word out:

{% twitter https://twitter.com/JordanMorgan10/status/1224478409423716353 %}

If someone saw Spend Stack at the stores, maybe they would tell me and that would be how I found out it released. Thankfully, that wasn't necessary.

Why? Because I straight up walked into Best Buy a few times a week to check (there's no Apple Store by me, unfortunately). And, well - one day it was there!

### The Payoff
There is nothing quite like walking into a brick and mortar store and seeing your own app sitting there on an iPhone. It really is one of those career moments that I'll never forget. As someone who tends to be extremely critical of their work and a slight perfectionist, I find that being "proud" or feeling "finished" is always _just_ another milestone away. 

But as my wife noted, when I walked in there and saw it - I was unmistakably proud and fulfilled. She said my face lit up, and she caught some convert, candid pics to prove it:

{% include lazyLoadImage.html image="../assets/images/proud.jpg" %}

It was a lot of fun chatting it up with the Best Buy employees too:

>Best Buy Person: Hey! Any questions about that iPhone?<br />
 Me: No, but dude - my app is on here!<br />
 Best Buy Person: Wait, what? Which one?<br />
 Me: This one!<br />
 Best Buy Person: No way! How? When? So many questions!

They all were genuinely interested, and who knows - maybe I inadvertently created the first Spend Stack sales team 😎. On our way out, my wife and I decided to take a picture to commemorate the occasion. A kind gentleman walking by offered to take it for us:

{% include lazyLoadImage.html image="../assets/images/wifeyCakes.jpg" %}

Why is that funny? Well, we're obviously very happy in that picture. So another couple walking by asked, with a beaming expression:

**Them:** Oh my goodness, did you all just get engaged!?<br />
**Me:** No, but Spend Stack got selected as a retail demo on the iPhones...<br />

They cut me off, looked at me weird and walked away confused before I could finish. We still laugh about that 😜.

### Other Random Insights

* I've noticed that there are about 3-4 different retail demo "line ups".
* ...though some are very similar. For example, Spend Stack and Lifesum are mutually exclusive. They show up in the same spot (3rd page, 3rd row, 1st item I think) and if one is there, the other won't be. 
* Most employees didn't recall when their retail demo line up refreshed. It appears to be an over the air thing, which makes sense.
* The timeline from start to finish was about two and a half months.
* If it's not already obvious from the article, you don't apply for the retail demo - Apple proactively reaches out to you.
* Sales wise it's been a huge help, as Spend Stack tends to consistently chart since its retail demo release. Before, it tends to dip in and out throughout the month.
* I go fairly in-depth on all of this, and talk about how my [Best in Class][4] ideals may have helped Spend Stack get selected on an episode of [Launched.fm][5].
* Lastly, here's a [Reddit][6] post on `r/Apple` where I chat about it some more while answering some questions others had.


### Final Thoughts
You never know where our little creations will end up. While you toil away night after late night, it's too easy to end up in that phase of doubt:

- "Will this even matter at all?"
- "Will it get a few downloads on launch and meekly wither away?" 

I'm telling you, I've been there. And I have a season pass too, apparently. I revisit that space probably a little too often. You start to look at other apps and their success thinking that your own are always just a day late and a dollar short.

But hey! **Sometimes you get the win!** And when you do, be sure to stop and enjoy it. You never what's around the corner, who's paying attention to your app or when you'll get a random email in December from Apple asking you to put your creation on thousands of iPhones with other carefully curated apps hand picked by them.

So keep on truckin' on that next great app 💪!

Until next time ✌️.

[1]: https://www.spendstack.com
[2]: https://www.reddit.com/r/apple/comments/f7ugww/apple_selected_my_app_spend_stack_to_be_in_its/
[3]: https://podcasts.apple.com/us/podcast/launched/id1491582246?i=1000466713037
[4]: {{ site.url | append:"/A-Best-in-Class-App"}}
[5]: https://podcasts.apple.com/us/podcast/launched/id1491582246#episodeGuid=47cc2b57-c99a-4ced-8609-74270d651bb9
[6]: https://www.reddit.com/r/apple/comments/f7ugww/apple_selected_my_app_spend_stack_to_be_in_its/?utm_source=share&utm_medium=i
