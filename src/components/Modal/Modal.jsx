import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ children, onCloseModal }) {
  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handlePressEsc = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handlePressEsc);

    return () => {
      window.removeEventListener('keydown', handlePressEsc);
    };
  }, [onCloseModal]);

  return (
    <div className={css.overlay} onClick={handleCloseModal}>
      <div className={css.modal}>{children} </div>
    </div>
  );
}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handlePressEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keypress', this.handlePressEsc);
//   }

//   handlePressEsc = e => {
//     if (e.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   };

//   handleCloseModal = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onCloseModal();
//     }
//   };

//   render() {
//     return (
//       <div className={css.overlay} onClick={this.handleCloseModal}>
//         <div className={css.modal}>{this.props.children} </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
