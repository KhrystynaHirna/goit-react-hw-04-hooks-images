import React, { Component } from "react";
import { ImagesService } from "../../api/Api";
import { ImageGallery } from "../ImageGallery";
import { Button } from "../../button/Button";
import Modal from "../../modal/Modal";
import Loader from "../../loader/Loader";
import Searchbar from "components/searchbar/Searchbar";


class ImageInfo extends Component {
  state = {
    input: "",
    images: null,
    enabled: false,
    page: 1,
    isShown: false,
    largeImageURL: '',
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    if (this.state.input !== prevState.input) {
      this.setState({images: null, enabled: true});
      ImagesService(this.state.input, this.state.page)
        .then(images => {
          this.setState({ images })
        }).finally(() => this.setState({enabled: false}));
    } 
    
     if (this.state.input === prevState.input && this.state.page !== prevState.page) {
      this.setState({enabled: true});
      ImagesService(this.state.input, this.state.page)
        .then(images => {
          this.setState({ images: [...prevState.images, ...images] });
          }).finally(() => this.setState({enabled: false}));
    }    
  }
  
  handleFormSubmit = (input) => {
    this.setState({ input, page: 1 });
  }

  handleBtnClick = () => {
    this.setState(state => ({
      page: state.page + 1,
    }))
  }

  toggleModal = () => {
    this.setState(state => ({
      isShown: !state.isShown
    }))
  }
  
  openImage = (largeImageURL) => {
    this.setState({ largeImageURL });
    this.toggleModal();
  }
  
  render() {
    const { page, enabled, images, input, largeImageURL, isShown } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {page === 1 && <Loader enabled={enabled} />}
        {images && <ImageGallery images={images} alt={input} onClick={this.openImage}/>}    
        {page > 1 && <Loader enabled={enabled} />}
        {images && images.length > 0 && <Button onClick={this.handleBtnClick} />}
        {isShown && <Modal isShown={this.toggleModal} src={largeImageURL} alt={input}/>}
      </div>
    );
  }
}

export default ImageInfo;