document.addEventListener('DOMContentLoaded', function () {
    var scrollLinks = document.querySelectorAll('a.smooth-scroll');

    for (var i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        var targetPosition = targetElement.offsetTop;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var duration = 500;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var scrollY = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, scrollY);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
});

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollBtn").style.display = "block";
    } else {
        document.getElementById("scrollBtn").style.display = "none";
    }
}

function animateOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

var pizza = document.querySelector('.project-block.pizza');
var legalice = document.querySelector('.project-block.legalide');
var GoldenPropertySolution = document.querySelector('.project-block.GoldenPropertySolution');
var cartreact = document.querySelector('.project-block.cart-react');
var ReactRepos = document.querySelector('.project-block.ReactRepos');
var BastionGroup = document.querySelector('.project-block.BastionGroup');
var Elephantum = document.querySelector('.project-block.Elephant-um');
var pizzaReact = document.querySelector('.project-block.pizzaReact');
var ReactChat = document.querySelector('.project-block.React-Chat');
var SpaceXShips = document.querySelector('.project-block.SpaceXShips');
var autoRepairConsole = document.querySelector('.project-block.autoRepairConsole');
var AnimBook = document.querySelector('.project-block.AnimBook');

var options = {
    root: null,
    rootMargin: '-10px',
    threshold: 0
};

var pizzaO = new IntersectionObserver(animateOnScroll, options);
pizzaO.observe(pizza);

var legaliceO = new IntersectionObserver(animateOnScroll, options);
legaliceO.observe(legalice);

var GoldenPropertySolutionO = new IntersectionObserver(animateOnScroll, options);
GoldenPropertySolutionO.observe(GoldenPropertySolution);

var cartreactO = new IntersectionObserver(animateOnScroll, options);
cartreactO.observe(cartreact);

var ReactReposO = new IntersectionObserver(animateOnScroll, options);
ReactReposO.observe(ReactRepos);

var BastionGroupO = new IntersectionObserver(animateOnScroll, options);
BastionGroupO.observe(BastionGroup);

var ElephantumO = new IntersectionObserver(animateOnScroll, options);
ElephantumO.observe(Elephantum);

var pizzaReactO = new IntersectionObserver(animateOnScroll, options);
pizzaReactO.observe(pizzaReact);

var ReactChatO = new IntersectionObserver(animateOnScroll, options);
ReactChatO.observe(ReactChat);

var SpaceXShipsO = new IntersectionObserver(animateOnScroll, options);
SpaceXShipsO.observe(SpaceXShips);

var autoRepairConsoleO = new IntersectionObserver(animateOnScroll, options);
autoRepairConsoleO.observe(autoRepairConsole);

var AnimBookO = new IntersectionObserver(animateOnScroll, options);
AnimBookO.observe(AnimBook);