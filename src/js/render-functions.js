
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => {
    return `
      <a href="${image.largeImageURL}" class="gallery-item">
      <div class="photo-card">
       <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
      </a>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function toggleLoadMoreButton(show) {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.style.display = show ? 'block' : 'none';
}

export function showLoadingIndicator() {
  document.querySelector('.loader').style.display = 'block';
}

export function hideLoadingIndicator() {
  document.querySelector('.loader').style.display = 'none';
}

export function showNoResultsMessage() {
  iziToast.info({
    title: 'No results',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: 'End of results',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}