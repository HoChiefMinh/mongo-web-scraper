$(document).ready(function() {
  let articleContainer = $('.article-container');

  $(document).on('click', '.btn.delete', handleArticleDelete);
  $(document).on('click', '.btn.notes', handleArticleNotes);
  $(document).on('click', '.btn.save', handleNoteSave);
  $(document).on('click', '.btn.note-delete', handleNoteDelete);

  initPage();

  function initPage() {
    articleContainer.empty();
    jQuery.get('/api/headlines?saved=true').then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    let articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlesPanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    let panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        '<h3>',
        article.headline,
        "<a class='btn btn-danger delete'>",
        'Delete from Saved',
        '</a>',
        "<a class='btn btn-info notes'>Article Notes</a>",
        '</h3>',
        '</div>',
        "<div class='panel-body'>",
        article.summary,
        '</div>',
        '</div>'
      ].join('')
    );

    panel.data('_id', article._id);

    return panel;
  }

  function renderEmpty() {
    // renders message to page saying we don't have any articles to view
    let emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        '</div>',
        '<h4>No saved articles.</h4>',
        '</div>',
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        '<h3>Would you like to  keep browsing?</h3>',
        '</div>',
        "<div class='panel-body text-center'>",
        "<h4><a href='/saved'>Browse Articles</a></h4>",
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
      bootbox.alert(
        "<h3 class='text-center m-top-80'>" + data.message + '<h3>'
      );
    });
  }

  function renderNotesList(data) {
    let notesToRender = [];
    let currentNote;
    if (!data.notes.length) {
      currentNote = [
        "<li class='list-group-item'>",
        'No notes yet.',
        '</li>'
      ].join('');
      notesToRender.push(currentNote);
    } else {
      for (var i = 0; i < data.notes.length; i++) {
        currentNote = $(
          [
            "<li class='list-group-item note'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            '</li>'
          ].join('')
        );
        currentNote.children('button').data('_id', data.notes[i]._id);
        notesToRender.push(currentNote);
      }
    }
    $('.note-container').append(notesToRender);
  }

  function handleArticleDelete() {
    let articleToDelete = $(this)
      .parents('.panel')
      .data();
    $.ajax({
      method: 'DELETE',
      url: '/api/headlines/' + articleToDelete._id
    }).then(function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }

  function handleArticleNotes() {
    let currentArticle = $(this)
      .parents('.panel')
      .data();
    $.get('/api/notes/' + currentArticle._id).then(function(data) {
      let modalText = [
        "<div class='container-fluid text center'>",
        '<h4>Notes For Article: ',
        currentArticle._id,
        '</h4>',
        '<hr />',
        "<ul class='list-group note-container'>",
        '</ul>',
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "button class='btn btn-success save'>Save Note</button>",
        '</div>'
      ].join('');
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      let noteData = {
        _id: currentArticle._id,
        notes: data || []
      };
      $('.btn.save').data('article', noteData);
      renderNotesList(noteData);
    });
  }

  function handleNoteSave() {
    let noteData;
    let newNote = $('.bootbox-body textarea')
      .val()
      .trim();
    if (newNote) {
      noteData = {
        _id: $(this).data('article')._id,
        noteText: newNote
      };
      $.post('/api/notes', noteData).then(function() {
        bootbox.hideAll();
      });
    }
  }

  function handleNoteDelete() {
    let noteToDelete = $(this).data('_id');
    $.ajax({
      url: '/api/notes/' + noteToDelete,
      method: 'DELETE'
    }).then(function() {
      bootbox.hideAll();
    });
  }
});
