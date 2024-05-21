function toggleMenu() {
    var mobileMenu = document.getElementById("mobile-menu");
    var menuIcon = document.querySelector(".menu-icon");
    var searchContainer = document.querySelector('.search-container');

    if (mobileMenu.style.display === "block") {
        mobileMenu.classList.remove("slide-down");
        mobileMenu.classList.add("slide-up");
        setTimeout(function() {
            mobileMenu.style.display = "none";
        }, 300);
        menuIcon.classList.remove("open");
    } else {
        if (searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('slide-down');
            searchContainer.classList.add('slide-up');
            setTimeout(function() {
                searchContainer.style.display = "none";
                searchContainer.classList.remove('active');
            }, 300);
        }
        mobileMenu.style.display = "block";
        mobileMenu.classList.remove("slide-up");
        mobileMenu.classList.add("slide-down");
        menuIcon.classList.add("open");
    }
}

function toggleSearch() {
    var searchContainer = document.querySelector('.search-container');
    var mobileMenu = document.getElementById("mobile-menu");

    if (searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('slide-down');
        searchContainer.classList.add('slide-up');
        setTimeout(function() {
            searchContainer.style.display = "none";
            searchContainer.classList.remove('active');
        }, 300);
    } else {
        if (mobileMenu.style.display === "block") {
            mobileMenu.classList.remove("slide-down");
            mobileMenu.classList.add("slide-up");
            setTimeout(function() {
                mobileMenu.style.display = "none";
            }, 300);
            var menuIcon = document.querySelector(".menu-icon");
            menuIcon.classList.remove("open");
        }
        searchContainer.style.display = "block";
        searchContainer.classList.remove('slide-up');
        searchContainer.classList.add('slide-down');
        searchContainer.classList.add('active');
    }
}

// Event listener para ajustar o menu móvel ao redimensionar a tela
window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var mobileMenu = document.getElementById('mobile-menu');
    var mainNav = document.getElementById('main-nav');

    if (width > 768) {
        mobileMenu.style.display = 'none';
    } else {
        if (mainNav.style.display === 'none') {
            mobileMenu.style.display = 'block';
        }
    }
});




$(window).on('scroll', function () {
    const header = $('header');

    const scrollPosition = $(window).scrollTop() - header.outerHeight();

    if (scrollPosition <= 0) {
        header.css('box-shadow', 'none');
    } else {
        header.css ('box-shadow', '10px 1px 5px rgba(0, 0, 0, 0.1');
    }

})  