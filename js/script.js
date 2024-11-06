"use strict";
document.addEventListener("DOMContentLoaded", () => {
  console.log("its work");

  //TABS

  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabsContent() {
    tabsContent.forEach((element) => {
      element.classList.add("hide");
      element.classList.remove("show", "fade");
    });

    tabs.forEach((element) => {
      element.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(tabIndex = 0) {
    tabsContent[tabIndex].classList.add("show", "fade");
    tabsContent[tabIndex].classList.remove("hide");
    tabs[tabIndex].classList.add("tabheader__item_active");
  }

  function switchTab() {
    tabsParent.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target.classList.contains("tabheader__item")) {
        tabs.forEach((item, i) => {
          if (target === item) {
            hideTabsContent();
            showTabContent(i);
          }
        });
      }
    });
  }

  // TIMER

  const deadline = "2024-12-31";

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
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
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

  hideTabsContent();
  showTabContent();
  switchTab();

  setClock(".timer", deadline);

  // Modal
  function initModal() {
    const modalElement = document.querySelector(".modal");
    const openModal = () => (modalElement.style.display = "block");
    const closeModal = () => (modalElement.style.display = "none");

    document.querySelectorAll("[data-modal]").forEach((button) =>
      button.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
      })
    );

    document
      .querySelector("[data-close]")
      .addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
      });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modalElement.style.display === "block") {
        event.preventDefault();
        closeModal();
      }
    });
  }

  initModal();
});
