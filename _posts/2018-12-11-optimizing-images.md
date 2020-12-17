---
layout: post
tags: ["Image IO"]
title: "Optimizing Images"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "iOS is a visual medium teeming with beautiful images in virtually every app on your phone. Important though they are, it's trivial to mismanage them from a memory and performance standpoint."
image: /assets/images/logo.png
special: "true"
prettyTitle: "Optimizing Images"
---

They say the best camera is the one you have with you. If that adage holds any weight, then without question - stem to stern the iPhone is the most important camera on the planet. And our industry shows it, too.

On a vacation? It didn't happen if it's not documented on your Instagram story with several candid shots.

Breaking news? Check Twitter and see what outlets are reporting on by peeping their photos of an event unfolding in real time.

Etcetera.

But for all of their ubiquity on the platform, the act of showing them in a performant and memory conservative manner can easily turn into a mismanaged endeavor. With a little know how as to what's happening in UIKit and why in regards to how it treats images, one can gain some massive savings and forgo the unrelenting wrath of jetsam.

### In Theory
Pop quiz - how much memory will this 266 kilobyte (and quite dashing) photo of my beautiful daughter require in an iOS app?

![Baylor](../assets/images/baylor.jpg)

Spoiler alert - it's not 266 kilobytes. It's not 2.66 megabytes. It's around _14 megabytes_. 

Why?

iOS essentially derives its memory hit from an image's *dimensions* - whereas the actual file size has much less to do with it. And the dimensions for this photo sit at 1718 pixels wide by 2048 pixels tall. Assuming each pixel will cost us four bytes:

```swift
1718 * 2048 * 4 / 1024 / 1024 = 13.42 megabytes give or take
```
Imagine if you've got a table view with a list of users, and each row shows the now pervasive circle avatar of their photo to the left. If you're thinking things are kosher because each one has been packed up nice and tight from ImageOptim or something similar, that might not be the case. If each one is a conservative 256x256 you could still be taking quite a hit on memory.

### The Rendering Pipeline
All that to say - it's worth knowing what's going on under the hood. When you load up an image, it's going to be processed in three steps:

1) **Load** - iOS takes the compressed image and loads (in our example) the 266 kilobyte into memory. Really no worries yet.<br />
2) **Decode** - Now, iOS takes the image and converts into a way the GPU can read and understand. It's now uncompressed, and it's here we're at the 14MB size listed above. <br />
3) **Render** - Just like it sounds, the image data is ready and willing to be rendered any which way. Even if it's just by a 60 by 60 point image view.<br />

The decoding phase is the big one. Here, iOS has created a buffer - specifically an image buffer, that's got an in-memory representation of the image. So it stands to reason that this size is intrinsically tied to the proportions of the image itself and not its file size. This paints a clear picture of why the dimensions are so important when it comes to your memory consumption when working with images.

For `UIImage` in particular, when we give it image data we received from a network hit or some other source, it decodes that data buffer to whatever compression the data says it's encoded in (think PNG or JPEG). However, it'll actually hang onto it as well. Since rendering is not a one shot operation, the `UIImage` keeps that image buffer around so it's only decoding things one time.

Expanding on this idea - one integral buffer for any iOS app is its frame buffer. This is what's responsible for actually showing your iOS app as it appears on screen since it holds the rendered output of its contents. The display hardware on any iOS device uses this per-pixel information to literally illuminate the very pixels on the physical screen.

And timing matters here. To get the buttery smooth 60 frames per second scrolling, the frame buffer will need to have UIKit render the app's window and it's subsequent subviews into it when their information changes (i.e. assigning an image to an image view). If you do that slow, you drop a frame.

> Think 1/60th of a second is short on time? Pro Motion devices up the ante to 1/120th of a second.

### Size Does Matter
We can visualize this process and memory being consumed pretty easily. Using the picture of my daughter, I created a trivial app that shows an image view with that exact image within it:

```swift
let filePath = Bundle.main.path(forResource:"baylor", ofType: "jpg")!
let url = NSURL(fileURLWithPath: filePath)
let fileImage = UIImage(contentsOfFile: filePath)

// Image view
let imageView = UIImageView(image: fileImage)
imageView.translatesAutoresizingMaskIntoConstraints = false
imageView.contentMode = .scaleAspectFit
imageView.widthAnchor.constraint(equalToConstant: 300).isActive = true
imageView.heightAnchor.constraint(equalToConstant: 400).isActive = true

view.addSubview(imageView)
imageView.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
imageView.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
```

> Mind the force unwraps in production. Here we're using a simple example scenario.

Which gives us this:
![Baylor](../assets/images/baylorPhone.jpg)

A quick trip to LLDB shows us the image dimensions we're working with, even though we're using a much smaller image view to display it:

```swift
<UIImage: 0x600003d41a40>, {1718, 2048}
```

A remember - that's in _points_. So if I'm on a 3x or 2x device then you could potentially multiply that number even more so. Let's take a quick trip down `vmmap` to see if we can confirm that around 14 megabytes are being used from this one image:

```swift
vmmap --summary baylor.memgraph
```

A few things stick out (truncated for brevity):

```swift
Physical footprint:         69.5M
Physical footprint (peak):  69.7M
```

We're sitting at almost 70 megabytes which gives us a nice baseline to confirm any refactor against. If we grep down into Image IO we can likely see some of the cost of our image as well:

```swift
vmmap --summary baylor.memgraph | grep "Image IO"

Image IO  13.4M   13.4M   13.4M    0K  0K  0K   0K  2 
```

Ah - there's about 14 megabytes of dirty memory right there. That's what our back-of-the-napkin math hypothesized our image would cost. For context, here's a quick screenshot of Terminal to clearly illustrate what each column means since they were omitted from our greppin':

![Baylor](../assets/images/vmmap.jpg)

So clearly, we're paying the full cost of the image in our 300 x 400 image view at this point. The size of the image can be key, but it's also not the only thing that matters.

### Color Space
Part of the memory you'll be requesting for is determined by yet another important factor - the color space. In the example above we made an assumption that likely isn't the case with most iPhones - that the image was utilizing the sRGB format. The 4 bytes per pixel is figured up by giving one byte for red, blue, green and the alpha component. 

If you're shooting with a device that supports the wide color format (for example, an iPhone 8+ or iPhone X) then you likely can double the hit across the board. Of course, the reverse is true as well. Metal can use the Alpha 8 format which has only a single channel to its name.

It can be a lot to manage and think about. This is one reason why you should use [UIGraphicsImageRenderer][1]{:target="_blank"} instead of `UIGraphicsBeginImageContextWithOptions`. The latter will _always_ use sRGB which means you could miss the wide format if you [want it](https://instagram-engineering.com/bringing-wide-color-to-instagram-5a5481802d7d){:target="_blank"}, or miss out on the savings if you're going smaller. As of iOS 12, `UIGraphicsImageRenderer` is going to pick the right one for you.

Lest we forget, a lot of images that crop up aren't really of the photographed variety but rather trivial drawing operations. Not to rehash what I wrote about recently, but in case you missed it:

```swift
let circleSize = CGSize(width: 60, height: 60)

UIGraphicsBeginImageContextWithOptions(circleSize, true, 0)

// Draw a circle
let ctx = UIGraphicsGetCurrentContext()!
UIColor.red.setFill()
ctx.setFillColor(UIColor.red.cgColor)
ctx.addEllipse(in: CGRect(x: 0, y: 0, width: circleSize.width, height: circleSize.height))
ctx.drawPath(using: .fill)

let circleImage = UIGraphicsGetImageFromCurrentImageContext()
UIGraphicsEndImageContext()
```
This circle image above is using a 4 byte per pixel format. If you roll with `UIGraphicsImageRenderer` you can potentially open things up for up to a 75% savings by getting 1 byte per pixel by letting the renderer opt into the correct format automatically:

```swift
let circleSize = CGSize(width: 60, height: 60)
let renderer = UIGraphicsImageRenderer(bounds: CGRect(x: 0, y: 0, width: circleSize.width, height: circleSize.height))

let circleImage = renderer.image{ ctx in
    UIColor.red.setFill()
    ctx.cgContext.setFillColor(UIColor.red.cgColor)
    ctx.cgContext.addEllipse(in: CGRect(x: 0, y: 0, width: circleSize.width, height: circleSize.height))
    ctx.cgContext.drawPath(using: .fill)
}
```

### Downscaling vs Downsampling
Moving past simple drawing scenarios - a lot of the issues with images and their impact on memory originate from the typical photos that we associate with the actual art of photography. Think portraits, landscape shots and more. 

It stands to reason that some engineers might assume (and, logically so) that simply downscaling them via `UIImage` will suffice. But it typically won't due to the reasons above, and it's also not as performant due to internal coordinate space transforms according to Apple's Kyle Howarth.

`UIImage` becomes an issue here primarily because it will decompress the _original image_ into memory as we discussed when looking at the rendering pipeline. We need a way to reduce the size of our image buffer, ideally.

Thankfully, it's possible to resize the images at the cost of the actual resized image only, which is what one might assume is happening already when it typically isn't.

Let's try dropping down into a lower level API to downsample it instead:

```swift
let imageSource = CGImageSourceCreateWithURL(url, nil)!
let options: [NSString:Any] = [kCGImageSourceThumbnailMaxPixelSize:400,
                               kCGImageSourceCreateThumbnailFromImageAlways:true]

if let scaledImage = CGImageSourceCreateThumbnailAtIndex(imageSource, 0, options as CFDictionary) {
    let imageView = UIImageView(image: UIImage(cgImage: scaledImage))
    
    imageView.translatesAutoresizingMaskIntoConstraints = false
    imageView.contentMode = .scaleAspectFit
    imageView.widthAnchor.constraint(equalToConstant: 300).isActive = true
    imageView.heightAnchor.constraint(equalToConstant: 400).isActive = true
    
    view.addSubview(imageView)
    imageView.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
    imageView.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
}
```

Display wise, we've got the exact same result as before. But here, we're using `CGImageSourceCreateThumbnailAtIndex()` instead of just putting the vanilla image into the image view. The source of truth will lie within `vmmap` once more to see if our optimizations have paid off (again, truncated for brevity):

```swift
vmmap -summary baylorOptimized.memgraph

Physical footprint:         56.3M
Physical footprint (peak):  56.7M
```

And the savings have rolled in. If we compare the 69.5M from before to the 56.3M now we get a savings of 13.2M. That's a _huge_ savings, almost the whole cost of the image.

Further, you can play around with the many options available to hone things for your use case. In session 219, "Images and Graphics Best Practices" from WWDC 18, Apple engineer Kyle Sluder showed an interesting way to control when decoding happens by using the `kCGImageSourceShouldCacheImmediately` flag:

```swift
func downsampleImage(at URL:NSURL, maxSize:Float) -> UIImage
{
    let sourceOptions = [kCGImageSourceShouldCache:false] as CFDictionary
    let source = CGImageSourceCreateWithURL(URL as CFURL, sourceOptions)!
    let downsampleOptions = [kCGImageSourceCreateThumbnailFromImageAlways:true,
                             kCGImageSourceThumbnailMaxPixelSize:maxSize
                             kCGImageSourceShouldCacheImmediately:true,
                             kCGImageSourceCreateThumbnailWithTransform:true,
                             ] as CFDictionary
    
    let downsampledImage = CGImageSourceCreateThumbnailAtIndex(source, 0, downsampleOptions)!
    
    return UIImage(cgImage: downsampledImage)
}
```

Here Core Graphics won't bother decoding the image until you specifically ask for the thumbnail. Also, take care to pass `kCGImageSourceCreateThumbnailMaxPixelSize` as we've done in both examples because if you don't - you're getting back a thumbnail which is the same size of the image. From the docs:

> "...if a maximum pixel size isn't specified, then the thumbnail will be the size of the full image, which probably isn't what you want."

So what happened? In short, we created a much smaller decoded image buffer than before by putting the shrinking part of equation into a thumbnail. Thinking back on our rendering pipeline, for the first part (the load) we instead passed an image buffer that represented only the size of the image view we're showing it in instead of reflecting the entire image's dimensions for the `UIImage` to decode.

Want a TL;DR for this entire article? Look for opportunities to downsample images instead of using `UIImage` to downscale them.

### Bonus Points
I personally use this in tandem with the [prefetch API](https://developer.apple.com/documentation/uikit/uitableviewdatasourceprefetching?language=swift) introduced in iOS 11. Remember that we're inherently introducing spikes in CPU usage since we're decoding images even if we're doing it ahead of when the table or collection view might need our cell. 

Since iOS is efficient at managing power demand when there is a constant need for it and in this case it'll likely be intermittent, it's good to hop on your own queue to tackle something like this. This also moves the decoding to the background, which is another significant win.

Cover your eyes, Objective-C code sample from my side project incoming:

```swift
// Use your own queue instead of a global async one to avoid potential thread explosion
- (void)tableView:(UITableView *)tableView prefetchRowsAtIndexPaths:(NSArray<NSIndexPath *> *)indexPaths
{
    if (self.downsampledImage != nil || 
        self.listItem.mediaAssetData == nil) return;
    
    NSIndexPath *mediaIndexPath = [NSIndexPath indexPathForRow:0
                                                     inSection:SECTION_MEDIA];
    if ([indexPaths containsObject:mediaIndexPath])
    {
        CGFloat scale = tableView.traitCollection.displayScale;
        CGFloat maxPixelSize = (tableView.width - SSSpacingJumboMargin) * scale;
        
        dispatch_async(self.downsampleQueue, ^{
            // Downsample
            self.downsampledImage = [UIImage downsampledImageFromData:self.listItem.mediaAssetData
                               scale:scale
                        maxPixelSize:maxPixelSize];
            
            dispatch_async(dispatch_get_main_queue(), ^ {
                self.listItem.downsampledMediaImage = self.downsampledImage;
            });
        });
    }
}
```

> Take care to use asset catalogs for the lion's share of your raw image assets, since it already manages buffer sizes (and a lot more) for you already.

For more inspiration on how to be a first class citizen of all things memory and images, be sure to catch these particularly informative sessions from WWDC 18:

- [iOS Memory Deep Dive][2]{:target="_blank"}
- [Images and Graphics Best Practices][3]{:target="_blank"}

### Wrapping Up
You don't know what you don't know. And in programming, you're basically signing up for an entire career of always running 10,000 miles an hour just to keep pace with the innovations and change. Which means... there's going to be a mountain of APIs, frameworks, patterns or optimizations you simply weren't aware of. 

And that can certainly be true with images. Most of the time, you initialize a `UIImageView` with some beautiful pixels and move on. I get it, Moore's Law and whatever. These phones are fast and have gigs of memory, and hey - we put humans on the Moon with a computer that had less than 100 kilobytes of memory. 

But dance with the devil long enough, and he's bound to rear his horns. Don't let jetsam pluck you from existence because a selfie took up 1 gigabyte of memory. Hopefully, this knowledge and these techniques can you save you a trip down the crash logs.

Until next time ✌️.

[1]: {{ site.url | append:"/UIGraphicsImageRenderer" }}
[2]: https://developer.apple.com/videos/play/wwdc2018/416/?time=1074
[3]: https://developer.apple.com/videos/play/wwdc2018/219/
