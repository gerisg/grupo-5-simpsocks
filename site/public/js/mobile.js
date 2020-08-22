function searchFunction() {
    var searcher = document.getElementById("searcher");
    searcher.classList.toggle("open");
    var opener = document.getElementById("search-opener");
    opener.classList.toggle("closed");
    opener.classList.toggle("opened");
}

function navFunction() {
    var mainNav = document.getElementById("main-nav");
    mainNav.classList.toggle("open");
    var opener = document.getElementById("nav-opener");
    opener.classList.toggle("closed");
    opener.classList.toggle("opened");
}