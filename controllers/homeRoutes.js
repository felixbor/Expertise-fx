const router = require('express').Router();
const { Skill, User, UserSkill,Role } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Get all the required data to be displayed in the home page

    // Pass serialized data and session flag into template
    res.render('homepage', {       
      logged_in: req.session.logged_in 
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
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    const is_employer =  User.findByPk(req.session.user_id).is_employer;
    console.log(is_employer);
    if(! is_employer){
      res.redirect('/profile');      
    }else{
      res.redirect('/search');
    }
    return;    
  }

  res.render('login');
});

router.get('/experts',  async (req, res) => {
  try {

    const expertsData = await User.findAll({
      attributes: ["first_name", "last_name"],
      include: [
        { model: Skill }, {model: UserSkill , where: { level : "Expert"}   },
      ]
    });

    const experts = expertsData.map((expert) => expert.get({plain:true}));
    console.log(experts);

    res.render("experts",{
    experts,
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
    
    