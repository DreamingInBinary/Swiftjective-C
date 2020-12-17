---
layout: post
tags: ["Foundation"]
title: "Tail Call Elimination"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Foundation keeps caches hot and saves on precious stack memory via tail call elimination. Let's take a look at how this occurs."
image: /assets/images/logo.png
---
From day one, I've always been driven by the end result of the software I was coding and less so about the magic that was happening underneath. Seeing the ubiquitous "Hello World" appear in terminal was astonishing to me. The further you go, though, the more that magic becomes an art one must master either by necessity or from our inherent curiosity: Computer Science.

Today — we more or less dive into one such topic that suits the discipline well. If you've ever wondered how Swift's compiler does some neat optimizations (and other stuff!), today is your day. If not, well — you're already here 😄!

### Definition of Recursion: See Recursion

The hot takes on whether or not recursive functions are a good idea or an unforgivable mistake are out there. No matter which camp you fall in, they naturally show how tail call elimination happens and why it's so awesome.

Think about some of the recursive functions you've seen or authored. A lot of them involve the recursive invocation to occur at the end of said function:
```swift
func followUser(_ twitterID:String)  
{  
    if twitterAPI.isAuthorized  
    {  
        twitterAPI.followUser(with: twitterID)  
    }  
    else  
    {  
        twitterAPI.synchronousLogin()  
        //Get recursive up in here  
        SocialUtils.followUser(32424)  
    }  
}
```
Certainly not always the case, but when the last call the function makes is to itself, we've got ourselves a tail recursive function. Recursive functions naturally lend themselves to this setup, and they're logically easier to reason about to boot.

That means they can be easily maintained later on. But, actually, if you're needing to refactor a recursive function at your 9–5, maybe just move on to the next Github Issue 😜.

Recursive or not, typically when functions are called they do a few things to establish their own call frame. A call frame tells us about the function's details; import stuff like its local variables, parameters and return address.

It's a function's version of a Facebook account, full of juicy details. And with those juicy details, the compiler can look at all of them holistically and make smarter choices than we would.

### Meanwhile, At Your Local Backtrace

If you're a fan of the always helpful [Time Profiler ][1]— you've seen this in action. It uses a service deep inside the kernel that samples what the CPUs are up to, all at a blistering 1000x per second 😱!

As Chad Woolf explained in an [excellent WWDC session][2] over the topic, if we sampled our function above at the point of the tail call we'd see the base of its call frame and know who called into it — itself. And, you can keep going down the chain, checking into the frame pointers on the stack until you hit rock bottom. In fact, that's how backtraces are born.

If we invoked our sample code above, it might look something like this right before the tail call on the call stack:
```swift
synchronousLogin()  
[return address][frame pointer]  
followUser()  
[return address][frame pointer]  
handleButtonPress()  
[return address][frame pointer]  
setupUI()  
[return address][frame pointer]
```
Now, we can envision our recursive function if it ran all the way through:
```swift
followUser() <-- Point of tail call  
[return address][frame pointer]  
synchronousLogin()  
[return address][frame pointer]  
followUser()  
[return address][frame pointer]  
handleButtonPress()  
[return address][frame pointer]  
setupUI()  
[return address][frame pointer]
```
…and on and on that call stack would grow, if the recursive function was called, say, 1,000 times. Luckily for us, it's likely to only happen once — but that's because it's fake code and my fake code performs great 😉.

### So, Why Do I Care?

That type of scenario can be taxing and inefficient. If, say, our code sample freaked out a bit with its synchronousLogin() invocation and re-entered our function hundreds of times:
```swift
<--- AND ON WE GO --->  
synchronousLogin()  
[return address][frame pointer]  
followUser()  
[return address][frame pointer]  
synchronousLogin()  
[return address][frame pointer]  
followUser()  
[return address][frame pointer]  
synchronousLogin()  
[return address][frame pointer]  
followUser()  
[return address][frame pointer]
```
That's when the compiler can save our tail by optimizing this kind of code by memory reuse, keeping caches hot and saving precious stack memory via a process called….. tail call elimination! It can even bring performance up to par with an iterative variant of the same code.

Want the **TL;DR?** It's stack frame reuse.

The best part is, how it works isn't magical: It just prevents the compiler from pushing more frames, thus preventing more stack growth. Why not let the callee reuse the frame stack of the caller instead of popping another one on?
```swift
<--- Now we can reuse the same call frame we've already got --->  
synchronousLogin()  
[return address][frame pointer]  
followUser()  
[return address][frame pointer]  
handleButtonPress()  
[return address][frame pointer]  
setupUI()  
[return address][frame pointer]
```
{% include prettyBlockquote.html text="If anything, now you know where the term stack overflow comes from 💡!" %}

### Beyond Recursion

Here's something I never thought I'd say: Recursion explained a computer sceincey thing easier to me than other non-recursive examples.

That said, tail call elimination is _not_ mutually exclusive to recursion — though it's a case study for its benefits. In fact, in Apple's sample code in their WWDC session mentioned above, drawRect: reaps its rewards even though it's not an inherently recursive function.

Apple provided an "Ah — I get it now!" non-recursive example that went something like this:
```swift
func draw(_ rect: CGRect)  
{  
    //Some awesome drawing code  
    CGContext.drawPath(path)  
}
```
Without tail call optimizations, this process would look something like this at the end of the function:
```swift
func draw(_ rect: CGRect)  
{  
    //Some awesome drawing code  
    CGContext.drawPath(path)  
    //The stack frame will pop off the call stack  
    //Then, it'll restore previous value of the frame pointer  
    //Finally, it'll return back to its caller  
}
```
We can see that the call to drawPath() is the last thing that'll happen inside drawRect. So we can reason that, hey — drawPath — doesn't need _anything_ from drawRect's stack frame. Further, why return to drawPath at all when it's just going to return right back to its caller?

Tail call elimination shuffles things around to address those concerns:
```swift
func draw(_ rect: CGRect)  
{  
    //Some awesome drawing code...
    
    //The stack frame will pop off the call stack  
    //Then, it'll restore previous value of the frame pointer
    CGContext.drawPath(path) // Direct call to drawPath()
    
    //No need to return back to its caller due to a direct call to drawPath  
}
```
So yeah — recursion doesn't get all the fun here. [In particular][3], in our world as iOS developers it can also happen if:

* Caller and callee have the calling convention `fastcc`, `cc 10` (GHC calling convention) or `cc 11` (HiPE calling convention).
* The call is a tail call — in tail position (ret immediately follows call and ret uses value of call or is void). **This is our scenario.**
* Option `-tailcallopt` is enabled.
* Platform-specific constraints are met.
* No variable argument lists are used.
* On x86–64 when generating GOT/PIC code only module-local calls (visibility = hidden or protected) are supported.

### Opting Out

There are some use cases to disabling the magic here if you'd so choose. Namely, for the sake of profiling — you'll get a true, clean stack trace by turning this off.

Time Profiler will report the call stack as it appears with tail call elimination at work. Though, that's not the actual call sequence that happened — call tail optimization made it that way. If you want to really see how things went down, head over to your app's project settings in Xcode and set the following compiler flag:
```swift
CFLAGS='-fno-optimize-sibling-calls"
```
And then enjoy your bonafide results in time profiler.

### Wrapping Up

I went several years without knowing anything at all about tail call elimination. And guess what — it was all good. This information won't change your app's code base into a pristine case study, rather, it's just fun to learn about, ya know?

It makes me think of how our discipline is one of several carefully crafted abstractions, one on top of the other. And slowly, we keep peeling apart the layers and learning more and more about how our iOS software actually ticks.

Until next time ✌️.

[1]: https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/Instrument-TimeProfiler.html
[2]: https://developer.apple.com/videos/play/wwdc2015/412/
[3]: http://llvm.org/docs/CodeGenerator.html#tail-call-optimization