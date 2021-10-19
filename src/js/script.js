
document.getElementById("send").addEventListener("click", function() {
    enviarMsg();
});

const teclado = document.getElementsByClassName("teclado")[0].addEventListener("click", function() {
    imprimirTecla(teclado);
});

function imprimirTecla(teclado) {
    //document.getElementById("a").value;
    document.getElementById("textarea").innerHTML += teclado;
}

function enviarMsg() {
    let mensaje = document.getElementById("textarea").value;
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(mensaje));
    let divcont = document.getElementsByClassName("msg")[0];
    divcont.appendChild(div);
}
