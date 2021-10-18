console.log("Estructura de proyecto");

function hola() {
    // document.getElementById("hola").innerHTML = "Hola";
}

function imprimirTecla(valor) {
    document.getElementById("").innerHTML += valor;
}

document.getElementsByClassName("a").onclick = function() {
    imprimirTecla(this.class); 
    // O si no puedo, hacerlo con las id y getElmById, y también se puede poner directamente 
    // la letra pero el nivel de abstracción es menor
}

document.getElementsByClassName("b").onclick = function() {
    imprimirTecla(this.class); // O si no puedo, hacerlo con las id
}