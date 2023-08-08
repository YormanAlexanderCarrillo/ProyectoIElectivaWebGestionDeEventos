
async function getDataUser() {
    const url = 'https://api-gestion-eventos.fly.dev/admin';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('La respuesta de la API no fue exitosa');
    } else {
        const data = await response.json();
        return data.data;
    }
}


async function authenticateUser(inputUser, inputPassword) {
    try {
        const data = await getDataUser()
        const authenticatedUser = data.find(user => user.user === inputUser && user.password === inputPassword)
        return authenticatedUser
    } catch (error) {
        console.error('Error al autenticar al usuario:', error)
        throw error
    }
}

module.exports.authenticateUser = authenticateUser