const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Sample user data (replace this with data from your database)
let users = [
  { _id: 1, name: 'John Doe', age: 30 },
  { _id: 2, name: 'Jane Smith', age: 25 },
  // Add more users here
];

app.use(bodyParser.json());

// Endpoint for updating a user by _id
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user._id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[index].name = req.body.name;
  users[index].age = req.body.age;

  return res.status(200).json({ message: 'User details updated successfully' });
});

// Start the server
const port = 3000; // Replace this with your desired port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
