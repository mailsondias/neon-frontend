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
