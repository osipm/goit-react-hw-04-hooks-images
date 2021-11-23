import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ onClose, src, alt }) {
  const handleESCButtonClose = useCallback(
    event => {
      if (event.code !== 'Escape') return;
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleESCButtonClose);
    return () => window.removeEventListener('keydown', handleESCButtonClose);
  }, [handleESCButtonClose]);

  const handleClose = event => {
    if (event.target !== event.currentTarget) return;
    onClose();
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleClose}>
      <div className={s.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
