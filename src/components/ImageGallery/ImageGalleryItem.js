import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ images }) => {
  return images.map(({ id, src, alt }) => {
    return (
      <li className={s.imageGalleryItem} key={id}>
        <img
          className={s.imageGalleryItemImage}
          src={src}
          alt={alt}
          data-id={id}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};
