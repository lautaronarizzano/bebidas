const carro = []

let elementos

let data

//---------VARIABLES SWEET ALERT---------------//
let edad = async function inputEdad() {
    const {
        value: anio
    } = await Swal.fire({
        title: 'Cuantos años tenes?',
        icon: 'question',
        input: 'range',
        inputLabel: 'Tu edad',
        inputAttributes: {
            min: 0,
            max: 100,
            step: 1
        },
        inputValue: 0,

    })
    return anio
}

let anio

//--------VERIFICACION EDAD--------------------//
function inicio() {
    let edadLogueada = localStorage.getItem("edad")

    if (edadLogueada) {
        Swal.fire({
            icon: 'success',
            title: 'Edad verificada',
            text: 'Eres mayor de edad! bienvenido a Mono Galactico',
        })
    } else {
        (async () => {
            const {
                value: anio
            } = await Swal.fire({
                title: 'Cuantos años tenes?',
                icon: 'question',
                input: 'range',
                inputLabel: 'Tu edad',
                inputAttributes: {
                    min: 0,
                    max: 100,
                    step: 1
                },
                inputValue: 0,

            })

            if (anio >= 18) {
                Swal.fire({
                    icon: 'success',
                    title: 'Edad verificada',
                    text: 'Eres mayor de edad! bienvenido a Mono Galactico',
                })
                const edadAJson = JSON.stringify(anio)
                localStorage.setItem("edad", edadAJson)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Eres menor de edad',
                })
            }

        })()
    }
}
inicio()


//-------------------------TRAERPRODUCTOS Y IMPRIMIR PRODUCTOS-------------------//
const contenedor = document.querySelector('#contenedor')
const bottles = document.querySelector('#bottles')
const master = document.querySelector('master')
const agregar = document.querySelector('#agregar')
//-----------------------------------------------------//
const select = document.querySelector('#select')
const cantidad = document.querySelector('#cantidad')
const inputPrecio = document.querySelector('#precio')
const subtotal = document.querySelector('#subtotal')



async function printBottles() {
    traerProductos = await fetch("./assets/js/productos.json");
    let data = await traerProductos.json();
    let productos = data;
    elementos = productos


    await productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div id="bottles">
        <img src="${producto.img}">
                <div id="info">
                    <h3>${producto.nombre}</h3>
                    <h4>${producto.precio}</h4>
                    <input type="button" class="agregar" id="agregar${producto.id}" value="Agregar producto">
                </div>
        <div>
        `;
        bottles.appendChild(div);
    });



}



// hacerPedido()

printBottles()


//--------------------HACER PEDIDO----------------------//
// function hacerPedido() {
//     const master = document.querySelector('#master')
//     const div1 = document.createElement('div')
//     div1.classList.add('customer')

//     div1.innerHTML = `
// <h2>HAGA SU PEDIDO</h2>
//                 <form action="">
//                     <div>
//                         <p>Seleccione su Brebaje</p>
//                         <select id="select">
//                         <option value="0">Gin Bombay Sapphire 750 cc</option>
//                         <option value="1">Ron Malibu 750 cc</option>
//                         <option value="2">Bailey's Original Cream 735 cc</option>
//                         <option value="3">Aperol 750 cc</option>
//                         <option value="4">Fernet Branca 750 cc</option>
//                         <option value="5">Whisky Jonnie Walker Black label 700 cc</option>
//                         <option value="6">Vodka Smirnoff 700 cc</option>
//                         <option value="7">Vodka Absolut Original 1400 cc</option>
//                         </select>
//                     </div>
//                     <div>
//                         <p>Cantidad</p>
//                         <input type="number" id="cantidad">
//                     </div>
//                     <div>
//                         <p>Precio</p>
//                         <input type="number" disabled id="precio" >
//                     </div>
//                     <div>
//                         <p>Subtotal</p>
//                         <input type="number" disabled id="subtotal">
//                     </div>
//                     <button>AGREGAR</button>
//                 </form>
// `
//     master.appendChild(div1)



// }


function carrito() {
    const div2 = document.createElement('div')
    div2.classList.add('carrito')
    div2.innerHTML = `
<table class="table table-dark">
<thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Producto</th>
    <th scope="col">Precio</th>
    <th scope="col">Subtotal</th>
    </tr>
</thead>

`
}