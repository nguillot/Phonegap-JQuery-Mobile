(function($) {
    var methods = {
        settings : {
            "openDataKey" : "39W9VSNCSASEOGV",
            "getDataAgencies" : "http://data.nantes.fr/api/datastore_getagencies/1.0/",
            "getFileFormats" : "http://data.nantes.fr/api/datastore_getfileformats/1.0/",
            "getLicences" : "http://data.nantes.fr/api/datastore_getlicences/1.0/",
            "searchDatasetUrl" : "http://data.nantes.fr/api/datastore_searchdatasets/1.0/",
            "getDatasets" : "http://data.nantes.fr/api/datastore_getdatasets/1.0/"
        },

        prepareForm : function(forbidenFields) {
            var fields = $(this).serializeArray();
            var finalFields = "";
            jQuery.each(fields, function(i, field){
                var okLength = jQuery.trim(field.value).length > 0;
                var isNotForbidden = jQuery.inArray(field.value, forbidenFields) == -1;
                if(okLength && isNotForbidden) {
                    if(jQuery.trim(finalFields).length > 0) {
                        finalFields+= "&"+field.name+"="+field.value;
                    } else {
                        finalFields+= field.name+"="+field.value;
                    }
                }
            });
            return finalFields;
        },

        getDataAgenciesUrl : function() {
            return methods.settings.getDataAgencies + methods.settings.openDataKey +"?output=json";
        },

        getFileFormats : function() {
            return methods.settings.getFileFormats + methods.settings.openDataKey +"?output=json";
        },

        getLicences : function() {
            return methods.settings.getLicences + methods.settings.openDataKey +"?output=json";
        },

        getSearchDataSetUrl : function(serializedFields) {
            if(serializedFields) {
                return methods.settings.searchDatasetUrl + methods.settings.openDataKey +"?output=json&amp;"+serializedFields;
            } else {
                return methods.settings.searchDatasetUrl + methods.settings.openDataKey +"?output=json";
            }
        },

        getDatasetsUrl : function(serializedFields) {
            return methods.settings.getDatasets + methods.settings.openDataKey +"?output=json&param[ids]="+serializedFields;
        },

        isBlank : function(str) {
            return (!str || /^\s*$/.test(str));
        },

        parseDate : function(date) {
            if(methods.isBlank(date)) {
                return "";
            } else {
                return date.substring(0, 10);
            }
        },

        hasValidOpenDataStatusCode :  function(opendataSet) {
            if(opendataSet) {
              var status = opendataSet.opendata.answer.status["@attributes"];
              //console.log(status.code+" "+status.message);

              return status.code == 0;
            } else {
                return false;
            }
        }
    };

    $.fn.openData = function( method ) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.openData' );
        }
    };

    $.openData = function( method ) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.openData' );
        }
    };
})(jQuery);