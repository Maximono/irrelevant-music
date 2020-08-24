import React from "react";
import getBands from "../api/client";
import BandsTable from "./bands_table";
import BandsPagination from "./bands_pagination";
import BandsSearch from "./bands_search";

class Bands extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      sortingColumn: 'name',
      sortingDirection: 'asc',
      totalPages: 1,
      currentPage: 1,
      searchQuery: ''
    };
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(type, params) {
    switch (type) {
      case "sorting":
        this.handleSorting(params);
        break;
      case "pagination":
        this.handlePagination(params);
        break;
      case "search":
        this.handleSearch(params);
        break;
      default:
        break
    }
  }

  handleSorting(params) {
    const self = this;
    let sortingDirection = this.state.sortingDirection;

    if (params.sortingColumn === this.state.sortingColumn) {
      sortingDirection = (this.state.sortingDirection === 'asc') ? 'desc' : 'asc';
    }

    getBands(params.sortingColumn, sortingDirection, this.state.currentPage, this.state.searchQuery)
      .then(function (data) {
        self.setState({bands: data.bands, sortingDirection: sortingDirection, sortingColumn: params.sortingColumn})
      });
  }

  handlePagination(params) {
    const self = this;

    getBands(this.state.sortingColumn, this.state.sortingDirection, params.nextPage, this.state.searchQuery)
      .then(function (data) {
        self.setState({bands: data.bands, totalPages: data.totalPages, currentPage: params.nextPage})
      });
  }

  handleSearch(params) {
    const self = this;

    getBands(this.state.sortingColumn, this.state.sortingDirection, '1', params.searchQuery)
      .then(function (data) {
        self.setState({bands: data.bands, totalPages: data.totalPages, searchQuery: params.searchQuery})
      });
  }

  componentDidMount() {
    const self = this;
    getBands(this.state.sortingColumn, this.state.sortingDirection)
      .then(function(data){
        self.setState({bands: data.bands, totalPages: data.totalPages})
      })
  }

  render() {
    return (
      <div>
        <h1>Welcome to the most irrelevant music table u could possibly find!</h1>
        <BandsSearch searchQuery={this.state.searchQuery} handleSearch={this.handleDataChange}/>
        <br/>
        <BandsTable bands={this.state.bands} handleSortingChange={this.handleDataChange}/>
        <BandsPagination totalPages={this.state.totalPages} handlePagination={this.handleDataChange}/>
      </div>
    );
  }
}

export default Bands;