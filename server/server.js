const express = require('express');

// Create a new instance of Express.
const app = express();

// Tell Express to serve up the public folder and everything inside of it.
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Start the server by telling it which port to use.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});

// Make sure the index.html file is served, in case the user requests a resource currently not in the public folder.
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

 