const express = require('express');
const items = require('./routes/item_routes')

const app = express();

const cors = require('cors');

app.use(cors({origin: 'http://localhost:19006'})); //where you run your react app from 

app.use(express.json());//for post 

app.use('/items',items);//lets you use the other routes you set up

app.get("/", (req, res) => {
    res.send('this is where the fun begins.');
  });

const port = process.env.PORT || 3000 //set port and listen
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

//Commented out code goes below
/*
const item = {
    email: 'junaid98m@gmail.com',
    desc: 'eat healthy'
}
const action = items.get_user_tasks('email');
*/