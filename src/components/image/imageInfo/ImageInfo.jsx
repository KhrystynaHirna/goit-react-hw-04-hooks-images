import { useEffect, useState } from 'react';
import { ImagesService } from "../../api/Api";
import { ImageGallery } from "../ImageGallery";
import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import Loader from "../../loader/Loader";
import Searchbar from "components/searchbar/Searchbar";


export default function ImageInfo() {
  
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [page, setPage] = useState(1);
  const [isShown, setIsShown] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

   
useEffect(() => {
    if (input === '') {
      return
    };
    setEnabled(true);
      ImagesService(input, page)
        .then(images => {
          setImages(prev => [...prev, ...images]);
          }).finally(() => setEnabled(false));
}, [input, page])   
  
  const handleFormSubmit = (input) => {
    setInput(input);
    setPage(1);
    setImages([]);
  }

  const handleBtnClick = () => {
   setPage(prev => prev + 1)
  }

  const toggleModal = () => {
    setIsShown(prev => !prev)
  }
  
  const openImage = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  }
  
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit}/>
        {page === 1 && <Loader enabled={enabled} />}
        {images && <ImageGallery images={images} alt={input} onClick={openImage}/>}    
        {page > 1 && <Loader enabled={enabled} />}
        {images && images.length > 0 && <Button onClick={handleBtnClick} />}
        {isShown && <Modal isShown={toggleModal} src={largeImageURL} alt={input}/>}
      </div>
    );
  
}
