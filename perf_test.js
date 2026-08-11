const doctors = [];
for (let i = 0; i < 1000; i++) {
  doctors.push({
    name: "Doctor " + i + " " + (i % 2 === 0 ? "Smith" : "Jones"),
    spec: i % 3 === 0 ? "Specialty A" : "Specialty B"
  });
}
const search = "smith";
const spec = "All";

console.time("Baseline");
for (let j = 0; j < 10000; j++) {
  const filtered = doctors.filter(d => {
    const matchSpec = spec === 'All' || d.spec === spec;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });
}
console.timeEnd("Baseline");

console.time("Optimized");
const searchLower = search.toLowerCase();
for (let j = 0; j < 10000; j++) {
  const filtered = doctors.filter(d => {
    const matchSpec = spec === 'All' || d.spec === spec;
    const matchSearch = d.name.toLowerCase().includes(searchLower) || d.spec.toLowerCase().includes(searchLower);
    return matchSpec && matchSearch;
  });
}
console.timeEnd("Optimized");
