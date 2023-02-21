import imgGalery from "./gallery-items.js";

const refs = {
  list: document.querySelector(".js-gallery"),
  backdrop: document.querySelector(".js-lightbox"),
  overley: document.querySelector(".lightbox__overlay"),
  img: document.querySelector(".lightbox__image"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  btnLeft: document.querySelector(".lightbox-button-left"),
  btnRight: document.querySelector(".lightbox-button-right"),
};

// створення розмітки галереї
const createGalery = function (images) {
  return images
    .map(
      ({ original, description, preview }) => `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
        <img class ="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
            </a>
        </li>`,
    )
    .join("");
};
const listGalery = createGalery(imgGalery);
refs.list.insertAdjacentHTML("beforeend", listGalery);

// модальне вікно
const onOpenModal = function (e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();
  refs.backdrop.classList.add("is-open"); // відкриття модального вікна
  refs.img.src = e.target.dataset.source; // підміна зображення
  refs.img.alt = e.target.alt;

  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onArrowPress);
};
refs.list.addEventListener("click", onOpenModal);

// закриття модального вікна кнопкою
const onCloseModal = function () {
  refs.backdrop.classList.remove("is-open");
  refs.img.src = ""; // Очистка значення атрибуту src елементу img.lightbox__image.
  refs.img.alt = "";
};
refs.btn.addEventListener("click", onCloseModal);

// Закриття модального вікна ESC
const onEscKeyPress = function (e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
};

// Закриття модального вікна по кліку на overlay
const onOverlayClick = function (e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
};
refs.overley.addEventListener("click", onOverlayClick);

// слайдер
let currentIndex = 0;
const srcArray = imgGalery.map(src => src.original);

const onArrowPress = function (e) {
  if (e.code === "ArrowLeft" || e.target === refs.btnLeft) {
    if (currentIndex === 0) {
      return;
    }
    currentIndex -= 1;
    refs.img.setAttribute("src", srcArray[currentIndex]);
  }
  if (e.code === "ArrowRight" || e.target === refs.btnRight) {
    if (currentIndex === srcArray.length - 1) {
      return;
    }
    currentIndex += 1;
    refs.img.setAttribute("src", srcArray[currentIndex]);
  }
};

refs.btnLeft.addEventListener("click", onArrowPress);
refs.btnRight.addEventListener("click", onArrowPress);
