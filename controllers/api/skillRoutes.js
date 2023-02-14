const router = require('express').Router();
const { Skill, User, UserSkill } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/profile', withAuth, async (req, res) => {
    

});