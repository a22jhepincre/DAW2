export async function getFilms(){
    // https://www.omdbapi.com/?s=Batman&apikey=535d16cc
    try {
        // Usamos una ruta relativa a la raíz del servidor para acceder al archivo estático
        const response = await fetch('https://www.omdbapi.com/?s=Batman&apikey=535d16cc');

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.Search;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagamos el error para que pueda ser manejado en el nivel superior
    }
}