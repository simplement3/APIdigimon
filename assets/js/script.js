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
    if (ventanaEmergenteActual) {
        ventanaEmergenteActual.remove();
    }

    var ventana = document.createElement('div');
    ventana.classList.add('ventana-emergente');
    console.log(digimon.name);
    console.log(digimon.img);
    console.log(digimon.level);

    var nombre = document.createElement('h2');
    nombre.innerHTML = digimon.name;
    var imagen = document.createElement('img');
    imagen.setAttribute('src', digimon.img);
    var nivel = document.createElement('p');
    nivel.innerHTML = 'Nivel: ' + digimon.level;

    var botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.addEventListener('click', function () {
        ventanaEmergenteActual.remove();
    })

    ventana.append(nombre, imagen, nivel, botonCerrar);
    ventanaEmergenteActual = ventana;
    document.body.append(ventana);

    ventana.style.display = 'block';
    ventana.style.width = '32%';
    ventana.style.textAlign = 'center';
    ventana.style.border = '2px solid black'
}

var btnBuscarDigimon = document.querySelector('#btnBuscarDigimon');
btnBuscarDigimon.addEventListener('click', function () {
    var txtNombreDigimon = document.querySelector('#txtNombreDigimon');
    $.ajax({
        type: "get",
        url: "https://digimon-api.vercel.app/api/digimon/name/" + txtNombreDigimon.value,
        dataType: "json",
        success: function (response) {
            console.log(response);
            buscarDigimon(response);
        }
    });
    txtNombreDigimon.value = '';
})  

function buscarDigimon(digimon) {
    if (ventanaEmergenteActual) {
        ventanaEmergenteActual.remove();
    }

    var ventana = document.createElement('div');
    ventana.classList.add('ventana-emergente');
    console.log(digimon[0].name);
    console.log(digimon[0].img);
    console.log(digimon[0].level);

    var nombre = document.createElement('h2');
    nombre.innerHTML = digimon[0].name;
    var imagen = document.createElement('img');
    imagen.setAttribute('src', digimon[0].img);
    var nivel = document.createElement('p');
    nivel.innerHTML = 'Nivel: ' + digimon[0].level;

    var botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.addEventListener('click', function () {
        ventanaEmergenteActual.remove();
    })

    ventana.append(nombre, imagen, nivel, botonCerrar);
    ventanaEmergenteActual = ventana;
    document.body.append(ventana);

    ventana.style.display = 'block';
    ventana.style.width = '32%';
    ventana.style.textAlign = 'center';
    ventana.style.border = '2px solid black'
}