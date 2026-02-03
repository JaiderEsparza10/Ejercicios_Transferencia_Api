const InteraccionPublicaciones = async () => {
    try {
        // 1. Requerimiento: Consultar todas las publicaciones y todos los comentarios
        const [resPosts, resComments] = await Promise.all([
        fetch(`http://localhost:3000/posts`),
        fetch(`http://localhost:3000/comments`)
        ]);

        const posts = await resPosts.json();
        const comments = await resComments.json();

        // 2. Requerimiento: Relacionar, identificar y clasificar
        const listadoFinal = posts.map(post => {
        // Filtramos los comentarios que pertenecen a esta publicación usando postId
        const comentariosAsociados = comments.filter(comment => comment.postId === post.id);
        const totalComentarios = comentariosAsociados.length;

        return {
            titulo: post.title,
            numeroDeComentarios: totalComentarios,
            // Clasificación según tengan o no comentarios
            estado: totalComentarios > 0 ? "Con comentarios" : "Sin comentarios"
        };
        });

        // 3. Datos de salida: Mostrar el listado
        console.log("Análisis de Interacción por Publicación:");
        console.table(listadoFinal);

    } catch (error) {
        console.error("Hubo un error al procesar los datos:", error);
    }
};

InteraccionPublicaciones();