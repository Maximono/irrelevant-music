import React from 'react'

const BandsSearch = function(props) {
  const searchQuery = props.searchQuery;
  const handleSearch = function(event) {
    event.preventDefault();
    props.handleSearch('search', {searchQuery: event.currentTarget[0].value});
  };

  return (
    <form onSubmit={handleSearch}>
      <input type='text' name='searchQuery' placeholder='Search by name..'/>
      <input type='submit' value='Search'/>
    </form>

  )
}

export default BandsSearch;