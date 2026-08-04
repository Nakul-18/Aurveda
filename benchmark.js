const { performance } = require('perf_hooks');

const symptoms = Array.from({ length: 1000 }, (_, i) => `Symptom_${i}`);

// Array approach
function benchmarkArray(iterations) {
  let selected = [];
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const s = symptoms[i % symptoms.length];

    // toggle
    if (selected.includes(s)) {
      selected = selected.filter(x => x !== s);
    } else {
      selected = [...selected, s];
    }

    // render check
    for (let j = 0; j < symptoms.length; j++) {
      const has = selected.includes(symptoms[j]);
    }
  }
  const end = performance.now();
  return end - start;
}

// Set approach
function benchmarkSet(iterations) {
  let selected = new Set();
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const s = symptoms[i % symptoms.length];

    // toggle
    const next = new Set(selected);
    if (next.has(s)) {
      next.delete(s);
    } else {
      next.add(s);
    }
    selected = next;

    // render check
    for (let j = 0; j < symptoms.length; j++) {
      const has = selected.has(symptoms[j]);
    }
  }
  const end = performance.now();
  return end - start;
}

const iterations = 5000;
console.log(`Running benchmarks for ${iterations} iterations...`);

const timeArray = benchmarkArray(iterations);
console.log(`Array time: ${timeArray.toFixed(2)} ms`);

const timeSet = benchmarkSet(iterations);
console.log(`Set time: ${timeSet.toFixed(2)} ms`);

const improvement = ((timeArray - timeSet) / timeArray) * 100;
console.log(`Improvement: ${improvement.toFixed(2)}%`);
