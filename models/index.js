const User = require('./User');
const Role = require('./Role');
const Skill = require('./Skill');
const UserSkill = require('./UserSkill');

// User.hasOne(Role, {
//   foreignKey: 'role_id',
// });

// Role.belongsTo(User,{
//   foreignKey: 'role_id'
// })

Role.hasMany(User, {
  foreignKey : 'role_id'
});
User.belongsTo(Role, {
  foreignKey: "role_id"
})
//////////////////////////
User.hasMany(UserSkill, {
  foreignKey: "user_id"
});

UserSkill.belongsTo(User, {
  foreignKey: "user_id"
});
////////////////////
Skill.hasMany(UserSkill, {
  foreignKey: "skill_id"
});

UserSkill.belongsTo(Skill, {
  foreignKey: "skill_id"
});
///////////////////////
User.belongsToMany(Skill, {
  through: UserSkill,
  foreignKey: 'user_id',
})

Skill.belongsToMany(User, {
  through: UserSkill,
  foreignKey: 'skill_id'
})
//////////////////////

Role.hasMany(Skill, {
  foreignKey: "role_id"
});

Skill.belongsTo(Role, {
  foreignKey: "role_id"
})

module.exports = { User, Role, Skill, UserSkill };
