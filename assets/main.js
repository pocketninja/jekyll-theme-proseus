function windowScrolls() {
    return window.innerHeight < document.documentElement.scrollHeight;
}

function wrapperIsFullWidth() {
    return document.querySelector('.wrapper').getBoundingClientRect().width === document.body.clientWidth;
}

function setupPaging() {
    const $section = document.querySelector('.uses-paging');
    const $pager = document.querySelector('.paging-nav');

    if (!$section || !$pager || !windowScrolls()) {
        return;
    }

    const $pagedInnerSection = $section.querySelector('.inner-content');
    const pageWidth = $pagedInnerSection.getBoundingClientRect().width +
        (wrapperIsFullWidth() ? window.innerWidth - document.body.clientWidth : 0);
    $pagedInnerSection.style.columnWidth = `calc(${pageWidth}px)`;

    let currentPage = 0;
    const pagerClick = event => {
        let targetPage = currentPage + (event.target.classList.contains('previous')
            ? -1
            : 1);

        targetPage = Math.max(targetPage, 0);
        targetPage = Math.min(targetPage, pages - 1);

        $pagedInnerSection.style.marginLeft = `${-targetPage * pageWidth}px`;

        currentPage = targetPage;

        $pager.querySelector('button.previous')[currentPage === 0 ? 'setAttribute' : 'removeAttribute']('disabled', null);
        $pager.querySelector('button.next')[currentPage === pages - 1 ? 'setAttribute' : 'removeAttribute']('disabled', null);
    };

    const reset = () => {
        $pager.removeEventListener('click', pagerClick);
        $pager.classList.add('disabled');
        $pagedInnerSection.style.width = '';
        $pagedInnerSection.style.columnCount = '';
        $pagedInnerSection.style.columnWidth = '';
    }


    let pages = 1;

    while (windowScrolls()) {
        $pagedInnerSection.style.width = `${++pages * pageWidth}px`;
        $pagedInnerSection.style.columnCount = pages;

        //bail if something went wrong...
        if (pages > 100) {
            reset();
            return;
        }
    }

    $pager.classList.remove('disabled');

    $pager.addEventListener('click', pagerClick);
    //click the back button to initialise disabled state, etc
    $pager.querySelector('button.previous').click();
}


document.addEventListener('DOMContentLoaded', event => {

    setupPaging();

});
