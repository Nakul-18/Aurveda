const { performance } = require('perf_hooks');

const NUM_PRODUCTS = 10000;
const NUM_ADDED_ITEMS = 1000;

const products = Array.from({ length: NUM_PRODUCTS }, (_, i) => ({ id: i }));
const addedItems = Array.from({ length: NUM_ADDED_ITEMS }, (_, i) => i * 2);

function runArrayIncludes() {
  const start = performance.now();
  let count = 0;
  products.forEach(product => {
    if (addedItems.includes(product.id)) {
      count++;
    }
  });
  const end = performance.now();
  return end - start;
}

function runSetHas() {
  const start = performance.now();
  let count = 0;
  const addedItemsSet = new Set(addedItems);
  products.forEach(product => {
    if (addedItemsSet.has(product.id)) {
      count++;
    }
  });
  const end = performance.now();
  return end - start;
}

const arrTimes = [];
const setTimes = [];

for (let i = 0; i < 10; i++) {
  arrTimes.push(runArrayIncludes());
  setTimes.push(runSetHas());
}

const avgArr = arrTimes.reduce((a, b) => a + b, 0) / arrTimes.length;
const avgSet = setTimes.reduce((a, b) => a + b, 0) / setTimes.length;

console.log(`Array includes avg time: ${avgArr.toFixed(3)} ms`);
console.log(`Set has avg time: ${avgSet.toFixed(3)} ms`);
console.log(`Improvement: ${(avgArr / avgSet).toFixed(2)}x faster`);
