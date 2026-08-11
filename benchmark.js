const products = [
  { id: 1, name: "अश्वगंधा मुळाची पावडर", category: "तणाव व झोप", price: 299, originalPrice: 399, rating: 4.8, reviews: 234, emoji: "🌿", badge: "सर्वाधिक विक्री", desc: "तणाव कमी करण्यासाठी आणि चांगल्या झोपेसाठी उत्कृष्ट दर्जाची अश्वगंधा" },
  { id: 2, name: "त्रिफळा चूर्ण", category: "पचन", price: 199, originalPrice: 249, rating: 4.7, reviews: 189, emoji: "🍃", badge: "लोकप्रिय", desc: "पचन सुधारण्यासाठी आणि शरीर शुद्धीकरणासाठी पारंपरिक आयुर्वेदिक मिश्रण" },
  { id: 3, name: "ब्राह्मी कॅप्सूल", category: "मेंदू व स्मरणशक्ती", price: 349, originalPrice: 449, rating: 4.9, reviews: 312, emoji: "🧠", badge: "उच्च दर्जा", desc: "स्मरणशक्ती, एकाग्रता आणि मेंदूची कार्यक्षमता नैसर्गिकरित्या वाढवा" },
  { id: 4, name: "कडुनिंब गोळ्या", category: "त्वचा व रक्त", price: 149, originalPrice: 199, rating: 4.6, reviews: 156, emoji: "🌱", badge: null, desc: "शुद्ध कडुनिंबामुळे रक्तशुद्धी आणि त्वचेचे आरोग्य सुधारते" },
  { id: 5, name: "हळद + काळी मिरी", category: "रोगप्रतिकारक शक्ती", price: 249, originalPrice: 299, rating: 4.8, reviews: 278, emoji: "🟡", badge: "नवीन", desc: "उत्तम शोषणासह सुवर्ण रोगप्रतिकारक शक्ती वाढवणारे मिश्रण" },
  { id: 6, name: "च्यवनप्राश", category: "रोगप्रतिकारक शक्ती", price: 399, originalPrice: 499, rating: 4.9, reviews: 445, emoji: "🫙", badge: "सर्वाधिक विक्री", desc: "४० हून अधिक औषधी वनस्पतींनी समृद्ध पारंपरिक आयुर्वेदिक च्यवनप्राश" },
  { id: 7, name: "शतावरी पावडर", category: "महिला आरोग्य", price: 299, originalPrice: 379, rating: 4.7, reviews: 198, emoji: "🌸", badge: "लोकप्रिय", desc: "महिलांच्या हार्मोनल संतुलनासाठी नैसर्गिक सहाय्य" },
  { id: 8, name: "गिलोय रस", category: "रोगप्रतिकारक शक्ती", price: 179, originalPrice: 229, rating: 4.6, reviews: 167, emoji: "🍀", badge: null, desc: "रोगप्रतिकारक शक्ती वाढवणारा आणि ताप कमी करण्यास मदत करणारा गिलोय रस" },
];

const search = "पावडर";
const selectedCat = "All";
const iterations = 1000000;

function runBaseline() {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const filtered = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'All' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }
  const end = performance.now();
  console.log(`Baseline: ${end - start} ms`);
}

function runOptimized() {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const lowerSearch = search.toLowerCase();
    const filtered = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(lowerSearch);
      const matchCat = selectedCat === 'All' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }
  const end = performance.now();
  console.log(`Optimized: ${end - start} ms`);
}

runBaseline();
runOptimized();
