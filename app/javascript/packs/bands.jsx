import React from 'react';
import ReactDOM from 'react-dom'
import Bands from "../components/bands";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Bands/>,
    document.querySelector('.js-bands')
  )
});
