const router = require('express').Router();

router.all('*', (req, res) => res.status(404).json({ message: 'No such file or directory' }));

module.exports = router;
