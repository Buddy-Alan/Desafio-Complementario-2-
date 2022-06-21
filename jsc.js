let ingresarDinero = 0
let billeteraVirtual = 0
let opciones
let selecOpcion = 0
let tipoTarjeta = 0
const changuito = []


//Clase para crear Productos
class Producto {
    constructor(articulo) {
        this.tipo = articulo.tipo;
        this.id = articulo.id;
        this.nombre = articulo.nombre;
        this.precio = articulo.precio;
        this.imagen = articulo.imagen
    }
    sumaIva() {
        this.precio = Math.round(this.precio * 1.21);
    }
}

//Clase para crear Changuito
class ProductosEnCanasta {
    constructor(articulo) {
        this.tipo = articulo.tipo;
        this.id = articulo.id;
        this.nombre = articulo.nombre;
        this.precio = articulo.precio;
        this.imagen = articulo.imagen
        this.cantidad = 1;
    }
    cambiarCantidad(accion) {
        switch (accion) {
            case `sumar`:
                this.cantidad += 1;
                break;
            case `restar`:
                if (this.cantidad > 1) {
                    this.cantidad -= 1;
                } else {
                    const indexProducto = changuito.findIndex(indexElemento => indexElemento.id == this.id);
                    changuito.splice(indexProducto, 1);
                }
                break;
        }
    }
}

//Funcion para sumar todos los productos del changuito.

const totalChanguito = () => {
    totalAPagar = changuito.reduce((total, elemento) => total + (elemento.precio * elemento.cantidad), 0);
    return (totalAPagar);
}


// Array de Objetos
let productosSinAlcohol = [
    new Producto({ tipo: "SA", id: 1, nombre: "Sprite 2,25 Lts", precio: 300, imagen: `./imagenes/Sprite 2,25 Lts.jpg` }),
    new Producto({ tipo: "SA", id: 2, nombre: "Coca 2,25 Lts", precio: 350, imagen: `./imagenes/Coca 2,25 Lts.jpg` })
];

// Array de Objetos
let productosConAlcohol = [
    new Producto({ tipo: "CA", id: 1, nombre: "Fernet 750cc", precio: 915, imagen: `./imagenes/Fernet 750cc.jpg` }),
    new Producto({ tipo: "CA", id: 2, nombre: "Gancia 950ml", precio: 495, imagen: `./imagenes/Gancia 950ml.jpg` })
];

// Array para Sumar unir los arrays
let misProductos = [];

// Array Concatenado entre productos con y sin alcohol
misProductos = productosSinAlcohol.concat(productosConAlcohol);
console.log(misProductos)
    // for Of para aplicar la suma de iva.
for (const productos of misProductos) {
    productos.sumaIva();
}

// Funcion para simular click en un producto.
const clickSobreProducto = () => {
    let consutlarTipo = prompt(` Los tipos son: 
                                - SA de Sin Alcohol.
                                - CA  de Con Alcohol. 
                                Escribe tipo de Producto por favor: `);
    consutlarTipo = consutlarTipo.toUpperCase();
    let consultarId = Number(prompt(`Ingrese ID: `));
    const productoABuscar = misProductos.findIndex(elemen => elemen.tipo === consutlarTipo && elemen.id === consultarId);
    changuito.push(new ProductosEnCanasta(misProductos[productoABuscar]))
}

// Funcion para recargar saldo
const recargarSaldo = () => {
    do {
        ingresarDinero = Number(prompt("Ingrese su dinero: "))
        if (ingresarDinero !== Number(ingresarDinero)) {
            alert("Ingrese unicamente numeros");
        }
    }

    while (ingresarDinero !== Number(ingresarDinero))

    billeteraVirtual = billeteraVirtual + ingresarDinero;
}


// Funcion para selecionar medio de pago.
const medioDePago = () => {
    for (let i = 0; i < 1; i++) {
        tipoTarjeta = Number(prompt(`Seleccione el medio de pago a utilizar:
        1- Tarjeta de Debito
        2- Tarjeta de Credito
        3- Volver a pagina Anterior`));

        switch (tipoTarjeta) {
            case 1:
                alert("Seleccionaste el medio de pago tarjeta de Debito.");
                recargarSaldo();
                break;
            case 2:
                alert("Seleccionaste el medio de pago tarjeta de Credito.");
                recargarSaldo();
                break;
            case 3:
                alert("Volviendo a pagina anterior")
                break;
            default:
                alert("Por favor ingrese un dato de los anteriormente esablecidos")
                i--
        }
    }
}

// Funcion para ver si alcanza el saldo para comprar productos o changuito completo.
const verSiAlcanzaSaldo = (dinero, producto) => {
    if (dinero >= producto) {
        dinero = dinero - producto;
        alert(`¡Usted Compro el producto seleccionado!`)
        return (dinero);
    } else {
        alert("Su dinero no alcanza para la compra");
        return (dinero);
    }
}


// Funcion para ver productos.
const productos = () => {
    opciones = Number(prompt(`
    1- ${misProductos[0].nombre} a $${misProductos[0].precio}
    2- ${misProductos[1].nombre} a $${misProductos[1].precio}
    3- ${misProductos[2].nombre} a $${misProductos[2].precio}
    4- ${misProductos[3].nombre} a $${misProductos[3].precio}
    5- Volver a Atras
    `))
    switch (opciones) {
        case 1:
            {
                billeteraVirtual = verSiAlcanzaSaldo(billeteraVirtual, misProductos[0].precio);
                break;
            }
        case 2:
            {
                billeteraVirtual = verSiAlcanzaSaldo(billeteraVirtual, misProductos[1].precio);
                break;
            }
        case 3:
            {
                billeteraVirtual = verSiAlcanzaSaldo(billeteraVirtual, misProductos[2].precio);
                break;
            }
        case 4:
            {
                billeteraVirtual = verSiAlcanzaSaldo(billeteraVirtual, misProductos[3].precio);
                break;
            }
        case 5:
            {
                alert("Volviendo a Pagina Anterior")
                break;
            }
        default:
            {
                alert("Por favor selecione un numero de los establecidos");
                break;
            }
    }
}

// funcion para navegar en el menu de changuito
const menuChanguito = () => {
    do {
        selecOpcion = Number(prompt(`¡Estas en el Menu de Changuito!
    -1 Simular Filtrar Productos, clickear productos, y  Agregar a Canasta.
    -2 Saber Que hay en Changuito
    -3 Sumar 1 a los productos en changuito.
    -4 Restar 1 a los productos del changuito.
    -5 Pagar todos los productos del changuito:
    -6 Volver al Menu Principal.
 `))

        switch (selecOpcion) {
            case 1:
                {
                    clickSobreProducto();
                    break;
                }
            case 2:
                {
                    console.log(changuito);
                    break;
                }

            case 3:
                {
                    changuito.forEach(sumarProducto => {
                        sumarProducto.cambiarCantidad(`sumar`);
                    })
                    break;
                }
            case 4:
                {
                    changuito.forEach(restarProductos => {
                        restarProductos.cambiarCantidad(`restar`);
                    })
                    break;
                }
            case 5:
                {
                    billeteraVirtual = verSiAlcanzaSaldo(billeteraVirtual, totalChanguito());
                    break;
                }
            case 6:
                alert(`Volviendo al Menu Principal`)
                break;
            default:
                {
                    alert("Por favor selecione un numero de los establecidos")
                    break
                }
        }
    }

    while (selecOpcion != 6);

}

//Menu principal
do {
    selecOpcion = Number(prompt(`¡Bienvenido a la tienda online de bebidas!
Su Dinero Actual es: ${billeteraVirtual}
    -1 Ver lista de productos por precio, y comprar por unidad.
    -2 Entrar al Menu de Changuito.
    -3 Recargar Saldo
    -4 Salir
 `))


    switch (selecOpcion) {
        case 1:
            {
                productos();
                break;
            }
        case 2:
            {
                menuChanguito();
                break;
            }
        case 3:
            {
                medioDePago();
                break;
            }
        case 4:
            {
                alert(`Muchas gracias por confiar en nosotros, ¡vuelva pronto!
                Su saldo sobrante es de: ${billeteraVirtual}
                `)
                break;
            }
        default:
            {
                alert("Por favor selecione un numero de los establecidos")
                break
            }
    }
}

while (selecOpcion != 4);






const titulo = document.getElementById(`titulo`);
titulo.innerHTML = ` <h3>Bienvenido a nuestra tienda de Bebidas ! 
Su saldo Actual es : $ ${billeteraVirtual}</h3>`

const catalogoProductos = document.getElementsByClassName(`catalogoProductos`);

const tagDiv = document.getElementsByTagName(`div`)


console.log("vamos a trabajar con Querry Selector")
    // let elementosPorQuerry = document.querySelector();
let elementosPorQuerryId = document.querySelector(`#titulo`) // se accede como en css
let elementosPorQuerryClase = document.querySelector(`.catalogoProductos`);
let todosElementosPorQuerryClase = document.querySelectorAll(`.catalogoProductos`); // Con ALL busca todo los items 
let titulosProductos = document.querySelectorAll(`.catalogoProductos`)



let productoPrecio = document.querySelectorAll(`.catalogoProductosPrecio`)
let productoNombre = document.querySelectorAll(`.catalogoProductosTitulo`)
let productoImagen = document.querySelectorAll(`.catalogoProductosImg`)
let catalogoDeProductos = document.getElementById(`catalogo`)

let changuitoConProductos = document.getElementsByClassName(`changuitoDescripcionProducto`)

let canastaDeCompras = document.getElementById(`canasta`);

//Insera los elementos del changuito  por prompt
for (const changuitoDeCompras of changuito) {
    const etiquetaChango = document.createElement(`div`);
    etiquetaChango.className = `productosDelChanguito`
    etiquetaChango.innerHTML = `
    <img src="${changuitoDeCompras.imagen}" alt="${changuitoDeCompras.nombre}" height="250" width="250" class="changuitoProductoImagen">
    <div class="changuitoDescripcionProducto">
    <h1>Producto: ${changuitoDeCompras.nombre}</h1>
    <p>Precio por Unidad: ${changuitoDeCompras.precio}</p>
    <p>Cantidad agregada: ${changuitoDeCompras.cantidad} </p>
    </div> `

    canastaDeCompras.append(etiquetaChango);
}

const verTodo = document.getElementById(`verProductos`);
const verProduSA = document.getElementById(`verProductosSA`);
const verProduCA = document.getElementById(`verProductosCA`);

//Click a los botones de los productos
verTodo.addEventListener(`click`, (e) => {
    e.preventDefault();
    verTodoElCatalogo(misProductos)
});
verProduCA.addEventListener(`click`, (e) => {
    e.preventDefault();
    verTodoElCatalogo(productosConAlcohol)
});
verProduSA.onclick = (e) => {
    e.preventDefault();
    verTodoElCatalogo(productosSinAlcohol)
};


const verTodoElCatalogo = (productos) => {
    const listaProductosYaPasados = document.querySelectorAll(`.catalogoProductos`)
    for (const productosAnteriores of listaProductosYaPasados) {
        productosAnteriores.remove();
    }
    for (const catalogo of productos) {
        const etiqueta = document.createElement(`div`);
        etiqueta.className = `catalogoProductos`
        etiqueta.innerHTML = `
    <a href=""><img src="${catalogo.imagen}" alt="${catalogo.nombre}" height="250" width="250" class="catalogoProductosImg"> </a>
    <div class="catalogoProductosDescripcion>
    <h1 class="catalogoProductosTitulo"> Producto: ${catalogo.nombre}</h1>
    <p class="catalogoProductosPrecio"> Precio:  $${catalogo.precio} </p>
    </div>
    `
        etiqueta.addEventListener(`click`, (e) => {
            e.preventDefault();
            insertarProductosAChanguito(catalogo)
        })
        catalogoDeProductos.append(etiqueta)
    }
}




//Inputs 

const nombreInput = document.getElementById(`nombre`);
const apellidoInput = document.getElementById(`apellido`);
const respuestaInput = document.getElementById(`respuesta`);
const formularioInput = document.getElementById(`datosPersonales`);

formularioInput.onsubmit = (e) => {
    e.preventDefault();
    respuestaInput.innerHTML = `Bienvenido ${nombreInput.value} ${apellidoInput.value}`
}