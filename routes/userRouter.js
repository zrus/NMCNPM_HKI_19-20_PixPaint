let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let keepLoggedIn = (req.body.keepLoggedIn != undefined);
    // console.log("Req val: " + req.body.keepLoggedIn);
    // console.log(keepLoggedIn);

    userController
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                if (userController.comparePassword(password, user.password)) {
                    req.session.cookie.maxAge = keepLoggedIn ? 30 * 24 * 60 * 60 * 100 : null;
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    res.render('login', {
                        message: 'Incorrect Password!',
                        type: 'alert-danger'
                    });
                }       
            } else {
                res.render('login', {
                    message: 'Email does not exists!',
                    type: 'alert-danger'
                });
            }
        });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let keepLoggedIn = (req.body.keepLoggedIn != undefined);

    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    if (password != confirmPassword) {
        return res.render('register', {
            message: 'Confirm password does not match!',
            type: 'alert-danger'
        });
    }

    userController
        .getUserByEmail(user.email)
        .then(user => {
            if (user) {
                return res.render('register', {
                    message: `Email ${email} exists!`,
                    type: 'alert-danger'
                });
            }
            //Tao tai khoan
            user = {
                username,
                email,
                password
            };
            return userController
                .createUser(user)
                .then(user => {
                    if (keepLoggedIn) {
                        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 100;
                        req.session.user = user;
                        res.redirect('/');
                    } else {
                        res.render('login', {
                            message: 'You have registered, now please log in!',
                            type: 'alert-primary'
                        });
                    }
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        } 
        return res.redirect('/');
    });
});

router.get('/profile/:username', (req, res) => {
    let userController = require('../controllers/userController');
    userController
    .getUserByUsername(req.params.username)
    .then(user => {
        res.locals.user = req.session.user;
        res.render('profile');
    })
    .catch(error => next(error));
});

module.exports = router;