const User = require('./User');
const Role = require('./Role');
const Skill = require('./Skill')
const UserSkill = require('./userSkill')

User.belongsTo(Role, {
  foreignKey: 'user_id',
});

User.belongsToMany(Skill, {
  through: UserSkill,
  foreignKey: 'user_id',
})

Skill.belongsToMany(User, {
  through: UserSkill,
  foreignKey: 'skill_id'
})

Role.hasMany(Skill, {
  foreignKey: 'role_id',
});

module.exports = { User, Role, Skill, UserSkill };
