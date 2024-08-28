import { fetchImages } from './js/pixabay-api';
import { renderGallery, toggleLoadMoreBtn, showLoader, hideLoader, showError, scrollToNewImages } from './js/render-functions';

let currentPage = 1;
let currentQuery = '';
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.query.value.trim();
  if (!currentQuery) return;

  currentPage = 1; // Reset page for new search
  refs.gallery.innerHTML = ''; // Clear previous results
  refs.loadMoreBtn.classList.add('is-hidden'); // Hide Load More button

  await fetchAndDisplayImages();
}

async function onLoadMore() {
  currentPage++;
  await fetchAndDisplayImages();
}

async function fetchAndDisplayImages() {
  try {
    showLoader(refs.loader);
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits, refs.gallery);
    scrollToNewImages(refs.gallery);
    toggleLoadMoreBtn(refs.loadMoreBtn, data.totalHits, currentPage);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader(refs.loader);
  }
}
