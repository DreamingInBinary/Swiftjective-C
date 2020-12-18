function fixTwitter() {
    let tweets = document.getElementsByClassName('jekyll-twitter-plugin');

    for (var i = 0, len = tweets.length | 0; i < len; i = i + 1 | 0) {
        tweets[i].classList.add('mx-auto', 'max-w-md');
    }
}

function randomPost() {
    let url = '/posts.json';

    fetch(url)
        .then(res => res.json())
        .then((posts) => {
            var randomPostIndex = Math.floor(Math.random() * posts.length);
            var post = posts[randomPostIndex];
            window.location = "https://www.swiftjectivec.com/" + post["href"];
        })
        .catch(err => {
            alert(err);
        });
}

window.onload = function () {
    fixTwitter();

    // Find search bar
    let search = document.getElementById("search");
    search.addEventListener('keyup', ({ key }) => {
        if (key === "Enter") {
            var advGoogleSearch = "site:\"swiftjectivec.com\"";
            advGoogleSearch += " ";
            advGoogleSearch += "\"";
            advGoogleSearch += search.value;
            advGoogleSearch += "\"";
            let searchQuery = "https://www.google.com/search?q=" + advGoogleSearch;
            window.open(searchQuery, '_blank');
        }
    });
}