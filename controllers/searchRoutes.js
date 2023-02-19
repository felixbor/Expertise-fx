const router = require('express').Router();
const { Skill, User, UserSkill, Role } = require('../models');
const withAuth = require('../utils/auth');


router.get('/',withAuth, async(req,res)=>{
    try{
      
    const allSkillsData = await Skill.findAll();
      
    const allSkills = allSkillsData.map((skillData)=> skillData.get({plain : true }));

    res.render('search', {    
      allSkills,
      is_employer:req.session.is_employer,
      logged_in: true
    });

    }catch(err){
      console.log((err));
      res.status(500).json(err);
    }
  
  });


router.get('/:skill_id', withAuth, async(req,res) =>{
     
    try{

        const selected_skill_id = req.params.skill_id;
        const SName = await Skill.findByPk( selected_skill_id, {
          attributes:["skill_name"]}
         
      ); 
     const SkillName = SName.get({plain:true});
      
      console.log(SName)

      console.log(SkillName)
        const usersWithSkillData = await User.findAll({
            include:[
                {model: UserSkill , where:{skill_id: selected_skill_id }}, {model: Role}
            ],
            attributes: ["first_name", "last_name", "email"]
        });
    
        if (!usersWithSkillData) {
            res.status(404).json({ message: 'No Candidates found with this id!' });
            return;
          }
        const usersWithSkill = usersWithSkillData.map(userData=>userData.get({plain:true}));


        const allSkillsData = await Skill.findAll();
      
        const allSkills = allSkillsData.map((skillData)=> skillData.get({plain : true }));
 //res.send(SName)
       // console.log(usersWithSkill);
       // res.status(200).json(usersWithSkill);
        res.render('search', {
            usersWithSkill,
            allSkills,
            SkillName,
            selected_skill_id: req.params.skill_id,
            is_employer:req.session.is_employer,
            logged_in: true
          });

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;

