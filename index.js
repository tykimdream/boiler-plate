const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const config = require('./config/key')

const { User } = require('./models/User.js')

// application/x-www-form-urlencoeded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json을 가져오기 위하여 사용
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => { res.send('Hello World! Great') })

app.post('/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣는다.

    const user = new User(req.body)
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ // 정상적인 경우 json인 success : true 리턴한다.
            success: true
        })
    })

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})