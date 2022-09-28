const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// express midlleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
})

// starts the express server 
app.listen(PORT, () => {
    console.log(`Server running on port {PORT}`);
});