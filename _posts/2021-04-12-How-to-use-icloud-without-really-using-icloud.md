---
layout: post
tags: ["iCloud"]
title: "How to Use iCloud While Only Kinda Using iCloud"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "iCloud is the gift that keeps on giving - both good and bad. Let's see how to leverage one of its best aspects today."
image: /assets/images/logo.png
---

Oh, iCloud. 

We've got such a colorful, unique relationship. You are simultaneously one of the strongest aspects of the iOS ecosystem, while being a certain kind of frustrating from a developer experience. And no, I'm not talking about [_that_ ol' chestnut][1]{:target="_blank"}.....or even the [new one][2]{:target="_blank"} for that matter. I'm talking about how much power and opportunity you bring to the developer circle, but also the baggage of what it means to simply check the box for your entitlements:

{% twitter https://twitter.com/morqon/status/1334652075473506304 %}

But yet, learning you is a worthwhile endeavor. And today - we'll quickly look at one your finest aspects. I'm talking, of course, about your user identifier. Allow me to apprise the uninitiated.

### Querying a User Identifier
Absolutely nobody wants to sign up for another service, though it's inevitable. Without question, it is my bête noire when it comes to modern software. That's why, among other reasons such as privacy, I always opt for Sign in With Apple when it's available. Quick, easy - I don't have to mess with anything. You know what's even better than using Sign in With Apple?

Sign in With Nothing™.

And that's exactly what you can do with iCloud:
```swift
CKContainer.default().fetchUserRecordID { (userRecordID, error) in
    if let userID = userRecordID {
        print("We've got a user ID: \(userID.recordName)")
    } else {
        print("Mistakes were made: \(String(describing: error))")
    }
}
```

With that little snip, you now have a unique identifier tied to the user of your application. That will be linked to their active iCloud account, which at this point[^1] is as solid of a signal of a unique "user" of your software as anything else in the Apple ecosystem.

{% include prettyBlockquote.html text="Yes, the call is async. But we live in an async world at this point. Timing here really won't be an issue aside from, maybe, the first request you make to it. After that, getting the identifier takes less time." %}

So - what's the use case?

Let's assume you've got a backend of some sort, or are sending your data over the wire from other means besides iCloud. Using this identifier, one can effectively match a user to that data - bypassing any need to sign in or sign up for another account. That grants your users with that "magic" feeling of picking up another device (say they've got your app on an iPhone and iPad) and having their data beam right down it, without having to do anything else. 

Your syncing + iCloud's user identifier can equal a whole mess of sign up dances being erased. We can also parlay Apple's adherence to strong privacy to our advantage here too. There's nothing you can know about this user other than a completely random identifier, as it should be for the majority of apps. You'll also know if they signed into another iCloud account, because, well - the identifier will be different.

### Caveats
Though, you do have to sign you binary's soul away to Apple to get it. If you don't add the entitlement for iCloud, you won't get very far. LLDB will come knockin', and fast:

```bash
libc++abi.dylib: terminating with uncaught exception of type CKException
*** Terminating app due to uncaught exception 'CKException', reason: 'The application is missing required entitlement com.apple.developer.icloud-services'
```

You can decide if the price of entry is worth it to you or not[^2], but for what iCloud brings - it's hard to argue against it. I truly believe almost every app that handles sync benefits from the iCloud user experience more than anything. Plus, you can't beat its price which is basically free all up and down.

Another obvious stopping point we've got here is Apple itself. This technique only proves useful to a small subset of developers, but it also means that your users would have to be exclusively on Apple devices. That may be the case for many of you solely making an app that won't venture cross-platform waters, but many do. However, if you're a SaaS person with only aspirations of being on Apple's Ecosystem along with a web app, you could still kinda sorta do this by way of [CloudKit JS][3]{:target="_blank"}.

### Final Thoughts
Sometimes it's the small things. If you need a quick solution to have some form of "identity" to your apps, iCloud could very well have you covered. Just know what you're getting into when you activate its entitlements, because as far as I know - there's no going back. 

Until next time ✌️.

[1]: https://www.objc.io/issues/10-syncing-data/icloud-document-store/
[2]: https://beckyhansmeyer.com/2021/03/30/how-to-set-up-core-data-cloudkit-and-swiftui-when-you-havent-the-faintest-clue-what-youre-doing/
[3]: https://developer.apple.com/documentation/cloudkitjs

[^1]: Vendor lock-in with iCloud is so strong now, I don't really know that anyone outside of a developer would routinely sign in and out of an iCloud account on their devices.
[^2]: In case you skipped past the tweet at the lede, you can't transfer apps if you use iCloud. Which stings if one of yours ever gets acquired.