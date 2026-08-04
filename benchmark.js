const { performance } = require('perf_hooks');

const hospitals = [
  { id: 1, name: "KIMS Ayurveda Hospital", city: "Kerala", emoji: "🏥", rating: 4.9, reviews: 512, specialty: "Panchakarma", cost: "₹50,000 - ₹2,00,000", beds: 200, accredited: true },
  { id: 2, name: "Patanjali Wellness Center", city: "Rishikesh", emoji: "🌿", rating: 4.8, reviews: 389, specialty: "Yoga & Detox", cost: "₹30,000 - ₹1,50,000", beds: 150, accredited: true },
  { id: 3, name: "Arya Vaidya Sala", city: "Kottakkal", emoji: "🏛️", rating: 5.0, reviews: 678, specialty: "Classical Ayurveda", cost: "₹40,000 - ₹1,80,000", beds: 300, accredited: true },
  { id: 4, name: "Soukya Holistic Center", city: "Bangalore", emoji: "🌸", rating: 4.9, reviews: 445, specialty: "Integrative Medicine", cost: "₹60,000 - ₹2,50,000", beds: 100, accredited: true },
  { id: 5, name: "Indus Valley Ayurveda", city: "Mysore", emoji: "🌺", rating: 4.7, reviews: 298, specialty: "Rejuvenation", cost: "₹35,000 - ₹1,20,000", beds: 80, accredited: false },
  { id: 6, name: "CGH Earth Ayurveda", city: "Kerala", emoji: "🌴", rating: 4.8, reviews: 367, specialty: "Luxury Wellness", cost: "₹80,000 - ₹3,00,000", beds: 60, accredited: true },
];

const largeHospitals = [];
for (let i = 0; i < 200000; i++) {
  largeHospitals.push(...hospitals);
}

const search = "Kerala";

console.log("Benchmarking unoptimized (baseline)...");
const start1 = performance.now();
for (let j = 0; j < 10; j++) {
  largeHospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.city.toLowerCase().includes(search.toLowerCase())
  );
}
const end1 = performance.now();
const baselineTime = end1 - start1;
console.log(`Baseline time: ${baselineTime.toFixed(2)} ms`);

console.log("Benchmarking optimized...");
const start2 = performance.now();
for (let j = 0; j < 10; j++) {
  const searchLower = search.toLowerCase();
  largeHospitals.filter(h =>
    h.name.toLowerCase().includes(searchLower) ||
    h.city.toLowerCase().includes(searchLower)
  );
}
const end2 = performance.now();
const optimizedTime = end2 - start2;
console.log(`Optimized time: ${optimizedTime.toFixed(2)} ms`);

const improvement = ((baselineTime - optimizedTime) / baselineTime) * 100;
console.log(`Improvement: ${improvement.toFixed(2)}%`);
