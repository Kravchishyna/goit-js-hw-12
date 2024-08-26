import { fetchImages } from './js/pixabay-api';
import {
  renderImages,
  clearGallery,
  toggleLoadMoreButton,
  showLoadingIndicator,
  hideLoadingIndicator,
  showNoResultsMessage,
  showEndOfResultsMessage,
  smoothScroll,
} from './js/render-functions';

let currentPage = 1;
let currentQuery = '';

document.querySelector('.search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  currentQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (currentQuery === '') return;

  currentPage = 1;
  clearGallery();
  toggleLoadMoreButton(false);
  showLoadingIndicator();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    hideLoadingIndicator();

    if (data.hits.length > 0) {
      renderImages(data.hits);
      toggleLoadMoreButton(true);
      smoothScroll();
    } else {
      showNoResultsMessage();
    }
  } catch (error) {
    console.error('Error during search:', error);
  }
});

document.querySelector('.load-more').addEventListener('click', async () => {
  currentPage += 1;
  showLoadingIndicator();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    hideLoadingIndicator();
    renderImages(data.hits);
    smoothScroll();

    if (currentPage * 15 >= data.totalHits) {
      toggleLoadMoreButton(false);
      showEndOfResultsMessage();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  }
});