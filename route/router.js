var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    if (!req.session['session_id'] && req.url != '/login' && req.url != '/signup') {
        res.redirect('/login');
    } else {
        next();
    }
});
/* GET index page */

router.get('/', function(req, res) {
    res.render('indexs', { path: 'indexs.html' });
});

module.exports = router;