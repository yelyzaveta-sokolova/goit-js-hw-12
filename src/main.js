// У файлі main.js напиши всю логіку роботи додатка.

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getPictures } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const formSearch = document.querySelector('.js-search');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const backToTopBtn = document.querySelector('.back-to-top');

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';
backToTopBtn.style.display = 'none';

formSearch.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
backToTopBtn.addEventListener('click', scrollToTop);
window.addEventListener('scroll', toggleBackToTopBtn);

async function onSearch(event) {
  event.preventDefault();
  listImages.innerHTML = '';
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';

  currentQuery = event.target.elements.search.value;
  currentPage = 1;

  if (!validateInput(currentQuery)) {
    loader.style.display = 'none';
    return;
  }

  try {
    const data = await getPictures(currentQuery, currentPage);
    loader.style.display = 'none';

    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      listImages.innerHTML = createMarkup(data.hits);

      if (totalHits > currentPage * 15) {
        loadMoreBtn.style.display = 'block';
      } else {
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }

      const refreshPage = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
      refreshPage.refresh();
    }

    formSearch.reset();
  } catch (err) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${err.message}`,
    });
    console.error(err);
  }
}

async function onLoadMore() {
  currentPage += 1;
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';

  try {
    const data = await getPictures(currentQuery, currentPage);
    loader.style.display = 'none';
    listImages.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    const galleryItems = document.querySelectorAll('.gallery-item');
    const cardHeight = galleryItems[0].getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (totalHits > currentPage * 15) {
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const refreshPage = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    refreshPage.refresh();
  } catch (err) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${err.message}`,
    });
    console.error(err);
  }
}


function validateInput(valueInput) {
const trimmedValue = valueInput.trim();
  if (trimmedValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'It seems you forgot to specify what photo you want to find :)',
    });
    return false;
  } else {
    console.log("Input корректный")
    return true;
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function toggleBackToTopBtn() {
  if (window.scrollY > window.innerHeight) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
}
