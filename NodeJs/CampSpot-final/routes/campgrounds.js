
var express = require('express')
var router = express.Router()
var middleware = require('../middleware/index')
var campground = require('../models/campground')

router.get('/',function(req,res) {
    // get all campgrounds from DB
    campground.find(function (err,allcampgrounds) { 
        if (err)    console.log('Error')
        else{
            res.render("campgrounds/index",{campgrounds: allcampgrounds, currentuser : req.user} )
        }
     });
})
router.get('/new',middleware.isloggedin,(req,res) => res.render('campgrounds/new'))

router.post('/',middleware.isloggedin,function(req,res){
    var name = req.body.name
    var price = req.body.price
    var image = req.body.image
    var description = req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var newCampGround = {name : name,price: price,image: image,description: description,author: author}

    // create a new campground to yelp_camp DB
    campground.create(newCampGround,function (err) { 
        if (err)    console.log(err)
        else{
        // redirect to /campgrounds  //
            res.redirect('/campgrounds')            
        }
     });
});

router.get("/:id",function(req,res){
// Find campground with provided id and render show template
    campground.findById(req.params.id).populate('comments').exec(function(err,foundcg){
        if (err)    console.log(err)
        else res.render('campgrounds/show',{campground: foundcg})
    })
});

// EDIT CAMPGROUND ROUTE 
router.get('/:id/edit',middleware.checkUserownership,(req,res)=>{
    campground.findById(req.params.id,(err,foundcg)=>{
        if(err){
            req.flash('error','Campground not found !')
        }
        res.render('campgrounds/edit',{campground: foundcg})
    })
})
router.put('/:id',middleware.checkUserownership,(req,res)=>{
    campground.findOneAndUpdate(req.params.id,req.body.campground,(err,updatedcg)=>{
        if (err)    res.redirect('/campground')
        else{
            res.redirect('/campgrounds/'+ req.params.id)
        }
    })
})

router.delete('/:id',middleware.checkUserownership,(req,res)=>{
    campground.findByIdAndRemove(req.params.id,(err)=>{
        if (err)    res.redirect('/campgrounds')
        else{
            res.redirect('/campgrounds')
        }
    })
})

module.exports = router;