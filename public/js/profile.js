const newFormHandler = async (event) => {
  event.preventDefault();
 
  const skill_id = document.querySelector('#skill-name').value;
  const level = document.querySelector('#skill-level').value;
 console.log(skill_id)
 console.log(level)

  if (skill_id && level ) {
    const response = await fetch(`/api/skills`, {
      method: 'POST',
      body: JSON.stringify({skill_id, level}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log(response)
      document.location.replace('/profile');
    } else {
      alert('Failed to create skill');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/skills/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete skill');
    }
  }
};

document
  .querySelector('.new-skill-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.try')
  .addEventListener('click', delButtonHandler);
