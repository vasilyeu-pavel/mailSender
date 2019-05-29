const groupByChunk = (arr, chunk) => {
    let i;
    let j;
    const result = [];
    for (i = 0, j = arr.length; i < j; i += chunk) {
        result.push(arr.slice(i, i + chunk));
    }
    return result;
};

const getRandomId = () => Math.random().toString(36).substr(2, 9);

module.exports = { groupByChunk, getRandomId };
