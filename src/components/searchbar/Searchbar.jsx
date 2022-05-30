import { useState } from "react";
import PropTypes from 'prop-types';
import s from "./Searchbar.module.css";
import Notiflix from "notiflix";

export default function Searchbar({onSubmit}) {

    const [input, setInput] = useState('');
  
    const handleChange = e => {
    const { value } = e.currentTarget;
    setInput(value.toLowerCase());
    };
  
    const handleFormSubmit = e => {
      e.preventDefault();
      if (input.trim() === "") {
        Notiflix.Notify.warning("Please enter something");
        return;
      }

      onSubmit(input);
      setInput("");
    };

    return (
<header className={s.Searchbar}>
  <form className={s.SearchForm } onSubmit={handleFormSubmit}>
    <button type="submit" className={s.SearchFormButton} >
      <span className={s.SearchFormButtonLabel}>Search</span>
    </button>

    <input
      className={s.SearchFormInput}
      name="name"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleChange}
      value={input}
    />
  </form>
</header>   
)  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

