import 'whatwg-fetch';

const getBands = async function (sortingColumn, sortingDirection) {
  const response = await fetch(`/api/v1/bands?sort_column=${sortingColumn}&sort_direction=${sortingDirection}`);
  const body = await response.json();
  return {bands: body.data}
};

export default getBands;