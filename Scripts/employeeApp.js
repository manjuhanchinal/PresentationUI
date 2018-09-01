var app = angular.module('MyEmployeeApp', []);
app.controller('employeejsController', ['$scope', '$http', employeejsController]);

// Angularjs Controller  
function employeejsController($scope, $http) {

    // Declare variable  
    $scope.loading = true;
    $scope.updateShow = false;
    $scope.addShow = true;

    // Get All Employee  
    $http.get('http://localhost:55409/employee/').success(function (data) {
        $scope.employees = data;
    }).error(function () {
        $scope.error = "An Error has occured while loading posts!";
    });

    //Insert Employee  
    $scope.add = function () {
        $scope.loading = true;
        this.newemployee.Name = this.newemployee.LastName + " " + this.newemployee.FirstName;
        $http.post('http://localhost:55409/employee/', this.newemployee).success(function (data) {
            $scope.employees = data;
            $scope.updateShow = false;
            $scope.addShow = true;
            $scope.newemployee = '';
        }).error(function (data) {
            $scope.error = "An Error has occured while Adding employee! " + data;
        });
    }

    //Edit Employee  
    $scope.edit = function () {
        var Id = this.employee.Id;
        $http.get('http://localhost:55409/employee/search?Id=' + Id).success(function (data) {
            $scope.newemployee = data;
            var name = data.Name.split(" ");
            $scope.newemployee.LastName = name[0];
            $scope.newemployee.FirstName = name[1];
            $scope.updateShow = true;
            $scope.addShow = false;
        }).error(function () {
            $scope.error = "An Error has occured while loading posts!";
        });
    }

    $scope.update = function () {
        $scope.loading = true;
        console.log(this.newemployee);
        this.newemployee.Name = this.newemployee.LastName + " " + this.newemployee.FirstName;
        $http.put('http://localhost:55409/employee/', this.newemployee).success(function (data) {
            $scope.employees = data;
            $scope.updateShow = false;
            $scope.addShow = true;
            $scope.newemployee = '';
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving employee! " + data;
        });
    }

    //Delete Employee  
    $scope.delete = function () {
        var Id = this.employee.Id;
        $scope.loading = true;
        $http.delete('http://localhost:55409/employee?Id=' + Id).success(function (data) {
            $scope.employees = data;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving employee! " + data;
        });
    }

    //Cancel Employee  
    $scope.cancel = function () {
        $scope.updateShow = false;
        $scope.addShow = true;
        $scope.newemployee = '';
    }
}
