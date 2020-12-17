function fixTwitter() {
    var tweets = document.getElementsByClassName('jekyll-twitter-plugin');
    
    for (var i=0, len=tweets.length|0; i<len; i=i+1|0) {
        tweets[i].classList.add('mx-auto', 'max-w-md');
    }
}

window.onload = function(){ 
    fixTwitter();
}