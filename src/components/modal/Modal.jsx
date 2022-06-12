import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

export default function Modal({isShown, src, alt}) {

  const onEscClick = e => {
    if (e.code === "Escape") {
      isShown();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
    return () => window.removeEventListener('keydown', onEscClick)
  })


  const onBgClick = e => {
    if (e.currentTarget === e.target) {
      isShown();
    }
  };

    return (
        <div className={s.Overlay} onClick={onBgClick}>
         <div className={s.Modal}>
           <img className={s.Image} src={src} alt={alt} />
         </div>
      </div>
      )   
};

Modal.propTypes = {
    isShown: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

