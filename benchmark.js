const doctors = [];
for (let i = 0; i < 100000; i++) {
  doctors.push({
    name: 'Doctor ' + i,
    specialization: i % 2 === 0 ? 'Panchakarma Specialist' : 'Ayurvedic Physician'
  });
}
const search = 'Specialist';

console.time('Before optimization');
for (let j = 0; j < 100; j++) {
  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );
}
console.timeEnd('Before optimization');

console.time('After optimization');
const lowerSearch = search.toLowerCase();
for (let j = 0; j < 100; j++) {
  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(lowerSearch) ||
    d.specialization.toLowerCase().includes(lowerSearch)
  );
}
console.timeEnd('After optimization');
