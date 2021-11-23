import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default function Searchbar(props) {
  const [searchPicture, setSearchPicture] = useState('');

  const handleNameChange = event => {
    setSearchPicture(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchPicture.trim() === '') {
      return toast.error('Введіть назву картинки');
    }
    props.onSubmit(searchPicture);
    setSearchPicture('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchPicture}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
