# ROOMDRILE - WebSocial
### Después de clonar el repo
En server: 
- npm install
- npm start
En webSenati:
- npm install
- npm run dev

### Base de datos?
Se utilizó firebase, firestore y storage para el almacenamiento. El script sql en el repo no deberia de tomarse en cuenta.

### Credenciales de prueba:
email: anita@gmail.com
nombre: Anaa
password: 123456  (si no es esa es 12345678, en la bd en firestore no se puede ver las contraseñas porque estan encriptadas).

### Actual:
- Un posteo puede hacerse si y solo si tiene una imagen subida. (falta arreglar)
- En server está listo agregar, eliminar amigo, mas todavia no está implementado en el frontend.
- Se puede dar like, quitar like, comentar, postear, chatear (como un foro, ya que es un chat general aún), ver perfil en el boton Perfil,
  ver perfil de la persona dando click en el nombre de algun post, cerrar sesión, logearse, registrar nueva cuenta. (completo)
- Falta funcionalidad de actualizar perfil.
- Falta implementar buscarAmigos, addRelation, deleteRelation al frontend, solo estan en api.
- Se puede scrollear pero poniendo el mouse sobre el panel del medio. (falta arreglar (?))
