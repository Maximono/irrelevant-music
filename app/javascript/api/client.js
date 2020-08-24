import 'whatwg-fetch';

const getBands = async function (sortingColumn, sortingDirection, paginationPage = "1") {
  const response = await fetch(`/api/v1/bands?sort_column=${sortingColumn}&sort_direction=${sortingDirection}&page=${paginationPage}`);
  const body = await response.json();
  return {bands: body.data, totalPages: body.meta.total_pages}
};

export default getBands;