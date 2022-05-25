import PropTypes from "prop-types";
import s from "./ImageItem.module.css";

export const ImageItem = ({ id, webformatURL, largeImageURL, alt, onClick}) => {

    return (
      <li className={s.ImageGalleryItem}
        onClick={() => onClick(largeImageURL)}
        key={id}>      
        <img className={s.ImageGalleryItem_image}
          src={webformatURL}
          alt={alt} />    
     </li>
   )  
    
}

ImageItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};