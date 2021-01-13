---
layout: post
tags: ["Misc"]
title: "Connecting iOS Apps with Their Websites"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "As developers, marketing often escapes the lot of us. Fortnuately, Apple has made a few quick wins available to create meanginful connections between your app and its web site."
image: /assets/images/logo.png
---
Developing for the web feels like a world that's simply left me behind. I made a concerted effort to double down on iOS development several years ago. I've never looked back or regretted it, and I don't even know what the rear view mirror looks like. It's caked in dust by this point, no doubt.

Though I've [mentioned web related things here before][1], the last time I did any meaningful web development in a professional context, I was using JQuery v4.x.

So, yeah — it's been a few years and (seemingly) several thousand Javascript frameworks later. I don't venture into that ecosystem much, and my last trips were on account of the things I'm about to mention here.

Which is, there are some incredibly trivial things one can do on their website to couple it to their iOS app counterpart. If you have the next thirty minutes free, I'd wager you could do all of them listed here.

Let's rock 🤘

### Give your SaaS some sass

First, what's the end game here? To simply leverage some hosted .json files on your server and put meta tags in your markup to allow users to jump straight into your app or display information about it more effectively. That's it.

This stuff is typically key for SaaS business' or solopreneurs because in the world we live in, where there is a SaaS website a (hopefully) native app will follow. We want to help them dance together.

It helps that iOS 11 built features specifically for this. Open up your camera, point it at a QR code. Boom — iOS shows us the actionable details. Share a link in messages. Get a rich text preview. The list goes on.

### QR Code Detection

Let's start with everyone's favorite technology, quick response codes.
```swift
//TODO: (insert QR code joke here)
```
Creating a QR code that users can point to and then be prompted to download, open or route to a part of your app can be useful. Doing so can be accomplished by setting up an `apple-app-site-association` JSON file with an "applinks" key value pair and hosting it. You may already have this file for hand off support.

For this purpose, it looks like this:
```json
{  
    "applinks": {  
        "apps": [],  
        "details": [  
            {  
                "appID":"DJGHSDJGH24.com.blogPost.yolo",  
                "paths": ["*"]  
            }  
        ]  
    }
}
```
{% include prettyBlockquote.html text="The appID key simply must be your team or app ID,(.), followed by your bundle ID." %}

An easy place for the JSON file to live is typically in the .well-known subdirectory:
```json    
https://wwww.anExample.com/.well-known/apple-app-site-association
```
Additionally, planting it at the root of your server works just fine too.

If you host such a file, the end result is that your app will immediately show to open via a notification when the user points at the QR code. The only metadata your QR code needs is the URL for your website.

No external QR code download, no more taps — nothing. It just happens.

If the user doesn't have your app, Safari will kick in instead, taking them to your website.

### Getting Particular

You have the ability to specify a few things within your applinks key-value pairs. Let's look at what's available:

* **apps** — You supply an empty array here. I would tell you why, but I would be making it up because Apple literally says nothing else about it besides that so…¯(°_o)/¯
* **details** — An array of dictionaries, one for each app that your site ultimately supports. Ordering matters in the array, as iOS look up links according to it. This allows you to specify an app to handle a certain part of your website.
* **details[appid]** — The team ID or app ID with a period, and your app's bundle ID tacked on.
* **details[paths] **— An array or strings that determine which parts of your website are supported by the app. Additionally, you can say which parts **aren't **supported.

The first three entries don't merit much more discussion. The paths entry does have some nifty options for excluding content where applicable.

For example, including "NOT " at the beginning of the path will basically blacklist that content from being used as a universal link:
```json
{  
    "applinks": {  
        "apps": [],  
        "details": [  
            {  
                "appID":"DJGHSDJGH24.com.blogPost.yolo",  
                "paths": ["/posts/iOS",  
                "NOT /oldPosts/outdated/*"]  
            }  
        ]  
    }
}
```
This works much like regex, with support for wildcards:
```json
{  
    "applinks": {  
        "apps": [],  
        "details": [  
            {  
                "appID":"DJGHSDJGH24.com.blogPost.yolo",  
                "paths": ["/posts/iOS",  
                "/oldPosts/201?/*"]  
            }  
        ]  
    }
}
```
A few random words of advice:

* Keep in mind these matches are case sensitive.
* If you're rocking a few domains, you'll need to roll an `apple-app-site-association` file for each one that your app supports. Example: apple.com would have different motives than someProducts.apple.com
* One doesn't actually need to appended ".json" to the JSON file. Don't ask me how I know this, or how much hypothetical time was lost to it.
* If you associate several apps within one `apple-app-site-association` file, iOS will handle it by presenting an alert showing each one to determine which is opened. The next time this happens, iOS will suggest the last choice as a default — but users can still switch this via a force touch or by pulling down on the notification.
* Safari handles all of this as well. If you hosted the QR code as an image, and an iOS user 3D touches on it — this exact same flows happens.

### Associated Domains

As an iOS developer, you've got some duties too. Chief among them is to let Xcode know you're expecting this to happen. This is done by the "Associated Domains" capability for your app binary.

Flip it on within Xcode and add some entries for each one you wish to support. Again, you might've spent time here already if you've developed for hand off capabilities.

For this particular type of routing, though, it would look like this:
```json
// i.e. applinks:  
applinks:anExample.com
```
As we'll see later, this creates a handshake of sorts that confirms both the app and website trust one another. Xcode will generate an entitlement to reconcile the security aspect and apply it on your app's behalf. Spoiler alert, this opens up the door for quick credential retrieval too, as we'll see later.

Of course, this means you'll need to handle the user activity passed to you within your app delegate. But, that's a blog post for another day.

Using universal app links is great, and I hope more apps use it as time goes on. They can happen outside of a QR code context too. They enjoy certain advantages over custom URL schemes in that they are more secure due to the handshake, they can't be hijacked or claimed by any other app and the only party who can associate one to your app, is you.

### Web Credentials

This nifty trick is absolutely essential for you if your app has a log in mechanism or any user portal system online. By employing password autofill, users can tap on the lock icon in the quicktype bar that appears over the keyboard, authenticate and then have their information automatically filled out.

It's beautiful, and I use it daily.

To allow for this to happen, there is minor housekeeping that you need to do for the text fields or text views representing your log in. Simply assign the correct values added in iOS 11 to their textContentType property so iOS knows what goes where:
```json
loginField.textContentType = .username  
passwordField.textContentType = .password
```
That's all it takes from a coding standpoint — nothing more than assigning to a property (if you don't, you leave it up to iOS' heuristics to make the assumptions). There's nothing left other than to respond accordingly to the incoming "did change" delegate methods or notifications that'll be fired off with the credentials.

Technically, you could stop here and things would work…._ish_.

Users would just get the quick type bar, but your site's credentials wouldn't be offered up within it. They'd just see the lock icon, then have to auth up, search for it and select it.

Amateur hour. Obviously, we'd prefer the user's credentials to show up immediately once either one of those text controls becomes first responder.

### Establishing Trust, Again

Which brings us back to our `apple-app-site-association` file.

Going deeper into the same thought above, a signed entitlement tells iOS which sites you are associated with. The secure, two way link is established in particular when your app is installed or updated. At that point iOS does a wellness check by traversing your domains listed within your Associated Domains (which we mentioned above) and pings each one to see if it gets a valid association file.

If the app points to the website and the website points to the app — we're cooking.

The entry under Associated Domains for password autofill looks a bit different than the above app links we entered before, as it's prefixed with "webcredentials":
```json
webcredentials:anExample.com
```
{% include prettyBlockquote.html text="XCode gonna' Xcode. If you're still seeing an error at this point, you might need to hop over to the developer portal and enable Associated Domains for your app ID." %}

As you've likely keyed in on, the Associated Domains entries follow the same pattern of including a service (i.e. activitycontinuation, applinks, etc) and domain:
```json
<service>:<fully qualified domain>[:port number]
```
From there, it's a case of adding that to your association file:
```json   
{  
    "applinks": {  
    "apps": [],  
    "details": [  
        {  
            "appID":"DJGHSDJGH24.com.blogPost.yolo",  
            "paths": ["/posts/iOS",  
            "/oldPosts/201?/*"]  
        }  
    ]  
    },  
    "webcredentials": {  
        "apps": ["DJGHSDJGH24.com.blogPost.yolo"]  
    }  
}
```
The only key to worry about is "apps", which is just an array of strings (their value constructed the same way as above with app links) that represent the apps your site provides log in information for.

Once you throw that up on your site — the entire web credentials and password autofill pipeline is all set. I can't tell you how much times this saves from a user perspective. It goes up by an order of magnitude if one uses Safari's password suggestions as well.

### Image Links

Sharing links within Messages is a ubiquitous practice among iOS users. Nothing is more rewarding than tapping on the link cards, with their inviting .png hero images sitting there beckoning us to load up a website within Safari.

Except when that doesn't happen, and it's just plain text 😬.

This is so easy to avoid, though, as you easily can control the title, icon, image and even video that displays. Using the [open graph protocol][2], you can supply all of this stuff inside your site's  tag.

**Title (if this isn't present, it'll take your site's title):**
```html
// Just in case, Javascript isn't run when generating rich links - so the value needs to be in the source. They can't be created dynamically.
<meta name="og:title" content="The Title" /> 
```

**Icons (derived from a favicon or apple touch icon if it's there. If not, you can roll with something like this):**
```html  
<link rel="icon" href="path/to/icon" type="image/png" />
```

**Image (replaces the icon if present, but still provide both because sometimes Messages prefers the icon over an image in situations like poor networking conditions)**
```html
<meta name="og:image" content="path/to/image.png" />
```

**Video (of note, you can supply a URL to a YouTube video, which is the only video player network that'll work if you don't use a file iOS can natively play)**
```html
<meta name="og:video" content="path/to/video.mp4" />
```

That's all it takes to get the pretty, informational rich links when your website is shared within Messages. Nice.

### The "You probably are already doing this but I'll add it anyways" Paragraph

Smart banners. At this point, you're probably using them.

But just in case you aren't, add a meta tag with your app ID to take care of it. When potential users visit your site, they'll get that call to action banner at the top to download it.

If you're wanting to hunt down your app ID quickly, just visit [iTunes Link Maker][3]. The entire meta tag can be as simple as this:

```html
<meta name="apple-iunes-app" content="app-id=123456789">
```

If you need to, you can also include an iTunes affiliate string and app argument parameter to deep link to a specific controller to keep context consistent with where a user might be on your website.

Generally, though, this is tacked on your landing page and that's good enough to serve its purpose. Now, go forth and take back what could've been just an ephemeral thought about your app and convert it to an install 💪.

### Wrapping Up

The lot of us craft software for our 9–5 and craft software to scratch our own creative itch. Eventually, all roads lead to a website talking about one or the other. Do them both justice, step away from Xcode and throw up a json file or two or include some simple meta tags that could help slip users right into your beautiful code.

Things like this are almost like the chore list for iOS engineers. We may not think about them first, we may not wake up to crank out config files — but hey, they can help our endgame and move the needle towards exposure. So why not?

Until next time ✌️.

[1]: {{ site.url | append:"/swift-javascript" }}
[2]: http://ogp.me
[3]: http://itunes.apple.com/linkmaker/

