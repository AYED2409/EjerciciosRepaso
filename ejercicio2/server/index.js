require('./database.js'); 
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./model/usuario.js');
app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT_EXPRESS;
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'../login.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'../register.html'));
})
app.post('/register', async(req, res) => {
    var checkInputs = controlInputs(req.body.email, req.body.password);
    if(checkInputs.error != "") {
        res.json(checkInputs);
    }else {
        const email = await User.findOne({ email: req.body.email });
        if(!email) {
            let user = new User({
                email: req.body.email,
                password: req.body.password
            });
            await user.encryptPasswd(req.body.password);
            await user.save();
            res.json({
                user:user,
                error:false,
                message:"user created successfully"
            });
        }else {
            res.json({
                message:"existing user",
                error:"existing user"
            });
        }
    }    
})
app.post('/login', async(req, res) => {
    var checkInputs = controlInputs(req.body.email, req.body.password);
    if(checkInputs.error != "" ){
        res.json(checkInputs);
    }else {
        const userFind = await User.findOne({ email: req.body.email });
        if(!userFind) {
            res.json({
                error:"user has not account"
            });   
        }else {
            let user = new User({
                email: userFind.email,
                password: userFind.password
            });
            if(await user.matchPasswd(req.body.password) ) {
                res.json({
                    message:'user successfully logged in'
                })
            }else{
                res.json({
                    error:"incorrect credentials"
                })
            }
        }
    }    
})
app.listen(port, ()=> {
    console.log(`server running in the port ${port}`);
})

function matchEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email);
}
function controlInputs(inputEmail, inputPasswd) {
    if(inputEmail == "" || inputPasswd == ""){
        return {error:"required email and password fields"}
    }else{
        if(!matchEmail(inputEmail)) {
            return {error:"incorrect email format"}
        }else{
            return {error:""}
        }  
    }
}