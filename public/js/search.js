const newFormHandler = async (event) => {
  event.preventDefault();

  const skill_id = document.querySelector('.skill-id').value;

  if (skill_id) {
    const response = await fetch(`/search/${skill_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/search/${skill_id}`);
    } else {
      alert('Failed to find');
    }
  }
};
function setSkill() {
  document.getElementById('#SetSkillName').innerHTML = skillName
}
document
  .querySelector('#form')
  .addEventListener('submit', newFormHandler,)
