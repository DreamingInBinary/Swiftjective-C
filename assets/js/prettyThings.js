function togglePrettyThing(ptData) {
    var modal = document.getElementsByClassName('copyModal')[0];
    var modalIsHidden = modal.classList.contains('isHidden');

    if (ptData != null) {
        let header = document.getElementById('ptHeader');
        header.innerHTML = ptData[0];
    }

    if (modalIsHidden) {
        modal.classList.remove('isHidden', 'hidden', 'pointer-events-none', 'transform', 'ease-in', 'duration-100', 'opacity-0');
        modal.classList.add('transform', 'ease-out', 'duration-300', 'transition', 'opacity-100');
    } else {
        modal.classList.remove('transform', 'ease-out', 'duration-300', 'transition', 'opacity-100');
        modal.classList.add('isHidden', 'hidden', 'pointer-events-none', 'transform', 'ease-in', 'duration-100', 'opacity-0');
    }
}