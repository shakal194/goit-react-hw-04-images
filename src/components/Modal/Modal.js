import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export function Modal({ onClose, children }) {
  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  // return createPortal(
  //   <div className={s.Overlay} onClick={handleOverlayClick}>
  //     <div className={s.Modal}>{children}</div>
  //   </div>,
  //   modalRoot
  // );

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
