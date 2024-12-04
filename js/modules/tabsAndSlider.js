function SliderV2(
  contentSelector,
  parentSelector,
  sliderPrev,
  sliderNext,
  current,
  total,
  // tabsSelector,
) {
  // const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(contentSelector);
  const tabsParent = document.querySelector(parentSelector);
  const prev = document.querySelector(sliderPrev);
  const next = document.querySelector(sliderNext);
  const currentCounter = document.querySelector(current);
  const totalCounter = document.querySelector(total);

  let slideIndex = 0;
  let startX = 0;
  let endX = 0;

  // if (!tabs.length || !tabsContent.length || !tabsParent) {
  //   console.error('Элементы не найдены');
  //   return;
  // }

  function hideContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    // tabs.forEach((tab) => {
    //   tab.classList.remove('tabheader__item_active');
    // });
  }

  function showContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    // tabs[i].classList.add('tabheader__item_active');

    // Обновляем счетчик
    currentCounter.textContent = getZero(i + 1);
    totalCounter.textContent = getZero(tabsContent.length);
  }

  function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  // Обработчик для табов
  // tabsParent.addEventListener('click', (event) => {
  //   const target = event.target;

  //   if (target && target.classList.contains(tabsSelector.replace('.', ''))) {
  //     tabs.forEach((item, i) => {
  //       if (target === item) {
  //         slideIndex = i;
  //         hideContent();
  //         showContent(slideIndex);
  //       }
  //     });
  //   }
  // });

  // Обработчики для стрелок
  prev.addEventListener('click', () => {
    slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
    hideContent();
    showContent(slideIndex);
  });

  next.addEventListener('click', () => {
    slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
    hideContent();
    showContent(slideIndex);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      // Обработка нажатия стрелки влево
      slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
      hideContent();
      showContent(slideIndex);
    } else if (event.key === 'ArrowRight') {
      // Обработка нажатия стрелки вправо
      slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
      hideContent();
      showContent(slideIndex);
    }
  });

  // Обработчики для свайпа
  tabsParent.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    endX = startX;
  });

  tabsParent.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
  });

  tabsParent.addEventListener('touchend', () => {
    const swipeDistance = endX - startX;
    const swipeThreshold = 50; // минимальная дистанция

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance < 0) {
        // Swipe left
        slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
      } else {
        // Swipe right
        slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
      }
      hideContent();
      showContent(slideIndex);
    }
  });

  // Инициализация
  hideContent();
  showContent();
}
// // Использование в script.js:
// document.addEventListener('DOMContentLoaded', () => {
//   combinedTabsSlider(
//     '.tabheader__item',
//     '.tabcontent',
//     '.tabheader__items',
//     '.offer__slider-prev',
//     '.offer__slider-next',
//     '#current',
//     '#total',
//   );
// });
export default SliderV2;
