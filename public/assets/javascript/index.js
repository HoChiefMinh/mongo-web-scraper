$(document).ready(function() {
  // Setting a reference to the article-containter div where all the dynamic content will go
  // Adding event listeners to any dynamically generated 'save article'
  // and 'scrape new article' buttons
  let articlecontainer = $('.article-container');
  $(document).on('click', '.btn.save', handleArticleSave);
  $(document).on('click', 'scrape-new', handleArticleScrape);
});
