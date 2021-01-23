const router = require('express').Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


//USER REGISTRATION

router.post('/register', function (req,res){
    User.create({
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.passwordhash,13)
    })
    .then(
        function registerSuccess(user) {
            let token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.json({
                message: "User successfully registered!",
                user: user,
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
});


//USER LOGIN

router.post('/login', function (req,res){
    User.findOne({where: {
        username: req.body.username
    }})
    .then(
        function loginSuccess(user){
            if(user){
                bcrypt.compare(req.body.passwordhash, user.passwordhash, function (err,matches){
                    if(matches){
                        let token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        
                        res.status(200).json({
                            message: "User successfully logged in!",
                            user: user,
                            sessionToken: token  
                        })
                
        } else {
            res.status(502).send({error: "Login failed."});
        }
        });
    } else {
        res.status(500).json({error: "User does not exist."})
    }
})
    .catch(err => res.status(500).json({error: err}))
});





module.exports = router;