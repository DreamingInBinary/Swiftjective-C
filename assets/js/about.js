function toggleFAQ(e) {
    // Get the element
    let answerDivID = 'dd' + e.id;
    let answerDivIcoID = 'svg' + e.id;
    let answerDiv = document.getElementById(answerDivID);
    let answerDivIco = document.getElementById(answerDivIcoID);

    // See if it's open or closed
    let isCollapsed = answerDiv.classList.contains('hidden');

    // Toggle town
    if (isCollapsed === true) {
        answerDiv.classList.remove('hidden');
        answerDivIco.classList.remove('-rotate-180');
    } else {
        answerDiv.classList.add('hidden');
        answerDivIco.classList.add('-rotate-180');
    }
}