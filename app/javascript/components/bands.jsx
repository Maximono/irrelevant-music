import React from "react";
import getBands from "../api/client";

class Bands extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bands: [], sortingColumn: 'name', sortingDirection: 'asc'};
  }

  componentDidMount() {
    const self = this
    getBands(this.state.sortingColumn, this.state.sortingDirection).then(function(data){
      self.setState({bands: data.bands})
    })
  }

  render() {
    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Genres</th>
          <th>Albums</th>
        </tr>
        {this.state.bands.map(function(band) {
          return (
            <tr key={band.id}>
              <td>{band.attributes.name}</td>
              <td>{band.attributes.genres}</td>
              <td>{band.attributes.albums}</td>
            </tr>
          )
        }) }
      </table>
    );
  }
}

export default Bands;