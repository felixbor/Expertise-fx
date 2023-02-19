const router = require('express').Router();
const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const { Skill, User, UserSkill,Role } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Get all the required data to be displayed in the home page
    const frontEnds = await User.findAndCountAll({include:[{
      model: Role ,where:{role_name: "Front-End Developer"}
      }]
    });
    
    const backEnds = await User.findAndCountAll({include:[{
      model: Role ,where:{role_name: 'Back-End Developer'}
      }]
    });

    const fullStacks = await User.findAndCountAll({include:[{
      model: Role ,where:{role_name: "FullStack Developer"}
      }]
    });
   
    // Pass serialized data and session flag into template
    res.render('homepage', {       
      logged_in: req.session.logged_in,
      is_employer:req.session.is_employer,
      fullStackCount: fullStacks.count,
      backEndCount: backEnds.count,
      frontEndCount:frontEnds.count


    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth,  async (req, res) => {
  try {
    // Find the logged in user based on the session ID req.session.user_id
    const userData = await User.findByPk(req.session.user_id, {
     attributes: { exclude: ['password'] },
      include: [{model:Role  },{ model: Skill, through: UserSkill }],
    });

    const user = userData.get({ plain: true });

    const allSkillsData = await Skill.findAll();
    
    const allSkills = allSkillsData.map((skillData)=> skillData.get({plain : true }));

console.log(user);
console.log(allSkills);
    res.render('profile', {
      user,
      allSkills,
      logged_in: true,
      is_employer: req.session.is_employer
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  try{
    if (req.session.logged_in) {
      const currentUser =  await User.findByPk(req.session.user_id);
      const user = currentUser.get({plain:true});

      const is_employer = user.is_employer;
      console.log("The user is employer?");
      console.log(is_employer);
      if(! is_employer){
        res.redirect('/profile');      
      }else{
        res.redirect('/search');
      }
      return;    
    }
  
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
  
  res.render('login');
});

router.get('/experts',  async (req, res) => {
  try {/*
    const expertsData = await User.findAll({
      attributes: ["first_name", "last_name"],
      include: [
        { model: Skill }, {model: UserSkill , where: { level : "Expert"}   },
      ]
    });*/
    const expertsData = await User.findAll({
      include:[{
        model:Skill, 
        include:[{
          model: UserSkill, where: {level:"Expert"}
        }]
      }], 
    });

    const experts = expertsData.map((expert) => expert.get({plain:true}));
    console.log(experts);
 const level ="Expert"
    res.render("experts",{
    experts,
    is_employer: req.session.is_employer,
    level,
    logged_in : req.session.logged_in});
     
}catch(err){
  console.log(err);
  res.status(500).json(err);
}
});



module.exports = router;



// include: [
      //   {
      //     model: Skill,
      //     through: { UserSkill, attributes: ["level"], where: { level: "Expert" } },
      //     attributes: ["skill_name"]
      //   }
      // ],
      // attributes: ["first_name", "last_name"]

    // const expertsData = await User.findAll({
    //   include: [
    //     { 
    //       attributes: ["level"],
    //       model: UserSkil , 
    //       include: [{ attributes: ["skill_name"], model:Skill}]
    //     }]        
    //     }      
    // );
    
    