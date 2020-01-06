var express = require('express')
var router = express.Router({mergeParams: true});
var campground = require('../models/campground')
var comment = require('../models/comment')
var middleware = require('../middleware/index')
var comment = require('../models/comment')

router.get('/new',middleware.isloggedin,function (req,res) {
    campground.findById(req.params.id,function (err,campground) {
        if (err)    console.log('Error')
        else {
            res.render('comments/new',{campground: campground})
        }
      }) 

router.post('/',middleware.isloggedin,function(req,res){
    campground.findById(req.params.id,function (err,campground) { 
        if (err)    console.log('Error')
        else{
            // console.log(req.body)
         comment.create(req.body.comment,function(err,comment){
                if (err)    console.log('Error')
                else {
                comment.author.id = req.user._id
                comment.author.username = req.user.username
                comment.save();
                console.log(req.user.username)
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/'+ campground._id);
                }
            })
        }
     })
})  })

// EDIT COMMENTS
router.get('/:comment_id/edit',middleware.checkCommentOwnership,(req,res)=>{
    comment.findById(req.params.comment_id,(err,foundcomment)=>{
        if (err)    res.redirect('back')
        else{
            res.render('comments/edit',{campground_id: req.params.id,comment: foundcomment})
        }
    })
   
})

// UPDATE COMMENTS 
router.put('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedcomment)=>{
        if (err)    res.redirect('back')
        res.redirect('/campgrounds/'+ req.params.id)
    })
})

//DELETE ROUTE
router.delete('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    comment.findByIdAndRemove(req.params.comment_id,(err,)=>{
        if (err) {
            res.redirect('back')
        }
        else{
            req.flash('success','Comment deleted')
            res.redirect('/campgrounds/'+req.params.id)
        }
    })
})
 
module.exports = router