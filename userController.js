user.controller('userCtrl', function ($scope,$http) {

$scope.apiKey = '6cdc036afa25edf9ffa2f4b26794ebc5';
$scope.vizinhos = [];

$scope.getTopArtists = function(username){
  var url ="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user="+username+"&api_key="+$scope.apiKey+"&format=json";

  $http.get(url).then(function (data) {
    console.log(data);
    var i;
    for (i = 0; i < 10; i++) {
      console.log(data.data.topartists.artist[i].name);
    $scope.getRelatedArtist(data.data.topartists.artist[i].name);
  }console.log($scope.vizinhos)
});
}


$scope.getRelatedArtist = function(artist){
  $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+artist+"&api_key="+$scope.apiKey+"&format=json").then(function (data) {
    let sourceTags = $scope.getArtistTags(artist);
    let similar = (data.data.similarartists.artist)
    sourceTags.then((array)=>{
        if (similar !== undefined){
        for (let i = 0; i < 10; i++) {
          if (similar[i] !== undefined) {

            let targetTags = $scope.getArtistTags(similar[i].name);

            targetTags.then((response) => {
              let w = $scope.matches(array, response);
              $scope.vizinhos.push({"source":artist, "target": similar[i].name, "weight": w})

            })
        }
        }}
    })

  });
}


$scope.matches = function(sourceTags, targetTags) {
  console.log(sourceTags);
  var peso = 0;
  var i;
    for (i = 0; i < sourceTags.length; i++) {
        var j;
        for (j = 0; j < targetTags.length; j++) {
          if (sourceTags[i].name === targetTags[j].name) {
              peso += (sourceTags[i].count/100.0) * (targetTags[j].count/100.0)
          }
        }


    }

  return peso;
}


$scope.getArtistTags = function(artist){
  var t = [];
    return $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist="+artist+"&api_key="+$scope.apiKey+"&format=json").then(function (data) {

    //var tags = [];
    var i= 0;
    if (data.data.toptags.tag !== undefined){
       while(data.data.toptags.tag[i] !== undefined){
         var tupla = Object.freeze({ name:data.data.toptags.tag[i].name, count:data.data.toptags.tag[i].count})
         t.push(tupla)
         i++;
       }
    }
      return t;
  })



};





});
