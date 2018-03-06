employeeService = (function () {

    var findById = function (id) {
            return fetch('https://api.github.com/users/' + id)
            .then(function(response) {
                return response.json();
            })
            .then(function(user){
                console.log('user', user);
                return Promise.resolve(user);
            })
        },

        findByName = function (searchKey) {
            return fetch('https://api.github.com/users')
            .then(function(response) {
                return response.json();
            })
            .then(function(users){
                console.log('users', users);
                return Promise.resolve(users.slice(0, 5));
            })
        },

        findByManager = function (managerId) {
            var deferred = $.Deferred();
            var results = employees.filter(function (element) {
                return managerId === element.managerId;
            });
            deferred.resolve(results);
            return deferred.promise();
        };

        

    // The public API
    return {
        findById: findById,
        findByName: findByName,
    };

}());