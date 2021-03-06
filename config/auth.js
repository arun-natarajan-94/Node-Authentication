module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash("error_msg", "Please login in to see this page!");
        res.redirect("/users/login");
    }
}