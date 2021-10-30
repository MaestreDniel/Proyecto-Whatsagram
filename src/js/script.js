/**
 * @author: Daniel Maestre Hermoso
 * Fecha inicio: 14/10/2021
 * Fecha fin: 29/10/2021
 * Asignatura: Entorno Cliente y Diseño de Interfaces
 * @version: 1.0
 */

// TODO: Redactar el README (OK), allí se explican bien todos los requisitos logrados

// TODO: Que funcione para cada tecla individualmente (OK)

let tecla = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ",
    "z", "x", "c", "v", "b", "n", "m",
    "comma", "space", "dot"
];

let teclaMayus = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ",
    "Z", "X", "C", "V", "B", "N", "M"
]

for (let i = 0; i < tecla.length; i++) {
    document.getElementById(tecla[i]).addEventListener("click", function () {
        imprimirTecla(tecla[i]);
    });
}

/**
 * Esta función recoge la letra que corresponde a cada tecla de la keyboard area para ir añadiendo las teclas
 * a la textarea. Se basa en las id que están asignadas en el html a cada botón, que los paso por parámetro
 * @param {string} tecla 
 */

function imprimirTecla(tecla) {
    let teclado = document.getElementById(tecla);
    // document.getElementById("textarea").innerHTML += teclado.innerHTML; 
    // Con la línea de arriba hay un bug que hace que deje de funcionar si escribo en el teclado real
    if (tecla != "space") {
        document.getElementById("textarea").value += teclado.textContent;
    } else {
        document.getElementById("textarea").value += " ";
        // TODO: Arregla un problema de detección del espacio en la tecla CE. (OK)
        // El espacio de la keyboard area es un &nbsp porque de lo contrario se descuadra en el css
    }
    if (valor === 1) {
        valor--;
        minusMayus();
    }
}

let i = 0;

/**
 * Va creando dinámicamente los mensajes que se envian y además añade la hora actual al lado
 * y en pequeño con ayuda de las reglas css. Cada mensaje es un div que dentro contiene otro div con la
 * hora de envío y todo está en el contenedor section global de los mensajes, que su clase se llama "msg".
 */

function crearDiv() {
    let mensaje = document.getElementById("textarea").value;
    let div = document.createElement("div");
    div.classList.add('msgbody');
    div.appendChild(document.createTextNode(mensaje));
    document.getElementsByClassName("msg")[0].appendChild(div);
}

/**
 * Recoge el contenido de textarea y pone cada elemento del mensaje en su sitio. Esta función se apoya de
 * muchas otras para el funcionamiento correcto de esta aplicación.
 */

function enviarMsg() { // TODO: Que se impriman los mensajes escritos desde el teclado a la msgarea (OK)
    // El string mide 2, si solo mide 1, le añade el 0
    let actual = new Date();
    let horas = actual.getHours() + ":" + String(actual.getMinutes()).padStart(2, "0");
    crearDiv();
    let horasend = document.createElement("div");
    horasend.classList.add('hour');
    horasend.appendChild(document.createTextNode(horas));
    document.getElementsByClassName("msgbody")[i].appendChild(horasend);
    i++;
    document.getElementById("textarea").value = "";
    valor = 1;
    minusMayus();
    updateScroll();
}

document.getElementById("send").addEventListener("click", function () {
    enviarMsg();
});

/**
 * Fija la fecha actual en la parte superior de la pantalla
 */

function imprimeFechaActual() { // TODO: Colocar la fecha actual (OK)
    let fecha = new Date();
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let diames = `${fecha.getDate()} de ${meses[fecha.getMonth()]}`;
    let div = document.createElement("div");
    div.classList.add('fechahoy');
    div.appendChild(document.createTextNode(diames));
    document.getElementsByClassName("msg")[0].appendChild(div);
}

imprimeFechaActual();

// TODO: Las teclas especiales: C, CE, DELETE (los dos tipos), etc. (OK)
function teclaC() { // Lo único que hace es borrar todo el contenido de textarea al pulsar esta tecla
    document.getElementById("textarea").value = "";
}

document.getElementById("Cdel").addEventListener("click", function () {
    teclaC();
});

function teclaCE() {
    let textarea = document.getElementById("textarea").value;
    //textarea -= textarea.lastIndexOf(" ", textarea.length);
    //textarea.trim();
    let sequeda = textarea.slice(textarea[0], textarea.lastIndexOf(" ", textarea.length));
    /* if (textarea.lastIndexOf(" ", textarea.length)) {
        sequeda = textarea.slice(textarea[0], textarea.lastIndexOf(" ", textarea.length));
    } else {
        sequeda = "";
    } */
    document.getElementById("textarea").value = sequeda;
}

document.getElementById("CEdel").addEventListener("click", function () {
    teclaCE();
});

function teclaDel() { // Es la tecla borrar tradicional
    let textarea = document.getElementById("textarea").value;
    document.getElementById("textarea").value = textarea.slice(0, -1);
}

document.getElementById("del").addEventListener("click", function () {
    teclaDel();
});

function teclaDelReverse() { // La tecla borrar, pero al revés
    let textarea = document.getElementById("textarea").value;
    document.getElementById("textarea").value = textarea.slice(1);
}

document.getElementById("delreverse").addEventListener("click", function () {
    teclaDelReverse();
});

function saltoLinea() {
    // TODO: No he llegado a arreglarlo bien.
    let salto = "\n";
    document.getElementById("textarea").value += salto;
}

document.getElementById("line").addEventListener("click", function () {
    saltoLinea();
});

let shiftmayus = ["&#8593", "&#8657", "&#8679"];
let valor = 1;

/**
 * Inicialmente declaro un valor que es igual a 1. Cuando estoy en el caso 0, el teclado se pone
 * permanentemente en minúsculas. El 1 escribe la primera letra en mayúscula, y default hace que 
 * las mayúsculas sean permanentes. En la práctica, el valor llega hasta 2 y luego baja otra vez
 * a 0 o 1. Voy llamando a esta función y alterando la variable "valor" según sea necesario.
 */

function minusMayus() {
    switch (valor) {
        case 0:
            document.getElementById("mayus").innerHTML = shiftmayus[0]; // Cambia la tecla mayus
            for (let i = 0; i < tecla.length - 3; i++) {
                document.getElementById(tecla[i]).innerHTML = tecla[i];
                // Cambia todo el teclado, excepto la coma, el espacio y el punto
            }
            break;

        case 1:
            document.getElementById("mayus").innerHTML = shiftmayus[1];
            for (let i = 0; i < teclaMayus.length; i++) {
                document.getElementById(tecla[i]).innerHTML = teclaMayus[i];
            }
            break;

        default:
            document.getElementById("mayus").innerHTML = shiftmayus[2];
            for (let i = 0; i < teclaMayus.length; i++) {
                document.getElementById(tecla[i]).innerHTML = teclaMayus[i];
            }
            break;
    }
}

document.getElementById("mayus").addEventListener("click", function () { // Añado el evento en la tecla mayus
    if (valor < 2) {
        valor++;
        minusMayus();
    } else {
        valor = 0;
        minusMayus();
    }
});

let emojis = ["laughing", "sad", "scared", "angry", "hearteyes", "evil",
    "beer", "biceps", "guitar", "redheart", "surprised", "goldmedal",
    "chartincrease", "mobile", "partypopper", "fire", "thumbsup", "waving"
]

function emojiMenu() { // TODO: Muestra el panel de los emojis (OK)
    let panel = document.getElementsByClassName("emojiboard")[0];
    panel.classList.toggle("emojiactive");
}

document.getElementById("emojigif").addEventListener("click", function () {
    emojiMenu();
    botonTeclEmoji();
});

document.getElementById("tecladobotoff").addEventListener("click", function () {
    emojiMenu();
    botonTeclEmoji();
});

for (let i = 0; i < emojis.length; i++) {
    document.getElementById(emojis[i]).addEventListener("click", function () {
        //imprimirTecla(tecla[i]);
        imprimirEmoji(emojis[i]);
    })
}

/**
 * Trato a los emojis de manera análoga a los caracteres normales del teclado, los voy recogiendo
 * según la id que tienen asignada
 * @param {string} emojis 
 */

function imprimirEmoji(emojis) {
    let emojisss = document.getElementById(emojis);
    document.getElementById("textarea").value += emojisss.textContent;
}

function botonTeclEmoji() { // TODO: Cambia la imagen del emoji por el teclado (OK)
    let botonemoji = document.getElementById("emojigif");
    let botontecla = document.getElementById("tecladobotoff");
    botonemoji.classList.toggle("emojioff");
    botontecla.classList.toggle("tecladoboton");
}

/**
 * Cuando el contenedor de los mensajes está lleno, se hace scroll automáticamente 
 * hasta el fondo cada vez que se envía un mensaje, ya que esta función se llama
 * por cada mensaje enviado.
 */

function updateScroll() { // TODO: Scroll correcto
    let chat = document.getElementsByClassName("msg")[0];
    chat.scrollTop = chat.scrollHeight;
}

function temaOscuro() { // TODO: Esto es un extra. Activa o desactiva el tema oscuro
    let body = document.body;
    body.classList.toggle("darktheme");
}

document.getElementById("dark").addEventListener("click", function () {
    temaOscuro();
});