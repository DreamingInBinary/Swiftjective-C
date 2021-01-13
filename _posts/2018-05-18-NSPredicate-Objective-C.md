---
layout: post
tags: ["Foundation"]
title: "NSPredicate"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Twist and turn your way through collections and data sets with ease."
image: /assets/images/logo.png
---
When Swift hit, we were enamored over its simplicity compared to Objective-C. Then it quickly became key to roll with protocol oriented programming. Also, forget reference types and classes. The list goes on.

And true — those things are great tools and have superb use cases. But I sense they are often lifted up as silver bullets without the necessary amount of thought that should probably be given to architectural decisions.

So in 2018, the blog posts overfloweth with Swift hackery (even on my blog 🤷🏻‍♂️) and the conference talks wax poetic of its future using functional programming parlance (yup, I've done that too 🙋🏻‍♂️).

Everyone seems excited about working with collections in Swift **but** we've also been able to do _similar_ things in Objective-C since iOS 3. So today, I'm chatting about the power of NSPredicate and how you can sift through collections with it using the 🦖.

I think it's relevant to bring it back up, as now we're seeing developers at this point who've started with Swift, and then later have circled back to maintain some Objective-C. If that's you, it's possible that you've been frustrated with the amount of boilerplate or iteration you've had to write when using collections in Objective-C.

Today, I have might have something for you.

### The Use Case

We've come a long way in recent years when it comes to Objective-C collections. Not more than a handful of years ago, we had to tell the compiler we were much smarter than it was:

```swift
NSString *aString = (NSString *)[anArray indexOfObject:0];
```
Thanks Heavens, Cupertino and Friends© eventually tacked on generics by way of type erasure. This marked a significant improvement:

```swift 
NSArray  *anArray = @[@"Sup"];  
NSString *aString = [anArray firstObject];
```
But generics or not, we often interact with the contents of Objective-C collections by doing something like this:

```swift   
for (NSString *str in anArray)  
{  
    if ([str isEqualToString:@"The Key"])   
    {  
        // Do something  
    }  
}
```

A lot of times, that's kosher. But as the requirements become more complex and the relationships more varied, the code gets a bit iffy. If you subscribe to the notion that less code means less bugs and better maintenance, the simple act of querying collections can become a bother.

Predicates can lessen the blow here. It's not about being "tricky" or cute with our code, but pragmatic and succinct.

### The 10,000 Foot View

At its core, `NSPredicate` is used to constrain or define the parameters for in memory filtering or when performing a fetch. It really got its bones when paired with Core Data. It's like SQL, except less awful*.

>I joke, it's just that set based operations have never made sense to me 🙃.

You supply it logical conditions, and it helps to return things that match said conditions. This means it provides support for basic comparisons, compound predicates, key path collections queries, subqueries, aggregates and more.

As it's used to sift through collections, you can expect Foundation classes to support it out of the box. Mutable varieties support in-place mutations from the results, whereas their immutable flavors will return a new instance:

```swift  
// In place  
[mutableArray filterUsingPredicate:/*NSPredicate*/]

// New instance returned  
[mutableArray filteredArrayUsingPredicate:/*NSPredicate*/]
```
Though predicates can be instantiated from [`NSExpression`][1] , [`NSCompoundPredicate`][1] or [`NSComparisonPredicate`][1] — it can also be created using a string syntax. This is similar to the Visual Format Language that one can use to define layout constraints.

We'll be focusing on the utility of using the string syntax method.

### The Setup

To illustrate, let's consider the following code for the remainder of the post:

```swift  
// Pseudo code   
Person:NSObject  
Identifier:NSString  
Name:NSString  
PayGrade:NSNumber

// An some property somewhere containing Person instances  
NSArray  *employees
```
### Query Time ⚡️

What follows for the rest of the post are straight forward examples of how to setup queries using the string format syntax.

We can start with a simple search scenario. Let's assume we've got an array containing identifiers representing Person objects:
```swift
{  
    @"erersdg32453tr",  
    @"dfs8rw093jrkls",  
    // etc  
}
```
Now, we'd like to retrieve Person objects from an existing array of Person objects from these identifiers. Using a double nested for-loop, it could be accomplished as such:
```swift  
// Assume "employees" is an existing array of Person objects
NSArray  *morningEventAttendees = @[/*Identifiers of people listed above*/];
NSMutableArray  *peopleAttendingMorningEvent = [NSMutableArray new];

for (NSString *userID in morningEventAttendees)  
{  
    for (Person *person in employees)  
    {  
        if ([person.identifier isEqualToString:userID])  
        {  
            [peopleAttending addObject:person];  
        }  
    }  
}

// Now peopleAttendingMorningEvent has what we want
```
The exact same result is accomplished using a predicate as such:
```swift
NSPredicate *morningAttendees = [NSPredicate predicateWithFormat:@"SELF.identifier IN %@", peopleAttendingMorningEvent];

NSArray  *peopleAttendingMorningEvent = [employees filteredArrayUsingPredicate:morningAttendees];
```
💫.

Predicate syntax allows for the use of SELF, which is used to great effect here. It represents the object contained within the array being operated on, so for us — Person objects.

>Another bonus is that we've dropped the mutability of the array definition._

It's for this reason we can access the key paths associated with the object that SELF is representing. You're seeing that above, as the `identifier` property is referenced.

Should you prefer, any key path can also be expressed via a variable using the "%K" syntax in its place. This version does the same as above:
```swift
[NSPredicate predicateWithFormat:@"SELF.%K IN %@", @"identifier", peopleAttendingMorningEvent];
```
### Compound Predicates

It's trivial to combine comparisons. Suppose our requirements now call for finding users attending events the same way as above, but now their paygrade must also be between 50,000 and 60,000.

If traditional approaches win out, then our first if statement will only grow:
```swift
// Same code as above same for this tweak  
if ([person.identifier isEqualToString:userID] && (person.paygrade.integerValue >= 5 && person.paygrade.integerValue <= 10))  
{  
    [peopleAttending addObject:person];  
}
```
But using a refactored predicate gets us there in a more idiomatic way:
```swift 
NSPredicate *morningAttendees = [NSPredicate predicateWithFormat:@"SELF.identifier IN %@ && SELF.paygrade.integerValue BETWEEN {50000, 60000}", peopleAttendingMorningEvent];
```
The syntax allows for different operators denoting the same thing which can help hone in on readability, per your preference. For example:

* "&&" or "AND"
* "||" or "OR"
* "!" or "NOT"

As expected, these are usually aggregated into one predicate by using them in tandem with the basic comparison operators you are likely expecting:

### String Comparisons

We're often tasked with matching values based off of string comparisons. It's well known that Objective-C shines its unrequited love for verboseness in no greater light than when dealing with NSString:
```swift
NSString *name = @"Jordan"  
name = [name stringByAppendingString:[NSString stringWithFormat:@"%@ %@", @"Wesley", @"Morgan"]]
```
...whereas Swift just smirks and concatenates its own strings with much less fuss. As such, we can take heart that such verboseness doesn't apply with NSPredicate and string comparisons.

```swift
// Assume mutablePersonAr is a Person array with names of "Karl", "Jordan"  
NSPredicate *namesStartingWithK = [NSPredicate predicateWithFormat:@"SELF.name BEGINSWITH 'K'"];
// Now only contains Karl  
[mutablePersonAr filterUsingPredicate:namesStartingWithK];
```
Virtually any comparison can be achieved by way of the predicate syntax's CONTAINS, BEGINSWITH, ENDSWITH and LIKE:

```swift    
// Assume mutablePersonAr is a Person array with names of "Karl", "Kathryn"  
NSPredicate *namesStartingWithK = [NSPredicate predicateWithFormat:@"SELF.name LIKE 'Kar*'"];

// Now only contains Karl  
[mutablePersonAr filterUsingPredicate:namesStartingWithK];
```
{% include prettyBlockquote.html text="You may have noticed the asterisk above, which like many similar DSLs out there, represents a wildcard." %}

The ease of use really begins to come to the forefront when you combine comparison operators within one query:
```swift
NSString *predicateFormat = @"(SELF.name LIKE 'Kar*') AND (SELF.paygrade.intValue >= 10)"

NSPredicate *namesStartingWithK = [NSPredicate predicateWithFormat:predicateFormat];

// Now only contains Karl  
[mutablePersonAr filterUsingPredicate:namesStartingWithK];
```
Further, there is even support for a mix of NSPredicate's SQLish syntax to be mashed up with regular expressions by way of the MATCHES syntax:
```swift    
[NSPredicate predicateWithFormat:@"SELF.phoneNumber MATCHES %@", phoneNumberRegex];
```
However, this is an opportune time to point out that the predicate format syntax is exactly what it is. A straight up string. And unless you're Mavis Beacon, you'll supply it with a typo every now and again.

The good news is that'll you find out fast — as a runtime exception awaits. What we gain in power and flexibility is, in some ways, mitigated by the loss of the safety net that static analysis provides.

To illustrate, this slightly refactored sample from above will crash. Can you tell why?
```swift
NSString *predicateFormat = @"SELF.name LIKE 'Kar*') AND (SELF.paygrade.intValue >= 10)"

NSPredicate *namesStartingWithK = [NSPredicate predicateWithFormat:predicateFormat];

// Now only contains Karl  
[mutablePersonAr filterUsingPredicate:namesStartingWithK];
```
To combat such issues, I've often paired predicates with NSStringFromSelector() to provide an additional layer of safety against typos and future refactoring:
```swift
NSString *predicateFormat = @"(SELF.%@ LIKE 'Kar*') AND (SELF.paygrade.intValue >= 10)"

NSString *kpName = NSStringFromSelector(@selector(identifier));  
NSString *kpPaygrade = NSStringFromSelector(@selector(paygrade));

NSPredicate *namesStartingWithK = [NSPredicate predicateWithFormat:predicateFormat, kpName, kpPaygrade];

// Now only contains Karl  
[mutablePersonAr filterUsingPredicate:namesStartingWithK];
```
A bit more heavy handed? Sure. Safer? Absolutely.

### KeyPath Collection Queries

Building upon the use of key paths, `NSPredicate` boasts a full suite of tools to operate on them in the name of a better search. Consider the following:
```swift
// Assume a Person object now has this property on it:  
// NSArray  *previousPay

// Find everyone who's average previous pay was over 10  
NSString *predicateFormat = @"SELF.previousPay.@avg.doubleValue > 10";
NSPredicate *previousPayOverTen = [NSPredicate predicateWithFormat:predicateFormat];

// Everyone whose previous pay's average was greater than 10  
[mutablePersonAr filterUsingPredicate:previousPayOverTen];
```
You could switch our the @avg for:

* @sum
* @max
* @min
* @count

When you consider the amount of, albeit trivial, code that you might've had to author to achieve the same things outside of a predicate, these types of techniques can begin to become part of your regular toolchain.

### Digging Deeper into Arrays

Much like key path queries, there is also support for inspecting implicit arrays to a finer degree:

* array[FIRST]
* array[LAST]
* array[SIZE]
* array[index]

Building from the code sample above, this allows for queries such as this:
    
```swift    
// Find everyone who's had three previous different salaries  
NSString *predicateFormat = @"previousPay[SIZE] == 3";

NSPredicate *threePreviousSalaries = [NSPredicate predicateWithFormat:predicateFormat];

// These Person objects had three previous salaries  
[mutablePersonAr filterUsingPredicate:threePreviousSalaries];
```
And as we alluded to above, it's perfectly find to apply multiple conditions:
```swift    
// Find everyone who's had three previous different salaries and whose first one was greater than 8  
NSString *predicateFormat = @"(previousPay[SIZE] == 3) AND (previousPay[FIRST].intValue > 8)";

NSPredicate *predicate = [NSPredicate predicateWithFormat:predicateFormat];
[mutablePersonAr filterUsingPredicate:predicate];
```
Going even further, you get gain even more power by using either of the following:

* @distinctUnionOfArrays
* @unionOfArrays
* @unionOfObjects
* @distinctUnionOfObjects

Hang with me, but assume we had an array of arrays containing Person objects, and all that we needed were the unique identifiers of the Person instances among them:
```swift
// Assume p1/2/3/4 are all hydrated Person objects  
NSArray  *> *previousEmployees = @[@[p1],@[p2,p1,p2],@[p1],@[p4,p2],@[p4],@[p4],@[p1]];

// Get every unique ID  
NSArray *unqiuePreviousEmployeeIDs = [previousEmployees valueForKeyPath:@"@distinctUnionOfObjects.identifier"];

// The array would contain only unique IDs
```
Cool, no?

The fun doesn't stop there, as there is even support for subqueries:
```swift
// Assume Person objects have a new property for their team:  
// NSArray  *team;

// Find everyone in an employee array who has people in their team with a pay over 1 and no previous pay history  
NSString *predicateFormat = @"SUBQUERY(team, $teamMember, $teamMember.paygrade.intValue > 1 AND $teamMember.previousPay == nil).@count > 0";

NSPredicate *predicate = [NSPredicate predicateWithFormat:predicateFormat];
[employeeAr filterUsingPredicate:predicate];
```
Subqueries are quite useful should you find yourself needing to search on an array of objects which also contain a property that's itself a collection. So here, we've got an array of Person objects, and we're peeking into their teamMember array.

### Convenience is Key(Path)

Though `NSPredicate` is built for search, it wouldn't be Objective-C if you couldn't bend things from their exact purpose _just_ a tad. No exception here.

When you think of a predicate, you think of filtering down a collection — meaning the return (or in place mutation) still contains the same stuff.

But you can, well, make it _not_ be the same things. And we actually did that in the previous code sample. The array of arrays above was used to return an array of identifiers — NSString instances. Keypathin' makes it all possible.

Here's a more direct example:
```swift
// We want an array of identifier strings whose length is greater than 10  
NSString *predicateFormat = @"SELF.identifier.length > 10";
NSPredicate *predicate = [NSPredicate predicateWithFormat:predicateFormat];
NSArray  *longEmployeeIDs = [[employeeArray filteredArrayUsingPredicate:predicate] valueForKey:@"identifier"];

// Now longEmployeeIDs has not Person objects, but only strings
```
### Wrapping Up

You can burn through Objective-C collections with sugary syntax. You can drill down to a particular subset of items without nested loops. It's all much easier on the eyes with `NSPredicate`.

While Swift has first class language support to slice and dice collections, it's really not much of a bother to utilize an object created to do much of the same things. Should you find yourself in a mature codebase or a newly minted one sporting The Dino (Objective-C), let the predicates flow freely.

Until next time ✌️.

[1]: https://developer.apple.com/documentation/foundation/nspredicate?language=objc

