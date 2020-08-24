import React from 'react'
import ReactPaginate from 'react-paginate'

const BandsPagination = function(props) {
  const handleClick = function(page) {
    props.handlePagination('pagination', {currentPage: page.selected + 1})
  };

  return (
    <ReactPaginate
      breakLabel={'...'}
      pageCount={props.totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handleClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  )
};

export default BandsPagination;