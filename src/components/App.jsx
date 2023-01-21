import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImage } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
export class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    isLoading: false,
    galleryImages: [],
    totalImages: 0,
  };
  onSearchQuery = evt => {
    evt.preventDefault();
    const { value } = evt.target.elements.search;
    this.setState({ searchQuery: value, page: 1 });
  };
  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        const data = await searchImage(this.state.searchQuery, this.state.page);
        console.log(data);
        this.setState({ total: data.totalHits });
        this.setState(({ galleryImages }) => ({
          galleryImages: [...data.hits, ...galleryImages],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }
  onLoadMore() {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearchQuery} />
        <ImageGallery images={this.state.galleryImages} />
        <Button onClick={this.onLoadMore} />
      </div>
    );
  }
}
