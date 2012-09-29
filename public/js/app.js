function SideCtrl($scope, $rootScope, $http) {
  $scope.currentUser = {
    username: 'twilson63',
    password: 'foo',
    fullname: 'Tom Wilson',
    email: 'tom@jackhq.com'
  }
  $rootScope.$broadcast('currentUser', $scope.currentUser);
  $scope.posts = 5;
  $scope.ups = 1;
  $scope.downs = 1;
  $scope.chars = 140;
  $scope.save = function() {
    // push to server
    $scope.event.user = $scope.currentUser;
    $scope.event.user.posts = $scope.event.user.posts + 1;
    $rootScope.$broadcast('add', $scope.event);
    $scope.event = {};
  }
  $scope.register = function() {
    $scope.user.posts = 0;
    $scope.user.ups = 0;
    $scope.user.downs = 0;
    $scope.currentUser = $scope.user;
    $rootScope.$broadcast('currentUser', $scope.currentUser);
  }
}

function FeedCtrl($scope, $rootScope, $http) {
  //server push vs sockets..

  $scope.events = [];
  $rootScope.$on('add', function(event, parameters){
    console.log(parameters);
    $scope.events.unshift(parameters);
  });
  $rootScope.$on('currentUser', function(user){ $scope.currentUser = user; });
  $scope.up = function(event) {
    if(!event.ups) { event.ups = 0; }
    event.user.ups = event.user.ups + 1;
    event.ups = event.ups + 1;
    // push to server
  }
  $scope.down = function(event) {
    if(!event.downs) { event.downs = 0; }
    event.user.downs = event.user.downs + 1;
    event.downs = event.downs + 1;
    // push to server
  }

}