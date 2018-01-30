//Reset Button
d3.select('#reset')
  .on('click', function() {
    d3.selectAll('.letter')
      .remove(); //Clears all letter nodes

//Clears additional text
    d3.select('#phrase')
      .text('');

    d3.select('#count')
      .text('');
  })

//Access input of form
d3.select('form')
  .on('submit', function() {
    d3.event.preventDefault(); //prevents page reload
    const input = d3.select('input');
    const text = input.property('value');

    const letters = d3.select('#letters')
                      .selectAll('.letter') //generates nodes
                      .data(getFrequencies(text), function(d) {
                        return d.character; //not by index
                      });

//removes letters that are not counted++ in new word from previous word
      letters
          .classed('new', false)
        .exit()
        .remove();

//adds new letters against the previous word
      letters
        .enter()
        .append('div')
          .classed('letter', true)
          .classed('new', true)
        .merge(letters) //merges two data sets together (current word, previous word)
          .style('width', '20px')
          .style('line-height', '20px')
          .style('margin-right', '5px')
          .style('height', function(d) {
            return d.count * 20 + 'px'; //increases height based on count value
          })
          .text(function(d) {
            return d.character; //returns character in div
          })

//Additional text input
      d3.select('#phrase')
        .text('Analysis of: ' + text);

      d3.select('#count')
        .text("(New characters: " + letters.enter().nodes().length + ")");

//Clear form input
      input.property('value', '');
  })

//Get Frequency of Each Letter in a String
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
