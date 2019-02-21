//SESION 13
/*
let configTeclado = { prevent_repeat : true };

let eventoTeclado = new window.keypress.Listener(this, configTeclado);


function pulsaA(){
    console.log('Has pulsado a');
}

function ataqueEspecial(){
    console.log('ATAQUE ESPECIAAAL');
}



eventoTeclado.simple_combo('a', pulsaA);
eventoTeclado.sequence_combo('up down a b', ataqueEspecial);
*/

/*//SESION 14
let miCanvas;

function inicializar(){
    miCanvas = document.getElementById('canvas');

    miCanvas.addEventListener('mousedown',clickRaton,false);
    miCanvas.addEventListener('mouseup',sueltaRaton,false);
    miCanvas.addEventListener('mousemove',posicionRaton,false);

}

function clickRaton(e){
    console.log('Pulsando raton');
}
function sueltaRaton(e){
    console.log('Soltando raton');
}
function posicionRaton(e){
    let x = e.pageX;
    let y = e.pageY;
    console.log('x: ' + x + ' y: ' + y);
}*/

//SESION 15

let personaje = function(x,y,nombre){
    this.x = x;
    this.y = y;
    this.nombre = nombre;
//Metodo abajo
    this.abajo = function(){
        this.y += 10;
    }
}

let personaje1 = new personaje(10,100,'Frodo');
let personaje2 = new personaje(220,380,'Sam');

personaje1.abajo();