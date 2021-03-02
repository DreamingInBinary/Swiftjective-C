---
layout: post
tags: ["The Indie Dev Diaries"]
title: "Things I Made That Sucked"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "We don't all hit homeruns on the first go around. Today, I celebrate the misses."
image: /assets/images/logo.png
---

We live in an industry that celebrates and demands success. From posts that proudly show metrics that are up and to the right, to App Store feature tweets - we love to see others hitting on their current ventures. And why not? It's fun! I love it too and I've shared my own homeruns plenty of times.

But have you noticed that most of the "open startups" are the ones who've already found market validation or are on a hot streak? I admit - it's a lot more fun to share when the getting is good as opposed to when you wake up to zero downloads.

Everyone has started from the bottom though, so today I'd like to take a second and showcase some of the worst things I've made from early on in my career that: 

- Made no money
- Won over zero users and 
- Whose only fans and reviews were from my immediate family (thanks for that 5 star review Mom!)

### Christmas Lister
Ah, Christmas Lister. I got the idea to make a Christmas List app on November 15th. It shipped sometime shortly after. This was my first memory of pulling an all nighter on a project.

Just check out that icon:

{% include lazyLoadImage.html image="../assets/images/tts_xmasLister.png" altText="Christmas Lister App Store Listing" %}

At the height of skeuomorphism, green developers such as myself wielded Photoshop with might and glory. As I browsed the websites with free .pdfs and stuffed them into my interface, my thirst for more leather bound table views was matched only by my desire for more Christmas Joy to be plastered throughout the app[^2].

{% include lazyLoadImage.html image="../assets/images/tts_xmasLister1.png" altText="Christmas Lister App Store Listing" %}

And I remember this one as clear as day. I rushed to my iMac the day after release and saw the sales numbers:

1.

As in O-N-E! Later that day, I found out it was my manager's daughter at the Steakhouse I was a server at: 

> My daughter made me buy your crappy app. 
- My old manager, circa early 2010s 

In retrospect, he was right on the nose.

{% include prettyBlockquote.html text="Fun fact, this was actually made inside a game engine. I still was just picking up coding at the time, and there was no support for any sort of array or general collection structure. That meant that each and every single slot to make a list with present ideas was hardcoded ahead of time (i.e. var list1present1, etc)." %}

**Main lessons learned:** User interfaces require so much thought and less .pdfs, ask yourself why you're doing what you're doing and channel your excitement into _less_ action and more thinking before you fire away.

### Spend Stack Version 1
My first stab at good ol' Spend Stack. Before it [became a success][1], it was a jumbled mess of hidden gestures to navigate, bright and contrasty colors and a nonsensical onboarding flow that had you flying through cartoon clouds (I still was high on those .pdfs from Christmas Lister):

{% include lazyLoadImage.html image="../assets/images/tts_ss1.png" altText="Spend Stack V1 UI" %}

At this point, I started to trade out my love of free vector graphics for open source projects on Github. If it looked cool, I threw it into my podfile. Never mind if the app needed it, _this thing makes freakin' blur views sooooooo trivial_[^1]!

I love this app. It clearly demonstrated the burden and the benefit of having an inexperienced dev executing on an actually good idea. I mean that gracefully too. Once you're past this phase, it's easy to become a kvetch about rookie mistakes. We're quick to forget that we made them too.

You don't go from this:

{% include lazyLoadImage.html image="../assets/images/tts_ss2.png" altText="Spend Stack V1 Lists View" %}

To this over overnight:

{% include lazyLoadImage.html image="../assets/images/tts_ss3.png" altText="Spend Stack V2 Features" %}

There are _six years_ between those images.

**Main lessons learned:** A great idea for an app can still result in crappy app, take time to learn about design and holy moses don't toss in an open source project just because it's shiny.

### Halo Timer
My best worst effort, by far. My hopes were riding high on this one - I had made some janky apps already, and this time  - I knew better!

To be fair, this one did have a watch extension, quick action short cuts and a user flow that was actually useable. Plus, that parallax effect with the UI on the visor was neat[^3]:

{% include lazyLoadImage.html image="../assets/images/tts_haloVisor.png" altText="The Halo Timer Visor" %}

So what went wrong here? Let's pop into multitasking right qui....oh, oh no! 

{% include lazyLoadImage.html image="../assets/images/tts_haloMulti.png" altText="The Halo Timer Multitasking on iOS" %}

Our proclivity to adhere to Master Chief's visor was both awesome and troublesome. Accessibility was near impossible, as was reframing the .pdf of the UI to other device sizes. Dynamic type just couldn't hang. 

But, what you can _see_ here is that I was learning. Let's not use any funky gestures to navigate, let's make it easy to at least get around using a standard `UIKit` control people know like table views. Progress:

{% include lazyLoadImage.html image="../assets/images/tts_haloUI.png" altText="Halo Timer UI" %}

**Main lessons learned:** Just because you now _know_ better doesn't mean you'll actually _make_ something better - but if you're here, you're soooooooo close to getting it!

### So.....what?
So why share all of, aside from the laughs? Is there some wise sage advice I'm inevitably about to drop?

I mean, I dunno? Here's what I found when writing this:

These projects meant everything to me at the time. I look back at these crash-and-burns and I remember being absolutely brimming with **passion** and pure, unfettered **excitement** as they came together. I mean, these are the projects that made me! I stayed up late, googled non-stop and thought about them all the time.

There's no way I'd be where I am today if I didn't dump hours into them. We tend to knock ourselves after launch and think "You know what, that failed. That didn't work."

When you're in it, it feels that way. May I suggest to you that we need to flip that line of thinking from:

"I failed"

to
 
"I made a freaking thing _from nothing_, I created this! It may not have worked, but I have 5,433 things to bring to my _next_ thing, and I also know more about this space I tried to launch in."

In short, you rocked it. Always remember that character is carved out rather than instantly created. Each of these misses can eventually add up to a win.

### Final Thoughts

When you make things that don't end up working, and you keep shipping things that don't sell you might put yourself in a dangerous spot without even realizing it. It becomes _fait accompli_ that even before you spin up your next Xcode project, it's just not gonna work. If that's you - keep pushing! You're close, and I promise you that.

I'm so thankful for the things I made that sucked, because without them I would not have made the things that didn't.

Until next time ✌️.

[1]: {{ site.url | append:"/a-new-home-for-spend-stack/" }}


[^1]: Lest we forget, in these days the easiest way to get a big blur view was to stick a giant `UIToolBar` in your view hierarchy.
[^2]: "This developer of this app needs to update it to work with your version of iOS". Yeah, I think you're gonna be waiting awhile for that one.
[^3]: Though, you can't see it in a screen recording. But each of the text labels had parallax on them, and it was actually a really fun gimmick.