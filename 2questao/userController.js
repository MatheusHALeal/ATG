user.controller('userCtrl', function ($scope,$http) {

$scope.apiKey = '6cdc036afa25edf9ffa2f4b26794ebc5';
$scope.artistasMaisEscutados = [];

$scope.getTopArtistsByCountry = function(geo){
  
  var url ="http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country="+geo+"&api_key="+$scope.apiKey+"&format=json";

  $http.get(url).then(function (data) {
    console.log(data);
    var i;
    for (i = 0; i < 500; i++) {
      console.log(data.data.topartists.artist[i].name);
  }console.log($scope.artistasMaisEscutados)
});
}

});
