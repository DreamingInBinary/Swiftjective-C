exports.handler = async function(event, context) {
    console.log("Testing")
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Just a test"})
    };
}