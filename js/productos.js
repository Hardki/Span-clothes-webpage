// En el archivo productos.js
export async function obtenerDatos(url) {
  try {
    const response = await fetch(url);
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error recibiendo datos:', error);
    throw error;
  }
}