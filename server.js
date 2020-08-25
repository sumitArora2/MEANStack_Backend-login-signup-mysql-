var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/users')
var Colleges=require('./routes/colleges');

app.use('/users', Users)
app.use('/colleges',Colleges)

// for implementing routes for checking routes is working of not
app.get('/',(req,res)=>{
  res.send('hello');
});

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
