

async function loadGoogleMapsAPI() {
    const apiKey = "AIzaSyATOXIQjgyLmtPh9uconUqn5GsG4xciH2c";
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`);
        if (!response.ok) {
            throw new Error("No se pudo cargar la API de Google Maps.");
        }
        const script = await response.text();
       //  console.log(script)
        const scriptElement = document.createElement("script");
        scriptElement.textContent = script;
        document.head.appendChild(scriptElement);
        

    } catch (error) {
        console.error(error);
    }
}

let map;
let marker;

function initMap() {
    const latitudEvento = 5.6;
    const longitudEvento = -72.983;
   const divMap = document.getElementById("map")
    map = new google.maps.Map(divMap, {
        center: { lat: latitudEvento, lng: longitudEvento },
        zoom: 12,
    });
    marker = new google.maps.Marker({
        position: { lat: latitudEvento, lng: longitudEvento },
        map: map,
        title: "Evento",
    });
    
}
    

loadGoogleMapsAPI().then(initMap)

