const router = require('express').Router();
const userRoutes = require('./userRoutes');
const skillRoutes = require('./skillRoutes');

router.use('/users', userRoutes);
router.use('/skills', skillRoutes);

module.exports = router;
