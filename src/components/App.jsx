import React, { Component } from 'react';
import { api } from './services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './Container/Container';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    page: 1,
    search: '',
    images: [],
    error: null,
    status: STATUS.IDLE,
    totalImages: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, search } = this.state;

    if (prevState.page !== page || prevState.search !== search) {
      this.setState({ status: STATUS.PENDING });
    }

    api
      .fetchImages(search, page)
      .then(({ data }) => {
        if (prevState.page !== page) {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: STATUS.RESOLVED,
            totalImages: data.total,
          }));
        }

        if (prevState.search !== search) {
          if (data.hits <= 0) {
            this.setState({
              error: 'not found',
              status: STATUS.REJECTED,
            });

            return;
          } else {
            toast.info(`Im search ${data.total} images`);
          }

          this.setState({
            images: data.hits,
            status: STATUS.RESOLVED,
            totalImages: data.total,
          });
        }
      })
      .catch(error =>
        this.setState({
          error: error.message,
          status: STATUS.REJECTED,
        })
      );
  }

  handleFormSubmit = search => {
    this.setState({
      search,
      image: [],
      page: 1,
    });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, error, page, totalImages } = this.state;

    const isShownButton = page * 12 < totalImages ? true : false;

    return (
      <Container>
        <div className={css.box}>
          <SearchBar onSubmit={this.handleFormSubmit} />

          {images.length > 0 && <ImageGallery images={images} />}

          {status === 'pending' && <Loader />}

          {status === 'resolved' && isShownButton && (
            <Button onClick={this.handleLoadMoreClick} />
          )}

          {status === 'rejected' && (
            <>
              <p className={css.error}>
                Error message: <span className={css.errorMessage}>{error}</span>
              </p>
            </>
          )}
          <ToastContainer autoClose={4000} theme="dark" />
        </div>
      </Container>
    );
  }
}
