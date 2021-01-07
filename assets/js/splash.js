function copyLink(link) {
    if (!navigator.clipboard) {
        var tweetText = "https://twitter.com/compose/tweet?text=" + link;
        window.open(tweetText);
        return;
    }

    navigator.clipboard.writeText(link).then(function () {
        toggleModal();

        setTimeout(() => { 
            var modal = document.getElementsByClassName('copyModal')[0];
            var modalIsShowing = modal.classList.contains('isHidden');

            if (!modalIsShowing) {
                toggleModal();
            }
        }, 2000);
    }, function (err) {
        alert('Sorry, I couldn\'t copy the post link:', err);
    });
}

function toggleModal() {
    var modal = document.getElementsByClassName('copyModal')[0];
    var modalIsHidden = modal.classList.contains('hidden');

    if (modalIsHidden) {
        modal.classList.remove('hidden', 'translate-y-2', 'opacity-0', 'sm:translate-y-0', 'sm:translate-x-2');
        modal.classList.add('flex', 'transform', 'ease-out', 'duration-500', 'transition', 'translate-y-0', 'opacity-100', 'm:translate-x-0');
    } else {
        modal.classList.remove('flex', 'transform', 'ease-out', 'duration-500', 'transition', 'translate-y-0', 'opacity-100', 'm:translate-x-0');
        modal.classList.add('hidden', 'transform', 'ease-in', 'duration-300', 'translate-y-2', 'opacity-0', 'sm:translate-y-0', 'sm:translate-x-2');
    }
}