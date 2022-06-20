import { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { ServiceAPI } from './API';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { Modal } from './Modal';
import s from './ImageGallery/ImageGallery.module.css';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [imgId, setImgId] = useState(null);
  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   setSearchQuery(searchQuery);
  //   setPage(1);
  //   setData([]);
  // }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getPicture = () => {
      setStatus('pending');
      ServiceAPI(searchQuery, page)
        .then(dataProcessing)
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };
    getPicture();
  }, [page, searchQuery]);

  const dataProcessing = response => {
    const { hits: dataArray, totalHits } = response.data;
    if (!dataArray.length) {
      setStatus('rejected');
      setError(new Error('Try to change the request'));
      return;
    }

    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });

    const data = dataArray.map(data => {
      const {
        id,
        largeImageURL: imageURL,
        webformatURL: src,
        tags: alt,
      } = data;
      return { id, imageURL, src, alt };
    });
    setData(state => [...state, ...data]);
    setTotal(totalHits);
    setStatus('resolved');
  };

  const handleSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setPage(1);
      setData([]);
    }
    return;
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const clickOnImage = id => {
    setImgId(id);
    toggleModal();
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  const handleData = () => {
    return data.find(data => data.id === imgId);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {data.length > 0 && <ImageGallery data={data} onClick={clickOnImage} />}
      {status === 'resolved' && data.length > 0 && data.length < total && (
        <>
          <Button onClick={handleLoadMore} />
        </>
      )}

      {status === 'pending' && (
        <div className={s.Watch}>
          <Circles
            color="#00BFFF"
            height={100}
            width={100}
            ariaLabel="loading"
          />
        </div>
      )}

      {status === 'rejected' && (
        <div className={s.ImageGallery}>
          <p>{`Something went wrong! ${error}`}</p>
        </div>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={handleData().imageURL} alt={handleData().alt} />
        </Modal>
      )}
    </div>
  );
}
