
function HttpInterceptor($q) {
    return {
        // optional method
        'request': function(config) {
            config.timeout = 2000;
            return config;
        },
        // optional method
        'requestError': function(rejection) {
            // do something on error
            return $q.reject(rejection);
        },
        // optional method
        'response': function(response) {
            // do something on success
            return response;
        },
        // optional method
        'responseError': function(rejection) {
            //do something on rejection
            return $q.reject(rejection);
        }
    };
}

HttpInterceptor.$inject = ['$q'];

function HttpConfig($provide, $httpProvider){

    // register the interceptor as a service
    $provide.factory('myHttpInterceptor', HttpInterceptor)
}

HttpConfig.$inject = ['$provide', '$httpProvider'];

export default HttpConfig;