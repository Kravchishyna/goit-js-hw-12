
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = new SimpleLightbox('.gallery a');

export function renderGallery(images, container) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags }) =>
        `<a href="${largeImageURL}" class="gallery-item">
      <div class="photo-card"> 
       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div> 
        </a>`
    )
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

export function toggleLoadMoreBtn(btn, totalHits, currentPage, perPage = 15) {
  const totalLoadedImages = currentPage * perPage;
  if (totalLoadedImages >= totalHits) {
    btn.classList.add('is-hidden');
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    btn.classList.remove('is-hidden');
  }
}

export function showLoader(loader) {
  loader.classList.remove('is-hidden');
}

export function hideLoader(loader) {
  loader.classList.add('is-hidden');
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function scrollToNewImages(container) {
  const { height: cardHeight } = container.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}