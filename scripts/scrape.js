// Parses our HTML and helps us find element
let cheerio = require('cheerio');
// Makes HTTP request for HTML page
let axios = require('axios');

// First, tell the console what server.js is doing
console.log(
  '\n***********************************\n' +
    'Grabbing every headline, summary, and link\n' +
    'from The Wall Street Journal webdev board:' +
    '\n***********************************\n'
);

let scrape = function(cb) {

  // Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
  axios.get('https://www.wsj.com/news/technology').then(function(response) {
    // Load the HTML into cheerio and save it to a letiable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    let $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    let results = [];

    // With cheerio, find each h3-tag
    // (i: iterator. element: the current element)
    $('h3').each(function(i, element) {
      // Save the text of the element in a "title" letiable
      let title = $(this)
        .children()
        .text();

      // Save the text of the element in a 'summary letiable
      let summary = $(this) // could not get summary to display to page
        .find('span')
        .text();

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      let link = $(this)
        .children('a')
        .attr('href');

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        summary: summary,
        link: link
      });
    });
    cb(results);
    // Log the results once you've looped through each of the elements found with cheerio
    // console.log(results);
  });
};

module.exports = scrape;
