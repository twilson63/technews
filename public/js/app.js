function SideCtrl($scope, $rootScope, $http) {
  $scope.posts = 5;
  $scope.ups = 1;
  $scope.downs = 1;
  $scope.chars = 140;
  $scope.save = function() {
    // push to server
    $rootScope.$broadcast('add', $scope.event);
    $scope.event = {};
  }
}

function FeedCtrl($scope, $rootScope, $http) {
  //server push vs sockets..

  $scope.events = [];
  $rootScope.$on('add', function(event, parameters){
    console.log(parameters);
    $scope.events.unshift(parameters);
  });
  $scope.up = function(event) {
    if(!event.ups) { event.ups = 0; }
    event.ups = event.ups + 1;
    // push to server
  }
  $scope.down = function(event) {
    if(!event.downs) { event.downs = 0; }
    event.downs = event.downs + 1;
    // push to server
  }

}