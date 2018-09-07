/**
 * @Author: John Isaacs <john>
 * @Date:   15-Apr-172017
 * @Filename: main.js
* @Last modified by:   john
* @Last modified time: 15-Apr-172017
 */

 const leaveTags = ['no2eu', 'notoeu', 'betteroffout', 'voteout', 'britainout', 'leaveeu', 'voteleave', 'beleave'];
 const remainTags = ['bremain', 'yes2eu', 'yestoeu', 'betteroffin', 'votein', 'ukineu', 'strongerin', 'leadnotleave', 'voteremain'];


var mymap = L.map('mapid').setView([51.505, -0.09], 7);

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(mymap);

var stateStyle = {
    "color": "grey",
    "weight": 2,
    "opacity": 0.65,
    "fillOpacity": 0
};

$.getJSON("js/wmbound.geojson", function(data) {

    data.features.forEach(function(cons) {
        var myLayer = L.geoJSON(cons, {
            style: stateStyle,
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.pcon16nm);
            }
        });
        myLayer.addTo(mymap);
    });
});

L.control.scale().addTo(mymap);

//custom size for this example, and autoresize because map style has a percentage width
var remainmap = new L.WebGLHeatMap({gradientTexture:'http://localhost:8000/img/blue.png', autoresize: true});
var leavemap = new L.WebGLHeatMap({gradientTexture:'http://localhost:8000/img/red.png', autoresize: true});




$.getJSON("js/serverside/tweetlocations.json", function(data) {

  var tweetStyle = {
      "color": "grey",
      "weight": 2,
      "opacity": 0.65,
      "fillOpacity": 0.5
  };

    data.forEach(function(tweet){
      var lng = tweet.coordinates.coordinates[0];
      var lat = tweet.coordinates.coordinates[1];
      for(var i=0; i<tweet.entities.hashtags.length; i++){
        //console.log(tweet.entities.hashtags[i]);
        if(leaveTags.indexOf(tweet.entities.hashtags[i].text) > 0){

          leavemap.addDataPoint(lat,lng,30);
        }

        if(remainTags.indexOf(tweet.entities.hashtags[i].text) > 0){
          remainmap.addDataPoint(lat,lng,30);
        }
      };



      //L.circle([lat,lng], 200, tweetStyle).addTo(mymap);
    });
    mymap.addLayer(remainmap);
    mymap.addLayer(leavemap);
});
