const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
    console.log(req.body)
    res.send({
        token: 'test123'
    });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));