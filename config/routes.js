module.exports = function(router) {
    // This route render the homepage
    router.get('/', function(req, res) {
        res.render('home');
    });
    // This route renders the saved handlebars page
    router.get('/saved', function(req, res) {
        res.render('saved');
    });
}
