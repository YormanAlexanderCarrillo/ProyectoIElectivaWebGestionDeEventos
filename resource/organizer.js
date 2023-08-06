const URLApi = "http://localhost:3001/organizer"


async function addOrganizer(dataOrganizer) {
    try {
        const response = await fetch(URLApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataOrganizer)

        })
        if (!response.ok) {
            throw new Error('Error al registrar el organizador en la API. Estado de respuesta: ' + response.status);
        }
        return response.json()
    } catch (error) {
        console.error('Error al registrar el organizador:', error.message);
    }
}

async function getOrganizer() {
    try {
        const response = await fetch(URLApi)
        if (!response.ok) {
            throw new Error('La respuesta de la API no fue exitosa');
        }
        return response.json()
    } catch (error) {
        console.error('Error al obtener los organizadores:', error.message);
    }
}

module.exports.getOrganizer = getOrganizer
module.exports.addOrganizer = addOrganizer