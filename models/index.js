const User = require('./User');
const Role = require('./Role');
const Skill = require('./Skill');
const UserSkill = require('./UserSkill');

//Connecting the role and user
Role.hasMany(User, {
  foreignKey : 'role_id'
});

User.belongsTo(Role, {
  foreignKey: "role_id"
});

//Connecting the user and user skill
User.hasMany(UserSkill, {
  foreignKey: "user_id"
});

UserSkill.belongsTo(User, {
  foreignKey: "user_id"
});

//Connecting skill and userskill
Skill.hasMany(UserSkill, {
  foreignKey: "skill_id"
});

UserSkill.belongsTo(Skill, {
  foreignKey: "skill_id"
});

//Connecting the user and skill through userskill
User.belongsToMany(Skill, {
  through: UserSkill,
  foreignKey: 'user_id',
});

Skill.belongsToMany(User, {
  through: UserSkill,
  foreignKey: 'skill_id'
});

module.exports = { User, Role, Skill, UserSkill };
