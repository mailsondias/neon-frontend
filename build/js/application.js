/**
 * Lib ClassList
 */
if("document"in self){if(!("classList"in document.createElement("_"))||document.createElementNS&&!("classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))){(function(t){"use strict";if(!("Element"in t))return;var e="classList",i="prototype",n=t.Element[i],s=Object,r=String[i].trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array[i].indexOf||function(t){var e=0,i=this.length;for(;e<i;e++){if(e in this&&this[e]===t){return e}}return-1},o=function(t,e){this.name=t;this.code=DOMException[t];this.message=e},l=function(t,e){if(e===""){throw new o("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(e)){throw new o("INVALID_CHARACTER_ERR","String contains an invalid character")}return a.call(t,e)},c=function(t){var e=r.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],n=0,s=i.length;for(;n<s;n++){this.push(i[n])}this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=c[i]=[],f=function(){return new c(this)};o[i]=Error[i];u.item=function(t){return this[t]||null};u.contains=function(t){t+="";return l(this,t)!==-1};u.add=function(){var t=arguments,e=0,i=t.length,n,s=false;do{n=t[e]+"";if(l(this,n)===-1){this.push(n);s=true}}while(++e<i);if(s){this._updateClassName()}};u.remove=function(){var t=arguments,e=0,i=t.length,n,s=false,r;do{n=t[e]+"";r=l(this,n);while(r!==-1){this.splice(r,1);s=true;r=l(this,n)}}while(++e<i);if(s){this._updateClassName()}};u.toggle=function(t,e){t+="";var i=this.contains(t),n=i?e!==true&&"remove":e!==false&&"add";if(n){this[n](t)}if(e===true||e===false){return e}else{return!i}};u.toString=function(){return this.join(" ")};if(s.defineProperty){var h={get:f,enumerable:true,configurable:true};try{s.defineProperty(n,e,h)}catch(d){if(d.number===-2146823252){h.enumerable=false;s.defineProperty(n,e,h)}}}else if(s[i].__defineGetter__){n.__defineGetter__(e,f)}})(self)}else{(function(){"use strict";var t=document.createElement("_");t.classList.add("c1","c2");if(!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,n=arguments.length;for(i=0;i<n;i++){t=arguments[i];e.call(this,t)}}};e("add");e("remove")}t.classList.toggle("c3",false);if(t.classList.contains("c3")){var i=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){if(1 in arguments&&!this.contains(t)===!e){return e}else{return i.call(this,t)}}}t=null})()}}

/**
 * App NEON
 */
(function(){

	'use strict'

	var btnMenu = document.getElementById('btn-menu'),
		menu    = document.getElementsByClassName('menu')[0]

	btnMenu.onclick = function(e) {
		e.preventDefault()

		btnMenu.classList.toggle('-open')
		menu.classList.toggle('-open')
	}

})()
function initialize() {

  // Exibir mapa;
  var myLatlng = new google.maps.LatLng(-15.7362495,-47.896529,17);
  var mapOptions = {
    zoom: 16,
    scrollwheel: false,
    center: myLatlng,
    panControl: false,
    // mapTypeId: google.maps.MapTypeId.SATELLITE
    mapTypeId: google.maps.MapTypeId.ROADMAP
    // mapTypeControlOptions: {
    //   mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    // }
  }

  // Parâmetros do texto que será exibido no clique;
  var contentString = '<h4 style="font-weight: bold; font-size: 1.6em; color: #333;">Artros Ortopedia</h4>' +
                      '<p style="color: #333; padding: 0.3em 0; font-size: 1.2em">Ed. Multiclínicas - Sala 14</p>';
  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 700
  });

  // Exibir o mapa na div #mapa;
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Marcador personalizado;
  var image = 'http://www.bettainterativa.com.br/jobs/artros/images/pin-map.png';
  var marcadorPersonalizado = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: image,
      title: 'Parthenon Festas',
      animation: google.maps.Animation.DROP
  });

  // Exibir texto ao clicar no ícone;
  google.maps.event.addListener(marcadorPersonalizado, 'click', function() {
    infowindow.open(map,marcadorPersonalizado);
  });


  // Estilizando o mapa;
    // Criando um array com os estilos
    var styles = [
      {
        stylers: [
          { hue: "#d5e9d2" },
          { saturation: 0 },
          { lightness: 0 },
          { gamma: 1 }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      },
      {
        featureType: "road",
        elementType: "labels"
      }
    ];

    // crio um objeto passando o array de estilos (styles) e definindo um nome para ele;
    var styledMap = new google.maps.StyledMapType(styles, {
      name: "Artros Ortopedia"
    });

    // Aplicando as configurações do mapa
    // map.mapTypes.set('map_style', styledMap);
    // map.setMapTypeId('map_style');

  }

// Função para carregamento assíncrono
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDeHb17So0QupSGO_d6b8X-OyvJ32UQehs&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;
