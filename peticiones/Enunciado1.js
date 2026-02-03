const obtenerReporteUsuarios = async () => {
    try {
        // 1. Consultar la lista completa de usuarios y publicaciones
        const [resUsuarios, resPosts] = await Promise.all([
        fetch(`http://localhost:3000/users`),
        fetch(`http://localhost:3000/posts`)
        ]);

        const usuarios = await resUsuarios.json();
        const posts = await resPosts.json();

        // 2. Procesar los datos para identificar publicaciones por usuario
        const resultado = usuarios.map(usuario => {
        // Filtramos las publicaciones que pertenecen al ID de este usuario
        const publicacionesDelUsuario = posts.filter(post => post.userId === usuario.id);

        return {
            nombre: usuario.name,
            cantidadPublicaciones: publicacionesDelUsuario.length
        };
        });

        // 3. Mostrar el listado de salida
        console.log("Listado de Usuarios y sus publicaciones:");
        console.table(resultado);

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

obtenerReporteUsuarios();