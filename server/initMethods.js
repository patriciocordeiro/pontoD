(function() {
    'use strict';
    var formFields = require('./formFields.config');
    var generalConfig = require('./generalConfig.model');


    module.exports = {

        config: function(mongoose) {
            mongoose.connection.db.listCollections({
                name: 'config'
            })
                .next(function(err, collinfo) {
                    if (collinfo) {

                        console.log('collection already exists', newConfig);
                        // The collection exists
                    } else {
                        console.log('collection DOES NOT  exists');
                        console.log('Creating collection for the first time');

                        var newConfig = generalConfig();
                        newConfig.config.education = formFields.education;
                        newConfig.config.educationLevel = formFields.educationLevel;
                        newConfig.config.department = formFields.department;
                        newConfig.config.jobTitle = formFields.jobTitle;

                        newConfig.save(function(err){
                            if(err)
                                console.log(err);
                                console.log('saved successfully');
                        })

                    }

                });



        },

        formFielsNew: function(callback) {},

    }

})();
