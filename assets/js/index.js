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
// inicio()


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
        div.classList.add(producto.alias);
        div.classList.add("producto")
        div.innerHTML = `
        <a name="brebaje"></a>
        <img src="${producto.img}">
                <div id="divInfo">
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <h4 class="producto-precio">$${producto.precio}</h4>
                </div>
                `;
        bottles.appendChild(div);

        const divInfo = document.querySelector("#divInfo")

        const comprar = document.createElement('button')

        comprar.className = "comprar"

        comprar.className = "agregar"

        comprar.innerText = "comprar"

        div.append(comprar)

        comprar.addEventListener("click", () => {
            carro.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                img: producto.img,
            })
            renderizarCarrito()
        })
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
const tbody = document.querySelector("tbody")

// printCarrito()

function renderizarCarrito() {
    // Vaciamos todo el html
    tbody.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carro)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = elementos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carro.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        let carritoContent = document.createElement("tr")
    carritoContent.className = 'carrito-content'
    carritoContent.innerHTML = `
    <th scope="row">${numeroUnidadesItem}</th>
    <td>${item.nombre}</td>
    <td></td>
    <td>${item.precio}</td>
    <td>${item.precio * cantidad}</td>
    <td id="borrar">🗑</td>
`
tbody.append(carritoContent)
    })
    const borrar = document.querySelector("#borrar")


}
renderizarCarrito()

