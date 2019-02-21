let canvas;
let ctx;
let FPS = 50;

let anchoF = 50;
let altoF = 50;

let muro = '#044f14'
let puerta = '#3a1700';
let tierra = '#c6892f';
let llave = '#c6bc00';

let escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,2,2,0,0,0,2,2,2,2,2,2,2,0],
    [0,0,2,2,2,2,0,2,0,2,2,0,0,2,0],
    [0,0,0,0,0,2,0,2,0,0,2,0,0,2,0],
    [0,0,2,2,2,2,0,2,0,0,2,0,0,2,0],
    [2,0,2,0,0,2,2,2,0,0,2,2,0,2,0],
    [2,2,2,2,0,0,0,2,2,0,2,0,0,2,0],
    [0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,3,2,0,0,0,0,2,0,0,0,1,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function dibujaEscenario(){
    let color;

    for(y=0;y < escenario.length ;y++){
        for(x=0;x < escenario[0].length;x++){
            if(escenario[y][x] == 0) color = muro;
            if(escenario[y][x] == 1) color = puerta;
            if(escenario[y][x] == 2) color = tierra;
            if(escenario[y][x] == 3) color = llave;

            ctx.fillStyle = color;
            ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);
        }
    }
}

//Objeto jugador
let jugador = function(){
    this.x = 7;
    this.y = 8;
    this.color = '#820c01';
    this.llave = false;

    this.dibuja = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);
    }

    this.margenes = function(x,y){
        let colision = false;
        if(escenario[y][x] == 0){
            colision = true;
        }
        return(colision);
    }

    this.abajo = function(){
        if(this.margenes(this.x,this.y+1)==false) this.y++;
        this.logicaObjetos();
    }
    this.arriba = function(){
        if(this.margenes(this.x,this.y-1)==false) this.y--;
        this.logicaObjetos();
    }
    this.izquierda = function(){
        if(this.margenes(this.x-1,this.y)==false) this.x--;
        this.logicaObjetos();
    }
    this.derecha = function(){
        if(this.margenes(this.x+1,this.y)==false) this.x++;
        this.logicaObjetos();
    }

    this.victoria = function(){
        console.log('Has ganado!!');
        this.x = 7;
        this.y = 8;
        this.llave = false;
        escenario[8][1] = 3;

    }

    this.logicaObjetos = function(){
        let objeto = escenario[this.y][this.x];
        //Obtiene llave
        if(objeto == 3){
            this.llave = true;
            escenario[this.y][this.x] = 2;
            console.log('Has obtenido la llave!!');

        }

        if(objeto == 1){
            if(this.llave == true){
                this.victoria();
            }else{
                console.log('La puerta esta cerrada');
            }
        }

    }
}

let protagonista;




function iniciar(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //Crear juagador
    protagonista = new jugador();

    //Lectura de teclado
    document.addEventListener('keydown',function(tecla){
        if(tecla.keyCode == 38){
            protagonista.arriba();
        }
        if(tecla.keyCode == 40){
            protagonista.abajo();
        }
        if(tecla.keyCode == 37){
            protagonista.izquierda();
        }
        if(tecla.keyCode == 39){
            protagonista.derecha();
        }
    });


    setInterval(function(){
        principal();

    },1000/FPS);

}

function borraCanvas(){
    canvas.widht = 750;
    canvas.height = 500;
}

function principal(){
    borraCanvas();
    dibujaEscenario();
    protagonista.dibuja();
}