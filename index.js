var express =require('express');
var app = express();
var bodyParser = require('body-parser');
var sessions = require('express-session');
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessions({
    secret : 'qwerty789',
    resave : false,
    saveUninitialized : true
}));
var session;
app.get('/login',function(req,res){
    console.log('/login');
    console.log(req.session);
    session = req.session;
    if (session.uniqueID){
        res.redirect('/alert');
    }
    res.sendFile('index.html',{root: __dirname});
});
app.post('/login',function(req,res){
    console.log('/login');
    console.log(req.session);
    session = req.session;
    if (req.body.username == 'admin' && req.body.password == 'admin'){
        session.uniqueID = req.body.username;
    }
    res.redirect('/alert');
});
app.get('/alert',function(req,res){
    console.log('/alert');
    console.log(req.session);
    session = req.session;
    if (session.uniqueID){
        res.redirect('/admin');
    }
    else {
        res.send('Who are you ! <a href="/login">Login Page</a>'); // send renders html; end does not.
    }
});
app.get('/admin',function(req,res){
    console.log('/admin');
    console.log(req.session);
    if (session.uniqueID)
        res.sendFile('admin.html',{root: __dirname});
    else
        res.redirect('/alert');
});
app.get('/logout',function(req,res){
    console.log('/logout');
    console.log(req.session);
    session = req.session;
    req.session.destroy();
    res.redirect('/login');
});
app.listen(8080,function(){
    console.log('server has started ..');
});