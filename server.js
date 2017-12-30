const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) => {
        if(err){
            console.log('Unable to write the log file');
        }
    })
    next();
});

app.use((req,res,next) => {
    res.render('maintanence.hbs')
});

// app.get('/',(req,res) => {
//     //res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Shruti',
//         likes: ['Biking','Cycling']
//     })
// });

// app.get('/about', (req,res) => {
//     res.send('About Page!');
// });

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Hi Shruti Welcome!',
       // currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        welcomeMsg: 'Hi Shruti Welcome!',
       // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({errorMessage:'Unable to full fill the request'});
})

//app.listen(3000);

app.listen(3000 , () => {
    console.log('Server is up on port 3000');
})