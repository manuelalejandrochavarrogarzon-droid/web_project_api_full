function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup popup_opened">
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>

        <div className="info-tooltip">
          <div className="info-tooltip__icon"></div>

          <h2 className="info-tooltip__title">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Algo salió mal. Por favor, inténtalo de nuevo."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
