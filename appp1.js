// Elementos input con información de libro Nuevo
const autor = document.getElementById('inputAutor')
const titulo = document.getElementById('inputTitulo')
const tabla = document.getElementById('tbody')
const inputBuscar = document.getElementById('inputBuscar')

const patern = /^[a-zA-Z0-9]{3,20}$/;
/^[a-zA-ZÁ-ÿ0-9\s]{3,20}$/;

const libro = new Libro()

EventListener()
//let id = 0;


PrepararDom();

function EventListener() {
    document.getElementById('btnAdd').addEventListener('click', PrepararLibro);
    tabla.addEventListener('click', Acciones);
    document.getElementById('btnVaciar').addEventListener('click', vaciarLibreria);
    document.getElementById('btnBuscar').addEventListener('click', BuscarLibro);

}

function PrepararLibro() {

    let ultimoId = Number(LocalStorageOperation.ultimoId());
    ultimoId ++;

    if ((autor.value != '' || titulo.value != '') && (patern.test(autor.value) || patern.test(titulo.value))) {


        //libro.agregar([autor.value, titulo.value])        
        const infoLibro = {
            //Dos puntos hacen la asignacion de =
            id: ultimoId,
            titulo: titulo.value.trim(),
            autor: autor.value.trim()

        }
            

        if(inputBuscar != infoLibro){
            //let tr = libro.agregar([autor.value, titulo.value])
            let tr = libro.agregar(infoLibro)
                //console.log(tr);
            LocalStorageOperation.almacenarLibro(infoLibro);
            tabla.appendChild(tr)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se agregó libro',
                showConfirmButton: false,
                timer: 1000
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Titulo duplicado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        autor.value = ''
        titulo.value = ''

    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            showConfirmButton: false,
            timer: 1000
        })
    }

}

function Acciones(event){
    if(event.target.tagName === 'I' || event.target.tagName === 'BUTTON'){
        if(event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")){
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
}

//Renderizar los elementos en LS (localStorage)
function PrepararDom() {
    const librosLS = LocalStorageOperation.ObtenerLS()
        //console.log(librosLS)
        //console.log(librosLS.length);
    for(let i = 0; i < librosLS.length; i++) {
        //const instanciaLibro = new Libro()
        //instanciaLibro.agregar(librosLS);
        //console.log(librosLS[i]);
        let tr = libro.agregar(librosLS[i]);
        tabla.appendChild(tr);
    }
}


//Eliminar todos los elementos de la tabla. 
function vaciarLibreria() {
    console.log(tabla.firstChild);
    while (tabla.firstChild) {
        tabla.firstChild.remove();
    }

    //Eliminar LocalStorage
    LocalStorageOperation.BorrarStorage();
}

//Realizar busqueda del libro
function BuscarLibro(event) {
    event.preventDefault();

    //Validar que el input tenga texto
    if(inputBuscar.value != '') {
        let resultadoBusqueda= LocalStorageOperation.BuscarTitulo(inputBuscar.value.trim().toLowerCase());

        if(resultadoBusqueda != '') {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Busqueda exitosa',
                text: `El libro ${resultadoBusqueda.titulo} tiene el id ${resultadoBusqueda.id} y fue escrito por ${resultadoBusqueda.autor}`,
                showConfirmButton: false,
                timer: 3000
            })
        }else {
            console.log("Naur");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `No esta registrado el libro ${inputBuscar.value}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        }
    }

    inputBuscar.value= '';
} 