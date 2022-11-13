/* eslint-disable*/
app.factory("flightDataFactory", ["$http", "$q", function ($http, $q) {
    var apiPath = "http://localhost:3000/users";
    var apiPathFlight = "http://localhost:3000/flights";
    var factory = {};

    factory.getAllUsers = function () {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getUserTypes = function () {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPath + "/utype")
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.updateUser = function (user) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.put(apiPath + "/" + user.id, user)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.updateMapping = function (obj) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPath + "/mapping", obj)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.registerUser = function (user) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPath + "/create", user)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getFlightsData = function (object) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPathFlight + "/track", object)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getDelaysData = function (object) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPathFlight + "/delay", object)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getFlightsDetails = function (object) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPathFlight + "/info", object)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.deleteUser = function (userId) {
        var deferred = $q.defer();
        /* Local callback for success */
        var deleteSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var deleteError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.delete(apiPath + "/" + userId)
            .then(deleteSuccess, deleteError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getAllClient = function (offset, limit, sort, order, search) {
        var deferred = $q.defer();
        /* Local callback for success */
        var getSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var getError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath, {
            params: {
                offset: offset,
                limit: limit,
                sortBy: sort,
                sortOrder: order,
                search: search
            }
        }).then(getSuccess, getError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    /* function to get client from using the id passed by $stateParams */
    factory.getClient = function (clientId) {
        var deferred = $q.defer();
        /* Local callback for success */
        var getSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var getError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath + "/" + clientId)
            .then(getSuccess, getError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.updateClient = function (client) {
        var deferred = $q.defer();
        /* Local callback for success */
        var updateSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var updateError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.put(apiPath + "/" + client.id, client)
            .then(updateSuccess, updateError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    return factory;
}]);