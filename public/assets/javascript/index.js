$(document).ready(function() {
  // Setting a reference to the article-containter div where all the dynamic content will go
  // Adding event listeners to any dynamically generated 'save article'
  // and 'scrape new article' buttons
  let articleContainer = $('.article-container');
  $(document).on('click', '.btn.save', handleArticleSave);
  $(document).on('click', 'scrape-new', handleArticleScrape);
});

// once the page is done loading, run initPage function
initPage();

function initPage() {
  // Empties article container, and runs AJAX request
  articleContainer.empty();
  $.get('/api/headlines?saved=false').then(function(data) {
    // if we have headlines, render to page
    if (data && data.length) {
      renderArticles(data);
    } else {
      renderEmpty();
    }
  });
}
// function handles appending HTML containing our article data to the page
function renderArticles(articles) {
  let articlePanels = [];

  for (var i = 0; articles.length; i++) {
    articlePanels.push(createPanel(articles[i]));
  }

  function createPanel(article) {
    let panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        '<h3>',
        article.headline,
        "<a class='btn btn-success save'>",
        'Save Article',
        '</a>',
        '</h3>',
        '</div>',
        "<div class='panel-body'>",
        article.summary,
        '</div>',
        '</div>'
      ].join('')
    );

    panel.data('_id', article._id);
  }
  return panel;
}

function renderEmpty() {
  // renders message to page saying we don't have any articles to view
  let emptyAlert = $(
    [
      "<div class='alert alert-warning text-center'>",
      '</div>',
      "<div class='panel panel-default'>",
      "<div class='panel-heading text-center'>",
      "<h3>What's Your Next Move?</h3>",
      '</div>',
      "<div class='panel-body text-center'>",
      "<h4><a class='scrape-new'> Get New Articles</a></h4>",
      "<h4><a href='/saved'>See Your Saved Articles</a></h4>",
      '</div>',
      '</div>'
    ].join('')
  );
  // append data to page
  articleContainer.append(emptyAlert);
}

function handleArticleSave() {
  // run function when user wants to save article
  // rendering the article, and attaching js object containing the headline id
  let articleToSave = $(this)
    .parent('.panel')
    .data();
  // using patch method we update the existing article in the collection
  $.ajax({
    method: 'PATCH',
    url: '/api/headlines',
    data: articleToSave
  }).then(function(data) {
    if (data.ok) {
      initPage();
    }
  });
}

function handleArticleScrape() {
  // handles user click of button to scrape article
  $.get('/api/fetch').then(function(data) {
    initPage();
    bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + '<h3>');
  });
}
