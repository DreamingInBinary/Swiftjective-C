---
layout: post
tags: ["The Indie Dev Diaries"]
title: "A Best in Class iOS App"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "What is a best in class iOS app? How are they built, and can we quantify what makes them great?"
image: /assets/images/logo.png
updated: "2020-07-07"
special: "true"
---

> Get the public Github Issue version of this list [here][31].

> Updated to reflect iOS 14.

For as long as I've been a part of this industry, I've watched incredible, well-deserving apps take home an Apple Design Award. And _that's_ my endgame. 

So, years ago, I set out to create a list that succinctly answers only one question:

**What things can I quantify that help make an app great?**

I believe I've created such a list that helps answer that question. Yours might look different, but this one is mine. It attempts to take all of the emotion and (mostly) opinions out of it. I want to capture what Apple says is great, not what other people may define it as. Though those opinions can assuredly be of value, they don't give out A.D.A.s - only Apple does.

Here's a quick brief on my methodology behind how I created it:

- First, and most importantly, I read iOS' Human Interface Guidelines annually from top to bottom after the GM releases of the upcoming version of iOS. This list applies to primarily the latest version of iOS and iPadOS.
-  Where there's smoke, there's fire. If Apple has said on record that "This is great" about an app, I include whatever that thing or interaction was. These things aren't clandestine trade secrets, but rather they are things that Apple or an Apple design evangelist publicly gave their seal of approval to.
-  Lastly, remember this is largely a "yes/no" list. As such, it's only part of the equation of what makes a truly great app. Innovation, technology and user experience all have to come together. It's about enriching people's day to day interactions with our apps, and knowing who uses them extremely well.
   
That's it. 

> As always, if you've got an item or two that belongs on this list, by all means create a pull request to get it added in by visiting the link at the bottom of the post.

The five sections it covers are:

1. **Accessibility:** Designing for everyone is the right thing to do, and the best apps do it and they do it exceptionally well.
2. **Platform Technology:** Apple loves it when apps utilize their new APIs to great effect, you should too. It's not about shoehorning features, it's about looking at your product and seeing how to utilize iOS around it.
3. **User Experience:** Don't make people think. Your app should have a core function that acts as a thesis to a paper - and your UX is the body that supports it.
4. **Design:** Explaining design is hard, but you know a good one when you see it. This section lists some things those apps which are thoughtfully created do.
5. **App Store Presence:** This is by far the most nascent category I've been tracking, so its list is short. It includes best practices for the App Store.

### Accessibility is First Class
- Voice Over is fully supported and the [rotor][29] control is implemented by including the relevant headings. Using Screen Curtain yields an experience that's not only usable, but up to par with the regular app using only Voice Over.
- [Voice Over gestures][2] are overridden where necessary:
    + **[Escape][3]**: A two-finger Z-shaped gesture that dismisses a modal dialog, or goes back one level in a navigation hierarchy.
        * `func accessibilityPerformEscape() -> Bool`
    + **[Magic Tap][4]**: A two-finger double-tap that performs the most-intended action.
        * `func accessibilityPerformMagicTap() -> Bool`
    + **[Three-Finger Scroll][5]**: A three-finger swipe that scrolls content vertically or horizontally.
        * `func accessibilityScroll(_ direction: UIAccessibilityScrollDirection) -> Bool`
    + **[Increment][6]**: A one-finger swipe up that increments a value in an element.
        * `func accessibilityIncrement()`
    + **[Decrement][7]**: A one-finger swipe down that decrements a value in an element.
        * `func accessibilityDecrement()`
- [Voice Control][1] is also supported, and appropriate [`accessibilityUserInputLabels`][30] are set if needed.
- Your app respects the following settings:
    + Including Bold Text.
    + High Contrast Cursors.
    + Reduce Transparency.
    + Dark Mode.
    + Reducing Motion.
- When presenting new controllers, you set the Voice Over Cursor to an [appropriate element][8] if the top-most left element doesn't make sense:
    `UIAccessibilityPostNotification(.screenChangedNotification, myHeading);`
- Context considering, you use `accessibilityIgnoresInvertColors` for images and video.
- If punctuation should be spoken in your accessibility text, you use an attributed string to set `accessibilitySpeechPunctuation` to `true`.
- You group content logically using accessibility containers for efficient navigation.
- Adaptive and supports all devices and multitasking scenarios elegantly.
- Fully supports dynamic type.
- Readable text uses `readableContentGuide`.
- Color blind support and a 7:1 color contrast ratio.
- Smart Invert Color Support and the app responds well to color inversion.
- All bar buttons have their landscapeImagePhone and largeContentSizeImage properties set.
- Controls are grouped in a way that makes navigation trivial with `shouldGroupAccessibilityChildren` if they aren't already.
- You use system vended items for common bar buttons, quick actions, tab and navigation bar items (i.e. such as save, done, etc.).
- All glyphs have their accessibility images set (i.e. `adjustsImageSizeForAccessibilityContentSizeCategory`).
- Includes closed captions and audio descriptions, all images and icons have alternative text set.
- Full rotor control support is provided via `UIAccessibilityCustomAction`.
- Leading and trailing margins are used for constraints to support left to right languages.
- If you've got UI that doesn't inherit from `UIView` or `UIControl`, you leverage [`UIAccessibilityElement`][34] to make it accessible if needed.
- If you include your own videos, you [add necessary subtitle and audio tracks][33].
- The User Interface appears flawlessly when tested using Double Length Pseudo-languages.
- Using `NSShowNonLocalizedStrings` yields no results.
- If you support drag and drop, [UIAccessibilityLocationDescriptors][9] are all set. You'll also leverage [`accessibilityDragSourceDescriptors`][27] and [`accessibilityDropPointDescriptors`][28].
- For modally presented views, there is a clear button available to dismiss it instead of relying solely on a swipe gesture.
- In iMessage Sticker extensions, accessibility labels are provided.
- Magic taps are supported for the app's most common functionality.
- It uses `CFBundleSpokenName` if the app's name could potentially be mispronounced by the system (i..e CoolApp23 would be "CoolApp Twenty Three").
- You only request permissions from iOS until you truly need them. From the HIG:
> "When your request is clearly related to the current context, you help people understand your app’s intentions."
- At the end of the day, you're considering and building for all of these accessibility technologies (some of these deal with Mac Catalyst):
    + Alternate pointer actions
    + Slow keys
    + Larger text
    + Header pointer
    + Speak screen
    + Guided access
    + Typing feedback
    + Full keyboard access
    + Assistive Touch
    + Reduce Motion
    + Voice Control
    + Reachability
    + Live Listen
    + RTT/TTY
    + Accessibility Keyboard
    + Zoom
    + Magnifier
    + VoiceOver
    + Sticky Keys
    + Switch Control
    + Speak Selection
    + Display Accommodations
    + Audio Descriptions
    + Mouse Keys
    + Hover Text
    + Large Text
    + Braille
    + Dwell
- From the above, the main things to address broadly are **Vision**, **Hearing**, **Physical and Motor** and **Literacy and Learning**.
- Lastly, running the entire app through Accessibility Inspector produced no warnings and turning on Screen Curtain to navigate the app works flawlessly.

### iOS Technology is Tightly Integrated
- Contextual menus are integrated for long presses, showing previews where appropriate.
    + Find a good balance on what to include. Having too many options can be overwhelming.
    + Use glyphs to reinforce each action's meaning.
- Edit menus are used in the right places, and don't conflict with a context menu.
- You opt for pull down style menus over action sheets, and use them to reduce modality throughout your app to keep the focus squarely on the content.
    + Action sheets are still used to confirm a destructive action. It provides enough friction to ensure the user really wants to perform the deletion.
    + You also don't include a cancel menu item. Canceling is an implicit action the system provides by tapping outside of the menu bounds.
    + You use menus for disambiguation, navigation, selection or showing more options.
    + You offer a menu to present more "power user" functionality when long pressing on bar buttons if necessary, in addition to providing the standard action for tapping them.
- It fully supports dark mode.
- Multiple spaces and scene support for iPadOS.
    + You leverage the idea of a primary window versus an auxiliary window. One provides access to your full feature set, while the other helps users complete a focused, singular task and is usually closed afterwards.
    + To handle notification routing to the right scene, you set a target content indentifier on either `UNNotificationContent`, `UIApplicationShortcutItem` or `NSUserActivity`.
- Full multitasking support.
- Home screen quick action support.
- If you offer a sign in, Sign in with Apple is included.
    + If you don't, offer [password autofill][22].
- Spotlight search and indexing support.
- You have custom `UIPointerInteraction` support if your app needs it, and your interface supports cursor support correctly.
    + You don't force any interaction paradigm over another (i.e. touch is as viable as pointer or keyboard, and vice-versa).
    + You use the correct content effects consistently (highlight, lift and hover).
- Effective energy management (i.e. supports low power mode and reacts to it).
- Keyboard shortcuts have been added. The app could be used almost, or completely, with solely the use of a keyboard.
    + Modifier keys along with mouse or pointer clicks are supported.
- It supports handoff on Mac (if applicable).
- Meaningful extensions are included with the app, whether it's via a share extension, action extension, file providers, sticker pack, custom keyboard, etc.
    + Those extensions are carefully thought out. For example, a widget isn't a mini app but strives to provide glanceable, actionable information.
    + Widgets: Small sizes only contain a max of up to four pieces on information.
- For table and collection view cells that make sense to focus, [`selectionFollowsFocus`][32] is set.
- Callback urls are supplied and documented so other apps may integrate with it (x-callback-url)/.
- `UIMenuController` support if necessary via overriding `UIResponderStandardEditActions`.
- You supply custom icons to enhance a user's personal connection to your app if they want it.
- If you display links, consider using [LPLinkView][10].
- Deep Siri Intent support:
    + You donate shortcut actions that the user has already taken.
    + You suggest shortcuts for the user's "Shortcuts from your Apps" section in the Shortcuts app by suggesting them to `INVoiceShortcutCenter`.
    + Integrate with Wind Down if it makes sense.
    + If you support more than a few shortcuts, include a UI to view them all.
    + Also include intent phrases to help coach users.
    + Alternate app names are included when appropriate.
    + Watchface support.
- If it makes sense, document sharing is supported via the file provider.
- Drag and drop has first class support:
    - A fully fleshed out `NSItemProvider` exists for custom objects.
    - Editable controls for data entry should also accept its contents via a drop.
    - This is used for reordering, should the app support it.
    - "If you can drag it, it can make a new window."
    - If data could be copied, moved, inserted or duplicated it should also do so via drag and drop.
- If it makes sense, data can be shared via AirDrop.
- Natural language processing support if necessary.
- All tab bar images are vector .pdf images or have each corresponding size included to ensure they adapt correctly and are vended to accessibility modals properly.
- Any displayed Live Photo will animate when force touched and utilize `PHLivePhotoImageView` for playback.
- For system specific features such as Live Photos or ARKit experiences, you use system badge to indicate they are available (i.e. a live photo or ARKit badge).
- If it makes sense, it supports printing via `UIPrintInteractionController`.
- There are no calls to `UIGraphicsBeginImageContextWithOptions`, and `UIGraphicsImageRenderer` is used instead.
- [Universal Links][11] are supported, especially if your app's content is available online.
- If you need to secure data, you opt to user [Touch or Face ID][23].
- You vend useful interactions for the current context via `UIActivity` and `UIActivityViewController`.
- If it's relevant for your app, you supply an App Clip.
- When you use system capabilities, such as ARKit, you lean on platform defined conventions to help users get started. For example, to get an ARKit experience started you'd typically use `ARCoachingOverlayView` instead of rolling your own solution.
- Finally, running the Analyze function in Xcode yields no errors, warnings or suggestions.

### The User Experience is Top of Mind
- Supports [native][12] "undo" and "redo" actions, typically from shaking or from the system defined gestures.
- The content type of all text views and text fields is included, and the correct keyboard type is used for the current context. The keyboard's language identifier is integrated correctly.
- You support [two finger drag to edit gestures][18] in table and collection views.
- If you're using a custom input view in place of keyboard, you provide the audible tap noise using `UIDevice.playInputClick()`.
- If you've got customized text inputs, you support `UIScribbleInteraction`.
- If you've customized the back button image for navigation controller, you've also set a [`backIndicatorTransitionMaskImage`][25].
- If you have searching capabilities, it [supports field tokens][19].
- Handles the keyboard being undocked on the iPad, if views are constrained to it via an `inputAccessoryView`.
- If data is quantifiable while data transfer is occurring, a progress indicator is used over an activity indicator.
- It's localized for all territories it's released in.
- Text tends to not truncate and it *never* clips but rather it's always readable.
- All tappable interface elements are at least 44 by 44 points.
- The entire app binary is under 30 megabytes. (_No source here, this is based off a multitude of data points._)
- Delete actions always are followed by a confirmation prompt.
- If your app stores rich information files like a Keynote presentation, it uses the Quick Look API to preview it.
- Robust `NSUserActivity` support for:
    + State restoration
    + Handoff
    + Drag and drop for creating new windows
    + Core spotlight
    + Donating to Siri for `INIntent`
- It uses the correct audio settings and responds to audio interruption gracefully, if audio can be played at all within it.
- Custom edit options are supported when text or an image is selected, if appropriate.
- The user is provided ample time to form an opinion about your app before you request a rating, and you opt for the built-in `SKStoreReviewController` to ask for it.
- The launch screen is branding free and closely resembles the first screen of the app.
- When displaying video using `AVplayerViewController` or your own player, you display content at its original aspect ratio and don't include extra padding around the frame which would cause the video the appear smaller in full-screen and fit-to-screen modes.
- Before opening a link that could lead to another app in a web view or `SFSafariViewController`, try calling `UIApplication`'s `openURL:` with the [`UIApplicationOpenURLOptionUniversalLinksOnly`][14] option first.
- Table views deselect selected rows in [viewDidAppear][15] when popping back to them.
- If you're loading in data, let the user know the progress of the operation either using [determinate or indeterminate views][20].
- Notifications supply a value for [hiddenPreviewsBodyPlaceholder][16] and a detail view.
    + You also consider using a short, memorable sound if it makes sense for the notification using `UNNotificationSound`.
    + You supply a detail view to expand on the context of the notification. If a user can accomplish the task within the notification without having to open the app, that's a good thing.
    + You also let users edit their notification preferences within your own app.
- `UITextInputAssistantItem` items are used to support common tasks on iPad that are at home within the shortcuts bar.
- When performing CRUD operations on a table or collection view, you opt to animate these changes using a diffable datasource instead of `reloadData`.
- Testing for leaks and freed memory is part of your workflow, as consuming an unnecessary amount of memory and power hampers everyone.
- If you have long running tasks, you keep the UI free and up to date by using [background tasks][17].
- When using system materials, you accompany the content contained within them with a matching vibrancy effect (i.e. you don't mix and match different semantic effects).
- You tend to use the system's semantic colors instead of hard coding your own. If you do have custom colors, they adapt to both light and dark mode, increased contrast and transparency reduction scenarios.
    + You also use semantic colors in a consistent way, and don't redefine their meaning (i.e. use Link for a label color).
- You defer from providing custom gestures towards the edge of the screen. If it's appropriate (such as for viewing media), you override [`preferredScreenEdgesDeferringSystemGestures`][24] as needed.
- If you have user interface elements constrained by the keyboard's frame, you handle situations where it may be undocked, floating or split.
- If you support `PencilKit`, include your own undo and redo buttons in a [compact environment][21].
    + Additionally, ensure the system-wide double tap gesture doesn't modify any content if it's been customized by your app.
- Navigation is clear and foolproof. You use either flat, hierarchical or content/UX driven navigation.
    + You use a sidebar to flatten your information hierarchy if it makes sense. For example, if you app has several folders, playlists or similar collections.
    + Using `UIPencilInteraction`, handle double tap actions.
    + If you use a tab bar, aim for 3-5 items. If you need the "More" tab, you're likely going in the wrong direction.
- Modality is used sparingly, and clearly brings them back to where they were when dismissed.
- Your design also considers text and your app's voice or messaging as part of the design and experience, and it stays consistent.
    + You don't mix playful error messages juxtaposed with serious ones.
    + iOS technology, or any other technical term, is made for anyone to understand (i.e. you'd use 'Scan the tag' instead of 'Activate NFC reading Session' or similar.).

## The Design Drips with Polish
- Correct system margins are used throughout the app, and no hard coded ones are used (i.e. layoutMarginsGuide, safeAreaLayoutGuide, etc.)
- Haptic feedback is used throughout the system to complement user interactions, and they are not overdone.
    + The right haptics are used at the right time. For example, you use `.selection` for only selection changes instead of something like `.rigid`.
    + For example, they often accompany visual and auditory feedback.
- You utilize SF Symbols for common iOS glyphs on apps running iOS 13 and later. You show the dedicated ones for system APIs (i.e. the glyphs exclusively for iCloud usage). 
    + If you use custom ones or custom glyphs, they adapt well to all environments.
- Controller transitions feel natural and fluid. Great examples are Calendar and Photos.
- You opt for vector assets to combat the differing resolutions and avoid any blurry assets.
- Your content is always the focus, and you constantly challenge if that's true throughout the development cycles.
- Particular and specific user experience guidelines are followed:
    - No segment controls are used in toolbars, and they have five or less options.
    - There are no toolbars and tab bars in the same screen.
    - Destructive actions are the top choice in action sheets.
    - Alerts, if used, ideally have to two choices and titles have no punctuation. They avoid using Yes and No as choices.
        + If you need more than two choices, you opt for an action sheet.
    - Any picker’s height is equal to about 5 list values.
    - If a progress indicator is in a bar, it should have the unfolded portion of the track clear. Otherwise, it is colored to denote the amount of work left to do.
    - Network activity indicators are only shown if the network requests lasts a few seconds or more.
    - Popovers on iPhones are avoided.
    - You discard work only when a user actively taps a "Cancel" button. For example, if someone taps outside of a popover - their work is saved.
    - Switches are exclusively used within a table (or a list style collection view) row.
    - Pages controls are always centered at the bottom of the screen.
- You aspire to ship on all of Apple's platforms (iOS iPhone + iPad, watchOS, tvOS and macOS).
- Animations are tasteful and reinforce, or introduce, actions. They aren't confusing and likely mimic real physical laws.
- In general, you reduce modality where possible to keep the focus on the content.
- You supply all high-resolution assets for images (@1/2/3x).
- You use the right asset format for a given scenario:
    + PNG for icons and bitmap/raster artwork.
    + JPEG for photos.
    + PDF for glyphs and vector artwork.
- Controller specific configurations are thoughtfully implemented:
    + Status bars are only hidden in exchange for equal value.
    + Pointer locking only occurs when it boosts the experience.
    + The home indicator is only hidden during rich media experiences.
- Full width buttons respect UIKit margins and don't extend edge to edge of the screen.
- Colors are used to denote value and purpose and don't provide mixed signals. For example, enabled and disabled controls aren't colored the same or a red triangle conveys a problem but only if red isn't used everywhere else in your app.
- If you create rich media apps or apps primarily used for reading and watching, you provide a sensible value for [`UIWhitePointAdaptivityStyle`][26] to adjust along with True Tone.
- You handle color management well, and ensure any P3 colors display fine on sRGB devices.
- Your app has a voice, and you use it consistently. For example, if your app strikes a formal tone, you wouldn't display an error message with text that's overtly out of place or humorous. 
- You opt to lean on system fonts to better support all sizes, improve legibility and consistency. If you have a custom font, it provides value and has a direct purpose for being used over system fonts. They also work with all weights and dynamic type sizes.
- Lastly, your app is "jank" free. You know what this means for you.

## App Store Page and Logistical Assets are Thoughtfully Crafted
- An App Store preview video is used.
- Its keywords and category were carefully researched.
- A link to a privacy policy is provided.
- Each supported territory is localized.
- The app icon follows the golden grid:
    - It likely should include your brand’s primary color as well.
    - It embraces simplicity and conveys your app's main idea.
    - You supply all the sizes needed for spotlight, settings, etc. Otherwise, iOS will shrink your App Store icon which won't be ideal.

### Wrapping Up
I love checklists. And this is my quality checklist that's constantly evolving. One of the main reasons I created Spend Stack was to see if I could get it in a state where it meets or exceeds almost every single bullet point. 

Certainly, quality takes time. If you nailed everything on this list, it's because you've been working towards them for years. If you aren't close to meeting the items listed here, no stress (it also means you probably shipped!). Take it piece by piece and work your way down.

And, as a wise honey-loving bear once said, "I get to where I'm going by walking away from where I've been." If your app might lack some polish, better now more than ever to spend some time giving it some.

Until next time ✌️.

[1]: https://developer.apple.com/documentation/objectivec/nsobject/3197989-accessibilityuserinputlabels?language=swift
[2]: https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/SupportingAccessibility.html
[3]: https://developer.apple.com/documentation/objectivec/nsobject/1615091-accessibilityperformescape
[4]: https://developer.apple.com/documentation/objectivec/nsobject/1615137-accessibilityperformmagictap
[5]: https://developer.apple.com/documentation/objectivec/nsobject/1615161-accessibilityscroll
[6]: https://developer.apple.com/documentation/objectivec/nsobject/1615076-accessibilityincrement
[7]: https://developer.apple.com/documentation/objectivec/nsobject/1615169-accessibilitydecrement
[8]: https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/SupportingAccessibility.html#//apple_ref/doc/uid/TP40007457-CH12-SW1
[9]: https://developer.apple.com/videos/play/wwdc2018/241/
[10]: https://developer.apple.com/documentation/linkpresentation/lplinkview
[11]: https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/WebContent.html#//apple_ref/doc/uid/TP40016308-CH8-SW1
[12]: https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/UndoArchitecture/UndoArchitecture.html
[13]: https://developer.apple.com/documentation/uikit/uiviewcontroller/restoring_your_app_s_state
[14]: https://recoursive.com/2019/02/22/preflight_universal_links/
[15]: https://gist.github.com/smileyborg/ec4812c146f575cd006d98d681108ba8
[16]: https://developer.apple.com/documentation/usernotifications/unnotificationcategory/2873736-hiddenpreviewsbodyplaceholder
[17]: https://developer.apple.com/documentation/backgroundtasks/
[18]: https://developer.apple.com/documentation/uikit/uitableviewdelegate/3183943-tableview?language=objc
[19]: https://developer.apple.com/documentation/uikit/uisearchtextfield
[20]: https://developer.apple.com/documentation/uikit/uiprogressview
[21]: https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/apple-pencil/
[22]: https://developer.apple.com/documentation/security/password_autofill/
[23]: https://developer.apple.com/documentation/localauthentication/labiometrytype
[24]: https://developer.apple.com/documentation/uikit/uiviewcontroller/2887512-preferredscreenedgesdeferringsys
[25]: https://sarunw.com/posts/what-is-backindicatortransitionmaskimage/?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=web&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B460
[26]: https://developer.apple.com/documentation/bundleresources/information_property_list/uiwhitepointadaptivitystyle
[27]: https://developer.apple.com/documentation/objectivec/nsobject/2891001-accessibilitydragsourcedescripto
[28]: https://developer.apple.com/documentation/objectivec/nsobject/2891048-accessibilitydroppointdescriptor
[29]: https://developer.apple.com/documentation/uikit/uiaccessibilitycustomrotor
[30]: https://developer.apple.com/documentation/objectivec/nsobject/3197989-accessibilityuserinputlabels?language=objc
[31]: https://gist.github.com/DreamingInBinary/0ccd49e3578c5ae1ebb20632c6c3af73
[32]: https://developer.apple.com/documentation/uikit/uicollectionview/3573920-selectionfollowsfocus
[33]: https://developer.apple.com/documentation/avfoundation/media_playback_and_selection/adding_subtitles_and_alternative_audio_tracks
[34]: https://developer.apple.com/documentation/uikit/uiaccessibilityelement

