import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Searchbar.module.css';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchButton}>
            <span className={css.searchButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchInput}
            type="text"
            autoComplete="off"
            name="search"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
