import Papa from 'papaparse';

const csvParser = (file, headers) => new Promise((resolve, reject) => {
  if (file) {
    Papa.parse(file, {
      header: (headers === true) ? true : false,
      complete: (results) => resolve(results),
    });
  } else {
    reject("No file provided to parse");
  }
});

export default csvParser;
