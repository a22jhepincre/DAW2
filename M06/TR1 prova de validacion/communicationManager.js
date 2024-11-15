export async function calculaResultat(op, a ,b){
    return fetch(`http://alvaro.daw.inspedralbes.cat/calculadora.php?op=${op}&a=${a}&b=${b}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // Opcional, para manejar el error si quieres propagarlo
        });
}