const sequelize = require('../config/connection');
const { User, Skill, Role, UserSkill } = require('../models');

const userData = require('./userData.json');
const skillData = require('./skillData.json');
const roleData = require('./roleData.json'); 
const userSkillData = require('./userSkillData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const skill of skillData) {
    await Skill.create({
      ...skill,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const role of roleData) {
    await Role.create({
      ...role,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const userSkill of userSkillData) {
    await UserSkill.create({
      ...userSkill,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
