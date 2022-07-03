class MenuCard {
    constructor(src, id, title, disc, price, parentSelect, ...clases) {
        this.src = src;
        this.id = id;
        this.title = title;
        this.disc = disc;
        this.price = price;
        this.clases = clases;
        this.parent = document.querySelector(parentSelect);
    }
    render() {
        const elem = document.createElement('div');
        this.clases.forEach(className => elem.classList.add(className));
        elem.id = this.id;
        elem.innerHTML = `
          <div class="product catalog__product">
            <img src=${this.src} data-src=${this.src} alt="" class="product__img">
            <div class="product__content">
              <h3 class="product__title">${this.title}</h3>
              <p class="product__description">${this.disc}</p>
            </div>
            <footer class="product__footer">
              <div class="product__sizes">
                <button data-size-price="950" class="product__size" type="button">35см</button>
                <button data-size-price="850" class="product__size is-active" type="button">30см</button>
                <button data-size-price="650" class="product__size" type="button">25см</button>
              </div>
              <div class="product__bottom">
                <div class="product__price">
                  <span class="product__price-value">${this.price}</span>
                  <span class="product__currency">&#8381;</span>
                </div>
                <button data-modal="order" class="btn product__btn" type="button">заказать</button>
              </div>
            </footer>
          </div>
        `;
        this.parent.append(elem);
    }
}
new MenuCard(
    "img/section-catalog/2.png",
    "meat",
    "Тест",
    "loremloremloremloremloremloremlorem",
    850,
    '.catalog',
    'catalog__item',
    'active'
).render();

const hamburger = document.querySelector('.header__burger'),
    menu = document.querySelector('.header__menu'),
    body = document.querySelector('body');

hamburger.addEventListener('click', () => {
    if (!hamburger.classList.contains('active')) {
        menu.classList.add('active');
        hamburger.classList.add('active');
        body.classList.add('no-croll');
    }
    else {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('no-croll');
    }
});

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');
    } else {
        selectSingle.setAttribute('data-state', 'active');
    }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
        selectSingle_title.textContent = evt.target.textContent;
        selectSingle.setAttribute('data-state', '');
    });
}

const catalogTab = document.querySelectorAll('.catalog-nav__item');
const tabs = document.querySelectorAll(".catalog__item");

catalogTab.forEach(function (item) {
    item.addEventListener("click", function () {
        tabId = item.getAttribute("data-catalog");
        curret = document.querySelectorAll(tabId);
        if (tabId == "#all") {
            tabs.forEach(function (item) {
                item.classList.add('active');
                catalogTab.forEach(function (item) {
                    item.classList.remove('active');
                });
                catalogTab[0].classList.add('active');
            });
            return
        }
        catalogTab.forEach(function (item) {
            item.classList.remove('active');
        });
        tabs.forEach(function (item) {
            item.classList.remove('active');
        });

        item.classList.add('active');
        curret.forEach(function (item) {
            item.classList.add('active');
        });
    });
});

; (function () {
    window.myLib = {};

    window.myLib.body = document.querySelector('body');

    window.myLib.closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };
})();

; (function () {
    var catalog = document.querySelector('.catalog');

    if (catalog === null) {
        return;
    }

    var updateProductPrice = function (product, price) {
        var productPrice = product.querySelector('.product__price-value');
        productPrice.textContent = price;
    };

    var changeProductSize = function (target) {
        var product = myLib.closestItemByClass(target, 'product');
        var previousBtnActive = product.querySelector('.product__size.is-active');
        var newPrice = target.getAttribute('data-size-price');

        previousBtnActive.classList.remove('is-active');
        target.classList.add('is-active');
        updateProductPrice(product, newPrice);
    };

    catalog.addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('product__size') && !target.classList.contains('is-active')) {
            e.preventDefault();
            changeProductSize(target);
        }
    });
})();

$(document).ready(function () {
    $('.modal__close').on('click', function () {
        $('.overlay, #order, #thanks, #error').fadeOut('slow');
        $("body").removeClass("no-croll");
    });

    $('.product__btn').each(function (i) {
        $(this).on('click', function () {
            $("body").addClass("no-croll");
            $('#order .modal__name-title').text($('.product__title').eq(i).text());
            $('#order .modal__name-price').text($('.product__price-value').eq(i).text());
            $('#order .modal__text').text($('.is-active').eq(i).text());
            $('#order .modal__img').attr('src', $('.product__img').eq(i).data('src'));
            $('.overlay, #order').fadeIn('slow');
        })
    })
    var $page = $('html, body');
    $('a[href*="#"]').click(function () {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('no-croll');
        return false;
    });

    $('#order form').validate({
        rules: {
            Name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
            buy: "required",
        },
        messages: {
            Name: "Пожалуйста, введите свое имя",
            phone: "Пожалуйста, введите свой телефон",
            email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильный адрес почты"
            }
        }
    });

    $('input[name=phone]').mask("+7 (999)-999-99-99")
});
