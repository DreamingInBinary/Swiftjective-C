function togglePrettyThing(ptData) {
    var modal = document.getElementsByClassName('copyModal')[0];
    var modalIsHidden = modal.classList.contains('isHidden');

    if (ptData != null) {
        let header = document.getElementById('ptHeader');
        header.innerHTML = ptData[0];

        let description = document.getElementById('ptDescription');
        description.innerHTML = ptData[1];

        let whyItWorks = document.getElementById('ptWhyItWorks');
        whyItWorks.innerHTML = ptData[2];

        // Does it have a gif, or just a still?
        let image = document.getElementById('ptImage');
        if (ptData[6] != "") {
            image.src  = ptData[6];
            image.alt = ptData[5];
        } else {
            image.src  = ptData[4];
            image.alt = ptData[5];
        }
    }

    if (modalIsHidden) {
        modal.classList.remove('isHidden', 'hidden', 'pointer-events-none', 'opacity-0');
    } else {
        modal.classList.add('isHidden', 'hidden', 'pointer-events-none', 'opacity-0');
    }
}