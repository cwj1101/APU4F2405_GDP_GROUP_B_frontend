export const sortStatus = (dataArray, property, order = 'desc') => {
  const flattenedData = dataArray.flat();
  flattenedData.sort((a, b) => (order === 'desc' ? b[property] - a[property] : a[property] - b[property]));
  return flattenedData[0]?.[property].toString();
};

export const avgStatus = (dataArray, property) => {
  const flattenedData = dataArray.flat();
  const sum = flattenedData.reduce((acc, obj) => acc + obj[property], 0);
  return (sum / flattenedData.length).toFixed(2).toString();
};

export const sortGreaterEqual = (dataArray, property, threshold) => {
  const flattenedData = dataArray.flat();
  // Filter the data based on the threshold for the specified property
  const filteredData = flattenedData.filter(item => item[property] >= threshold);

  const count = filteredData.length;

  // Find the highest value for the specified property
  const highestValue = Math.max(...filteredData.map(item => item[property]));

  return { filteredData, count, highestValue };
};



// const sortStatusHigh = (dataArray, property) => {
//   const flattenedData = dataArray.flat();
//   flattenedData.sort((a, b) => b[property] - a[property]);
//   // Get the highest value of the specified property
//   return flattenedData[0]?.[property].toString();
// };

// const avgStatus = (dataArray, property) => {
//   const flattenedData = dataArray.flat();
//   const sum = flattenedData.reduce((acc, obj) => acc + obj[property], 0);
//   return (sum / flattenedData.length).toFixed(2).toString();
// };

// const sortStatusLow = (dataArray, property) => {
//   const flattenedData = dataArray.flat();
//   flattenedData.sort((a, b) => a[property] - b[property]);
//   // Get the lowest value of the specified property
//   return flattenedData[0]?.[property].toString();
// };