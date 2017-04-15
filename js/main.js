/**
 * @Author: John Isaacs <john>
 * @Date:   15-Apr-172017
 * @Filename: main.js
* @Last modified by:   john
* @Last modified time: 15-Apr-172017
 */



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
    console.log(data);
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
