---
layout: post
tags: ["The Indie Dev Diaries"]
title: "A Best In Class App: Spend Stack Checkup"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "I've often written about what it takes to be considered a best in class app on iOS. So, how am I doing personally according to my own definition?"
image: /assets/images/logo.png
---

**Update:** Spend Stack was acquired, so this list is no longer being updated. But, here's where I left off!

Previously, I've written about this notion of what it looks like to be a [best in class iOS app][1]{:target="_blank"}. I wanted a tangible, written down list that I could reference to gauge whether or not I was being a good platform citizen with my own apps.

Now, months later - how am I doing by my own definition? Let's take a look at where I stand. The grades below have been pulled from the Best in Class post, but some have been altered, added or left out to only include items that can be answered with a yes or no answer as it pertains to Spend Stack.

{% include prettyBlockquote.html text="With each subsequent release, I'll be updating my progress." %}

<div class="infoContainer">
    <small>So far, Spend Stack is...</small>
    <b style="font-size: calc(36px + 1.5vw);">55%</b>
    <small>...of the way towards a best in class app (48/87).</small>
    <div class="centerFlex">
        <div class="smallInfoContainer">
            <b>Accessibility</b>
            <small>47% (9/19)</small>
        </div>
        <div class="smallInfoContainer">
            <b>Platform</b>
            <small>39% (11/28)</small>
        </div>
        <div class="smallInfoContainer">
            <b>U.X.</b>
            <small>80% (16/20)</small>
        </div>
        <div class="smallInfoContainer">
            <b>Design</b>
            <small>77% (10/13)</small>
        </div>
        <div class="smallInfoContainer">
            <b>App Store</b>
            <small>50% (2/4)</small>
        </div>
    </div>
</div>


### Accessibility
◎ Voice Over fully supported. <br />
◎ Voice Control fully supported. <br />
◎ Voice Over Gestures supported where needed (Magic tap, escape, etc.) <br />
◎ `accessibilityIgnoresInvertColors` where needed. <br />
◉ Respects reduced motion and blurring where needed. <br />
◉ Adaptive to all content sizes (i.e. dynamic type). <br />
◉ Uses `readableContentGuide` for view that are predominantly text based. <br />
◎ Color contrast is 7:1 or better. <br />
◉ Supported smart color inversion elegantly. <br />
◉ Bar button items supply a crisp landscape and large content size image. <br />
◉ Glyphs have their `adjustsImageSizeForAccessibilityContentSizeCategory` set. <br />
◉ Includes closed captions and audio descriptions, all images and icons have alternative text set. <br />
◎ Leading and trailing margins are used for constraints to support left to right languages.  <br />
◎ The User Interface appears flawlessly when tested using Double Length Pseudo-languages.  <br />
◉ Using `NSShowNonLocalizedStrings` yields no results.  <br />
◎ If you support drag and drop, `UIAccessibilityLocationDescriptors` are all set.  <br />
◎ Magic taps are supported for the app’s most common functionality.  <br />
◉ It uses `CFBundleSpokenName` if the app’s name could potentially be mispronounced by the system (i..e CoolApp23 would be “CoolApp Twenty Three”).  <br />
◎ Lastly, running the entire app through Accessibility Inspector produced no warnings and turning on Screen Curtain to navigate the app works flawlessly.  <br />

**Accessibility: 9/19 - 47%**

### Platform Technology
◉ Contextual interactions supported (Control previews, home shortcuts, quick actions and interaction delegate for unique experiences). <br />
◎ Spotlight search and indexing support. <br />
◉ Effective energy management (i.e. supports low power mode and reacts to it) <br />
◎ Keyboard shortcuts have been added. The app could be used almost, or completely, with solely the use of a keyboard. <br />
◎ It supports handoff on Mac (if applicable). <br />
◎ Meaningful extensions are included with the app, whether it’s via a share extension, action extension, etc.<br />
◎ Callback urls are supplied and documented so other apps may integrate with it (x-callback-url)/. <br />
◎ Siri Intent support, when plausible: <br />
◎ Siri Shortcuts also include intent phrases to help coach users <br />
◎ Alternate app names are included when appropriate <br />
◎ Watchface support <br />
◎ If it makes sense, document sharing is supported via the file provider. <br />
◉ Drag and drop has first class support: <br />
    ◎ A fully fleshed out NSItemProvider exists for custom objects. <br />
    ◉ Purposeful external and internal app drag support. <br />
    ◉ This is used for reordering, should the app support it. <br />
◎ If it makes sense, data can be shared via AirDrop. <br />
◉ All tab bar images are vector .pdf images or have each corresponding size included to ensure they adapt correctly and are vended to accessibility modals properly. <br />
◎ Any displayed Live Photo will animate when force touched and utilize PHLivePhotoImageView for playback. <br />
    ◎ Each image also shows their system badge if available (i.e. live photo badges). <br />
◉ Supports printing via `UIPrintInteractionController`. <br />
◎ Has Siri Shortcuts supported or donated. <br />
    ◎ Rich Siri Shortcuts support with parameters.
◎ Running the Analyze function in Xcode yields no errors, warnings or suggestions. <br />
◉ There are no calls to` UIGraphicsBeginImageContextWithOptions`, and `UIGraphicsImageRenderer` is used instead. <br />
◎ Universal Links are supported, especially if your app’s content is available online. <br />
◉ Modern multitasking is supported (slide over, split view and PiP). <br />
◉ Multiple windows is supported on iPadOS. <br />
◉ If it can be dragged, it can make a new window. <br />

**Platform Technology: 11/28 - 39%**

### User Experience
◉ Supports native “undo” and “redo” actions, typically from shaking or from the iOS 13 gestures. <br />
◉ The content type of all text views and text fields is included, and the correct keyboard type is used for the current context. 
◉ The keyboard’s language identifier is integrated correctly. <br />
◎  Handles the keyboard being undocked on the iPad, if views are constrained to it via an inputAccessoryView. <br />
◉ It’s localized and internationalized for all territories it’s released in. <br />
◉ Text tends to not truncate and it never clips but rather it’s always readable. <br />
◉ All tappable interface elements are at least 44 by 44 points. <br />
◉ The entire app binary is under 30 megabytes. (No source here, this is based off a multitude of data points.) <br />
◉ Delete actions always are followed by a confirmation prompt. <br />
◎ If your app stores rich information files like a Keynote presentation, it uses the Quick Look API to preview it. <br />
◎ State restoration is implemented via `NSUserActivity` APIs for scenes. <br />
◉ It uses the correct audio settings, if audio can be played at all within it. <br />
◉ Custom edit options are supported when text or an image is selected, if appropriate. <br />
◉ The user is provided ample time to form an opinion about your app before you request a rating for it. <br />
◉ The launch screen is branding free and closely resembles the first screen of the app. <br />
◎ Before opening a link that could lead to another app in a web view or `SFSafariViewController`, try calling `UIApplication’s openURL:` with the `UIApplicationOpenURLOptionUniversalLinksOnlyoption` first. <br />
◉ Table views deselect selected rows in `viewDidAppear` when popping back to them.<br />
◎ `UITextInputAssistantItem` items are used to support common tasks on iPad that are at home within the shortcuts bar. <br />
◉ When performing CRUD operations on a table or collection view, you opt to use `performBatchUpdates:`` instead of `reloadData`. <br />
◉ Testing for leaks and freed memory is part of your workflow, as consuming an unnecessary amount of memory and power hampers everyone. <br />
◉ Navigation is clear and foolproof: 
    - Modality is used sparingly, and clearly brings them back to where they were when dismissed.

**User Experience: 16/20 - 74%**

### Design
◉ Correct system margins are used throughout the app, and no hard coded ones are used (i.e. layoutMarginsGuide, safeAreaLayoutGuide, etc.)  <br />
◉ Haptic feedback is used throughout the system to complement user interactions, and they are not overdone.  <br />
◉ Controller transitions feel natural and fluid. Great examples are Calendar and Photos.  <br />
◉ You opt for vector assets to combat the differing resolutions and avoid any blurry assets.  <br />
◉ Your content is always the focus, and you constantly challenge if that’s true throughout the development cycles.  <br />
◉ No segment controls are used in toolbars.  <br />
◉ There are no toolbars and tab bars in the same screen.  <br />
◉ Destructive actions are the last choice in action sheets.  <br />
◉ Alerts, if used, ideally have to two choices and titles have no punctuation.  <br />
◎ Alerts avoid using Yes and No as choices.  <br />
◉ Switches are exclusively used within a table row.  <br />
◎ You aspire to ship on all of Apple’s platforms (iOS iPhone + iPad, watchOS, tvOS and macOS).  <br />
◎ Lastly, your app is “jank” free. You know what this means for you.  <br />

**Design: 10/13 - 77%**

### App Store Presence
◎ An App Store preview video is used. <br />
◎ Its keywords and category were carefully researched. <br />
◉ The app icon follows the golden grid. <br />
◉ The icon follows your brand’s primary color as well. <br />

**App Store Presence: 2/4 - 50%**

### Final Thoughts
No app is perfect, and no app can check off all of the boxes you want. But it's motivating to have a goal to shoot for, and this list is mine. When it's all done, I'll feel extremely proud to have my name behind Spend Stack.

Here's to creating quality software, and this list being completely checked off sooner rather than later!

Until next time ✌️.

[1]: {{ site.url | append:"/A-Best-in-Class-App"}}
[2]: https://twitter.com/JordanMorgan10/status/1185565237510070272?s=20

