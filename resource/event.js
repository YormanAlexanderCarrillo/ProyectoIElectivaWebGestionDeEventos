const URLApi = "https://api-gestion-eventos.fly.dev/event"

async function getEvents() {
    try {
        const response = await fetch(URLApi)
        if (!response.ok) {
            throw new Error('La respuesta de la API no fue exitosa');
        }
        return response.json()
    } catch (error) {
        console.error('Error al obtener los carros:', error.message);
    }
}

async function addEvent(dataEvent){
    try {
        try {
            const response = await fetch(URLApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataEvent)
    
            })
            if (!response.ok) {
                throw new Error('Error al registrar el evento en la API. Estado de respuesta: ' + response.status);
            }
            return response.json()
        } catch (error) {
            console.error('Error al registrar el evento:', error.message);
        }
    } catch (error) {
        
    }
}

module.exports.getEvents = getEvents
module.exports.addEvent = addEvent