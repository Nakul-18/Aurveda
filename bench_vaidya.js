const { performance } = require('perf_hooks');

const vaidyas = [
  { id: 1, name: "Vaidya Rajesh Sharma", spec: "Panchakarma Expert", dosha: "Vata", available: true },
  { id: 2, name: "Vaidya Priya Nair", spec: "Ayurvedic Physician", dosha: "Pitta", available: true },
  { id: 3, name: "Vaidya Meera Iyer", spec: "Rasayana Therapy", dosha: "Kapha", available: false },
  { id: 4, name: "Vaidya Arjun Joshi", spec: "Herbal Medicine", dosha: "Vata", available: true },
  { id: 5, name: "Vaidya Lakshmi Devi", spec: "Women's Health", dosha: "Pitta", available: true },
  { id: 6, name: "Vaidya Suresh Kumar", spec: "Nadi Pariksha", dosha: "Kapha", available: false },
];

// Duplicate vaidyas to make array larger for benchmarking
let largeVaidyas = [];
for (let i = 0; i < 10000; i++) {
  largeVaidyas = largeVaidyas.concat(vaidyas);
}

const search = "expert";
const selectedSpec = "All";
const selectedDosha = "All Doshas";
const availableOnly = false;

function benchOriginal() {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const filtered = largeVaidyas.filter(v => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.spec.toLowerCase().includes(search.toLowerCase());
      const matchSpec = selectedSpec === 'All' || v.spec === selectedSpec;
      const matchDosha = selectedDosha === 'All Doshas' || v.dosha === selectedDosha;
      const matchAvail = availableOnly ? v.available : true;
      return matchSearch && matchSpec && matchDosha && matchAvail;
    });
  }
  const end = performance.now();
  return end - start;
}

function benchOptimized() {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const searchLower = search.toLowerCase();
    const filtered = largeVaidyas.filter(v => {
      const matchSearch = v.name.toLowerCase().includes(searchLower) || v.spec.toLowerCase().includes(searchLower);
      const matchSpec = selectedSpec === 'All' || v.spec === selectedSpec;
      const matchDosha = selectedDosha === 'All Doshas' || v.dosha === selectedDosha;
      const matchAvail = availableOnly ? v.available : true;
      return matchSearch && matchSpec && matchDosha && matchAvail;
    });
  }
  const end = performance.now();
  return end - start;
}

// Warmup
benchOriginal();
benchOptimized();

const origTime = benchOriginal();
const optTime = benchOptimized();

console.log(`Original: ${origTime.toFixed(2)} ms`);
console.log(`Optimized: ${optTime.toFixed(2)} ms`);
console.log(`Improvement: ${((origTime - optTime) / origTime * 100).toFixed(2)}%`);
