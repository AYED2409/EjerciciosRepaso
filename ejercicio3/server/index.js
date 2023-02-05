require('./database.js'); 
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./model/usuario.js');
const jwt = require('jsonwebtoken');
const verification = express.Router()
app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT_EXPRESS;
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
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
            var user = new User({
                email: userFind.email,
                password: userFind.password
            });
            if(await user.matchPasswd(req.body.password) ) {
                var payload = {...user};
                var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '60s' });
                res.json({
                    message:'user successfully logged in',
                    token:token
                })
            }else{
                res.json({
                    error:"incorrect credentials"
                })
            }
        }
    }    
})
app.get('/protected',verification,(req,res)=>{
    res.json({
        message:"you have a valid token",
        valid:true
    })
})
app.listen(port, ()=> {
    console.log(`server running in the port ${port}`);
})

verification.use((req,res,next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token){
        res.status(401).send({
            error:' authentication token is required'
        })
        return
    }
    if(token.startsWith('Bearer ')){
        token = token.slice(7,token.length);
    }
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET,(error,authdata)=>{
            if(error){
                return res.json({
                    message:" invalid token",
                    error:"invalid token "
                })
            }else{
                authdata;
                next();
            }
        })
    }
})
function matchEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email);
}
function controlInputs(inputEmail, inputPasswd) {
    if(inputEmail == "" || inputPasswd == "") {
        return {error:"required email and password fields"};
    }else {
        if(!matchEmail(inputEmail)) {
            return {error:"incorrect email format"};
        }else {
            return {error:""};
        }  
    }
}
