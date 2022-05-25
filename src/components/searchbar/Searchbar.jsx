import React, { Component } from "react";
import PropTypes from 'prop-types';
import s from "./Searchbar.module.css";
import Notiflix from "notiflix";

class Searchbar extends Component {

    state = {
        input: "",
    };
  
    handleChange = e => {
        this.setState({ input: e.currentTarget.value.toLowerCase() })
    };
    handleFormSubmit = e => {
      e.preventDefault();
      if (this.state.input.trim() === "") {
        Notiflix.Notify.warning("Please enter something");
        return;
      }

        this.props.onSubmit(this.state.input);
        this.setState({ input: "" });
    };

  render() {
    const { input } = this.state;

    return (
<header className={s.Searchbar}>
  <form className={s.SearchForm } onSubmit={this.handleFormSubmit}>
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
      onChange={this.handleChange}
      value={input}
    />
  </form>
</header>   
)}   
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;