class LocalStorageOperation {

    static almacenarLibro(infoLibro) { //Guardar la informacion de los objetos libros que se esten resibiendo.
        //Array de libros
        console.log(infoLibro);
        //get
        let arrayLibros = this.ObtenerLS();
        arrayLibros.push(infoLibro);
        //console.log(infoLibro);

        //set --- setear informacion 
        //arrayLibros es un JSON y se necesita convertir a String
        localStorage.setItem('Libros', JSON.stringify(arrayLibros))
    }
    static ObtenerLS() {
        if (localStorage.getItem('Libros') === null) {
            // console.log('Vacio');
            return [];
        } else {
            //  console.log('Si hay libros');
            return JSON.parse(localStorage.getItem('Libros'));
            //get obtener informacion --- getters
        }
    }

    //Eliminar LocalStorage
    static BorrarStorage() {
        localStorage.clear()
    }

    //Mediante un ciclo se hace una busqueda y cuando se encuentre el id = al valor de la busqueda, y si este objetivo es encontrado es eliminado de la pantalla.
    static BorrarLibro(idLibro){
        console.log(idLibro)
        let arrayLibros = this.ObtenerLS()
        console.log(arrayLibros);
        let arregloNuevo = []

        for(let i = 0; i<arrayLibros.length; i++){
            if(idLibro != arrayLibros[i].id) arregloNuevo.push(arrayLibros[i])
        }
        console.log(arregloNuevo)
        localStorage.setItem('Libros', JSON.stringify(arregloNuevo))
    }

    static ultimoId() {
        let arrayLibros= this.ObtenerLS();

        if(arrayLibros == 0) {
            return 0;
        }else {
            return(arrayLibros[arrayLibros.length - 1].id);
        }
    }

    static BuscarTitulo(titulo) {
        // titulo viene de app.js y es el valor de un input (buscador).
        // Para nuestro elemento titulo sera nuestro parametro de busqueda.
        console.log(titulo);
        let arrayLibros = this.ObtenerLS();

        let resultado = '';

        // Iteramos nuestro array de libros mediante un ciclo
        // i < arrayLibros esto debido a que es la cantidad de libros que tenemos, nuestro ciclo da vuelta hasta que sea menor que la longitud de nuestro arreglo.  
        // Ponemos i < arrayLibros.length para evitar una vuelta mas en el ciclo.
        for (let i = 0; i < arrayLibros.length; i++) {
            if (arrayLibros[i].titulo.toLowerCase().trim() == titulo) {
                resultado = arrayLibros[i];
                //return arrayLibros[i];
                //console.log('Libro encontrado')
                //Esto devolvera un array de objeto
            }
        }
        return resultado;
    }

    static ComprobarTituloAutor(titulo, autor) {
        let arrayLibros = this.ObtenerLS();
        let comprobar = 0;

        for (let i = 0; i < arrayLibros.length; i++) {
            if ((titulo == arrayLibross[i].titulo.trim().toLowerCase()) && (autor == arrayLibross[i].autor.trim().toLowerCase())) {
                comprobar = 1;
            }
        }
        return comprobar;
    }

} 