const express = require('express');
const app = express()
const port = 5000

const {User} = require("./models/Users");
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json()); 

mongoose.connect( config.mongoURI , {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!dfdfdfdf'))

app.post('/register' , (req, res) => {
    //회원 가입 정보 들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
