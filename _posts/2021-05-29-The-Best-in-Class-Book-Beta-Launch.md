---
layout: post
tags: ["The Indie Dev Diaries"]
title: "The Best-in-Class Book Beta Launch"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "My first digital launch is in the books. How did the decision to go early access go?"
image: /assets/images/bicog.jpg
---

There's a saying in finances that people who aren't responsible with their earnings lose all of their money like this:

Little by little, and then all at once.

The [Best-in-Class iOS App: The Book][1] beta launch worked a lot like that, only in a good way. Make no mistake, I've been building to this launch for years. It was only because of a harmonious match of finding a passion project, which was validated, built up over a number of years by establishing trust within the community that led to the $30,000 launch earnings. After all, looking at this post and thinking that I spent a few months to write a beta copy of a book to get to that number is like watching the end of a movie and thinking you've got the whole experience.

To get here I... 

- Started writing a Medium blog back when Medium first launched
- Wrote tons of posts that nobody read
- Got lucky and had Chris Lattner (creator of the Swift language) share one of them
- Then went from 10 Twitter followers to a few more slowly
- Built a few apps that didn't take, but....
- Started learning how to build better ones and what it took to do that
- Kept writing and sharing about things I was learning
- Paid close attention to the apps who were doing amazing, and the talented devs behind them
- Made some friends in a great community, the iOS and indie scenes ❤️📱
- Then took five years to launch my own indie app 
- Built relationships in the press and learned how to market an app
- Got lucky with some Apple features and got selected [as an in-store demo app][5] 
- Then it was eventually [acquired][6]
- All the while, consistently shared tips over and over about what I love most about this industry (creating a best-in-class app) 
- And then decided to write a book about it!

So, long road. But that's how I got here.

What follows are few thoughts over the early access launch. I'll try to keep it short(ish), after all - I've got a book to write 😉. I'll kick off with the "how".

### The Ramp Up
I've already written about why I wanted to write the book, you can read that [here][2], but once I settled on the idea I had to figure out if people would actually want this. I've mentioned several times in the past on this very blog that I'm an avid proponent of charging for your work. That doesn't mean _all_ of your work, that doesn't mean _unrealistically_ charging for work - it means if you've found something that's valuable and you enjoy working on it, by all means make some money from it. Whether it's an app, book, course, or whatever else you can think of.

But it's all for naught if folks don't wanna pony up for it. So, how can you feel that out?

The best way to really do that, I've found, is to start a mailing list. To keep things lean, I didn't register a domain or anything, I just spun up a new page with my new bestie Tailwind CSS and hung it off of this site. It's still [there][3], though massively changed to really just point to the domain I have now (which I only bought after I validated things). The only call to action on the page was "Join Waitlist", which popped up a simple ConvertKit mailing list form.

{% include prettyBlockquote.html text="So, learned this the hard way. Sweet Moses, if you're gonna do this make sure you have an email address that matches the domain you register the mailing list form from. In my case, at the time, I had no Swiftjective-C email address. So, nearly all of my emails - even the double opt-in! - landed in spam. Now that I have an email address under this domain, it's like all my spam problems went away over night." %}

After I listed out the planned content (which also changed), I put out a tweet and waited to see what would happen:

{% twitter https://twitter.com/JordanMorgan10/status/1361707249366884354?s=20 %}

If you read my previous post, I'm retreading a bit here but bear with me. Sign ups started coming in, and I decided that my internal goal was 500. If I could get that many developers, designers, QA engineers or whoever interested in this, I'd do it. if it ended up being a desiccated list with no life, I'd thank myself for the time I saved not writing it and move forward.
When the dust settled, I ended up with over 1,500. This had several benefits beyond simple validation. It gave me something far more powerful, the one thing we all need when it comes to side hustles: motivation.

I was off after that. I took a month to plan out the book's content, and laid down some groundwork on how to tactfully share about it. Because I'm a nut, I made some Streaks goals to remind me:

{% include lazyLoadImage.html image="../assets/images/ealaunch_1.png" altText="Streaks App" %}

### The Prep
Fast forward a few months, and reality set in. WWDC was fast approaching, and any window for mindshare I could have before the Apple tidal wave would sweep over all of us was quickly fading. It was launch something now, or wait until after WWDC. Or, wait until everything was finished.

I quickly eliminated that last option, after taking years to ship Spend Stack, that wasn't something I wanted to do. But here I was, with another product that could take a year to make. All of these things led to the early access, "beta", launch. I've called it a beta because the book, as you can see if you visit the landing page, is closer to versioned software than a traditional book. One of its main draws is that I'll always update it alongside iOS, which means it'll have releases.

Regardless, to get this out I jotted down what I would need at a minimum:

- Finish the current chapter
- Proofread all that I had done
- Get together the downloadable package (the book in .mobi, .pdf. ePub, welcome .pdf, Xcode project, and community info)
- Figure out how to sell it
- Get a landing page up
- Launch it

I could, and probably will, write a whole entire post over the landing page - it's something I think is absolutely critical for these kinds of things, but for now I'll just mention the payments part. I landed on Gumroad, which is hilarous because it was something I initially decided I _wouldn't_ use because I couldn't control the look of the checkout page. 

I burned what was essentially a "full day" of my indie dev time evaluating seemingly every option out there. Even just last week, Stripe launched their "payments URL" which I looked at. That payments page - such eye candy! No surprise if you've checked out their documentation pages. If they can make _that_ pretty, it's not surprising their main product offering looks nice. Plus, it has Apple Pay, my preferred payment method.

But, to be honest, I feel like I'm the only developer this side of the Mississippi who doesn't understand Stripe. I only wanted to use it to offer a way to download digital goods, and I couldn't come to grips with it quickly. It makes sense why I couldn't, taking a step back. Stripe just cares about providing a way to pay for things, not really fulfillment. I moved on, with my launch window closing, to Shopify. It was pretty but a bit pricey for my stingy pockets. 

And then Gumroad comes into the picture again. It just works, so goes the saying, and it does so _very_ easily. It takes a product, you set a price and they just do the rest. I could live with showing their U.I. modally on my landing page. So far, it's been wonderful and I have no complaints. I even read that they are adding Apple Pay in Q2 - that would be delightful!

On the day after launch, they put out a tweet over some interesting creators on their platform which I thought was a nice touch:

{% twitter https://twitter.com/gumroad/status/1398294418411634690?s=20 %}

Now, I just had to overcome my last major obstacle. How do I communicate the promise of this book? How do I ensure people know that it's _not_ done and it has a long ways to go? Then, if I can do that, how do I show them that the price is worth it?

I nearly didn't launch thinking over those things. In fact, I ended up putting the word "beta" in almost 12 different places and the night before I pushed everything live I even changed the button from "Buy" to "Buy Beta":

{% include lazyLoadImage.html image="../assets/images/ealaunch_2.png" altText="Buy Button" %}

Thankfully, this never ended up being an issue. Not one single person misunderstood the purchase, the current value proposition or were lost on the promise of what it would become. That was an incredible relief. And one of the oldest rules of product really saved me here - just give early buyers a discount!

It sounds so obvious, but it works wonders for all involved. You get early payments to keep things going, they get a product they believe in quicker. Win win. For me, I set the discount at 20% (regularly priced at $100). If anything, I think I priced a bit low, but I'm not worried about tweaking things at this point. I just made sure to call it out prominently:

{% include lazyLoadImage.html image="../assets/images/ealaunch_3.png" altText="Discount Section" %}

### The Launch
The launch day was a ton of fun, I posted up at my local Starbucks on a breezy 70 degree morning with my trusted weapon of choice: Double shot espresso with a splash of almond milk.

{% include lazyLoadImage.html image="../assets/images/ealaunch_4.jpeg" altText="MacBook Air with Coffee on top" %}

{% include prettyBlockquote.html text="Yes, I put my coffee on top of my Macbook Air to snap a photo of my setup completely oblivious to the fact that one wrong move would mean my machine I absolutely needed to launch a book would've been decimated in mediocre, cheap coffee and substitute dairy product. #DoItForTheGram?" %}

The thing with these launches is - it's never about that one day. I've been toying with launch planning a lot, but for apps it's a lot different. Cupertino and Friends™ wants you to reach out six weeks beforehand. So I've always worked on that timeline. For a book? Who knows, I was in uncharted waters. So I went with something much easier - a one week timeline:

{% include lazyLoadImage.html image="../assets/images/ealaunch_5.png" altText="Things 3 List" %}

To keep things tight, I started on Monday and launched on Thursday. The TL;DR version was basically this:

- Monday: Announce that an early access launch is coming
- Tuesday: Drop another light teaser
- Wednesday: Remind folks tomorrow is the day, get that hype train rollin'
- Thursday: Do a million launch day things, this is it 🚀

One thing that I really loved doing was what I've forever more dubbed the almighty "pretweet". In previous launches, I've saved the valuable launch day tweet to just one; "Okay here it is I launched X!" But this time, I started things early and simply let people know I was _about_ to launch, shared some behind the scenes details and nicely asked if they'd be up to share it when I did officially launch:


{% twitter https://twitter.com/JordanMorgan10/status/1397874734289887237?s=20 %}

For me, lists just keep me breathing. I can't so much as function if I don't have a tick-for-tack list of exactly what I want to do written down. When I do, I have clarity for my launch and I can sit back and enjoy it instead of scrambling around writing copy, remembering websites to share the news on and whatever else needs to be done. It always works for me. On launch day, I simply went down the list above and posted prewritten stuff and did what I needed to, and then sat back and took it all in.

And very humbly and graciously I can report there was a lot to take in.

I have this weird launch thing where I don't like looking at the numbers until the _next_ day. Call it App Store conditioning. As such, I forgot I had notifications on for Gumroad. Not even 30 seconds after I posted this launch tweet:

{% twitter https://twitter.com/JordanMorgan10/status/1397894126432030722?s=20 %}

My watch dinged:

> You've made a sale on Gumoad for A Best-in-Class iOS App: The Book.

And then another ding. And another. I turned off notifications to stick to my traditions, but half way through the day I checked in on things and was nearly shocked to see the package selling to the tune of $13,000. My family and I are (thankfully!) extremely close, so the ol' family group chat wanted an update:

{% include lazyLoadImage.html image="../assets/images/ealaunch_6.png" altText="Gumroad Sales" %}

It was a very validating feeling. You don't get many launches (especially when you take forever to launch like yours truly) and not all of them work. So when they do, it's indie dev bliss. Plus, this was a book launch. There were no bugs to fix, no servers crashing or fires to put out - just replying and graciously thanking people on Twitter for sharing it, or buying it or chatting with folks popping in on the Discord server.

It was a lot of fun.

Also, if you know me, I brag about my wife a lot. Because how could I not? She takes this stuff as seriously as I do, and she offered to shoulder all of the parental morning duties for us so I could focus on getting this out the door. She always sends a sweet text too, she's the best[^2]:

{% include lazyLoadImage.html image="../assets/images/ealaunch_7.png" altText="Supportive Launch Text from my Wife" %}

### The Takeaway
After the launch day winded down, I sat down to reflect on things. It was a great launch, but the thing I felt more than anything was gratitude. I was thankful to be building something I believed in, but even beyond that it was something that others clearly believed in, too. It reminds me of the old adage, I forget who said this[^1], but when it comes to business - what's the most important thing?

The people! It's about the people.

If you are genuine, if you show a real interest in others and show you're making something to make their life better or inspire them, then guess what? We won't have to sell. Folks will happily buy. I know this because I've both been the buyer and the seller, happy with my choices of my own volition in either scenario. But you only get there, on either side of the coin, by building trust over time.

Do you make a product that's an obvious quick buck, or are you aiming to make something real and lasting that goes beyond yourself?

Do you respond to the brand new indie dev asking for feedback on their first app, or do you skip past the message?

Do you celebrate other people's great work, or only focus on your own?

You don't have to answer, because other people will have already answered that for you.

So, when you sell something and people buy it? You can't fake that. You can't force it. Either you make something people genuinely find useful and they buy it with real money, or you made something they don't really want and they pass on it. Really no middle ground there. I've been on both sides, and one of them is a lot more fun.

However, more than anything, I think the sense of pride and accomplishment from making something stands out above all else. Sure, the money is great - of course it is! It's a big factor in why I make things and decide which of them to make - but at the end of the day it will do what money always does. Get assigned to many of life's many asks, such as my children's 529s, saving for their cars, putting it into retirement, investing back into the book, etc.

The responsibility to finish this book to help my industry make better apps, no matter how many that ends up being, is something that I can really get behind and believe in.

### Misc
- I guess I love Memorial Day launches. I launched Spend Stack 1.2, which topped the charts for Finance in several countries, nearly a year ago to the day. I wrote about that [here][4].
- I still think the book "How to Win Friends and Influence People" is the most valuable book you can read about indie development.
- If you're new to mailing lists like me, do some poking around first. I thankfully saw early on I couldn't send to more than 1,000 people at first since I hadn't really sent anything beforehand, so I did a "pre email email" before the launch to validate my open rates with Mailerlite. Then, I was "verified" to send to more than 1,000 recipients. That would've super sucked to find out on launch day since my mailing list was over 1,500 people.
- You will experience impostor syndrome and once again you will be wrong about being an impostor.
- Launching is so fun. It never, ever gets old.
- The Discord community I made for it has been a blast! I nearly didn't do it, it was a very late addition. If you're on the fence with making your own, well - two thumbs up from me. Discord is awesome too, I hadn't used it previously. Plus, Slack just makes me feel like I'm at work, Geneva is a bit too new and Quill isn't really for communities.
- If you are going to write a technical book and don't want your code samples to come out looking like regurgitated chicken soup then save your time looking around and use Ulysses. I bounced around to about four different places to write this book, and nothing has come close to their package. I converted to an annual subscription half way through my trial, and did so happily.
- I've been enjoying learning more about advertising and experimenting there. I'll tweak some Twitter ads for the book and see how they do. Or, maybe I'll go nuts and shoot a full court buzzer beater and opt for a big name podcast or website. I'd love to benchmark how that would do, and how well I could deliver my message within those constraints. If I do, I'll be sure to let everyone know how it went.
- If you want to maximize your return on investment with these things, tiered pricing is how you do it. I just didn't have the time or resources to warrant that, I'm simply focused on the book.

### Final Thoughts
I've found my people. Everyone who has bought the book wants to make incredible iOS apps. They care about the details. They want accessibility to be a focus. And they are trusting me to deliver a book to help them do that. What a huge blessing that is for me, to get to make something I'm obsessed about exploring while getting paid to do it while sharing it with like minded folks.

That's my dream scenario, and I can't wait to deliver on it. If you're thinking of launching something, I'm happy to help or lend any advice. Feel free to tweet at me on the bird app, I'd love to help.

Until next time ✌️

[1]: https://bestinclassiosapp.com
[2]: {{ site.url | append:"/The-Best-in-Class-Book-Beta-Launch/" }}
[3]: {{ site.url | append:"/bestinclassbook" }}
[4]: {{ site.url | append:"/the-big-update" }}
[5]: {{ site.url | append:"/creating-a-retail-demo" }}
[6]: {{ site.url | append:"/a-new-home-for-spend-stack" }}

[^1]: Maybe Buffett?
[^2]: She also just (sorta) joined Twitter! @jansynmorgan
