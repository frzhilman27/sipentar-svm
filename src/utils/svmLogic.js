// src/utils/svmLogic.js
export const simulateSVMPrediction = (text) => {
  const lowerText = text.toLowerCase();
  
  // Kata kunci sebagai simulasi support vectors
  const highPriority = ['rusak', 'berlubang', 'kecelakaan', 'banjir', 'kebakaran', 'darurat', 'amblas'];
  const mediumPriority = ['kotor', 'sampah', 'macet', 'bising', 'lampu mati', 'tersumbat'];
  
  if (highPriority.some(keyword => lowerText.includes(keyword))) {
    return { priority: 'Tinggi', color: 'bg-red-500' };
  } else if (mediumPriority.some(keyword => lowerText.includes(keyword))) {
    return { priority: 'Sedang', color: 'bg-yellow-500' };
  } else {
    return { priority: 'Rendah', color: 'bg-green-500' };
  }
};