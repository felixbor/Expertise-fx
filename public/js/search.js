const newFormHandler = async (event) => {
    event.preventDefault();
   
    const skill_id = document.querySelector('.skill-id').value;
    //const skillName=document.querySelector(".skill-id").textContent
   console.log(skill_id)
  //console.log(skillName)
  
    if (skill_id ) {
      const response = await fetch(`/search/${skill_id}`, {
        method: 'GET',
        //body: JSON.stringify({skill_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
       // document.querySelector('.skill-id').value=skill_id
        console.log(response)
        document.location.replace(`/search/${skill_id}`);
      } else {
        alert('Failed to find');
      }
    }
  };
  document
  .querySelector('#form')
  .addEventListener('submit', newFormHandler);
