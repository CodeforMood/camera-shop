import Modal from '../modal/modal';

type ModalAddReviewSuccessProps = {
  setModalAddReviewSuccess: (arg:boolean) => void;
  isModalAddReviewSuccess: boolean;
}

export default function ModalAddReviewSuccess({setModalAddReviewSuccess, isModalAddReviewSuccess}: ModalAddReviewSuccessProps): JSX.Element {
    const handleModalClose = () => {
    setModalAddReviewSuccess(false);
    document.body.style.overflowY = '';
  };
  
  return (
    <Modal onClose={handleModalClose}>
      <div className={`modal ${isModalAddReviewSuccess ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleModalClose}>Вернуться к покупкам
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}