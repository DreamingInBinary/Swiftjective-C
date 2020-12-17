---
layout: post
tags: ["Swift"]
title: "Swift Keywords"
writtenBy: Jordan Morgan
writtenByTwitter: "https://www.twitter.com/jordanmorgan10"
description: "Swift has quite a few keywords. Let's look at every single one, what it does and provide a code sample."
image: /assets/images/logo.png
special: "true"
prettyTitle: "Swift Keywords"
---
It's been said before and it'll be mentioned again, a craftsmen is as only as good as his or her tools of the trade. Our strict adherence to such tools take us where we want to go or make the thing we've dreamed of.

And I don't say that in a pejorative sense, since there is always more to learn. So today — [we'll look at _every_ _single_ keyword Swift][1] (v 3.0.1) has to offer us along with some code for each one, all in the name of booking up on our trade's tools.

Some are obvious, some are obscure and some are sorta(ish) recognizable but they all make for great reading and learning. This one is long, ready?

Lets.Dance(.rightNow)

### Declaration Keywords

**`associatedtype`**: Gives a placeholder name to a type that is used as part of a protocol. The type is not specified until the protocol is adopted.
```swift
protocol Entertainment  
{  
    associatedtype MediaType  
}

class Foo : Entertainment  
{  
    typealias MediaType = String //Could be any type to fit the need  
}
```
**`class`** : A general-purpose, flexible construct that become the building blocks of your program's code. Similar to struct, except that:

* Inheritance enables one class to inherit the characteristics of another.
* Type casting enables you to check and interpret the type of a class instance at runtime.
* Deinitializers enable an instance of a class to free up any resources it has assigned.
* Reference counting allows more than one reference to a class instance.

```swift
class Person  
{  
    var name:String  
    var age:Int  
    var gender:String  
}
```
**`deinit`**: Called immediately before a class instance is deallocated.

```swift
class Person  
{  
    var name:String  
    var age:Int  
    var gender:String
    
    deinit  
    {  
        //Deallocated from the heap, tear down things here  
    }  
}
```
**`enum`** : Defines a common type for a group of related values and enables you to work with those values in a type-safe way within your code. In Swift, they are first-class types and can use features typically supported only by classes in other languages.
```swift
enum Gender  
{  
    case male  
    case female  
}
```
**`extension`** : Lets one add new functionality to an existing class, structure, enumeration, or protocol type.
```swift
class Person  
{  
    var name:String = ""  
    var age:Int = 0  
    var gender:String = ""  
}

extension Person  
{  
    func printInfo()  
    {  
        print("My name is (name), I'm (age) years old and I'm a (gender).")  
    }  
}
```
**`fileprivate`** : An access control construct that restricts scope to only the defining source file.
```swift
class Person  
{  
    fileprivate var jobTitle:String = ""  
}

extension Person  
{
    //This wouldn't compile using "private"  
    func printJobTitle()  
    {  
        print("My job is (jobTitle)")  
    }  
}
```
**`func`** : Self-contained chunks of code that perform a specific task.
```swift
func addNumbers(num1:Int, num2:Int) -> Int  
{  
    return num1+num2  
}
```
**`import`** : Exposes a framework or application that is built and shipped as a single unit into the given binary.
```swift
import UIKit

//All of UIKit's code is now available  
class Foo {}
```
**`init`** : The process of preparing an instance of a class, structure, or enumeration for use.
```swift
class Person   
{  
    init()  
    {  
        //Set default values, prep for use, etc.  
    }  
}
```
**`inout`** : A value that is passed to a function and modified by it, and is passed back out of the function to replace the original value. Applies to both reference and value types.
```swift
func dangerousOp(_ error:inout NSError?)  
{  
    error = NSError(domain: "", code: 0, userInfo: ["":""])  
}

var potentialError:NSError?
dangerousOp(&potentialError)

//Now potentialError is no longer nil and initialized
```
**`internal`** : An access control construct that allows entities to be used within any source file from its defining module, but not in any source file outside of it.
```swift
class Person  
{  
    internal var jobTitle:String = ""  
}

let aPerson = Person()  
aPerson.jobTitle = "This can set anywhere in the application"
```
**`let`** : Defines a variable as immutable.
```swift
let constantString = "This cannot be mutated going forward"
```
**`open`** : An access control construct that allows objects to be both accessible and subclassable outside of its defining module. For members, they are both accessible and overridable outside of its defining module.
```swift
open var foo:String? //This can be overriden and accessible inside and outside of the app. Writing frameworks is a common use case for this access modifier
```
**`operator`** : A special symbol or phrase that you use to check, change, or combine values.
```swift
//The "-" unary operator decrements a single target  
let foo = 5  
let anotherFoo = -foo //anotherFoo now equals -5

//The "+" binary operator combines two values  
let box = 5 + 3

//The "&&" logical operator combines two boolean values  
if didPassCheckOne && didPassCheckTwo

//The ternary conditional operator considers three values  
let isLegalDrinkingAgeInUS:Bool = age >= 21 ? true : false
```
**`private`** : An access control construct that allows entities to be scoped to its defining declaration.
```swift
class Person  
{  
    private var jobTitle:String = ""  
}

extension Person  
{
    //This won't compile, jobTitle is only available inside of Person  
    func printJobTitle()  
    {  
        print("My job is (jobTitle)")  
    }  
}
```
**`protocol`** : Defines a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality.

```swift
protocol Blog  
{  
    var wordCount:Int { get set }  
    func printReaderStats()  
}

class TTIDGPost : Blog  
{  
    var wordCount:Int
    
    init(wordCount:Int)  
    {  
        self.wordCount = wordCount  
    }
    
    func printReaderStats()  
    {  
        //Print out some stats on the post  
    }  
}
```
**`public`** : An access control construct that allows objects to be both accessible and subclassable but only inside of its defining module. For members, they are both accessible and overridable inside of its defining module.
```swift
public var foo:String? //This can be overriden and accessible anywhere inside of the app, but not outside of it.
```
**`static`** : Defines methods that are called on the type itself. Also used to define static members.
```swift
class Person  
{  
    var jobTitle:String?
     
    static func assignRandomName(_ aPerson:Person)  
    {  
        aPerson.jobTitle = "Some random job"  
    }  
}

let somePerson = Person()  
Person.assignRandomName(somePerson)  
//somePerson.jobTitle is now "Some random job"
```
**`struct`** : A general-purpose, flexible construct that become the building blocks of your program's code and can also provide member wise initializers. Unlike a `class`, they are always copied when they are passed around in your code and as such, do not use automatic reference counting. In addition, they do not

* Use inheritance.
* Allow type casting at runtime.
* Have, or use, deinitializers.<br />

```swift
struct Person  
{  
    var name:String  
    var age:Int  
    var gender:String  
}
```
**`subscript`** : A shortcut for accessing the member elements of a collection, list, or sequence.
```swift
var postMetrics = ["Likes":422, "ReadPercentage":0.58, "Views":3409]  
let postLikes = postMetrics["Likes"]
```
**`typealias`** : Introduces a named alias of an existing type into your program.

```swift
typealias JSONDictionary = [String: AnyObject]

func parseJSON(_ deserializedData:JSONDictionary){}
```

**`var`** : Defines a variable as mutable.
```swift
var mutableString = ""  
mutableString = "Mutated"
```
### Keywords in Statements

**`break`** : Ends program execution of a loop, an `if` statement, or a `switch` statement.
```swift
for idx in 0...3  
{  
    if idx % 2 == 0  
    {  
        //Exits the loop on the first even value  
        break  
    }  
}
```
**`case`** : A statement that is evaluated and then compared with the provided patterns inside a `switch` case.
```swift
let box = 1

switch box  
{  
    case 0:  
    print("Box equals 0")  
    case 1:  
    print("Box equals 1")  
    default:  
    print("Box doesn't equal 0 or 1")  
}
```
**`continue`** : Ends program execution of the current iteration of a loop statement but does not stop execution of the loop statement.
```swift
for idx in 0...3  
{  
    if idx % 2 == 0  
    {  
        //Immediately begins the next iteration of the loop  
        continue  
    }
    
    print("This code never fires on even numbers")  
}
```
**`default`** : Used to cover any values that are not addressed explicitly in a case.
```swift
let box = 1

switch box  
{  
    case 0:  
    print("Box equals 0")  
    case 1:  
    print("Box equals 1")  
    default:  
    print("Covers any scenario that doesn't get addressed above.")  
}
```
**`defer`** : Used for executing code just before transferring program control outside of the scope that it appears in.
```swift
func cleanUpIO()  
{  
    defer  
    {  
        print("This is called right before exiting scope")  
    }
    
    
    //Close out file streams,etc.  
}
```
**`do`** : Begins a statement to handle errors by running a block of code.
```swift
do  
{  
    try expression  
    //statements  
}  
catch someError ex  
{  
    //Handle error  
}
```
**`else`** : Used in conjunction with an `if` statement, it executes one part of code when the condition is true and another part of code when the same condition is false.

```swift
if val > 1  
{  
    print("val is greater than 1")  
}  
else  
{  
    print("val is not greater than 1")  
}
```
**`fallthrough`** : Explicitly allows execution to continue from one case to the next in a `switch` statement.
```swift
let box = 1

switch box  
{  
    case 0:  
    print("Box equals 0")  
    fallthrough  
    case 1:  
    print("Box equals 0 or 1")  
    default:  
    print("Box doesn't equal 0 or 1")  
}
```
**`for`** : Iterates over a sequence, such as ranges of numbers, items in an array, or characters in a string. *_pairs with the _`_in_`_ keyword_
```swift
for _ in 0..<3 { print ("This prints 3 times") }
```
**`guard`** : Used to transfer program control out of a scope if one or more conditions aren't met, while also unwrapping any optional values provided.
```swift
private func printRecordFromLastName(userLastName: String?)   
{  
    guard let name = userLastName, userLastName != "Null" else  
    {  
        //Sorry Bill Null, find a new job  
        return  
    }
    
    //Party on  
    print(dataStore.findByLastName(name))  
}
```
**`if`** : Used for executing code based on the evaluation of one or more conditions.
```swift
if 1 > 2  
{  
    print("This will never execute")  
}
```
**`in`** : Iterates over a sequence, such as ranges of numbers, items in an array, or characters in a string. *_pairs with the _`_for_`_ keyword_
```swift
for _ in 0..<3 { print ("This prints 3 times") }
```
**`repeat`** : Performs a single pass through the loop block first, _before_ considering the loop's condition.
```swift
repeat  
{  
    print("Always executes at least once before the condition is considered")  
}  
while 1 > 2
```
**`return`** : Immediately breaks control flow out of the current context, and additionally returns a value supplied after it if one is present.
```swift
func doNothing()  
{  
    return //Immediately leaves the context
    
    let anInt = 0  
    print("This never prints (anInt)")  
}
```
and
```swift
func returnName() -> String?  
{  
    return self.userName //Returns the value of userName  
}
```
**`switch`** : Considers a value and compares it against several possible matching patterns. It then executes an appropriate block of code, based on the first pattern that matches successfully.
```swift
let box = 1

switch box  
{  
    case 0:  
    print("Box equals 0")  
    fallthrough  
    case 1:  
    print("Box equals 0 or 1")  
    default:  
    print("Box doesn't equal 0 or 1")  
}
```
**`where`** : Requires that an associated type must conform to a certain protocol, or that certain type parameters and associated types must be the same. It's also used to provide an additional condition within a pattern in cases that are considered to be matched to the control expression. 

> The where clause can be used in several contexts, these are examples of their primary use as a generic where clause and pattern matching.

```swift
protocol Nameable  
{  
    var name:String {get set}  
}

func createdFormattedName(_ namedEntity:T) -> String where T:Equatable  
{  
    //Only entities that conform to Nameable which also conform to equatable can call this function  
    return "This things name is " + namedEntity.name  
}
```
and
```swift
for i in 0…3 where i % 2 == 0  
{  
    print(i) //Prints 0 and 2  
}
```
**`while`** : Performs a set of statements until a condition becomes `false`.
```swift
while foo != bar  
{  
    print("Keeps going until the foo == bar")  
}
```
### Expressions and Types Keywords

**`Any`** : Can be used to represent an instance of any type at all, including function types.
```swift
var anything = [Any]()

anything.append("Any Swift type can be added")  
anything.append(0)  
anything.append({(foo: String) -> String in "Passed in (foo)"})
```
**`as`** : A type cast operator used to attempt to cast a value to a different, or an expected and specific, type.
```swift
var anything = [Any]()

anything.append("Any Swift type can be added")  
anything.append(0)  
anything.append({(foo: String) -> String in "Passed in (foo)" })

let intInstance = anything[1] as? Int
```
or
```swift
var anything = [Any]()

anything.append("Any Swift type can be added")  
anything.append(0)  
anything.append({(foo: String) -> String in "Passed in (foo)" })

for thing in anything  
{  
    switch thing  
    {  
        case 0 as Int:  
        print("It's zero and an Int type")  
        case let someInt as Int:  
        print("It's an Int that's not zero but (someInt)")  
        default:  
        print("Who knows what it is")  
    }  
}
```
**`catch`** : If an error is thrown by code in a `do` clause, it's matched against a `catch` clause to determine how the error will be handled. [*_Excerpt from one of my previous posts on Swift's error handling._][2]
```swift
do  
{  
    try haveAWeekend(4)  
}  
catch WeekendError.Overtime(let hoursWorked)  
{  
    print("You worked (hoursWorked) more than you should have")  
}  
catch WeekendError.WorkAllWeekend  
{  
    print("You worked 48 hours :-0")  
}  
catch  
{  
    print("Gulping the weekend exception")  
}
```
**`false`** : One of two constant values Swift used to represent the logical type, Bool, as not being true.
```swift
let alwaysFalse = false  
let alwaysTrue = true

if alwaysFalse { print("Won't print, alwaysFalse is false 😉")} 
```
**`is`** : A type check operator used to determine whether an instance is of a certain subclass type.
```swift
class Person {}  
class Programmer : Person {}  
class Nurse : Person {}

let people = [Programmer(), Nurse()]

for aPerson in people  
{  
    if aPerson is Programmer  
    {  
        print("This person is a dev")  
    }  
    else if aPerson is Nurse  
    {  
        print("This person is a nurse")  
    }  
}
```
**`nil`** : Represents a stateless value for any type in Swift. 

> Different from Objective-C's nil, which is a pointer to a nonexistent object

```swift
class Person{}  
struct Place{}

//Literally any Swift type or instance can be nil  
var statelessPerson:Person? = nil  
var statelessPlace:Place? = nil  
var statelessInt:Int? = nil  
var statelessString:String? = nil
```
**`rethrows`** : Indicates that the function throws an error only if one of its function parameters throws an error.
```swift
func networkCall(onComplete:() throws -> Void) rethrows  
{  
    do  
    {  
        try onComplete()  
    }  
    catch  
    {  
        throw SomeError.error  
    }  
}
```
**`super`** : Exposes access to the superclass version of a method, property, or subscript.
```swift
class Person  
{  
    func printName()  
    {  
        print("Printing a name. ")  
    }  
}

class Programmer : Person  
{  
    override func printName()  
    {  
        super.printName()  
        print("Hello World!")  
    }  
}

let aDev = Programmer()  
aDev.printName() //"Printing a name. Hello World!"
```
**`self`** : An implicit property that every instance of a type has, which is exactly equivalent to the instance itself. Also very useful for distinguishing between a parameter name and a property name.
```swift
class Person  
{  
    func printSelf()  
    {  
        print("This is me: (self)")  
    }  
}

let aPerson = Person()  
aPerson.printSelf() //"This is me: Person"
```
**`Self`** : In protocols, represents the type that will eventually conform to the given protocol.
```swift
protocol Printable  
{  
    func printTypeTwice(otherMe:Self)  
}

struct Foo : Printable  
{  
    func printTypeTwice(otherMe: Foo)  
    {  
        print("I am me plus (otherMe)")  
    }  
}

let aFoo = Foo()  
let anotherFoo = Foo()

aFoo.printTypeTwice(otherMe: anotherFoo) //I am me plus Foo()
```
**`throw`** : Used to explicitly throw an error from the current context.
```swift
enum WeekendError: Error  
{  
    case Overtime  
    case WorkAllWeekend  
}

func workOvertime () throws  
{  
    throw WeekendError.Overtime  
}
```
**`throws`** : Indicates that a function, method, or initializer can potentially throw an error.
```swift
enum WeekendError: Error  
{  
    case Overtime  
    case WorkAllWeekend  
}

func workOvertime () throws  
{  
    throw WeekendError.Overtime  
}

//"throws" indicates in the function's signature that I need use try, try? or try!  
try workOvertime()
```
**`true`** One of two constant values Swift used to represent the logical type, Bool, as being true.
```swift
let alwaysFalse = false  
let alwaysTrue = true

if alwaysTrue { print("Always prints")}
```
**`try`** : Indicates that the following function could potentially throw an error. Can be used three different ways: try, try? and try!.
```swift
let aResult = try dangerousFunction() //Handle it, or propagate it  
let aResult = try! dangerousFunction() //This could trap  
if let aResult = try? dangerousFunction() //Unwrap the optional
```
### Keywords Using Patterns

**_** : A wilcard pattern that matches and ignores any value.
```swift
for _ in 0..<3  
{  
    print("Just loop 3 times, index has no meaning")  
}
```
another use
```swift
let _ = Singleton() //Ignore value or unused variable
```
### Keywords Using #

**#available**: A condition of an `if`, `while`, and `guard` statement to query the availability of APIs at runtime, based on specified platforms arguments.
```swift
if #available(iOS 10, *)  
{  
    print("iOS 10 APIs are available")  
}
```
**#colorLiteral**: A playground literal which brings up an interactive color picker to assign to a variable.
```swift
let aColor = #colorLiteral //Brings up color picker
```
**#column**: A special literal expression that returns the column number in which it begins.
```swift
class Person  
{  
    func printInfo()  
    {  
        print("Some person info - on column (#column)")   
    }  
}

let aPerson = Person()  
aPerson.printInfo() //Some person info - on column 53
```
**#else**: A conditional compiler control statement that allows the program to conditionally compile some given code. Used in conjunction with an `#if` statement, it executes one part of code when the condition is true and another part of code when the same condition is false.
```swift
#if os(iOS)  
print("Compiled for an iOS device")  
#else  
print("Not on an iOS device")  
#endif
```
**#elseif**: A conditional compiler control statement that allows the program to conditionally compile some given code. Used in conjunction with an `#if` statement, it executes one part of code when the given condition is true.
```swift
#if os(iOS)  
print("Compiled for an iOS device")  
#elseif os(macOS)  
print("Compiled on a mac computer")  
#endif
```
**#endif**: A conditional compiler control statement that allows the program to conditionally compile some given code. Used for marking the end of conditionally compiled code.
```swift
#if os(iOS)  
print("Compiled for an iOS device")  
#endif
```
**#file**: A special literal expression that returns the name of the file in which it appears.
```swift
class Person  
{  
    func printInfo()  
    {  
        print("Some person info - inside file (#file)")   
    }  
}

let aPerson = Person()  
aPerson.printInfo() //Some person info - inside file /*file path to the Playground file I wrote it in*/
```
**#fileReference**: A playground literal which brings up a picker to select a file which returns as a `NSURL` instance.
```swift
let fontFilePath = #fileReference //Brings up file picker
```
**#function**: A special literal expression which returns the name of a function, inside a method it is the name of that method, inside a property getter or setter it is the name of that property, inside special members like `init` or `subscript` it is the name of that keyword, and at the top level of a file it is the name of the current module.
```swift
class Person  
{  
    func printInfo()  
    {  
        print("Some person info - inside function (#function)")   
    }  
}

let aPerson = Person()  
aPerson.printInfo() //Some person info - inside function printInfo()
```
**#if**: A conditional compiler control statement that allows the program to conditionally compile some given code. Used for executing code based on the evaluation of one or more conditions.
```swift
#if os(iOS)  
print("Compiled for an iOS device")  
#endif
```
**#imageLiteral**: A playground literal which brings up a picker to select an image which returns as a`UIImage` instance.
```swift
let anImage = #imageLiteral //Brings up a picker to select an image inside the playground file
```
**#line**: A special literal expression which returns the line number on which it appears.
```swift
class Person  
{  
    func printInfo()  
    {  
        print("Some person info - on line number (#line)")   
    }  
}

let aPerson = Person()  
aPerson.printInfo() //Some person info - on line number 5
```
**#selector**: An expression that forms the Objective-C selector which uses static checking to ensure that the method exists and that it's also exposed to Objective-C.
```swift
//Static checking occurs to make sure doAnObjCMethod exists  
control.sendAction(#selector(doAnObjCMethod), to: target, forEvent: event)
```
**#sourceLocation**: A line control statement used to specify a line number and filename that can be different from the line number and filename of the source code being compiled. Useful for changing the source code location used by Swift for diagnostic and debugging purposes.
```swift
#sourceLocation(file:"foo.swift", line:6)

//Reports new values  
print(#file)  
print(#line)

//This resets the source code location back to the default values numbering and filename  
#sourceLocation()

print(#file)  
print(#line)
```
### Keywords For Specific Context(s)

> These keywords can actually be used as identifiers if they are used outside of their respective contexts.

**`associativity`** : Specifies how a sequence of operators with the same precedence level are grouped together in the absence of grouping parentheses by using `left`, `right` or `none` .
```swift
infix operator ~ { associativity right precedence 140 }  
4 ~ 8
```
**`convenience`** : Secondary, supporting initializers for a class that eventually delegate initialization of the instance to a designated initializer.
```swift
class Person  
{  
    var name:String
    
    init(_ name:String)  
    {  
        self.name = name  
    }
    
    convenience init()  
    {  
        self.init("No Name")  
    }  
}

let me = Person()  
print(me.name)//Prints "No Name"
```
**`dynamic`** : Indicates that access to that member or function is never inlined or devirtualized by the compiler, which means access to that member is always dynamically dispatched (instead of statically) using the Objective-C runtime.
```swift
class Person  
{  
    //Implicitly has the "objc" attribute now too  
    //This is helpful for interop with libs or  
    //Frameworks that rely on or are built  
    //Around Obj-C "magic" (i.e. some KVO/KVC/Swizzling)  
    dynamic var name:String?  
}
```
**`didSet`** : A property observer that is invoked immediately after a value is stored on a property.
```swift
var data = [1,2,3]  
{  
    didSet  
    {  
        tableView.reloadData()  
    }  
}
```
**`final`** : Prevents a method, property, or subscript from being overridden.
```swift
final class Person {}  
class Programmer : Person {} //Compile time error
```
**`get`** : Returns the given value for a member. Also used with computed properties to get other properties and values indirectly.
```swift
class Person  
{  
    var name:String  
    {  
        get { return self.name }  
        set { self.name = newValue}  
    }
    
    var indirectSetName:String  
    {  
        get  
        {  
            if let aFullTitle = self.fullTitle  
            {  
                return aFullTitle  
            }  
            return ""  
        }

        set (newTitle)  
        {  
            //If newTitle was absent, newValue could be used  
            self.fullTitle = "(self.name) :(newTitle)"  
        }
    }  
}
```
**`infix`** : Specifies that an operator is used between two targets. If a new global operator is defined as an infix operator, it also requires membership to a precedence group.
```swift
let twoIntsAdded = 2 + 3
```
**`indirect`** : Indicates that an enumeration has another instance of the enumeration as the associated value for one or more of the enumeration cases.
```swift
indirect enum Entertainment  
{  
    case eventType(String)  
    case oneEvent(Entertainment)  
    case twoEvents(Entertainment, Entertainment)  
}

let dinner = Entertainment.eventType("Dinner")  
let movie = Entertainment.eventType("Movie")

let dateNight = Entertainment.twoEvents(dinner, movie)
```
**`lazy`** : A property whose initial value is not calculated until the first time it is used.
```swift
class Person  
{  
    lazy var personalityTraits = {  
        //Some crazy expensive database  hit  
        return ["Nice", "Funny"]  
    }()  
}
let aPerson = Person()  
aPerson.personalityTraits //Database hit only happens now once it's accessed for the first time
```
**`left`** : Specifies the associativity of an operator as left-to-right so operators with the same precedence level are grouped together correctly in the absence of grouping parentheses.
```swift
//The "-" operator's associativity is left to right  
10-2-4 //Logically grouped as (10-2) - 4
```
**`mutating`** : Allows modification of the properties of a structure or enumeration within a particular method.
```swift
struct Person  
{  
    var job = ""
    
    mutating func assignJob(newJob:String)  
    {  
        self = Person(job: newJob)  
    }  
}

var aPerson = Person()  
aPerson.job //""

aPerson.assignJob(newJob: "iOS Engineer at Buffer")  
aPerson.job //iOS Engineer at Buffer
```
**`none`** : Specifies that an operator has the absence of any associativity applied to it, which restricts operators of the same precedence level from appearing adjacent to each to other.
```swift
//The "<" operator is a nonassociative operator  
1 < 2 < 3 //Won't compile
```
**`nonmutating`** : Indicates that a member's setter doesn't modify the containing instance, but rather has other intended consequences.
```swift
enum Paygrade  
{  
    case Junior, Middle, Senior, Master
    
    var experiencePay:String?  
    {  
        get  
        {  
            database.payForGrade(String(describing:self))  
        }

        nonmutating set  
        {  
            if let newPay = newValue  
            {  
                database.editPayForGrade(String(describing:self), newSalary:newPay)  
            }  
        }  
    }  
}

let currentPay = Paygrade.Middle

//Updates Middle range pay to 45k, but doesn't mutate experiencePay  
currentPay.experiencePay = "$45,000"
```
**`optional`** : Used to declare optional methods in protocols. These requirements do not have to be implemented by types that conform to it.
```swift
@objc protocol Foo  
{  
    func requiredFunction()  
    @objc optional func optionalFunction()  
}

class Person : Foo  
{  
    func requiredFunction()  
    {  
        print("Conformance is now valid")  
    }  
}
```
**`override`** : Indicates that a subclass will provide its own custom implementation of an instance method, type method, instance property, type property, or subscript that it would otherwise inherit from a superclass.
```swift
class Person  
{  
    func printInfo()  
    {  
        print("I'm just a person!")  
    }  
}

class Programmer : Person  
{  
    override func printInfo()  
    {  
        print("I'm a person who is a dev!")  
    }  
}

let aPerson = Person()  
let aDev = Programmer()

aPerson.printInfo() //I'm just a person!  
aDev.printInfo() //I'm a person who is a dev!
```
**`postfix`** : Specifies that an operator follows the target that it operates on.
```swift
var optionalStr:String? = "Optional"  
print(optionalStr!)
```
**`precedence`** : Represents an operator's higher priority than others; so that these operators are applied first.
```swift
infix operator ~ { associativity right precedence 140 }  
4 ~ 8
```
**`prefix`** : Specifies that an operator precedes the target it operates on.
```swift
var anInt = 2  
anInt = -anInt //anInt now equals -2
```
**`required`** : Enforces the compiler to make sure that every subclass of the class must implement the given initializer.
```swift
class Person  
{  
    var name:String?
    
    required init(_ name:String)  
    {  
        self.name = name  
    }  
}

class Programmer : Person  
{  
    //Excluding this init(name:String) would be a compiler error  
    required init(_ name: String)  
    {  
        super.init(name)  
    }  
}
```
**`right`** : Specifies the associativity of an operator as right-to-left so operators with the same precedence level are grouped together correctly in the absence of grouping parentheses.
```swift
//The "??" operator's associativity is right to left  
var box:Int?  
var sol:Int? = 2

let foo:Int = box ?? sol ?? 0 //Foo equals 2
```
**`set`** : Takes in a value for a member to set as its new value. Also used with computed properties to set other properties and values indirectly. If a computed property's setter does not define a name for the new value to be set, a default name of `newValue` can be used implicitly.
```swift
class Person  
{  
    var name:String  
    {  
        get { return self.name }  
        set { self.name = newValue}  
    }
    
    var indirectSetName:String  
    {  
        get  
        {  
            if let aFullTitle = self.fullTitle  
            {  
                return aFullTitle  
            }  
            return ""  
        }

        set (newTitle)  
        {  
            //If newTitle was absent, newValue could be used  
            self.fullTitle = "(self.name) :(newTitle)"  
        }  
    }  
}
```
**`Type`** : Refers to the type of any type, including class types, structure types, enumeration types, and protocol types.
```swift
class Person {}  
class Programmer : Person {}

let aDev:Programmer.Type = Programmer.self
```
**`unowned`** : Enables one instance in a reference cycle to refer to the other instance without keeping a strong hold on it when the other instance has the same lifetime or a longer lifetime.
```swift
class Person  
{  
    var occupation:Job?  
}

//Here, a job never exists without a Person instance, and thus never outlives the Person who holds it.  
class Job  
{  
    unowned let employee:Person
    
    init(with employee:Person)  
    {  
        self.employee = employee  
    }  
}
```
**`weak`** : Enables one instance in a reference cycle to refer to the other instance without keeping a strong hold on it when the other instance has a shorter lifetime — that is, when the other instance can be deallocated first.
```swift
class Person  
{  
    var residence:House?  
}

class House  
{  
    weak var occupant:Person?  
}

var me:Person? = Person()  
var myHome:House? = House()

me!.residence = myHome  
myHome!.occupant = me

me = nil  
myHome!.occupant //Is now nil
```
**`willSet`** : A property observer that is invoked right before a value is stored on a property.
```swift
class Person  
{  
    var name:String?  
    {  
        willSet(newValue) {print("I've got a new name, it's (newValue)!")}  
    }  
}

let aPerson = Person()  
aPerson.name = "Jordan" //Prints out "I've got a new name, it's Jordan!" right before name is assigned to
```
### Wrapping Up

Phew!

This was a fun one to author up. I picked up a few things I hadn't really thought much of prior to writing it, but I do think the trick here is _not_ to memorize it like a list of definitions for an exam.

Rather, keep this list handy. Let it hit your brainwaves every now and again — and when the time comes when you need that specific keyword for that outlier scenario, you'll know it and use it.

Until next time ✌️.

[1]: https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html
[2]: {{ site.url | append:"/swift-error-handling"}}
