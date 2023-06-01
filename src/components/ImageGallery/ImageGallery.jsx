import PropTypes from 'prop-types';
import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ images }) {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ webformatURL, largeImageURL, id, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatUrl={webformatURL}
          largeImageUrl={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
}

// export class ImageGallery extends Component {
//   render() {
//     return (
//       <ul className={css.imageGallery}>
//         {this.props.images.map(({ webformatURL, largeImageURL, id, tags }) => (
//           <ImageGalleryItem
//             key={id}
//             webformatUrl={webformatURL}
//             largeImageUrl={largeImageURL}
//             tags={tags}
//           />
//         ))}
//       </ul>
//     );
//   }
// }

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
