---
layout: post
tags: ["The Indie Dev Diaries"]
title: "The Big Update"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Spend Stack just recently wrapped up its first big update. Turns out, they are critical to paid up front apps."
image: /assets/images/logo.png
---

Part of living life as the proud owner of a P.U.F. (paid up front) app is the reality of the bell curve. You've seen this if you've looked at anyone's numbers who makes these kinds of apps. It's a product cycle of ups and downs.

Regardless of your pricing scheme, you likely live life on a bell curve too. But with P.U.F. apps, that cycle is somewhat exacerbated. As such, you live **with** the dog days of trickle-in downloads and live **for** the big breaks that come when sales sky rocket.

A lot was riding on Spend Stack's 1.2 update. Thankfully, it went well and topped the charts in several countries in the Finance category. Let's dig in!

### The Result
If you follow me on Twitter, you already have an idea of how things went sales wise:

{% twitter https://twitter.com/JordanMorgan10/status/1269629494052237316?s=20 %}

I have acquired a large chunk of my revenue from this update alone. It's like a launch in several ways, in that you get the initial spike and then ride the wave down. The thing I was most interested in, though, was what kind of numbers I'd need for this to happen:

{% include lazyLoadImage.html image="../assets/images/chartIpad.png" %}

{% include prettyBlockquote.html text="Also recall that charting on the iPad and iPhone are different. It also charted #1 on the iPhone in several countries (U.S. included) but the landscape screenshot of the iPad looked nicer ✨." %}

I've long wondered what kind of numbers I'd need to chart #1 in Finance, and I seemingly got my answer around mid-afternoon on May 25th. It was just a bit short of a 1,000 downloads. Though, the next day I saw almost half of those numbers at 500 and change and still remained atop the list. By the third day I bumped down, oscillating between #3-#7 at 300ish downloads.

So, what did it? Was it solely the update? 

No - it was absolutely all because of the press. I finally have corrected the biggest mistake I pointed out regarding my [launch][1].

### Timeline
I kind of happened upon this big update. I started by rewriting some of the core parts of the app in Swift. Beforehand, Spend Stack was previously all Objective-C, a symptom of starting it so many years ago when Swift was still the wild west and changed how it split strings every other Tuesday.

Then, Apple announced the support for exporting Apple Card statements. So I hopped on that. Meanwhile, I was already adding multiple currencies. So I'm doing this - and then I check my inbox and see another pile of emails asking for recurring pricing. "Screw it", I say, "You're already in neck deep - what's another feature at this point?"

This is what the thinkpieces on Medium tell you _not_ to do. 

Luckily, I never read those. And mostly because I can't due to the 48 modals they show as soon as you load an article. But I'm glad I took my time, because moving to Swift has paid off in many ways. I've tweeted here and there about some of the things it opened up:

**SwiftUI for modal popups**<br />

{% twitter https://twitter.com/JordanMorgan10/status/1252292541720014848?s=20 %}

**Combine for, like, everything**<br />

{% twitter https://twitter.com/JordanMorgan10/status/1220514774880071680?s=20 %}

But putting the tech discussion aside, I eventually came up with a plan for all of the work I was doing. I figured since I was already investing a lot of time into this update, I should shoot for my ideal press timeline. The magic number for me and large updates?

**Six weeks**, just like Apple asks for.

Once the beta was feature completed, I decided that I would at the same time:

- Open a public beta and,
- Reach out to the press and Apple on that same day.

I used Things 3 to keep it all on track:

{% include lazyLoadImage.html image="../assets/images/thingsUpdate.png" %}

Essentially the flow was something like this:

- Get development done.
- Get blog posts and marketing assets finished.
- Announce a beta.
- Reach out to the press (as mentioned above).
- Experiment with some form of paid advertising.

In the end it worked out as good as it could've. [MacStories][3], [Unwind][4], [9to5 Mac][2], [MacRumors][5] and a few others  covered it. Then, Thursday came around Apple featured it (where it still is today):

{% include lazyLoadImage.html image="../assets/images/featureIphone.png" %}

That last point about experimenting with paid advertising is another blog post, and an important one as I think a lot indies simply overlook it. But I'll sum up what I've experienced so far:

- Twitter: Boosting posts is worthless.
- Twitter: Setting up a real campaign had a good R.O.I.
- Reddit: Extremely hit and miss.

But this all firms up what I've always known: If you want the numbers, you need the press. The man at the top of the mountain didn't fall there, he had press that rocket launched him to the top[^1].

You might think this bit of the post is entirely frustrating. I get it, of course press helps. You don't need an MBA to figure that out.

But know this - I've launched things with zero press, zero returned emails, zero retweets or likes and zero downloads. It takes time and relationship building. In a way, I feel like I'm in a good spot to talk about it because I've lived on both sides of the fence. It's quite a topic, and I may or may not be writing a book on the side dealing with things like this 🤫.

### Beta
Running a beta was such a great experience, it only made me feel remorse that I hadn't done it in the first place. If anything, this release gave me a case of the what-ifs:

- What _if_ I had reached the press correctly on my initial launch?
- What _if_ I had done a public beta first before launching?
- What _if_ I experimented with advertising long ago?

Ah, but hindsight bats 1.000. After all, experience is what you need long after you finally have it. But I've got lessons to take forward from here. 

All told, the beta capped at 615 users. My goal was 500, and for a three week period, that was something I was happy with. I learned a lot about how people think about the app and how they use it. The conversations I had with users is directing where I'm taking things next.

I think for whenever I make another app, the process will look like this:

- Work on the app, define a lean MVP.
- Update everyone in a thread (S.T.S. did this masterfully with [Pastel][7]).
- Beta it when it's beta-able.
- Follow my 6 week timeline again.
 
### Backwards Momentum
Perhaps you're already aware of Spend Stack's history. Or, maybe you just stumbled in here. As I hinted at above, events leading up to chart toppin' was a very long, winding, complicated and grating road. 

It took five years to get here!

I've worked on Spend Stack for a long time. In fact, I had previously released a version of it in 2012 which flopped gloriously:

{% twitter https://twitter.com/JordanMorgan10/status/1265663472425205762?s=20 %}

Look, I'm not out in the streets in a Lamborghini wearing rock star shades bumping my beats while the money pours in wearing a shirt that says "I MAD$ IT". But, I'm also _not_ putting out something that gets no traction and that's not by accident.

What we do often overlook is that any form of success takes time. People want to be some incarnation of an indie, but rarely face the reality of having to work on your product for five years before you hit momentum. 

This goes against almost all of the product advice you hear on the Internet. If your thing doesn't work, you need to give up on the thing, right?

But why? 

Well, I think it's because almost all of those texts deal with software as a service, and most of the time our projects in the indie space don’t fit into that mold. We don't have V.C.'s to report to, a board wanting results or really any stakeholders needing returns. We get to do our own thing, and that's what's so thrilling about the App Store to me. 

We're quick to say the gold rush is over, and that may be true - but the fun of it all sure isn't.

So, we can’t look for advice in the same exact ways, but we can take some of the good bits of their thoughts and apply it. The App Store economics are not the same as other storefronts. It's really a matter of building something quality and tweaking it as you go. After all, Spend Stack started out as a grocery list app. It _can_ be used for that still, but that's no longer its identity. Also, it has a lot less pink 🙈.

### Invaluable Insight
The amount I've learned about what people think Spend Stack is, what they use it for and what they _want_ to use it for has been the best part of this. If I want to take it to the next level, I've got a lot of validated data points that light the path I would need to take.

We make these apps to solve our own problems, and when we sell them it's easy to forget that you are now being paid to solve everyone else's, too. That's not to say you should follow each thread you get and run with it - but you should definitely listen.

Learning about how to do the product thing is new to me, but I'm starting to get the ropes. Spend Stack is a budgeting and expense tracking app, and I'll be leaning into that more and more. 

The biggest thing for me right now is to make it clear about the value proposition Spend Stack brings, show people how to use it and make sure I cut down on misplaced expectations.

### Some Random Takeaways
To round things out, here's some other random thoughts:

- Praise be, Apple finally used my promo art! #TookAlmostAYear
- Visibility/ASO wins, crappy apps can and will blow you out of the water sales wise if they've been out for years and rank high.
- It takes time - this is truly a marathon.
- If you're not building relationships with the press, you should have started yesterday.
- And if you do reach out, give them plenty of time. They need to use your app, form thoughts and then write over it. It takes a lot, and they were already doing a lot when you emailed them.
- Am I happy going P.U.F.? I think so, but there's no question Spend Stack would be a few orders of magnitude larger if I hadn't. But so would the time commitment, and I quite like my day job that sends me to WWDC and around the world for free, has flexible hours, fun problems and good pay. So, if I can do both - then why not?

Lastly, as mentioned in the lead, livin' that P.U.F. life takes you a bell curve product cycle. I also noted a few of the "ups" that I've had so far in the first ten months:

{% twitter https://twitter.com/JordanMorgan10/status/1269647593614827525?s=20 %}


### Final Thoughts
I've been lucky to have some exciting releases and features with Spend Stack so far in its first 10 months on the  market. There's been so much learning taking place. The App Store is a fickle beast, ever changing its inner workings on how features work, the search algorithm ranks or apps are shown on a whim. Selling on such a store front is a bit like building a house whose core ideas remain the same, but the foundation keeps changing out from under you half way through construction.

No matter - I hope more than anything this just demonstrates that getting downloads on the App Store is factor of a few core things that you absolutely can work towards as mentioned above. You truly get to make your own luck. One day you make enough to cover a latte, the next week you make enough to buy everyone a steak dinner. Woot woot!

Until next time ✌️.

[^1]:The other sales bump I had this year was when Andy made Spend Stack his Pick of the Week on [Macbreak][8].

[1]: {{ site.url | append:"/On-Launching-Your-Indie-App"}}
[2]: https://9to5mac.com/2020/05/25/spend-stack-apple-card-more/
[3]: https://www.macstories.net/reviews/spend-stack-adds-apple-card-import-recurring-costs-per-list-currencies-ipad-improvements-and-more/
[4]: https://podcasts.apple.com/us/podcast/macstories-perspective-icons-big-spend-stack-update/id1510451759?i=1000476190744
[5]: https://forums.macrumors.com/threads/app-recap-magnet-parcel-unfold-and-major-app-updates.2239187/
[6]: https://www.melamorsicata.it/2020/06/09/spend-stack-lapp-per-tracciare-le-spese-che-si-sincronizza-con-apple-card/
[7]: https://twitter.com/stroughtonsmith/status/1270405385816625152?s=20
[8]: https://twit.tv/shows/macbreak-weekly/episodes/702?autostart=false

