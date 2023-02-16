const router = require('express').Router();
const { Skill, User, UserSkill, Role } = require('../models');
const withAuth = require('../utils/auth');


router.get('/',withAuth, async(req,res)=>{
    try{
      
    const allSkillsData = await Skill.findAll();
      
    const allSkills = allSkillsData.map((skillData)=> skillData.get({plain : true }));

    res.render('search', {    
      allSkills,
      logged_in: true
    });

    }catch(err){
      console.log((err));
      res.status(500).json(err);
    }
  
  });


router.get('/:skill_id', withAuth, async(req,res) =>{
   
    try{
        const usersWithSkillData = await User.findAll({
            include:[
                {model: UserSkill , where:{skill_id: req.params.skill_id }}, {model: Role}
            ],
            attributes: ["first_name", "last_name", "email"]
        });
    
        if (!usersWithSkillData) {
            res.status(404).json({ message: 'No Candidates found with this id!' });
            return;
          }
        const usersWithSkill = usersWithSkillData.map(userData=>userData.get({plain:true}));

        console.log(usersWithSkill);
        res.status(200).json(usersWithSkill);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;

