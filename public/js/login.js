const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect 
      const userData = await response.json();
      const is_employer = userData["user"]["is_employer"];
      if (is_employer) {
        document.location.replace('/search');
      } else {
        document.location.replace('/profile');
      }
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#firstname-signup').value.trim();
  const last_name = document.querySelector('#lastname-signup').value.trim();
  const is_employer = document.querySelector('#is_employer').checked
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (first_name && last_name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ is_employer, first_name, last_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const userData = await response.json();
      const is_employer = userData["is_employer"];
      if (is_employer) {
        document.location.replace('/search');
      } else {
        document.location.replace('/profile');
      }
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
