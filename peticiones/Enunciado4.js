const intentarEliminarPublicacion = async (postId) => {
    try {
        // 1. Requerimientos: Consultar publicaciones y comentarios
        const [resPosts, resComments] = await Promise.all([
            fetch(`http://localhost:3000/posts`),
            fetch(`http://localhost:3000/comments`)
        ]);

        const posts = await resPosts.json();
        const comments = await resComments.json();

        // 2. Verificar si la publicación existe antes de continuar
        const existePost = posts.some(post => post.id === postId);
        if (!existePost) {
            console.log(`Error: La publicación con ID ${postId} no existe.`);
            return;
        }

        // 3. Verificar si la publicación específica tiene comentarios asociados
        const comentariosAsociados = comments.filter(c => c.postId === postId);
        const tieneComentarios = comentariosAsociados.length > 0;

        // 4. Lógica de eliminación
        if (tieneComentarios) {
            // Datos de salida: Caso con comentarios
            console.log("No se puede eliminar la publicación porque tiene comentarios");
        } else {
            // Si no tiene comentarios, ejecutar la eliminación (Simulación API)
            const resDelete = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE',
            });

            if (resDelete.ok) {
                // 5. Validar el resultado (En una API real, intentaríamos consultar el ID de nuevo)
                console.log("Publicación eliminada correctamente");
            }
        }

    } catch (error) {
        console.error("Error en el proceso de eliminación:", error);
    }
};

// Ejemplo: Intentar eliminar la publicación con ID 7
// (En JSONPlaceholder, casi todas tienen 5 comentarios, así que lo más probable es que falle la eliminación)
intentarEliminarPublicacion(8);