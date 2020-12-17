---
layout: post
tags: ["Swift"]
title: "NS_CLOSED_ENUM"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Enumerations provide clarity and intent. Some change and yet others remain stagnant, and now we program effectively for either case."
image: /assets/images/logo.png
---

There is but one constant in software engineering: change.

New versions. Additional frameworks. Mutating requirements. Indecisive clients. Nascent patterns for emerging platforms.

The outside factors will always pile in, and yet sitting within stark juxtaposition of this notion is that some code might not _ever_ change. A prime candidate for such immutability? Enumerations.

And now, thanks to the Swift compiler and Xcode 10.2, we can broadcast the future of any Objective-C enumeration with a higher degree of clarity.

### Frozen and Unfrozen
Far from moribund, Objective-C appears to gain new gadgets on an annual basis. However, a closer inspection reveals that all good things happening to the thirty-plus year old language are a direct result of bettering the Swift programming experience. So, it should come as no surprise that this macro was born primarily from [Swift evolution proposal 0192](https://github.com/apple/swift-evolution/blob/master/proposals/0192-non-exhaustive-enums.md){:target="_blank"}.  

The TL;DR is that the Swift community were considering how to effectively handle enumerations that would change, and those that wouldn't. In programming parlance we consider this distinction as _frozen_ and _unfrozen_ enumerations.

For an unfrozen enumeration (likely the lot of them), additional cases are likely coming in future API changes:

```swift
typedef NS_ENUM(NSUInteger, AccountType) {
    AccountTypeNew,
    AccountTypeExisting,
    AccountTypeUnknown
};

// Later on, another case could be added
typedef NS_ENUM(NSUInteger, AccountType) {
    AccountTypeNew,
    AccountTypeExisting,
    AccountTypeMigrated,
    AccountTypeUnknown
};
```

Whereas other situations call for a certain degree of finality, such as `FloatingPointSign` from within the Swift Standard Library:

```swift
let sign:FloatingPointSign = .minus

switch sign
{
case .minus:break
case.plus:break
}
```

### Swiftly Business
The differences in approach between the two languages are vast and wide when dealing with enumerations. Recall that Objective-C supports storing any value in an enumeration, so as long as it matches the underlying type:

```swift
typedef NS_ENUM(NSUInteger, AccountType) {
    AccountTypeNew,
    AccountTypeExisting,
    AccountTypeUnknown
};

// Later on, assignment...
self.accountType = 934;

// Or control flow...
if (self.accountType == 243)
{
    // It's all totally legal
}
```

In Swift, that's no fly zone territory:

```swift
// Cannot assign value of type 'Int' to type 'AccountType'
self.accountType = 934

if (account.accountType == 34) 
{
        // This errs as well, unless one initializes an Int with the enum's rawValue.    
}
```

But where things really become tightened up in Swift is within a `switch`:
```swift
// If we omit default, we'll err since the switch isn't exhaustive. Or leave out a break.
switch account.accountType
{
case .existing: break
case .new: break
default: break
}
```

Here, Swift is the straight A student who buckles their seat belt before starting their engine. Objective-C wouldn't mind driving blindfolded:

```swift
// Really anything goes. Leave out a break. Don't use all the cases. Just whatever with a side of YOLO.
switch (account.accountType)
{
    case AccountTypeNew:
    default: break;
}
```

And you can see where the issues come into play. Though we can't do much in terms of safety with Objective-C, we can vend more intent to Swift consumers of their enumerations by marking them as either frozen or unfrozen. Doing so yields a subtle but welcome change for Swift API consumers.

Enter NS_CLOSED_ENUM.

### Freezing Enumerations
Though our account type example enumeration is ripe for future mutations, let's consider one that isn't:

```swift
typedef NS_CLOSED_ENUM(NSUInteger, AccountStandingStatus) {
    AccountStandingStatusFreeTrial,
    AccountStandingStatusPaid,
    AccountStandingStatusOwes
};
```
Here, our business needs dictated that an account will ever only be in one of three states. Forever. When bridged over to Swift, usage might look like so:

```swift
switch account.accountStanding
{
case .freeTrial:break
case .owes:break
case .paid:break
@unknown default:break
}
```
Note that a default case can't alert the compiler that a particular enumeration has elements that aren't explicitly handled in the switch. For this reason, Swift added a new attribute in Swift 4 for switches, @unknown. Using it will act as a huge safety net, a catch-all. A key difference is that a warning will still be produced to let developers know they've missed a case.

That being said, intent is the most valued prize to engineers both from a maintainer's perspective as well as a consumer's one. Though @unknown is useful for letting one know they've missed a case; even better is to communicate that they don't need a default case at all. YAGNI.

We can use NS_CLOSED_ENUM here to signify things will, and forever more, stay the same:

```swift
typedef NS_CLOSED_ENUM(NSUInteger, AccountStandingStatus) {
    AccountStandingStatusFreeTrial,
    AccountStandingStatusPaid,
    AccountStandingStatusOwes
};
```

Now Swift can guarantee that the additional `default` is unnecessary, but notice how no warning is generated for our unfrozen enumeration, `AccountType`:

```swift
let account = Account()
account.accountType = .existing
account.accountStanding = .paid

switch account.accountType
{
case .existing: break
case .new: break
case .unknown: break
@unknown default:break // Still useful, because new types could later be added
}

switch account.accountStanding
{
case .freeTrial:break
case .owes:break
case .paid:break
@unknown default:break // Case is already handled by previous patterns; consider removing it
}
```

Though this clearly enhances life with Swift, I'd argue this can be a valuable addition to any Objective-C exclusive code base. If you're browsing a header, the intent of the enumeration's status (both current and future) are clear by either the use of `NS_ENUM` versus `NS_CLOSED_ENUM`. 

### Choices
It's worth considering which type of enumeration to use with Objective-C at this point. We've got enum, NS_ENUM or NS_CLOSED_ENUM. Fortunately, the answer is much simpler than you  might think.

{% include prettyBlockquote.html text="NS_OPTIONS is also a choice, but is more suited towards bitmasks." %}

The old C way of defining an enumeration, which by proxy Objective-C gained by virtue of being a superset, could lead to confusion. Look to [NSHipster's](https://nshipster.com/ns_enum-ns_options/){:target="_blank"} excellent post over the topic, but to jog your memory:

```swift
// There's no type. Only Integer values
enum {
    AccountTypeNew,
    AccountTypeExisting,
    AccountTypeUnknown
};

// or a specified type
typedef enum {
    AccountTypeNew,
    AccountTypeExisting,
    AccountTypeUnknown
};

// or Apple's old way of doing things,
typedef enum {
    AccountTypeNew,
    AccountTypeExisting,
    AccountTypeUnknown
};

typedef NSInteger AccountType;
```

To provide explicit hints to the compiler, one should always opt for NS_ENUM as we've done in the previous examples. We'll get switch case completeness along with our type checking.

Now, with NS_CLOSED_ENUM, the only _additional_ question you've got ask yourself is if this enumeration is frozen or not. That's it:

1. Don't use enum
2. If it's unfrozen, opt for NS_ENUM
3. If it's frozen, use NS_CLOSED_ENUM

It should be noted that the choice to use a frozen enumeration is final. The header for a closed enumeration communicates this plainly:

{% include prettyBlockquote.html text="Once an enum is marked as closed, it is a binary and source incompatible change to add a new value. If there is any doubt about an enum gaining a private or additional public case in the future, use `NS_ENUM` instead." %}

### Wrapping Up
If Objective-C was "deprecated" tomorrow, the traveled software developer knows that in programming there is but one truth: what is dead never truly dies.

Interop with old faithful (Objective-C) isn't going away anytime soon, as much as the prevailing narrative may have you believe. Sure, the Swift only frameworks are en route, no doubt, but so long as Foundation holds its firm grip in the iOS ecosystem - we can bet the dinosaur will still roam its plains. 

As such, we should take care to integrate the changing of the guard in delightful ways, and NS_CLOSED_ENUM is an indefectible definition in that regard.

Until next time ✌️.

