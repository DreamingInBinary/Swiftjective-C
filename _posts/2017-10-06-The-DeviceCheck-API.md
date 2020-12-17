---
layout: post
tags: ["Device Check"]
title: "Device Check Overview"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "There are legitimate uses for tagging devices, but the problem is, doing so can down shady roads. Now, we've got a non shady way to go about it."
image: /assets/images/logo.png
---
Each WWDC, there is always the obscure API that finds its way into the annual "word bubble" slide of new toys for developers to use. Faintly sitting there, it stands to reason that Apple considers it a useful addition that only the few, and not the many, will use.

DeviceCheck fits that bill, and then some. You might consider it a necessity from Cupertino & Friends**™**, something they had to make or face the reality that engineers would find another way to do thing X or Y resulting in shady means to the same end. Because developers don't do shady things, [like ever][1].

So, DeviceCheck is kinda what happens when most devs want to do things for perfectly valid business reasons, but there aren't really any good ways to do it. It's a curious little API, our topic of discussion this week.

### So, What Is It?

The TL;DR is nothing more than this: It's an Apple approved, and guaranteed way, to identify your app as running on a valid Apple device while maintaining absolute user privacy.

That's not the most interesting of news, I suppose. The real discussion here lies within the _why_ part of things. And the why spectrum, in this case, could range from toggling promotional offers on a certain device, linking purchases to accounts or auditing a device for fraudulent activity. For example, who here in the room has made two different usernames or profiles to extend a free trial of some sort?

…

…..

……..

🙋🏻‍♂️.

That's really it. We're simply taking about helping one associate some given state for any given iOS (or tvOS) device in particular.

To get your creative juices flowing, consider that you have two apps released. If they open App One, you could assign the device to state 01 — and when they open App Two, you can query the state as it will be persisted in the same fashion and then unlock some content, discount or reward.

It's an app-agnostic API, so leverage it as such if the occasion calls for it. But, also be aware if that presents a design constraint to you. Again, we're talking about two bits _per device_ — not two bits per app.

So — how does it work?

### The API

[I've always appreciated "just get to the point" type of APIs][2], and that's exactly what we get here. The setup allows a developer to store two bits of information (along with a timestamp) per one device. So, instead of peeking behind several doors that Apple would rather you leave shut to identify a device, you can simply get a few bits back and be done with it:
```swift  
let curDevice = DCDevice.current

if curDevice.isSupported  
{  
    curDevice.generateToken(completionHandler: { (data, error) in  
        if let tokenData = data  
        {  
            print("Received token (tokenData)")  
        }  
        else  
        {  
            print("Hit error: (error!.localizedDescription)")  
        }  
    })  
}
```
{% include prettyBlockquote.html text="Note that the simulator won't pass isSupported, so if you want to test it out— I guess do what we should be doing anyways and use the real thing 📱." %}

With that code you're on your first step (more to follow) to be able to store either:

- 00
- 01
- 10
- 11

When you set that information, it remains valid and stored by Apple until you as the developer manually reset it or until you update it. That means you don't have to code your way through tricky things like reinstallation, nuking all contents and settings or straight up deletion. It's also worth noting that these values are unique per team ID.

Also, be aware that like most tokens, it's intended for single use. As you'll see in just a minute, you likely use this token outside of your app and on your server. It will stay valid long enough if you need to retry a request, but the big Apple just recommends invoking the same method to generate another one.

### A Closer Look

You may be looking at the previous code sample and wondering how that really helps us at all. How are the bits assigned? How do you set state? All we're doing so far is getting a token. You might've expected something like this:
```swift     
let curDevice = DCDevice.current  
curDevice.setFirstBitState(as: true)

// or

if curDevice.secondBitState() == true  
{  
    // Do something  
}
```
It's a fair question, and it's because the client API (iOS or tvOS) only handles half of the transaction. On iOS, we're given an ephemeral token which we send to our own servers. That validates authenticity, then we can either set the bit state or query it and fire a request off to Apple. Then Apple gives us the state we're after.

It looks like this:

1. Client uses DeviceCheck to get a token
2. It sends that over to our servers and we decide state
3. We pass the token and state to Apple, and done

And then to query it later:

1. Client uses DeviceCheck to get a token
2. Your server queries the state of the device with Apple
3. It gets the response and your app takes the appropriate action

This is not as heavy handed as it sounds. A simple POST and wrapping up your authentication key as a JSON Web Token gets you all the way there. A request to query bit state would just need to include a JSON payload like this:
```json    
{  
    "device_token" : "anAmazingUniqueToken"  
    "timestamp" : 0934423486434,  
    "transaction_id" : "you come up with this"   
}
```
And then Apple would respond with:
```json
{  
    "bit0" : false  
    "bit1" : true,  
    "last_update_time" : "2017-10"   
}
```
Coming back the other way, if one needs to update it - the payload is exactly the same except you include one, or both, of the bits you wish to update:
```json 
{  
    "device_token" : "anAmazingUniqueToken"  
    "transaction_id" : "you come up with this",  
    "timestamp" : 0934423486434,  
    "bit0" : false,  
    "bit1" : true  
}
```
In saying all of this, I assume you are aware of the other logistical trappings one must take to send web requests. For example, follow the Base 64 URL encoded JSON web token format and ensure that your authentication key employs the ES256 algorithm. Otherwise, you'll be met with no helpful bits to use for state and instead get a nice BAD_AUTHENTICATION_TOKEN http error 🙈.

For more on how to set these requests up, what data types to use and even some example requests using curl — [be sure to hit the docs][3].

### Being a Good DeviceCheck Citizen

As with any API, there are right and wrong ways to go about things. With DeviceCheck, simple though it may seem, there are a few choice scenarios to be cognizant of.

For starters, recall that time stamp that Apple gives us during our query:
```json    
{  
    "bit0" : false  
    "bit1" : true,  
    "last_update_time" : "2017-10"   
}
```
That update time is rounded to the nearest month. This could help you solve some problems that could arise from things like devices being sold to someone else. For example, if the bit state says they've done something they should only do once, but it's been a year since they've tried that — pair that fact with other business logic to avoid locking a new customer away from content.

That directly leads us to the next tip Apple recommends, which is that this is a _supplementary_ source to help solve these specific problems. That is, it should be paired with your business logic. Getting the bit state is a great start and certainly welcome help, but pair it with logical checks that help you ensure you're not stonewalling new users.

It's also mentioned that this shouldn't affect your user interface much. I think this is fairly obvious, but an additional nudge never hurts. Most of us have several ways of knowing when to toss up your "first run" modal that introduces your app. Querying a bit state that requires at least three trips across the wire shouldn't be one.

Lastly, Apple gave us this API for a reason. In the [WWDC chat][4] over the topic, they straight up say that they will continue to remove sources of entropy outright or at least make sure they are under user control. Read: "If you abuse our ecosystem to tag phones we will find you and eliminate your methods."

### Wrapping Up

UDID querying is out. Linking back via an IP address is hacky and easily dodged. So now the act of uniquely identifying an iOS device, nefarious reasons or not, has first class support in iOS 11. I, for one, applaud Apple's decision to include a safe and pragmatic way to do this. Because somewhere out there is a dev with a business requirement that needs to do something like this.

Now, they can. And they don't have to do any funky dances to do it.

Until next time ✌️.

[1]: https://daringfireball.net/2017/04/uber_identifying_and_tagging_iphones
[2]: {{ site.url | append:"/privacy-and-single-sign-on" }}
[3]: https://developer.apple.com/documentation/devicecheck/accessing_and_modifying_per_device_data
[4]: https://developer.apple.com/videos/play/wwdc2017/702/?time=1530

