import PropTypes from 'prop-types';

import './ConfirmationModal.scss';

const ConfirmationModal = ({ onClose }) => {
  const handleClose = () => {
    onClose();
    window.location.href = window.location.pathname + window.location.search;
  };

  return (
    <div className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
      <div className="confirmation-modal__backdrop" onClick={handleClose} />
      <div className="confirmation-modal__box">
        <div className="confirmation-modal__icon" aria-hidden="true">✓</div>
        <h2 className="confirmation-modal__title" id="confirmation-title">¡Gracias por confirmar!</h2>
        <p className="confirmation-modal__message">
          Hemos recibido tu respuesta. ¡No podemos esperar para celebrar juntos!
        </p>
        <button className="confirmation-modal__btn" onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ConfirmationModal;
