const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Get Request in Places');
    res.json({message: 'Query Succesful'});
});

module.exports = router;