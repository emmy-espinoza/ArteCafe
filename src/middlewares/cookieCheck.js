
module.exports = function(req, res, next){
    if(req.cookies.userarte_cafe){
        req.session.user =  req.cookies.userarte_cafe
    res.locals.user = req.session.user
    }
    next()
}
