/**
 * SmmBaz Theme
 */

/**
 * usestate
 */

 const useState = (defaultValue) => {
    let value = defaultValue;
    const getValue = () => value
    const setValue = newValue => value = newValue
    return [getValue, setValue];
}

/**
 * header fixed scroll
 */

const headerScroll = () => {
    if (window.scrollY > 10) {
        document.querySelector('#header').classList.add('fixed');
    } else {
        document.querySelector('#header').classList.remove('fixed');
    }
}

// document ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#header')) {
        headerScroll();
    }
});

window.addEventListener('scroll', e => {
    headerScroll();
})



/**
 * dashboard page title
 */

const pageTitleHeader = document.getElementById('pageTitleHeader');
const pageTitle = document.getElementById('PageTitle');
if (pageTitle && pageTitleHeader) {
    pageTitleHeader.innerHTML = pageTitle.innerHTML;
}

/**
 * chat go bottom
 */

var sChatBody = document.getElementsByClassName('schat-chat-body')[0];
if (sChatBody) {
    sChatBody.scrollTo(0, sChatBody.offsetHeight);
}



/**
 * accordion
 */
// get all .aq elements
const aq = document.querySelectorAll('.aq');
// foreach all aq elements
[...aq].forEach(el => {
    // find element children 
    const children = el.querySelectorAll('.aq-item');
    // foreach children elements
    [...children].forEach(child => {
        // toggle class active when clicked
        child.children[0].addEventListener('click', function () {
            // remove active class from all children
            const isActive = child.classList.contains('active');
            [...children].forEach(child => {
                child.classList.remove('active');
            });
            // add active class to clicked child
            if (!isActive) {
                child.classList.toggle('active');
            }
        });
    });
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

/**
 * no auth menu toggle
 */

const [noaMenuState, setNoaMenuStat] = useState(false);
const headerNoAuth = document.querySelector('.b-menu-wrapper');

const noAuthMenu = () => {
    if (noaMenuState() == false) {
        headerNoAuth.classList.add('active');
        document.body.classList.add('stop-body');
        setNoaMenuStat(true);
    } else {
        headerNoAuth.classList.remove('active');
        document.body.classList.remove('stop-body');
        setNoaMenuStat(false);
    }
}

/**
 * dashboard header fix
 */

const dHeader = document.querySelector('.d-header');
if (dHeader) {
    // document ready
    const fixFunction = () => {
        const pageTitle = document.querySelector('.page-title');
        const pageTitleCol = document.querySelector('.col-page-title');
        const pageTitleVal = pageTitle.innerHTML;
        pageTitle.innerHTML = "";
        const pageTitleColWidth = pageTitleCol.offsetWidth;
        pageTitle.innerHTML = pageTitleVal;
        pageTitle.style.maxWidth = pageTitleColWidth - 32 + 'px';
    }
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            fixFunction();
        }, 100);
    });
}


/**
 * sidebar toggle
 */

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const [sidebarState, setSidebarState] = useState(false);

const dashboardMenuToggle = () => {
    if (sidebarState() == false) {
        sidebar.classList.add('active');
        sidebarToggle.classList.add('active');
        setSidebarState(true);
    } else {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active')
        setSidebarState(false);
    }
}

function filterService(category) {
    if (category == 'all')
        $('.category-card.hidden').removeClass('hidden');
    else {
        $('.category-card').addClass('hidden');
        $('.category-card[data-category="' + category + '"]').removeClass('hidden');
    }
    removeEmptyCategory();
}

const filterServces = document.getElementById('filterServices');
if (filterServces) {
    filterServces.addEventListener('change', e => {
        filterService(e.target.value);
    });
}

function removeEmptyCategory() {
    $('.service-title').each(function () {
        var next = $(this).next();
        var services = $(this).nextUntil('.service-title');
        var empty = true;
        services.each(function () {
            if (!$(this).hasClass('hidden')) empty = false;
        });
        if (empty) $(this).addClass('hidden');
    })
}

const filterServicesInput = document.getElementById('filterServicesInput');
if (filterServicesInput) {
    const serviceTitle = document.querySelectorAll('.sp-service-title');
    const serviceHeads = document.querySelectorAll('.category-card > .card-header');
    const nothingFound = document.querySelector('.nothing-found');
    const searchTextWrite = document.getElementById('search-text-write');

    filterServicesInput.addEventListener('keyup', e => {
        const keyword = e.target.value;
        $('.service-item').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(e.target.value.toLowerCase()) == -1) {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
        });

        const catCards = document.querySelectorAll('.category-card');
        [...catCards].forEach(card => {
            const itemsHidden = card.querySelectorAll('.service-item.hidden');
            const items = card.querySelectorAll('.service-item');
            if (itemsHidden.length == items.length) {
                card.style.display = 'none';
                card.classList.add('empty');
            } else {
                card.style.display = '';
                card.classList.remove('empty');
            }
        })

        const catCardsCount = catCards.length;
        // empty cards
        const emptyCards = document.querySelectorAll('.category-card.empty');
        console.log(emptyCards.length, catCardsCount);
        if (emptyCards.length == catCardsCount) {
            nothingFound.style.display = '';
            searchTextWrite.innerHTML = keyword;
        } else {
            nothingFound.style.display = 'none';
            searchTextWrite.innerHTML = '';
        }
    });
}




const oq_texts = document.querySelectorAll('.oq_text');
if (oq_texts[0]) {
    [...oq_texts].forEach(el => {
        const value = el.innerText;
        let new_numbers = value.split('').reverse();
        let returnVal = '';

        for (let i = 0; i < new_numbers.length; i++) {
            n = i;
            if (n % 3 == 0 && i != 0) {
                returnVal = ',' + returnVal;
            }
            returnVal = new_numbers[i] + returnVal;
        }

        el.innerText = returnVal;
    });
}

const time_format = document.querySelectorAll('.time_format');
if (time_format[0]) {
    [...time_format].forEach(el => {
        const real_time = el.innerText;
        el.innerText = moment(real_time).format('LLL');
    })
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const devMode = urlParams.get('devMode');
const devModeDoms = document.querySelectorAll('.dev-mode');
if (devModeDoms[0]) {
    [...devModeDoms].forEach(el => {
        if (devMode == 'true') {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}


    /**
     * copy order form data hidden
     */
    setTimeout(() => {
        const orderFormCopy = document.createElement('select');
        orderFormCopy.setAttribute('id', 'orderform-category-copy');
        orderFormCopy.style.display = 'none';
        orderFormCopy.innerHTML = realData;
        orderFormCats.parentNode.insertBefore(orderFormCopy, orderFormCats);
    }, 2000)

    const nocWrapper = document.getElementById('noc-wrapper');
    nocWrapper.style.display = 'none';
    setTimeout(() => {
        nocWrapper.style.display = 'block';
    }, 2001);
}