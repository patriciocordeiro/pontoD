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

                        for (var i = 0; i < formFields.length; i++) {
                            var newConfig = generalConfig();
                            newConfig.name = formFields[i].name;
                            newConfig.values = formFields[i].values;
                            newConfig.save(function(err) {
                                if (err)
                                    console.log(err);
                                console.log('saved successfully');
                            })

                        }
                    }

                });



        },

        formFielsNew: function(callback) {},

    }

})();
