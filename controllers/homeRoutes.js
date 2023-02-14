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
router.get('/mySkills', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: UserSkill }],
    });

    const user = userData.get({ plain: true });

    res.render('mySkills', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    if(! User.isEmployer()){
      res.redirect('/mySkills');      
    }else{
      res.redirect('/skillCandidates');
    }
    return;    
  }

  res.render('login');
});

router.get('/experts',  async (req, res) => {
try{
 
  const expertsData = await User.findAll({
    include:{
      model: Skill,
      attributes: ["skill_name"],    
      
    },
    


  });
  // const expertsData = await UserSkill.findAll({
  //    where: {level : [3,4,5,6,7,8,9] },
  //     include:[{
  //       model: User,
  //       attributes: ['first_name', 'last_name']
  //     },
  //     {
  //       model: Skill,
  //       attributes : ['skill_name']
  //     }]
  //   });
    console.log("After quert");
    console.log(expertsData);
    const experts = expertsData.map((expert) => expert.get({plain:true}));
    console.log(experts);
    res.status(200).json(experts);
}catch(err){
  console.log(err);
  res.status(500).json(err);
}
  
  //res.render('experts');
});

module.exports = router;
