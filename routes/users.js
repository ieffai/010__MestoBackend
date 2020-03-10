const router = require('express').Router();

const {
  getUsers, getUser, createUser, updateProfile, changeAvatar, delUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', delUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
