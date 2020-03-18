const router = require('express').Router();

const {
  getUsers, getUser, updateProfile, changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
