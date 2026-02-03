// Función asíncrona para buscar y mostrar el detalle de una publicación específica por su ID
const buscarDetallePublicacion = async (idABuscar) => {
    try {
        // Realizamos peticiones simultáneas para obtener el conjunto global de publicaciones y comentarios
        const [resPosts, resComments] = await Promise.all([
            fetch(`http://localhost:3000/posts`),
            fetch(`http://localhost:3000/comments`)
        ]);

        // Transformamos las respuestas de las peticiones a formato JSON para procesar la información
        const posts = await resPosts.json();
        const comments = await resComments.json();

        // Buscamos dentro del arreglo de publicaciones aquella que coincida con el ID proporcionado
        const publicacionEncontrada = posts.find(post => post.id === idABuscar);

        // Validamos si la publicación fue hallada; si no existe, informamos al usuario y detenemos la ejecución
        if (!publicacionEncontrada) {
            console.log(`La publicación con ID ${idABuscar} no existe.`);
            return;
        }

        // Filtramos la lista de comentarios para obtener únicamente aquellos vinculados al ID de la publicación buscada
        const comentariosRelacionados = comments.filter(c => c.postId === idABuscar);

        // Estructuramos un objeto de reporte con la información relevante de la publicación y el conteo de comentarios
        const reporte = {
            titulo: publicacionEncontrada.title,
            contenido: publicacionEncontrada.body,
            numeroComentarios: comentariosRelacionados.length
        };

        // Mostramos un mensaje de confirmación en la consola
        console.log("Información detallada de la publicación:");
        // Presentamos los datos finales del reporte en una tabla para facilitar su visualización
        console.table(reporte);

    } catch (error) {
        // Capturamos y reportamos cualquier error ocurrido durante el proceso de fetch o filtrado
        console.error("Error en la búsqueda:", error);
    }
};

// Realizamos el llamado a la función pasando como argumento el ID de la publicación deseada (ejemplo: ID 5)
buscarDetallePublicacion(5);