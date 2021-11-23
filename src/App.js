import './App.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

export default function App() {
  const [searchPicture, setSearchPicture] = useState('');

  const handleFormSubmit = searchPicture => {
    setSearchPicture(searchPicture);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchPicture={searchPicture} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
