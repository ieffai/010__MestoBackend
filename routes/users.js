const router = require('express').Router();

const {
  getUsers, getUser, createUser, updateProfile, changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
