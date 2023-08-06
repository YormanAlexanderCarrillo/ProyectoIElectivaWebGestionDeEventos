const URLApi = "http://localhost:3001/guest"


async function addGuest(dataGuest) {
    try {
        const response = await fetch(URLApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataGuest)

        })
        if (!response.ok) {
            throw new Error('Error al registrar el invitado en la API. Estado de respuesta: ' + response.status);
        }
        return response.json()
    } catch (error) {
        console.error('Error al registrar el cliente:', error.message);
    }
}

async function getGuest() {
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

module.exports.getGuest = getGuest
module.exports.addGuest = addGuest