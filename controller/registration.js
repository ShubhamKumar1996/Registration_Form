const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.getRegistration = function (req, res, next) {
    const message = req.flash("message")[0];
    res.render("../views/registration-form.ejs", {
        message: message
    });
};

exports.postRegistration = (req, res, next)=> {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password!==confirmPassword){
        console.log("Password and Confirm Password do not match");
        req.flash("message", ["Password and Confirm Password do not match"]);
        return res.redirect("/registration-form");
    }

    User.findOne({email:email})
        .then(existingUser => {
            if(existingUser){
                console.log("User with this email already exist. This is existing user:\n");
                console.log(existingUser);
                req.flash("message", "User with this email already exist");
                return res.redirect("/registration-form");
            }else{
                return bcrypt.hash(password, 6)
                    .then(hashedPassword => {
                        const user = new User({
                            name: name,
                            email: email,
                            password: hashedPassword
                        });
                        
                        user.save()
                            .then(result => {
                                console.log("Newly Created User");
                                console.log(result);
                                req.flash("message", "Registered Successfully");
                                res.redirect("/registration-form");
                            })
                    })
                    .catch(err => {
                        console.log("Error in hashing Password");
                        console.log(err);
                        res.redirect("/registration-form");
                    });
            }
        })
        .catch(err => {
            console.log("Error in post Registration Controller");
            console.log(err);
        });
};
