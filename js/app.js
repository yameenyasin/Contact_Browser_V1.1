//app controller constructor
function appController($scope, $http, $timeout) {
    $scope.loader = true;
    var promise = $http.get("contacts.json");
    
    $('#myCarousel').carousel({
        interval: false
    });

    promise.success(function (data, status) {
        //add contact json object to the angular scope
        $scope.Contacts = data;
        $scope.moreContacts = data.slice(1, data.length);
        console.log(data);
        console.log("moreContacts", $scope.moreContacts);
        console.log('AJAX succesfull, status: ', status);
        //simulate client server comm
        $timeout(function() {
            $scope.loader = false;
        }, 3000);
    });

    promise.error(function (data, status) {
        console.log('AJAX failed, status: ', status);
    });


    //partial view urls
    $scope.headerURL = "partials/header-view.html";
    $scope.propertyURL = "partials/property-view.html";
    $scope.contactURL = "partials/slider.html";

    //selected contact reference
    $scope.currentContact = null;

    //set selected contact
    $scope.setCurrentContact = function (contact) {
        $scope.currentContact = contact;
    };

    $scope.firstItem = 1;
    $scope.item = 0;

    $scope.select = function () {
        $scope.item = $scope.item + 1;
        console.log($scope.item);
        if ($scope.item === $scope.firstItem) {
            return "true";
        } else {
            return "false";
        }
    };

    $scope.hidePropertyWindow = function () {
        $scope.currentContact = null;
    };
}