import { useEffect, useState } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

export default function ImageGallery({ searchPicture }) {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [prevSearch, setPrevSearch] = useState('');

  useEffect(() => {
    if (!searchPicture) {
      return;
    }
    if (loading) return;
    const isNewSearch = prevSearch !== searchPicture;
    const searchPage = isNewSearch ? 1 : page;

    setLoading(true);

    fetch(
      `https://pixabay.com/api/?q=${searchPicture}&page=${searchPage}&key=23546576-898e6f2f9578ee60189c27f38&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => response.json())
      .then(response => {
        if (isNewSearch) {
          setHits(response.hits);
          setPage(1);
          setPrevSearch(searchPicture);
        } else {
          setHits([...hits, ...response.hits]);
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadMore(true);
      });
  }, [searchPicture, page]);

  const handleLoad = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleItemClick = itemId => {
    setItemId(itemId);
    toggleModal();
  };

  const modalImage = hits?.find(hit => hit.id === Number(itemId));
  const imageSrc = modalImage?.largeImageURL;
  const imageTags = modalImage?.tags;
  return (
    <div>
      <ul className={s.ImageGallery}>
        {hits.map(img => (
          <ImageGalleryItem
            src={img.webformatURL}
            key={img.id}
            onClick={() => handleItemClick(img.id)}
          />
        ))}
      </ul>
      {loading && <Loader />}
      {loadMore && <Button onClickLoad={handleLoad} />}

      {showModal && (
        <Modal onClose={toggleModal} src={imageSrc} alt={imageTags} />
      )}
    </div>
  );
}
