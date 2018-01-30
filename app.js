function getFrequencies(str) {
  const sorted = str.split('').sort();
  const data = [];
  for (let i = 0; i < sorted.length; i++) {
    const last = data[data.length -1];
    if (last && last.character === sorted[i]) last.count++; //preventing duplicates
    else data.push({ character: sorted[i], count: 1}); //adds to array of objects of letters with count
  }
  return data;
}
