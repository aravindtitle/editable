// Function to populate the main form with user details
function populateFormWithUserDetails(user) {
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
  
    nameInput.value = user.name;
    ageInput.value = user.age;
  }
  
  // Function to edit user details
  function editUser(userId, formData) {
    fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          // If edit is successful, update the user detail on the webpage
          const userElement = document.getElementById(`user-${userId}`);
          userElement.querySelector('p:nth-child(1)').textContent = `Name: ${formData.name}`;
          userElement.querySelector('p:nth-child(2)').textContent = `Age: ${formData.age}`;
        } else {
          console.error('Failed to edit user');
        }
      })
      .catch((error) => console.error(error));
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const userId = parseInt(document.getElementById('edit-form').dataset.userId);
    const formData = {
      name: nameInput.value,
      age: parseInt(ageInput.value),
    };
    editUser(userId, formData);
  }
  
  // Function to display user details on the webpage
  function displayUsers(users) {
    const userListDiv = document.getElementById('user-list');
  
    users.forEach((user) => {
      const userDiv = document.createElement('div');
      userDiv.id = `user-${user._id}`;
      userDiv.innerHTML = `
        <p>Name: ${user.name}</p>
        <p>Age: ${user.age}</p>
        <button class="edit-btn" onclick="populateFormWithUserDetails(${JSON.stringify(
          user
        )})">Edit</button>
        <hr>
      `;
      userListDiv.appendChild(userDiv);
    });
  }
  
  // Fetch user data from the backend server and display it on the webpage
  fetch('/users')
    .then((response) => response.json())
    .then((data) => displayUsers(data))
    .catch((error) => console.error(error));
  
  // Add event listener to the form submit button
  document.getElementById('edit-form').addEventListener('submit', handleFormSubmit);
  