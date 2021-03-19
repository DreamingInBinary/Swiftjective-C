---
layout: post
tags: ["Snips"]
title: "Creating a Siri Shortcut"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Create a basic shortcut that will show in the Shortcuts app."
framework:  SiriKit
lastChecked: iOS 14
image: /assets/images/snips/snips.png
---
### The Scenario
Create a barebones Siri Shortcut that will be exposed in the Shortcuts app.

### The Breakdown
This example is unique in that there really isn't much code, but steps to take in Xcode.

**Step 1**<br />
Add an `Intents Extension` to your project: `File -> New -> Target.. -> Intents Extension`.

<br />**Step 2**<br />
Right click the new Intents extension folder that Xcode generated and add a `Intents Definition` file: `New File... -> Intents Definition`. 

<br />**Step 3**<br />
Select the new intent and add a new definition via the plus button:

{% include lazyLoadImage.html image="../assets/images/snip_cass_newintent.png" altText="Create a new intent" %}

Name it as a verb describing what you're trying to do with it. Here, we're just going to have Siri say a greeting
with a string that was passed in. So, I'll name mine "GenerateGreetingIntent".

<br />**Step 4**<br />
Select the new intent definition and in the Inspector pane, ensure its target membership _also_ includes your main app binary.

{% include lazyLoadImage.html image="../assets/images/snip_cass_membership.png" altText="Target Membership" %}

<br />**Step 5**<br />
Add a new parameter that's a string called "Name". 

{% include lazyLoadImage.html image="../assets/images/snip_cass_newParam.png" altText="Add Siri parameter" %}

Configure it as such:

- Uncheck "Options are provided dynamically".
- For `Siri Dialog -> Prompt:` enter "What's your name?"

<br />**Step 6**<br />
On the left, under "Custom Intents", you'll see our intent definition we made that we've been editing. Underneath, you'll see a `Response` type. Open that now to let SiriKit know what the shortcut will ulitmately result with when it finishes running. Think of this as a return type from a function.

For "Properties" we'll add a string called `generatedGreeting` and in the "Response Templates" we'll have Siri respond with that when the Shortcut succeeds:

{% include lazyLoadImage.html image="../assets/images/snip_cass_response.png" altText="Intent Response" %}

<br />**Step 7**<br />
Open the generated `IntentHandler.swift` file Xcode generated. If you don't have one, just add a new Swift file named the same thing.

Delete its entire contents and enter this:

```swift
import Intents

// Tell SiriKit who should handle this intent
class IntentHandler: INExtension {
    override func handler(for intent: INIntent) -> Any {
        return self
    }
}

// The actual code to handle the intent we've created
extension IntentHandler: GenerateGreetingIntentIntentHandling {
    func handle(intent: GenerateGreetingIntentIntent, completion: @escaping (GenerateGreetingIntentIntentResponse) -> Void) {
        let greeting = "Awesome Shortcut, \(intent.Name!)"
        completion(GenerateGreetingIntentIntentResponse.success(generatedGreeting: greeting))
    }
    
    func resolveName(for intent: GenerateGreetingIntentIntent, with completion: @escaping (INStringResolutionResult) -> Void) {
        completion(INStringResolutionResult.success(with: intent.Name ?? "Nameless Wonder"))
    }
}
```
Xcode can _really_ get confused here and not see the generated protocol for your intent. If that's the case, click on the intent again and in the inspector you can see the actual generated code by clicking on the arrow under `Custom Class` to open it, and then copy and paste the protocol name:

{% include lazyLoadImage.html image="../assets/images/snip_cass_generatedProtocol.png" altText="Generate Protocol" %}

If you still don't see it, the usual things typically work: clean the build folder, clear derived data or restart Xcode.

<br />**Step 8**<br />
Build and run your app, and in the simulator you should see a full working shortcut. My app in this case is called "MemGraph" so it'll show under that:

{% include lazyLoadImage.html image="../assets/images/snip_cass_result.png" altText="Siri Result" %}

And running it, we see the logic we entered in the intent handler _and_ the results we created in the intent's `Response` at work:

{% include lazyLoadImage.html image="../assets/images/snip_cass_done.png" altText="Siri Shortcut run" %}

Until next time ✌️