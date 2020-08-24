import React from "react";
import getBands from "../api/client";
import BandsTable from "./bands_table";
import BandsPagination from "./bands_pagination";

class Bands extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      sortingColumn: 'name',
      sortingDirection: 'asc',
      totalPages: 1
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

    getBands(params.sortingColumn, sortingDirection).then(function (data) {
      self.setState({bands: data.bands, sortingDirection: sortingDirection, sortingColumn: params.sortingColumn})
    });
  }

  handlePagination(params) {
    const self = this;

    getBands(this.state.sortingColumn, this.state.sortingDirection, params.currentPage).then(function (data) {
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
        <BandsTable bands={this.state.bands} handleSortingChange={this.handleDataChange}/>
        <BandsPagination totalPages={this.state.totalPages} handlePagination={this.handleDataChange}/>
      </div>
    );
  }
}

export default Bands;