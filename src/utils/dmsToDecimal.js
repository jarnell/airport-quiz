/*  Converts DMS in format 575659N 0123441E to decimals
    I was lazy writing this, it won't work for S or W values */
const dmsToDecimal = (dms) => {
  const lat =
    parseInt(dms.slice(0, 2)) +
    parseInt(dms.slice(2, 4)) / 60 +
    parseInt(dms.slice(4, 6)) / 3600;

  const lng =
    parseInt(dms.slice(8, 11)) +
    parseInt(dms.slice(11, 13)) / 60 +
    parseInt(dms.slice(13, 15)) / 3600;

  return {
    lat,
    lng,
  };
};

export default dmsToDecimal;
