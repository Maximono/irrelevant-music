import React from "react";
import getBands from "../api/client";
import ReactPaginate from 'react-paginate';

class Bands extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bands: [], sortingColumn: 'name', sortingDirection: 'asc', totalPages: 1};
    this.handleClick = this.handleClick.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this)
  }

  handleClick(event) {
    const self = this;
    const eventName = event.currentTarget.name;
    if (event.currentTarget.name === this.state.sortingColumn) {

      const newSortingDirection = (this.state.sortingDirection === 'asc') ? 'desc' : 'asc';
      getBands(this.state.sortingColumn, newSortingDirection).then(function (data) {
        self.setState({bands: data.bands, sortingDirection: newSortingDirection})
      });
    } else {
      getBands(eventName, this.state.sortingDirection).then(function (data) {
        self.setState({bands: data.bands, sortingColumn: eventName})
      });
    }
  }

  handlePaginationClick() {
    const self = this;
    const paginationPage = event.currentTarget.activeElement.text;
    getBands(this.state.sortingColumn, this.state.sortingDirection, paginationPage).then(function (data) {
      self.setState({bands: data.bands, totalPages: data.totalPages})
    });
  }

  componentDidMount() {
    const self = this;
    getBands(this.state.sortingColumn, this.state.sortingDirection).then(function(data){
      self.setState({bands: data.bands, totalPages: data.totalPages})
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to the most irrelevant music table u could possibly find!</h1>
        <table>
          <thead>
          <tr>
            <th>
              <button name='name' onClick={this.handleClick}>Name</button>
            </th>
            <th>
              <button name='genres' onClick={this.handleClick}>Genres</button>
            </th>
            <th>
              <button name='albums' onClick={this.handleClick}>Albums</button>
            </th>
          </tr>
          </thead>
          <tbody>
          {this.state.bands.map(function(band) {
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
        <ReactPaginate
          breakLabel={'...'}
          pageCount={this.state.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={this.handlePaginationClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default Bands;