const router = require('express').Router();
const { Skill, User, UserSkill,Role } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Get all the required data to be displayed in the home page

    // Pass serialized data and session flag into template
    res.render('home', {       
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/profile',  async (req, res) => {
  try {
    // Find the logged in user based on the session ID req.session.user_id
    const userData = await User.findByPk(1, {
      include: [{model:Role }],
      
      attributes: { exclude: ['password'] },
      include: [{ model: Skill, through: UserSkill }],
    });

    const user = userData.get({ plain: true });
console.log("inside profile");
console.log(user);
 res.status(200).json(user);
    // res.render('profile', {
    //   ...user,
    //   logged_in: true
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    if(! User.isEmployer()){
      res.redirect('/profile');      
    }else{
      res.redirect('/experts');
    }
    return;    
  }

  res.render('login');
});

router.get('/experts',  async (req, res) => {
  try {

    const expertsData = await User.findAll({

      include: [
        {
          model: Skill,
          through: { UserSkill, attributes: ["level"], where: { level: "Expert" } },
          attributes: ["skill_name"]
        }
      ],
      attributes: ["first_name", "last_name"]
    });


    // const expertsData = await User.findAll({
    //   include: [
    //     { 
    //       attributes: ["level"],
    //       model: UserSkil , 
    //       include: [{ attributes: ["skill_name"], model:Skill}]
    //     }]        
    //     }      
    // );

    
    
    const experts = expertsData.map((expert) => expert.get({plain:true}));
    res.render("experts",{
    ...experts,
    logged_in : req.session.logged_in});

}catch(err){
  console.log(err);
  res.status(500).json(err);
}
  
  //res.render('experts');
});

module.exports = router;
