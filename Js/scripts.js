window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const banner = document.getElementById('banner');
    const logo = document.getElementById('logo');
    const nav = document.getElementById('nav');
    
    if (window.scrollY > 100) {
        header.classList.add('shrink');
        banner.classList.add('shrink');
        logo.classList.add('shrink');
        nav.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
        banner.classList.remove('shrink');
        logo.classList.remove('shrink');
        nav.classList.remove('shrink');
    }
});