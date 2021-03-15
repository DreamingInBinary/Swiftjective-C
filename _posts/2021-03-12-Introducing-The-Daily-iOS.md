---
layout: post
tags: ["The Indie Dev Diaries"]
title: "Introducing The Daily iOS"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "A tour of different technologies contributed to my newest mini project, The Daily iOS."
image: /assets/images/dailyios.png
---

Today I'm happy to announce a little side project I've been kicking around for a few weeks:

Say hello to the [The Daily iOS][1]{:target="_blank"}. 

It tweets **one code sample and one technical article daily** from Apple's documentation and comes complete with a link, generated image describing the code or article and alt text. The tweeted images look like this:

{% include lazyLoadImage.html image="../assets/images/tdi_code.jpeg" altText="Code Sample from Apple's docs" %}

The entire thing is all run daily from a Siri Shortcut automation on my phone.

### Why
I'm asked fairly often how I discover new APIs or have learned certain techniques in the iOS ecosystem. There are several avenues I go down to teach myself new topics[^1], most of them fairly overt and obvious. Without question, though, among the most valuable ways to pick up new tricks are Apple's own code samples and technical articles.   

Say what you will [about Apple's documentation][5], there is no denying many of its most indispensable resources are tucked away on Apple's developer website. 

The issue is that Apple tends to bury the lede. Go to UIKit's documentation and drill down four pages worth and you might stumble upon a code sample or article that could save you hours of heartache. From a hierarchical standpoint, the setup makes sense. From a discoverability angle, though, not so much. There's not an easy avenue to surface these things. Ergo, The Daily iOS.

I built this tool while researching articles for my [Best-in-Class iOS App book][2], but it also serves to further my goal of helping out Apple indie developers this year. I want this information front and center, and The Daily iOS will put it right where I'm at - Twitter 🤦🏻‍♂️🤷🏻‍♂️. 

### How
From the start, this project took me to technologies I had never used before. Web scraping, Kimurai, Ruby - it was a learning curve. That's where the joy came from though, there's nothing like googling how to do if statements or declare variables in a new programming language. It's invigorating. 

As I saw it, this is what I had to do:

<span class="font-mono font-bold">Using Ruby...</span>
- Figure out a way to scrape Apple's docs
- Snag all code samples and articles listed
- Separate it all by framework
- Save it off locally as json
- For each framework, separate empty results out

<span class="font-mono font-bold">Then, with HTML + CSS...</span>
- Generate an image of the content
- Allow for configuring the title, description, framework and type (Code versus Article)

<span class="font-mono font-bold">Finally, using a Siri Shortcut...</span>
- Pick a random code sample and article
- Parse its json
- Generate the image mentioned above
- Create the text for the tweet with a sanitized URL
- Resize it for ideal Twitter media viewing
- Upload the image somewhere to get a URL to it
- Hit Buffer's API to schedule the tweet
- While doing this twice daily, fully automated

Done and dusted.

The scraping took the most time to figure out. Thanks to Mattt, I had [a starting point][6]. Parsing the .json proved infinitely easier than the raw HTML[^2] - but finding a suitable environment that allowed for debugging with Ruby was a challenge. There were many ways things could've became more complicated as well.

Take for instance, the image. I could use a service like Bannerbear and upload the result to AWS for a public link. Or, I could create a page [on my site own][3] that took in query string parameters to do the job, and then upload it to Imgur. That....that is _much_ easier and it works.

I stand amazed at what's actually possible when you push Siri Shortcuts. No cron job required here - my phone simply does it all (it's on nearly nonstop anyways) and sends me a push notification of the result. 

{% include prettyBlockquote.html text="While performing the work to scrape the information from Apple, I was surprised at what I didn't find as much as of what I did. Assuming my scraper had no errors, which is absolutely possible, 114 frameworks had no technical articles and 178 were without any code samples." %}

As always, this work is open source and you can find the scraper, affectionately named Scrapple, [here][4].

### Final Thoughts
If a job is worth doing, then it's worth doing well. What better way to improve your craft then to read directly from the people who make the tools? I hope the community gets some true value from The Daily iOS (I certainly learned several new things while creating it) and I look forward to it serving up some valuable information for years to come.

Until next time ✌️.

[1]: https://www.twitter.com/thedailyios
[2]: {{ site.url | append:"/bestinclassbook" }}
[3]: https://www.swiftjectivec.com/og_gen/code
[4]: https://github.com/DreamingInBinary/Scrapple
[5]: https:///www.nooverviewavailable.com
[6]: https://github.com/nooverviewavailable/NoOverviewAvailable.com

[^1]: I listed most of them <a href="https://twitter.com/JordanMorgan10/status/1368221163546152961?s=20">here</a>.
[^2]: Thanks for the <a href="https://twitter.com/marcoroth_/status/1367993064183242754?s=20">tip</a>, Marco!