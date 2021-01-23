let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const log = require('../db').import('../models/workoutlog');


//CREATE ENTRY

router.post('/create', validateSession, (req,res) => {
    const LogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    }
    log.create(LogEntry)
    .then(workoutlog => res.status(200).json(workoutlog))
    .catch(err => res.status(500).json({error: err}))
})



module.exports = router;