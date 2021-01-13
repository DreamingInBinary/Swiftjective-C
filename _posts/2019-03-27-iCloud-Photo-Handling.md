---
layout: post
tags: ["Photos"]
title: "Handling iCloud Assets"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Rich media plays an important role in the mobile ecosystem. Working with them when they're located off-site requires some nuance."
image: /assets/images/logo.png
---
There is a reason Cupertino & Friends© encourage us to leverage UIKit and its components in our own apps. 

They have a decade's worth of talent and hardening baked right into them. While you should stray from a mechanism that can undermine your own structure, sometimes you just need to roll up your sleeves, toss Apple's preheated solutions to the side and do it yourself. Building your own version of component X or Y is fatalistic in software development, after all.

That's where we find ourselves this week. While `UIImagePickerController` has a lot baked in and should be used most of the time, this post is about that _other_ time. 

And, if you find yourself building a media picker, fetching assets found in iCloud can be deceptively tricky.

### Fetch Options
Everything in the Photos framework is generally vended via a manager singleton (i.e. `PHImageManager`, `PHCachingImageManager`) - and what you want to retrieve from them is specified in from an optional options object, `PHFetchOptions`.

Generally, if you ran this code and saw images getting piped back to you - it'd be easy to call it a day:

```swift
// In viewDidLoad
let mostRecentMedia = PHFetchOptions()
mostRecentMedia.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: true)]
let allPhotos:PHFetchResult = PHAsset.fetchAssets(with: mostRecentMedia)

// In a cellForRow for a collection or table view
let asset = allPhotos.object(at: indexPath.item)
let size = CGSize(width: 80, height: 80)

PHCachingImageManager().requestImage(for: asset, targetSize: size, contentMode: .aspectFill, options: nil, resultHandler: { image, _ in
    // Ensure we're dealing with the same cell when the asset returns
    // In case its since been recycled
    if cell.localAssetID == asset.localIdentifier 
    {
        cell.theImageViewImage = image
    }
})
```
While the Photos Framework does benefit from sensible API design, it's a somewhat hidden forgone conclusion that media living in iCloud will be staying there from the previous code sample. Adding to the possible confusion is that they will technically appear from the fetch, as their corresponding `PHAsset` will be returned - it's just that looking for the media yields no result:

```swift
PHCachingImageManager().requestImage(for: asset, targetSize: size, contentMode: .aspectFill, options: nil, resultHandler: { image, _ in
    if cell.localAssetID == asset.localIdentifier 
    {
        // Media found in iCloud will report a nil result for the image here
        cell.theImageViewImage = image
    }
})
```
Considering fetching an image's common use case, such as displaying them in a grid, you can add other common bugs to this scenario as well such as cell reuse. 

Lipso facto - if you ran this code and saw no images being populated even though assets were being fetched, it can be hard to know where to look.

### In the Clouds
The first step to solving a problem isn't really admitting you have one in programming, it's identifying really what you're trying to solve to begin with. And here, we need to know how to identify which assets are indeed housed within iCloud and not yet on the device.

Hitting the Googles can yield some straight up wild solutions, partly due to the fact that Apple doesn't have a simple `isIniCloud` boolean to indicate as much. The answer for us is housed within the `info` dictionary that pervades much of UIKit's closures.

For our previous fetch, we can reliably know if the asset is in iCloud via the `PHImageResultIsInCloudKey` key that will be returned in the aforementioned dictionary:

```swift
PHCachingImageManager().requestImage(for: asset, targetSize: size, contentMode: .aspectFill, options: nil, resultHandler: { image, info in
    if cell.localAssetID == asset.localIdentifier 
    {
        guard let img = image else 
        { 
            if let isIniCloud = info?[PHImageResultIsInCloudKey] as? NSNumber, isIniCloud.boolValue == true
            {
                cell.showLoadingFromCloudUI()
            }

            return
        }

        cell.theImageViewImage = img
    }
})
```

Now, we've provided clarity to the user to at least know why media isn't displaying for a particular item. Progress.

### Hot Reloads
Assuming we're in a collection or table view situation here, what we'd see now is that we've identified the asset is in iCloud, and we could even track its progression and see it successfully download. As with the fetch, we can get this done by using another options construct, namely `PHImageRequestOptions`:

```swift
let reqOptions = PHImageRequestOptions()
reqOptions.isNetworkAccessAllowed = true
reqOptions.progressHandler = { (progress, error, stop, info) in
    print("Asset download progress is at \(progress)")
}

PHCachingImageManager().requestImage(for: asset, targetSize: size, contentMode: .aspectFill, options: reqOptions, resultHandler: { image, info in
    if cell.localAssetID == asset.localIdentifier 
    {
        guard let img = image else 
        { 
            if let isIniCloud = info?[PHImageResultIsInCloudKey] as? NSNumber, isIniCloud.boolValue == true
            {
                cell.showLoadingFromCloudUI()
            }

            return
        }

        cell.theImageViewImage = img
    }
})
```

{% include prettyBlockquote.html text="Though documentation states that one needs to set `isNetworkAccessAllowed`
to `true` for this to work, I've seen it done without using it." %}

One could be potentially flummoxed if they were to see these downloads complete, yet their asset request doesn't do anything after the fact. Do you need to request the asset again? Why would it show up if you were to scroll the collection or table view up and down again?

1. Yes, and no.
2. It would, because now the asset is in memory.

The answer to this scenario is in the docs, but it's a blink and you'll miss it comment at the end of a document describing how to request user access to media:

{% include prettyBlockquote.html text="Use the register(_:) method to observe photo library changes before fetching content. After the user grants your app access to the photo library, Photos sends change messages for any empty fetch results you retrieved earlier, notifying you that library content for those fetches is now available." %}

Photo libraries can mutate at any point, so the key for developers who are making their home baked media picker is to react to those changes. You can do so by adopting the `PHPhotoLibraryChangeObserver` protocol and implementing only one method. 

Before we go and snag media from the user, it's pertinent to register for changes in the library first:

```swift
PHPhotoLibrary.shared().register(self)
```

...and then adopt `func photoLibraryDidChange(_ changeInstance: PHChange)`. As I'm not one to reinvent the wheel, Apple has a perfect example of how #todothisright within their Photos documentation:

```swift
func photoLibraryDidChange(_ changeInstance: PHChange) 
{
    guard let changes = changeInstance.changeDetails(for: fetchResult)
        else { return }

    // Change notifications may originate from a background queue.
    // As such, re-dispatch execution to the main queue before acting
    // on the change, so you can update the UI.
    DispatchQueue.main.sync 
    {
        // Hang on to the new fetch result.
        fetchResult = changes.fetchResultAfterChanges

        // If we have incremental changes, animate them in the collection view.
        if changes.hasIncrementalChanges 
        {
            guard let collectionView = self.collectionView else { fatalError() }
            // Handle removals, insertions, and moves in a batch update.
            collectionView.performBatchUpdates({
                if let removed = changes.removedIndexes, !removed.isEmpty 
                {
                    collectionView.deleteItems(at: removed.map({ IndexPath(item: $0, section: 0) }))
                }
                if let inserted = changes.insertedIndexes, !inserted.isEmpty 
                {
                    collectionView.insertItems(at: inserted.map({ IndexPath(item: $0, section: 0) }))
                }
                changes.enumerateMoves { fromIndex, toIndex in
                    collectionView.moveItem(at: IndexPath(item: fromIndex, section: 0),
                                            to: IndexPath(item: toIndex, section: 0))
                }
            })
            // We are reloading items after the batch update since `PHFetchResultChangeDetails.changedIndexes` refers to
            // items in the *after* state and not the *before* state as expected by `performBatchUpdates(_:completion:)`.
            if let changed = changes.changedIndexes, !changed.isEmpty 
            {
                collectionView.reloadItems(at: changed.map({ IndexPath(item: $0, section: 0) }))
            }
        } 
        else 
        {
            // Reload the collection view if incremental changes are not available.
            collectionView.reloadData()
        }
    }
}
```

With this tweak in place - you'll find that when an asset is fetched from iCloud, a change notification spins up and a fetch result reports a change (or possibly no change). Using batch updates, your collection or table view will reload and have the asset ready to go.

To recap - here's the recipe to make this all tick:

1. Register for changes before you fetch anything.
2. Conform to `PHPhotoLibraryChangeObserver`
3. Refresh your datasource, look for changes and load those up within `func photoLibraryDidChange(_ changeInstance: PHChange)`
4. Using `PHImageRequestOptions`, specify that you'll opt into network downloads for fetches.
5. Check if the image is in iCloud during the fetch, if it is - indicate as much in the user interface. Optional, but I think it's necessary.
6. Unregister yourself when your object should be freed from memory.

### Wrapping Up
Ten years ago, the future was the cloud. Five years ago, it became a mature, saturated market. Today, it's not uncommon for the most vanilla of our user base to use it in some capacity. As such - a lot of media can be found hanging out up there in 2019.

Ensuring that our own home rolled solutions outside of `UIImagePickerController` can retrieve them, communicate its progress of doing so and then displaying the end result is a baseline expectation at this point. Though it requires a bit of know-how, the code doesn't yield a massive time commitment when weighed against its payoff.

Until next time ✌️.

