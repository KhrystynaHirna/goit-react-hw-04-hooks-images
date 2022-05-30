import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from 'react-dom';
import s from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export default function Modal({isShown, src, alt}) {

  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
    return () => window.removeEventListener('keydown', onEscClick)
  })

  const onEscClick = e => {
    if (e.code === "Escape") {
      isShown();
    }
  };

  const onBgClick = e => {
    if (e.currentTarget === e.target) {
      isShown()
    }
  };

    return createPortal(
        <div className={s.Overlay} onClick={onBgClick}>
         <div className={s.Modal}>
           <img className={s.Image} src={src} alt={alt} />
         </div>
      </div>,
      modalRoot
      )   
};

Modal.propTypes = {
    isShown: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

