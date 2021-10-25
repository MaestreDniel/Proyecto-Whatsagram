/**
 * @author: Daniel Maestre Hermoso
 * Fecha inicio: 14/10/2021
 * Fecha fin: 
 * Asignatura: Entorno Cliente y Diseño de Interfaces
 * @version: 0.8
 */

/**
 * TODO: Que funcione para cada tecla individualmente OK
 */


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

function imprimirTecla(tecla) {
    let teclado = document.getElementById(tecla);
    // document.getElementById("textarea").innerHTML += teclado.innerHTML; 
    // Con la línea de arriba hay un bug que hace que deje de funcionar si escribo en el teclado real
    document.getElementById("textarea").value += teclado.textContent;
    if (valor === 1) {
        valor--;
        minusMayus();
    }
    envioBlock();
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

function enviarMsg() {
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
    valor = 1
    minusMayus();
    envioBlock();
    updateScroll();
}

document.getElementById("send").addEventListener("click", function () {
    enviarMsg();
});

function imprimeFechaActual() {
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

function envioBlock() {
    if (document.getElementById("textarea").value == "") {
        document.getElementsByClassName("switchsend")[0].setAttribute("id", "sendblocked");
    } else if (document.getElementById("textarea").value !== "") {
        document.getElementsByClassName("switchsend")[0].setAttribute("id", "sendallowed");
    }
}

function teclaC() {
    document.getElementById("textarea").value = "";
    envioBlock();
}

document.getElementById("Cdel").addEventListener("click", function () {
    teclaC();
});

function teclaCE() {
    let textarea = document.getElementById("textarea").value;
    //textarea -= textarea.lastIndexOf(" ", textarea.length);
    let sequeda = textarea.slice(textarea[0], textarea.lastIndexOf(" ", textarea.length));
    // Esto usa non breaking space (&nbsp), es distinto al espacio que usamos directamente en el teclado físico
    document.getElementById("textarea").value = sequeda;
    envioBlock();
}

document.getElementById("CEdel").addEventListener("click", function () {
    teclaCE();
});

function teclaDel() {
    let textarea = document.getElementById("textarea").value;
    document.getElementById("textarea").value = textarea.slice(0, -1);
    envioBlock();
}

document.getElementById("del").addEventListener("click", function () {
    teclaDel();
});

function teclaDelReverse() {
    let textarea = document.getElementById("textarea").value;
    document.getElementById("textarea").value = textarea.slice(1);
    envioBlock();
}

document.getElementById("delreverse").addEventListener("click", function () {
    teclaDelReverse();
});

function saltoLinea() {
    // TODO: Arreglarlo bien
    let salto = "\n";
    document.getElementById("textarea").value += salto;
}

document.getElementById("line").addEventListener("click", function () {
    saltoLinea();
});

let shiftmayus = ["&#8593", "&#8657", "&#8679"];
let valor = 1;

function minusMayus() {
    switch (valor) {
        case 0:
            document.getElementById("mayus").innerHTML = shiftmayus[0]; // Cambia la tecla mayus
            for (let i = 0; i < tecla.length - 3; i++) {
                document.getElementById(tecla[i]).innerHTML = tecla[i]; // Cambia todo el teclado
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

document.getElementById("mayus").addEventListener("click", function () {
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

let showemojis = false;

function emojiMenu() {
    if (showemojis === false) {
        document.getElementsByClassName("emojiboard")[0].setAttribute("id", "emojiactive");
        showemojis = true;
    } else if (showemojis === true) {
        document.getElementsByClassName("emojiboard")[0].setAttribute("id", "ehidden");
        showemojis = false;
    }
}

document.getElementById("emojigif").addEventListener("click", function () {
    emojiMenu();
});

for (let i = 0; i < emojis.length; i++)(
    document.getElementById(emojis[i]).addEventListener("click", function () {
        //imprimirTecla(tecla[i]);
        imprimirEmoji(emojis[i]);
    })
)

function imprimirEmoji(emojis) {
    let emojisss = document.getElementById(emojis);
    document.getElementById("textarea").value += emojisss.textContent;
    envioBlock();
}

/**
 * Cuando el contenedor de los mensajes está lleno, se hace scroll automáticamente 
 * hasta el fondo cada vez que se envía un mensaje, ya que esta función se llama
 * por cada mensaje enviado.
 */ 

function updateScroll() {
    let chat = document.getElementsByClassName("msg")[0];
    chat.scrollTop = chat.scrollHeight;
}