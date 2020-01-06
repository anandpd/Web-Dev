
const express       =  require('express'),
        app         =  express(),
        bodyparser  =  require('body-parser'),
        mongoose    =  require('mongoose'),
        passport    = require('passport'),
    localstrategy   = require('passport-local'),
        User        = require('./models/user'),
        methodoverride = require('method-override'),
        flash       = require('connect-flash')

app.use(methodoverride('_method'));
app.use(flash())

// =============  requiring  Routes  ================================== //

const commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds')
    authRoutes = require('./routes/index')

//  ==================Passport config =================================== //

app.use(require('express-session')({
    secret: 'HelloWorld',
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ========================= MONGOOSE CONFIG  ==========================  //

mongoose.connect("mongodb://localhost:27017/campspotDB",{useNewUrlParser: true,useUnifiedTopology: true})
app.use(bodyparser.urlencoded({extended : true}))
app.set("view engine","ejs")
app.use(express.static(__dirname+ '/public'));

// var campgrounds = [
//     {name : "Spiti valley", image : "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg"},
//     {name : "Chitkul",      image : "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"},
//     {name : "Kheerganga",   image : "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
//     {name : "Palampur",     image : "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
//     {name : "Spiti valley", image : "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg"},
//     {name : "Chitkul",      image : "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"},
// ]

app.use((req,res,next)=>{
    res.locals.currentuser = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next();
})

app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds/:id/comments',commentRoutes)
app.use('/',authRoutes)


app.listen(process.env.PORT || 3000, () => console.log(`SERVER IS RUNNING`))