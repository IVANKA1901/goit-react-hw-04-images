import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ webformatUrl, tags, largeImageUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatUrl}
        alt={tags}
        onClick={handleToggleModal}
      />

      {isModalOpen && (
        <Modal onCloseModal={handleToggleModal}>
          <img src={largeImageUrl} alt={tags} />
        </Modal>
      )}
    </li>
  );
}

// export class ImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

//   handleToggleModal = () => {
//     this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
//   };

//   render() {
//     return (
//       <li className={css.imageGalleryItem}>
//         <img
//           className={css.imageGalleryItemImage}
//           src={this.props.webformatUrl}
//           alt={this.props.tags}
//           onClick={this.handleToggleModal}
//         />

//         {this.state.isModalOpen && (
//           <Modal onCloseModal={this.handleToggleModal}>
//             <img src={this.props.largeImageUrl} alt={this.props.tags} />
//           </Modal>
//         )}
//       </li>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  webformatUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
