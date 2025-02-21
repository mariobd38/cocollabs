// const formatTokens = ['YYYY', 'YY', 'MM', 'M', 'DD', 'D', 'MMMM', 'MMM'];
const yearTokens= ['YY', 'YYYY'];
const monthTokens= ['M', 'MM', 'MMM', 'MMMM'];
const dayTokens= ['D', 'DD'];
const separators = ['-', '/', ' '];

// Function to generate all possible date formats recursively
  
function generateDateFormatsHelper(result) {
    for (const yearToken of yearTokens) {
      for (const monthToken of monthTokens) {
        for (const dayToken of dayTokens) {
          for (const separator of separators) {
            result.push(`${monthToken}${separator}${dayToken}${separator}${yearToken}`);
          }
        }
      }
    }
    return result;
  }

function generateDateFormats() {
    const result = [];
    generateDateFormatsHelper(result);
    return result;
}

export {generateDateFormats}