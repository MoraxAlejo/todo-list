let TAREAS = [];

  /* Funcion que separa activadas de desactivadas */

let desactivadas = TAREAS.filter(function(tarea) {
    return tarea.id === false;
});

let activadas = TAREAS.filter(function(activada) {
    return activada.id === true;
});


// la mayoria de los query sekector all 



const elementos = document.querySelectorAll('.li')
const caja_tareas = document.getElementById ("all-tareas")
const boton_add = document.querySelector('#boton-agregar')
const texto_caja = document.getElementById("texto-caja")
const divtexto = document.getElementById("divtexto")
const eleccionall = document.querySelector("#li1")
const eleccionactive = document.querySelector("#li2")
const eleccioncompleted = document.querySelector("#li3")
const borrartarea = document.querySelector('#boton-desaparecer')
const listadesactive = document.querySelector ('#listatareasdesactivadas')

// add events listeners para "ALL" "Actives" "completed" "deleteall" y "agregarTarea"
eleccionall.addEventListener("click",showall)
eleccionactive.addEventListener("click", showactives )
eleccioncompleted.addEventListener("click", showdesactive )
borrartarea.addEventListener("click" , deleteall)
boton_add.addEventListener('click',addtarea)

/* Codigo que hace que los elementos list tengan un color azul debajo de ellos*/

elementos.forEach(function(elemento) { 

  elemento.addEventListener('click', function() {
    // Eliminar la clase 'activo' de todos los elementos
    elementos.forEach(function(el) {
      el.classList.remove('activo');
    });
    
    // Agregar la clase 'activo' al elemento que se hizo clic
    this.classList.add('activo');
  });
});



function mostrartareas() {
  // limpia el div llamado caja tareas que es el contenedor principal
    caja_tareas.innerHTML = ""
    // luego de hacerlo se pone esta funcion para que una vez dado click a completed y cmabie de pantalla a mostrar tareas, el input texto y el boton add aparezcan
    aparecercampotexto()
    // foreach por cada valor del ARRAY TAREAS
    activadas.forEach ((TAREAS) => {   
     
    caja_tareas.innerHTML += ` <div class = "papa-checkbox"> <input type="checkbox"  class="caja-checkbox" id="checkbox"> <p class="tarea-texto"  id=""> ${TAREAS.texto}    </p>  </div> `;


    })

    // imprime desactivadas y les da el valor chececk para que el input checkbox se haye marcado y a la vez le agrega la clase linea a el parrafo del input 
desactivadas.forEach ((TAREAS) => {       
  let ischecked = desactivadas.id ? "": "checked" ;  
        caja_tareas.innerHTML += `<div class = "papa-checkbox"> <input type="checkbox" ${ischecked} class="caja-checkbox " id="checkbox"> <p class="tarea-texto linea" id=""> ${TAREAS.texto}    </p>  </div> `;
        
        })

// este fragmento hace que cuando le de click al checkbox, cambie su id de true a false y al contrario (en varias partes del codigo se repite)
        const check = document.querySelectorAll(".caja-checkbox")
        const tareatexto = document.querySelectorAll(".tarea-texto")
        // este for se hace para agregar un event listener a cada checkbox 
        for (let i = 0; i < check.length; i++) {
          check[i].addEventListener('click', function linea() {
            tareatexto[i].classList.toggle("linea");
            TAREAS[i].id = !TAREAS[i].id;
            desactivadas = TAREAS.filter(function(tarea) {
              return tarea.id === false;
            });
            activadas = TAREAS.filter(function(activada) {
              return activada.id === true;
            });
          })
        }
}

//estas funciones son para aplicar y desactivar estilos css
function aparecer() {
    borrartarea.classList.remove('desaparecer')
    borrartarea.classList.add('contenedorbotonborrar')
}


function desaparecer() {
    borrartarea.classList.add('desaparecer')
}

function desaparecercampotexto() {
    divtexto.classList.add('desaparecer')
}

function aparecercampotexto() {
    divtexto.classList.remove('desaparecer')
}

function aparecertareasdesactive () {
    listadesactive.classList.remove('desaparecer')
}

// la funcion que borra todas las tareas desactivadas
function deleteall() {
  // Elimina todas las tareas desactivadas del array TAREAS
    TAREAS= TAREAS.filter(function(tarea) {
      return tarea.id !== false;

  });
  
  // Asigna un nuevo array vacío a la variable desactivadas
  desactivadas = [];
  
  // Actualiza la vista
  showdesactive();
}

// funcion que se ejecuta al dar click a completed y muestra las tareas desactivadas 
function showdesactive(){

    caja_tareas.innerHTML = ""
    desaparecercampotexto()
    desactivadas.forEach ((desactivada, index) => {
      
       let ischecked = desactivadas.id ? "": "checked" ; 
        caja_tareas.innerHTML += `
        <div class = "papa-checkbox"> <input type="checkbox" ${ischecked} class="caja-checkbox" id="checkbox"> 
        <p class="tarea-texto linea"> ${desactivada.texto}  </p>
        <div class="basura" id="trash" data-index="${index}"><i class="fa-solid fa-trash"></i></div></div>
         `;
// este fragmento hace que cuando le de click al checkbox, cambie su id de true a false y al contrario (en varias partes del codigo se repite)
         const check = document.querySelectorAll(".caja-checkbox")
         const tareatexto = document.querySelectorAll(".tarea-texto")
         
         for (let i = 0; i < check.length; i++) {
           check[i].addEventListener('click', function linea() {
             tareatexto[i].classList.toggle("linea");
             TAREAS[i].id = !TAREAS[i].id;
             desactivadas = TAREAS.filter(function(tarea) {
               return tarea.id === false;
             });
             activadas = TAREAS.filter(function(activada) {
               return activada.id === true;
             });
           })
         }
        
        
       
        
 
    })

    //elemento para borrar individualmente 
    
    // Selecciona todos los elementos con la clase "basura"
    const borrartareaindividual = document.querySelectorAll('.basura');
    
    // Recorre la lista de elementos y agrega un event listener a cada uno
    for (let i = 0; i < borrartareaindividual.length; i++) {
      borrartareaindividual[i].addEventListener('click', function(event) {
        // Obtiene el índice del elemento a eliminar
        let index = event.target.parentElement.dataset.index;
        
        // Elimina el elemento del array
        desactivadas.splice(index, 1);
        
        // Actualiza la vista
        showdesactive();
      });
    }
    
    
    aparecer()
}

// funcion ejecutada al dar click en "Actives" y muestra las tareas activas

function showactives() {
    desaparecer()
    aparecercampotexto()
    caja_tareas.innerHTML = ""
    activadas.forEach ((activadas) => {
        caja_tareas.innerHTML += `<div class = "papa-checkbox"> <input type="checkbox" class="caja-checkbox" id="checkbox"> <p class="tarea-texto">${activadas.texto}</p> </div> `;
})
// este fragmento hace que cuando le de click al checkbox, cambie su id de true a false y al contrario (en varias partes del codigo se repite)
const check = document.querySelectorAll(".caja-checkbox")
const tareatexto = document.querySelectorAll(".tarea-texto")

for (let i = 0; i < check.length; i++) {
  check[i].addEventListener('click', function linea() {
    tareatexto[i].classList.toggle("linea");
    TAREAS[i].id = !TAREAS[i].id;
    desactivadas = TAREAS.filter(function(tarea) {
      return tarea.id === false;
    });
    activadas = TAREAS.filter(function(activada) {
      return activada.id === true;
    });
  })
}

}
           

// hice mostrar tareas aparte y show all simplemente ejecuta las funciones :) ahora que lo pienso es mas codigo pero se ve bonito

function showall () {
    desaparecer()
    aparecercampotexto()
    caja_tareas.innerHTML = ""
    mostrartareas()
}

// añade tareas al array TAREAS y a ativadas
function addtarea() {
        
      TAREAS.push ({
        id: true ,texto: texto_caja.value 
      });   

      activadas.push ({
        id: true ,texto: texto_caja.value 
      });   
      caja_tareas.innerHTML = ""
      mostrartareas()

      texto_caja.value=""
}




