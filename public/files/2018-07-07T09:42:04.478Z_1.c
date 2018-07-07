crear usuarios *
cada usuario puede subir tareas *-
tareas clasificar materia, plan, carrea, falcultad
comentarios *
rating -
agregar contenido a trabajo original *
**vista de tareas
  - Mostrar la original, su contenido, comentarios *
   y al final las tareas relacionadas más destacadas -
  - Las tareas se pueden reportar y los comentarios -
  - Mostrar la fecha de la tarea

**Administradores -
  - Rol de administrador para que valide el contenido reportado
  - Cuando se valida algo pasa a ser irreportable (hasta que se vuelva a editar) o eliminarlo
**Niveles de clasificación *  
  - Facultad
  - Carrera
  - Materia o curso
**Búsquedas *
  - Por nombre de la tarea
  - Por tags
  - Y por clasificación
  - Todas las anteriores 
**Archivos
  - Todos los archivos de texto editables, pdfs *
  - Links *
  - Rar, zips -
  - Fotos -
  - Tamaño máximo 10MB
**Cosas por agregar
  - Número de páginas

*********************Modelos
- Usuario
  - id (único en nuestra base de datos)
  - nombre  *
  - correo  *
  - urlImagen
  - token

  - Universidad
  - Facultad 
  - Carrera *** No database
  - Descripción

- Trabajos
  - id
  - idAuthor
  - date
  - modification database
  - tags (string)

  - Facultad 
  - Title
  - Carrera
  - Descripción
  - Materia 
  - JSON rating (promedio, sumatoria valores y número de calificaciones)

- archivos tareas
-catalogo school level
-catalogo area
-comentarios