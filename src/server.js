require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});