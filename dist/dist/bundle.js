/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //Calc
  function calc() {
    let sex, height, weight, age, ratio;
    const result = document.querySelector('.calculating__result span');

    if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
    } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
          elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
          elem.classList.add(activeClass);
        }
      });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings(
      '.calculating__choose_big div',
      'calculating__choose-item_active',
    );

    function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
      }

      if (sex === 'female') {
        result.textContent = Math.round(
          (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
        );
      } else {
        result.textContent = Math.round(
          (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
        );
      }
      if (
        isNaN(result.textContent) ||
        !/^-?\d+(\.\d+)?$/.test(result.textContent)
      ) {
        result.textContent = '____';
      }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
      const elements = document.querySelectorAll(`${parentSelector} div`);

      document
        .querySelector(parentSelector)
        .addEventListener('click', (event) => {
          if (event.target.getAttribute('data-ratio')) {
            ratio = +event.target.getAttribute('data-ratio');
            localStorage.setItem(
              'ratio',
              +event.target.getAttribute('data-ratio'),
            );
          } else if (
            event.target.id === 'female' ||
            event.target.id === 'male'
          ) {
            sex = event.target.getAttribute('id');
            localStorage.setItem('sex', event.target.getAttribute('id'));
          }

          elements.forEach((elem) => {
            elem.classList.remove(activeClass);
          });

          if (event.target.classList.contains('calculating__choose-item')) {
            event.target.classList.add(activeClass);
          }

          calcTotal();
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation(
      '.calculating__choose_big',
      'calculating__choose-item_active',
    );

    function getDynamicInformation(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
        if (input.value.match(/\D/g)) {
          input.classList.add('invalid');
        } else {
          input.classList.remove('invalid');
        }
        switch (input.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;
        }
        calcTotal();
      });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
  }

  calc();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);
console.log('webpack test');


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
  //Card render
  class MenuCard {
    constructor(
      imgSrc,
      alt,
      title,
      decription,
      price,
      parentSelector,
      ...classes
    ) {
      this.parent = document.querySelector(parentSelector);
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.title = title;
      this.description = decription;
      this.price = price;
      this.tansfer = 50;
      this.changeToUAH();
      this.classes = classes;
    }

    changeToUAH() {
      this.price = this.price * this.tansfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
      <img src=${this.imgSrc} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.description}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      </div>`;

      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    return await res.json();
  };
  getResource('http://localhost:3000/menu').then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container',
      ).render();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");


function forms() {
  //FORM
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: data,
    });
    return await res.json();
  };
  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `display: block; margin: 0 auto;`; //TODO: вынести в отдельый класс css
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      // fetch('index.php', {
      //   method: 'POST',
      //   headers: { 'Content-type': 'application/json; charset=utf-8' },
      //   body: JSON.stringify(object),
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        // .then((data) => data.text())
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finnaly(() => {
          form.reset();
        });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
          <div class="modal__close" data-close>&times;</div>
          <div class="modal__title">${message}</div>
        </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
//TODO: убрать засорение глобальной области видимости
let openModal;
let closeModal;
function modal(triggerSelector, modalSelector, closeSelector) {
  function initModal() {
    const trigger = document.querySelectorAll(triggerSelector); //кнопка открытия
    const modal = document.querySelector(modalSelector); // модальное окно
    const close = document.querySelector(closeSelector); // кнопка закрытия

    // Открытие модального окна и добавление обработчика `keydown`
    openModal = () => {
      modal.classList.add('show');
      document.addEventListener('keydown', onEscapePress);
      document.body.style.overflow = 'hidden';
      clearInterval(timerModal);
    };

    // Закрытие модального окна и удаление обработчика `keydown`
    closeModal = () => {
      modal.classList.remove('show');
      document.removeEventListener('keydown', onEscapePress);
      document.body.style.overflow = 'auto';
    };

    // Обработчик для закрытия модального окна по клавише Escape
    const onEscapePress = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }
    };

    // Открытие модального окна по клику на кнопки с атрибутом data-modal
    trigger.forEach((button) => button.addEventListener('click', openModal));

    // Закрытие модального окна по клику на кнопку с атрибутом data-close
    close.addEventListener('click', closeModal);

    // Закрытие модального окна по клику вне его содержимого
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.getAttribute(close === '')) {
        closeModal();
      }
    });

    // Вызов modal по истечению 50с
    let timerModal = setTimeout(openModal, 50000);

    // вызов modal на конце страницы
    //TODO: Сделать запрет на повторное срабатывание в течении определенного времени
    //TODO: рефрактор с использованием Intersection Observer api
    function showModalOnEndOfPage() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      if (scrollPosition >= documentHeight) {
        openModal();
        window.removeEventListener('scroll', showModalOnEndOfPage);
      }
    }
    window.addEventListener('scroll', showModalOnEndOfPage);
  }

  initModal();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
  // Простой слайдер // Для рабоыт удалить offer__slider-inner
  // function initSlider() {
  //   const slides = document.querySelectorAll('.offer__slide'),
  //     prev = document.querySelector('.offer__slider-prev'),
  //     next = document.querySelector('.offer__slider-next'),
  //     totalSlides = document.querySelector('#total'),
  //     current = document.querySelector('#current');
  //   let slideIndex = 1;

  //   if (slides.length < 10) {
  //     totalSlides.textContent = `0${slides.length}`;
  //   } else {
  //     totalSlides.textContent = slides.length;
  //   }

  //   function showSlides(n) {
  //     if (n > slides.length) {
  //       slideIndex = 1;
  //     }
  //     if (n < 1) {
  //       slideIndex = slides.length;
  //     }

  //     slides.forEach((slide) => {
  //       slide.style.display = 'none';
  //     });
  //     slides[slideIndex - 1].style.display = 'block';

  //     if (slides.length < 10) {
  //       current.textContent = `0${slideIndex}`;
  //     } else {
  //       current.textContent = slideIndex;
  //     }
  //   }

  //   function plusSlides(n) {
  //     showSlides((slideIndex += n));
  //   }

  //   prev.addEventListener('click', () => {
  //     plusSlides(-1);
  //   });
  //   next.addEventListener('click', () => {
  //     plusSlides(1);
  //   });

  //   showSlides(slideIndex);
  // }

  // initSlider();

  //Carousel

  function initCarousel() {
    const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      totalSlides = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slideField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width,
      slider = document.querySelector('.offer__slider');

    function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
    }

    function setSlideIndex(slide) {
      if (slides.length < 10) {
        current.textContent = `0${slide}`;
      } else {
        current.textContent = slide;
      }
    }

    function setDotsOpacity() {
      dots.forEach((dot) => {
        dot.style.opacity = '.5';
      });
      dots[slideIndex - 1].style.opacity = 1;
    }

    function setSlideFieldStyle() {
      slideField.style.transform = `translateX(-${offset}px)`;
    }

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
      totalSlides.textContent = `0${slides.length}`;
      setSlideIndex(slideIndex);
    } else {
      totalSlides.textContent = slides.length;
      setSlideIndex(slideIndex);
    }

    slideField.style.width = `${100 * slides.length}%`;
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach((slide) => {
      slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }

    next.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }
      setSlideFieldStyle();
      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
      setSlideIndex(slideIndex);
      setDotsOpacity();
    });

    prev.addEventListener('click', () => {
      if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }
      setSlideFieldStyle();
      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
      setSlideIndex(slideIndex);
      setDotsOpacity();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        setSlideFieldStyle();
        setSlideIndex(slideIndex);
        setDotsOpacity();
      });
    });
  }

  initCarousel();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import { closeModal, openModal } from './modal';
// const { openModal, closeModal } = modalModule();
function tabs() {
  //TABS

  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  function hideTabsContent() {
    tabsContent.forEach((element) => {
      element.classList.add('hide');
      element.classList.remove('show', 'fade');
    });

    tabs.forEach((element) => {
      element.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(tabIndex = 0) {
    tabsContent[tabIndex].classList.add('show', 'fade');
    tabsContent[tabIndex].classList.remove('hide');
    tabs[tabIndex].classList.add('tabheader__item_active');
  }

  function switchTab() {
    tabsParent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
          if (target === item) {
            hideTabsContent();
            showTabContent(i);
          }
        });
      }
    });
  }
  hideTabsContent();
  showTabContent();
  switchTab();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  // TIMER

  const deadline = '2024-12-31';

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60) % 60;
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    let timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  function getZero(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  setClock('.timer', deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./Styles/styles.scss":
/*!****************************!*\
  !*** ./Styles/styles.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Styles/styles.scss */ "./Styles/styles.scss");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");










document.addEventListener('DOMContentLoaded', () => {
  console.log('its work');

  (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', '[data-close]');
  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map