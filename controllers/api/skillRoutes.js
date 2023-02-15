const router = require('express').Router();
const { Skill, User, UserSkill } = require('../../models');
const withAuth = require('../../utils/auth');


//with_auth

router.post('/', withAuth, async (req, res) => {

    try{
        const newSkill = await UserSkill.create({
            ...req.body,
            user_id: req.session.id
         });
         res.status(200).json(newSkill);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    

});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const skillData = await UserSkill.destroy({
        where: {
          skill_id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (! skillData) {
        res.status(404).json({ message: 'No Skill found with this id!' });
        return;
      }
  
      res.status(200).json(skillData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;
