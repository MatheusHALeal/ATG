user.controller('userCtrl',function ($scope,$http) {
$scope.apiKey = '6cdc036afa25edf9ffa2f4b26794ebc5';

$scope.vizinhos = [];
$scope.targetTags = [];
$scope.sourceTags = [];
$scope.getTopArtists = function(username){
  var url ="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user="+username+"&api_key="+$scope.apiKey+"&format=json";

  $http.get(url).then(function (data) {
    console.log(data);
    var i;
    for (i = 0; i < 1; i++) {
      console.log(data.data.topartists.artist[i].name);
     $scope.getRelatedArtist(data.data.topartists.artist[i].name);
  }
  console.log($scope.vizinhos)
});
}


$scope.getRelatedArtist = function(artist){
  $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+artist+"&api_key="+$scope.apiKey+"&format=json").then(function (data) {
    var i;
    if (data.data.similarartists !== undefined){
    for (i = 0; i < 10; i++) {
      if (data.data.similarartists.artist[i] !== undefined) {
        $scope.vizinhos.push({"source":artist, "target": data.data.similarartists.artist[i].name})
        $scope.getArtistTags(data.data.similarartists.artist[i].name);
        console.log(data.data.similarartists.artist[i].name);

    }

    }}

});
}





$scope.getArtistTags = function(artist){
  $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist="+artist+"&api_key="+$scope.apiKey+"&format=json").then(function (data) {
    var t = []
    //var tags = [];
    var i= 0;
    if (data.toptags.tag !== undefined){
       while(data.toptags.tag[i] !== undefined){
         var tupla = Object.freeze({ name:data.data.toptags.tag[i].name, count:data.data.toptags.tag[i].count})
         $scope.tar.push(tupla)
         i++;
       }
    }
    data = t;
  })

};





});
