import React, { useEffect, useState } from 'react';
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

export function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState(STATUS.IDLE);
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    setStatus(STATUS.PENDING);

    api
      .fetchImages(search, page)
      .then(({ data }) => {
        if (data.hits <= 0) {
          setError('not found');
          setStatus(STATUS.REJECTED);

          return;
        } else {
          setImages(prevState =>
            page > 1 ? [...prevState, ...data.hits] : data.hits
          );
          setStatus(STATUS.RESOLVED);
          setTotalImages(data.total);
          toast.info(`Im search ${data.total} images`);
        }
      })
      .catch(error => setError(error.message), setStatus(STATUS.REJECTED));
  }, [page, search]);

  const handleLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const isShownButton = page * 12 < totalImages ? true : false;

  return (
    <Container>
      <div className={css.box}>
        <SearchBar onSubmit={handleFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && isShownButton && (
          <Button onClick={handleLoadMoreClick} />
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
