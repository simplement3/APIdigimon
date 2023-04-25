// // $.ajax({
// //     type: "get",
// //     url: "https://digimon-api.vercel.app/api/digimon",
// //     dataType: "json",
// //     success: function (response) {
// //         tabla(response);
// //     }
// // });

fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(data => tabla(data));

// crea tabla para mostrar informacion de digimon
function tabla(datos) {
    // selecciona el elemento HTML con querySelector
    var cuerpoTabla = document.querySelector('#cuerpoTabla');
    // itera cada digimon en el arreglo
    for (var i = 0; i < datos.length; i = i + 1) {
        // crea la nueva fila 
        var fila = document.createElement('tr');
        // crea las columnas con los datos
        var columnaName = document.createElement('td');
        var columnaImg = document.createElement('td');
        var columnaLevel = document.createElement('td');
        columnaName.innerHTML = datos[i].name;
        columnaImg.innerHTML = '<img src="' + datos[i].img + '">';
        columnaLevel.innerHTML = datos[i].level;
        // se agregan los datos a la fila
        fila.append(columnaName, columnaImg, columnaLevel);
        cuerpoTabla.append(fila);

        // Agrega el evento de clic a la fila y toma la variable digimon como argumento
        fila.addEventListener('click', (function (digimon) {
            // retorna otra funcion al hacer clic
            return function () {
                // en esta linea capturamos cada iteracion del ciclo for con los detalles de la fila
                //  de cada digimon y lo pasamos como parametro a la funcion
                mostrarDetalle(digimon);
            }
            // se pasan datos i como argumento luego del evento para rescatarla y no pierda su valor
        })(datos[i]));
    }
}

var ventanaEmergenteActual;

function mostrarDetalle(digimon) {
    // busca y elimina la ventana emergente anterior si existe
    console.log(digimon);
    if (ventanaEmergenteActual) {
        ventanaEmergenteActual.remove();
    }
    // Crea un nuevo elemento div para la ventana emergente
    var ventana = document.createElement('div');
    ventana.classList.add('ventana-emergente');
    console.log(ventana);

    // Crea los elementos HTML para mostrar los detalles del Digimon seleccionado
    var nombre = document.createElement('h2');
    nombre.innerHTML = digimon[0].name;
    console.log(digimon[0].name);
    console.log(digimon[0].img);
    console.log(digimon[0].level);
    var imagen = document.createElement('img');
    imagen.setAttribute('src', digimon[0].img);
    var nivel = document.createElement('p');
    nivel.innerHTML = 'Nivel: ' + digimon[0].level;
    // crear el boton para cerrar ventana
    var botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.addEventListener('click', function () {
        ventanaEmergenteActual.remove();
    })

    // Agrega los elementos al nuevo elemento div
    ventana.append(nombre, imagen, nivel, botonCerrar);

    // establece ventana emergente actual
    ventanaEmergenteActual = ventana;
    // Agrega el nuevo elemento div al elemento body del documento
    document.body.append(ventana);

    // agrega estilo al CSS
    ventana.style.display = 'block';
    // ventana.style.position = 'absolute';
}

var btnBuscarDigimon = document.querySelector('#btnBuscarDigimon');
btnBuscarDigimon.addEventListener('click', function () {
    var txtNombreDigimon = document.querySelector('#txtNombreDigimon');
    $.ajax({
        type: "get",
        url: "https://digimon-api.vercel.app/api/digimon/name/" + txtNombreDigimon.value,
        dataType: "json",
        success: function (response) {
            // console.log(response);
            mostrarDetalle(response);
        }
    });
    txtNombreDigimon.value = '';
})