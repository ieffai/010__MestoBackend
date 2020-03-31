const router = require('express').Router();

const {
  getUsers, getUser, updateProfile, changeAvatar,
} = require('../controllers/users');

const { updateProfileValid, changeAvatarValid, idValid } = require('../modules/celebrateValidators');


router.get('/', getUsers);
router.get('/:id', idValid, getUser);
router.patch('/me', updateProfileValid, updateProfile);
router.patch('/me/avatar', changeAvatarValid, changeAvatar);

module.exports = router;
