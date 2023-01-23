import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImage } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';
import { Wrapper } from './App.styled';
import HeadBodyGrid from './Loader/Loader';
export class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    isLoading: false,
    galleryImages: [],
    largeImageURL: '',
    imageAlt: '',
    totalImages: 0,
    showModal: false,
  };
  onSearchQuery = evt => {
    evt.preventDefault();
    const { value } = evt.target.elements.search;
    this.setState({ searchQuery: value, page: 1 });
  };
  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.setState({ galleryImages: [] });
    }
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const data = await searchImage(searchQuery, page);
        if (data.hits.length > 0) {
          this.setState(({ galleryImages }) => ({
            galleryImages: [...galleryImages, ...data.hits],
            totalImages: data.totalHits,
          }));
          this.setState({ isLoading: false });
        } else {
          toast('Неудачный поиск, сделайте повторный запрос');
          this.setState({ galleryImages: [], totalImages: 0 });
        }
      } catch (error) {
        toString('Упс(: Что-то пошло не так перезагрузите страницу');
        console.log(error);
      }
    }
  }
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollPage();
  };
  onToggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  onOpenModal = evt => {
    const largeImageURL = evt.target.dataset.source;
    if (largeImageURL) {
      this.setState({ largeImageURL: largeImageURL });
      this.onToggleModal();
    }
  };
  render() {
    return (
      <Wrapper>
        <Toaster />
        {this.state.showModal && (
          <Modal onToggleModal={this.onToggleModal}>
            <img src={this.state.largeImageURL} alt={this.state.imageAlt} />
          </Modal>
        )}

        <Searchbar onSubmit={this.onSearchQuery} />
        {this.state.isLoading ? (
          <HeadBodyGrid></HeadBodyGrid>
        ) : (
          <ImageGallery
            onClick={this.onOpenModal}
            images={this.state.galleryImages}
          ></ImageGallery>
        )}
        {this.state.galleryImages.length < this.state.totalImages && (
          <Button onClick={this.onLoadMore} />
        )}
      </Wrapper>
    );
  }
}
