user.controller('userCtrl', function ($scope,$http) {

$scope.apiKey = '6cdc036afa25edf9ffa2f4b26794ebc5';
$scope.artistasMaisEscutados = [];

$scope.getTopArtists = function(geo){
  var url ="http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country="+geo+"&api_key="+$scope.apiKey+"&format=json";
  

  $http.get(url).then(function (data) {
    console.log(data);
  
    for (let i = 0; i < 50; i++) {
      console.log(data.data.topartists.artist[i].name);
      console.log($scope.getArtistTags(data.data.topartists.artist[i].name));
    }

    for (let i = 0; i < 50; i++) { 
      let sourceTags = $scope.getArtistTags(data.data.topartists.artist[i].name);
      sourceTags.then((array) => {
        for (let j = i; j < 50; j++) {
          if (data.data.topartists.artist[i].name != data.data.topartists.artist[j].name) {
            let targetTags = $scope.getArtistTags(data.data.topartists.artist[j].name);
            targetTags.then((response) => {
              let w = $scope.matches(array , response);
         
              $scope.artistasMaisEscutados.push({"source":data.data.topartists.artist[i].name, "target": data.data.topartists.artist[j].name, "weight": w})
            
              x = $scope.artistasMaisEscutados;

              console.log($scope.artistasMaisEscutados);
          })
        }
        }
      })
    } 
  }); 
}



$scope.matches = function(sourceTags, targetTags) {
  var peso = 0;
  
    for (let i = 0; i < sourceTags.length; i++) {
        for (let j = 0; j < targetTags.length; j++) {
          if (sourceTags[i].name === targetTags[j].name) {
              peso += 1
          }
        }
    }
  return peso;
};

$scope.getArtistTags = function(artist){
 
  var t = [];
    return $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist="+artist+"&api_key="+$scope.apiKey+"&format=json").then(function (data) {

    
    var i = 0;

    if (data.data.toptags.tag !== undefined){
    
       while(data.data.toptags.tag[i] !== undefined) {
         var tupla = Object.freeze({ name:data.data.toptags.tag[i].name, count:data.data.toptags.tag[i].count})
         t.push(tupla)
         i++;
       }
    }
      return t;
  })
};
});
