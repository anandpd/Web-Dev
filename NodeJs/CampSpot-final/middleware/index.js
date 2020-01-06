// all middleware goes here
var middlewareobj={}
var campground = require('../models/campground')

middlewareobj.checkUserownership = (req,res,next)=> { 
    if (req.isAuthenticated()){
        campground.findById(req.params.id,(err,foundcg)=>{
    if (err) {
        console.log(err)
        res.redirect('back')
    }
    else{
        if (foundcg.author.id.equals(req.user._id)){
            return next()
        } 
    }
 })
}
else{
res.redirect('back')
 }
}

middlewareobj.checkCommentOwnership = (req,res,next)=> { 
    if (req.isAuthenticated()){
        comment.findById(req.params.comment_id,(err,foundcomment)=>{
            if (err) {
                req.flash('error','Campground not Found :(')
                req.flash()
                res.redirect('back')
            }
            else{

                if (foundcomment.author.id.equals(req.user._id)){
                    return next()
                 } 
                 else{
                     req.flash('error','You do not have permission to do that !')
                     res.redirect('back')
                 }

            }
        })
    }
    else{
        res.redirect('back')
    }
 }

middlewareobj.isloggedin=(req,res,next)=> {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to LogIn first !')
    res.redirect('/login')
}
module.exports = middlewareobj