const router = require('express').Router();

router.all('*', (req, res) => res.status(404).json({ msg: 'Запрашиваемый ресурс не найден' }));

module.exports = router;
