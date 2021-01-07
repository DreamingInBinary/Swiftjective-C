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

function toggleMobileNav() {
    // Get the mobile nav button
    let mobileNavGlyph = document.getElementById("mobileNavOpen");
    let mobileNavCloseGlyph = document.getElementById("mobileNavClose");
    let mobileMenu = document.getElementById("mobileMenu");

    // Toggle what's showing
    if (mobileNavGlyph.classList.contains("mobileNavIsClosed")) {
        // Opening menu here
        mobileNavGlyph.classList.remove("mobileNavIsClosed", "block");
        mobileNavGlyph.classList.add("hidden");

        mobileNavCloseGlyph.classList.remove("hidden");
        mobileNavCloseGlyph.classList.add("block");

        mobileMenu.classList.remove("hidden");
    } else {
        // Closing it here
        mobileNavGlyph.classList.remove("hidden");
        mobileNavGlyph.classList.add("mobileNavIsClosed", "block");

        mobileNavCloseGlyph.classList.remove("block");
        mobileNavCloseGlyph.classList.add("hidden");

        mobileMenu.classList.add("hidden");
    }
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
            search.value = "";
        }
    });

    // Mark active page
    let links = document.getElementsByClassName("navDiv");
    for (var i = 0, len = links.length | 0; i < len; i = i + 1 | 0) {
        // The div's ID will match the path of the page. Hacky, but works.
        let linkDiv = links[i];
        if (window.location.pathname.includes(linkDiv.id)) {
            linkDiv.classList.add('font-extrabold', 'text-blue-400', 'hover:text-white');
        }
    }
}