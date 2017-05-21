module.exports = function thousandSuffixFilter() {
  return function(input, decimals) {
    var exp, rounded,
        suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];

    if (window.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    rounded = (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    return rounded;

  }
};