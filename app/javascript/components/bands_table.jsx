import React from 'react'

const BandsTable = function(props) {
  const bands = props.bands;

  const handleClick = function (event) {
    props.handleSortingChange('sorting', {sortingColumn: event.currentTarget.name})
  };

  return (
    <table>
      <thead>
      <tr>
        <th>
          <button name='name' onClick={handleClick}>Name</button>
        </th>
        <th>
          <button name='genres' onClick={handleClick}>Genres</button>
        </th>
        <th>
          <button name='albums' onClick={handleClick}>Albums</button>
        </th>
      </tr>
      </thead>
      <tbody>
      {bands.map(function(band) {
        return (
          <tr key={band.id}>
            <td>{band.attributes.name}</td>
            <td>{band.attributes.genres}</td>
            <td>{band.attributes.albums}</td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
};

export default BandsTable;