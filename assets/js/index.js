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

//---------------------------TRAER PRODUCTOS---------------------// 

async function fetchProductos() {
    let traerProductos = await fetch('./assets/js/productos.json')
    return await traerProductos.json()
}


var productos = []

fetchProductos().then(producto => {
    productos = producto
})

//-------------------------IMPRIMIR PRODUCTOS-------------------//

function printBottles(){
    const bottles = document.querySelector('#bottles')
    
    var print = productos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src="${producto.img}">
                <div id="info">
                    <h3>${producto.nombre}</h3>
                    <h4>${producto.precio}</h4>
                    <button>Agregar producto</button>
                </div>
        `
        bottles.appendChild(div)
    })
    
    bottles.innerText += print
    }
    
    printBottles()

// const $bottles = document.querySelector('#bottles'),
// $template = document.getElementById('template-card').content,
// $fragment = document.createDocumentFragment()
// $card = document.querySelector('#card')
// $info = document.querySelector('#info')
// productos

// productos.forEach(el => {
//     $template.querySelector("img").setAttribute('src',el.img)
//     $info.querySelector("h3").textContent = el.nombre
//     $info.querySelector("h4").textContent = el.precio
//     $info.querySelector("button").textContent = "Agregar articulo"

//     let $clone = document.importNode($template, true)
//     $fragment.appendChild($clone)
// });

// $bottles.appendChild($fragment)


// const bottles = document.querySelector('#bottles')
// const print = productos.forEach(el => {
//     `
//     <div class="col-sm" id="card">
//     <img src="${el.img}">
//     <div id="info">
//         <h3>${el.nombre}</h3>
//         <h4>${el.precio}</h4>
//         <button>Agreagr articulo</button>
// </div>
// </div>
// `
// }).appendChild(bottles)

// bottles.innerHTML = print
