const sequelize = require('../config/connection');
const { User, Skill, Role, UserSkill } = require('../models');
const userData = require('./userData.json');
const skillData = require('./skillData');
const roleData = require('./roleData.json');
const userSkillData = require('./userSkillData.json');
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Role.bulkCreate(roleData);
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Skill.bulkCreate(skillData);
  await UserSkill.bulkCreate(userSkillData)

  process.exit(0);
};
seedDatabase();
