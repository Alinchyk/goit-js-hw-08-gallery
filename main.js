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

const onOpenModal = function (e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }
  refs.backdrop.classList.add("is-open");
  refs.img.src = e.target.dataset.source;
  refs.img.alt = e.target.alt;

  window.addEventListener("keydown", onCloseModal);
  window.addEventListener("keydown", onArrowPress);
};

const onCloseModal = function (e) {
  if (e.code === "Escape" || e.currentTarget === e.target || e.target === refs.btn) {
    refs.backdrop.classList.remove("is-open");
    refs.img.src = "";
    refs.img.alt = "";
    window.removeEventListener("keydown", onCloseModal);
    window.removeEventListener("keydown", onArrowPress);
  }
};

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

refs.list.insertAdjacentHTML("beforeend", createGalery(imgGalery));
refs.list.addEventListener("click", onOpenModal);
refs.btn.addEventListener("click", onCloseModal);
refs.overley.addEventListener("click", onCloseModal);
refs.btnLeft.addEventListener("click", onArrowPress);
refs.btnRight.addEventListener("click", onArrowPress);
