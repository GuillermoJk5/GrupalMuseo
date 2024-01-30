## Museo de arte metropolitano :joy:

Integrantes:
- Guillermo Fabian Rodriguez
- Raul Moya Gimeno
- Victor Viñerta Crespo
- Diego Urmente Villarroya
- Sergio Alejaldre Zarza

### Introducción
El museo de arte metropolitano necesita una pagina para que los visitantes puedan ver sus obras de forma sencilla.

### Requerimientos
* Deberá mostrarse inicialmente un desplegable con los departamentos en los que se divide el museo. Esta información se va a considerar estática y por lo tanto, deberemos de descargarla una vez y almacenarla localmente para poder ser reutilizada.

* Al seleccionar un departamento, obtendremos los datos de los "objetos" como son llamados, y los mostraremos en pantalla en un listado en forma de cuadrícula, mostrando su imagen, título, año de creación y autor si se conocen.

* El listado deberá contener al menos 40 elementos por página, y deberá poder navegarse a páginas anteriores y posteriores, navegar a una página concreta que se mostrará al pie del listado en forma de lista (si hay 50 páginas, se mostrarán las 50 páginas en forma de número). Las obras por departamento deberán almacenarse también en la memoria local para evitar estar haciendo llamadas innecesarias.

* Al seleccionar una obra de arte, se visualizarán los datos específicos en un popup sobre el listado, mostrando al menos las siguientes informaciones: título, imagen, año de creación, autor, año de adquisición, si se trata de una obra importante, departamento, nacionalidad del autor, medidas y material de la obra. Se tendrá muy en cuenta que se añadan más datos a la ficha de la obra.

* Los datos deben borrarse entre usos del programa.    

### Arquitectura del software
- Models
    - Obra

      > Clase que representa un objeto Obra

    - Types
 
      > Clase que crea types
    
- Views
    - Principal.html
      
      > Ventana principal
      
- Controllers
    - ControllerPrincipal.ts
      
      > Controlador de la pagina principal

    - ControllerPopUp.ts
    
      > Controlador del PopUp
    
- Service
    - CategoriasService.ts
 
      > Servicio para obtener las categorias
    
    - IdobraService.ts
 
      > Servicio para obtener los ids de las obras de una categorias
    
    - ObraService.ts
 
      > Servicio para obtener los datos de las obras
    
- Styles
  

### Paleta de colores para la aplicación
- Fondos : 
- Botones : 
- Bordes y sombras : 
- Otros : 

### Reparto de tareas
**Diego** 🤓
- [x] ControlerPrincipal.ts
---
**Sergio** 😐
- [x] ArtWork.ts
- [x] Constituent.ts
- [x] ElementMeasurement.ts
- [x] Measurement.ts
- [x] Tag.ts
- [x] Types.ts
- [x] tsconfig.json
- [ ] ArtWorkRepository.ts
- [ ] ArtWorkService.ts
---
**Raul** 😈
- [x] IdobrasController.ts
- [x] IdobraService.ts
---
**Guille** 🐧
- [x] ControllerPopUp.ts
- **Lider de equipo ayudara a sus compañeros**
---
**Victor** 🧓
- [x] Principal.html
- [x] estilosprincipal.css
- [ ] CategoriasService.ts
- [ ] CategoriasRepository.ts
- [ ] CategoriasRepository.js

