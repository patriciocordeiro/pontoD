(function() {
    'use strict';


    var LocalStrategy = require('passport-local').Strategy;
    var Employee = require('./employees.model');
    var Ponto = require('./ponto.models');

    //Parameters

    module.exports = function(passport) {
        //        passport.serializeUser(function(user, done) {
        //            console.log('serializing user', user);
        //            done(null, user.id);
        //        });
        //
        //        passport.deserializeUser(function(id, done) {
        //            Employee.findById(id, function(err, user) {
        //                console.log('deserializing user', user);
        //                done(err, user);
        //            });
        //        });
        /*LOCAL SIGNUP*/
        //     we are using named strategies since we have one for login and one for signup
        //     by default, if there was no name, it would just be called 'local'
        passport.use('local-signup', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            function(req, email, password, done) {
                console.log('chegou do cliente', req.body);
                // asynchronous
                // User.findOne wont fire unless data is sent back
                process.nextTick(function() {

                    Employee.findOne({
                        'empId': email
                    }, function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            console.log('Usuário já existe');
                            return done(null, false, {
                                message: 'The email already exists'
                            });
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newEmployee = new Employee();
                            //                            var endereco = {};
                            // set the user's local credentials
                            newEmployee.fullName = req.body.fullName;
                            //                            newEmployee.sobrenome = req.body.sobrenome;
                            newEmployee.empId = req.body.email; //take email as id (beacause passport requires email field)
                            newEmployee.password = newEmployee.generateHash(password);
                            newEmployee.gender = req.body.gender;
                            newEmployee.birthDate = req.body.birthDate;
                            newEmployee.phone = req.body.phone;
                            newEmployee.maritalStatus = req.body.maritalStatus;
                            newEmployee.age = req.body.age;
                            newEmployee.admissionDate = req.body.admissionDate;
                            newEmployee.department = req.body.department;
                            newEmployee.education = req.body.education;
                            newEmployee.jobTitle = req.body.jobTitle;
                            newEmployee.imgPath = req.body.imgPath;

                            var newPonto = new Ponto();
                            newPonto.fullName = newEmployee.fullName;
                            newPonto.empId = newEmployee.empId;
                            newPonto.password = (Number(req.body.email) * 1000).toString();
                            newPonto.department = newEmployee.department;
                            newPonto.imgPath = newEmployee.imgPath;



                            //Save the user in the database
                            newEmployee.save(function(err) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    //                                    throw err;

                                    return done(null, {
                                        message: 'user not saved' + err
                                    });

                                }

                                //save ponto colection
                                newPonto.save(function(err, data) {

                                    if (err) {
                                        return done(null, {
                                            message: 'user not saved' + err
                                        });
                                    }
                                    //everything is ok
                                    console.log(err, data);
                                    console.log('Heyyyyyyy dados:', data);
                                    return done(null, {

                                        message: 'user saved'
                                    });
                                });

                            });
                        }
                    });
                });

                //        console.log('Executado com sucesso')
            }));
        passport.use('local-login', new LocalStrategy({

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        }, function(req, email, password, done) {
            console.log(email);
            //find a user whose email is the same as the forms email
            //we are checking to see if the user trying to login already exists
            Employee.findOne({
                'local.email': email
            }, function(err, employee) {
                console.log(employee);
                //              console.log('ola', user.validPassword(password))
                if (err) {
                    console.log('erro');
                    return done(err);
                }
                //if no user is found, return the message
                if (!employee) {
                    console.log('invalid username');
                    return done(null, false, {
                        //                    message: 'Incorrect username.'
                    });
                }
                //req.flash is the way to set flashdata using connect-flash
                //if the user is found but the password is wrong
                if (!employee.validPassword(password)) {
                    //            if (user.password != password) {
                    console.log('invalid password');
                    return done(null, false, {
                        //                    message: 'Incorrect password.'
                    });
                } //create the loginMessage and save it to session as flashdata

                //all is well, return sucessful user
                console.log(employee);
                return done(null, employee);
            });
        }));
    };
})();
