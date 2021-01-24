let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');


//CREATE ENTRY

router.post('/create', validateSession, (req,res) => {
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/log', function(req,res){
    res.send("log route")
});

//GET ALL ENTRIES

router.get("/", (req,res) => {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;

//GET ALL BY USER

router.get("/mine", validateSession, (req,res) => {
    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});


//GET BY ID BY USER ID

router.get("/:id", validateSession, (req,res) => {
    let id = req.params.id;
    let userid = req.user.id;

    Log.findAll({
        where: {id: id, owner_id: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});


//UPDATE BY USER

router.put("/update/:id", validateSession, function (req,res) {
    const updateLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
    };

    const query = {where: {id: req.params.id, owner_id: req.user.id}};
    
    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error: err}));
});

//DELETE LOG BY USER

router.delete("/delete/:id", validateSession, function (req,res) {
    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    Log.destroy(query)
    .then(() => res.status(200).json({message: "Workout log entry removed"}))
    .catch((err) => res.status(500).json({error: err}));
});