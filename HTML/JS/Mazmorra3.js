let canvas;
let ctx;
let FPS = 50;

let anchoF = 50;
let altoF = 50;

let anchoEscenario = 25;
let altoEscenario = 20;

let muro = '#044f14'
let puerta = '#3a1700';
let tierra = '#c6892f';
let llave = '#c6bc00';

let protagonista;

let enemigo = [];

let imagenAntorcha = [];

let tileMap;

let camara = [];
let camara2 = [];

let escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
    [0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,2,2,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0],
    [0,0,2,2,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,0,2,2,0,0,0,0,2,2,2,0,0,0,0,0,0,3,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,2,2,2,2,0,0,0,2,2,0,0,0,0,2,2,2,2,2,2,0,0],
    [0,0,0,0,0,0,0,2,0,0,0,0,2,2,2,2,0,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,2,2,2,0,2,0,0,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,2,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

];

// Objeto Camara

let objCamara = function(x,y,tamX,tamY, posX, posY){

    this.x = x;
    this.y = y;
    this.tamX = tamX;
    this.tamY = tamY;
    this.posX = posX;
    this.posY = posY;

    this.dibuja = function(){

    
    for(y=this.y; y <( this.tamY+ this.y)  ;y++){
        for(x=this.x;x < (this.tamX+this.x) ;x++){
            let tile = escenario[y][x];
            ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*(x- this.x + this.posX),altoF*(y-this.y+this.posY),anchoF,altoF);

        }
    }

    this.arriba = function(){
        if(this.y > 0){
            this.y--;
        }
    }
    this.abajo = function(){
        if(this.y < altoEscenario - this.tamY){
            this.y++;
        }
    }
    this.izquierda = function(){
        if(this.x > 0){
            this.x--;
        }
    }
    this.derecha = function(){
        if(this.x < anchoEscenario- this.tamX){
            this.x++;
        }
    }
}
}


function dibujaEscenario(){
    for(y=0; y < altoEscenario ;y++){
        for(x=0;x < anchoEscenario;x++){
            let tile = escenario[y][x];
            ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);

        }
    }
}

//Objeto antorcha
let antorcha = function(x,y){
    this.x = x;
    this.y = y;

    this.retraso = 10;
    this.contador = 0;
    this.fotograma = 0;

    this.cambiaFotograma = function(){
        if(this.fotograma < 3){
            this.fotograma++;
        }else{
            this.fotograma = 0;
        }
    }
    

    this.dibuja = function(){
        if(this.contador < this.retraso){
            this.contador ++;
        }else{
            this.contador = 0;
            this.cambiaFotograma();
        }    
        ctx.drawImage(tileMap,this.fotograma*32,64,32,32,anchoF*this.x,altoF*this.y,anchoF,altoF);   
    }
}



//Objeto enemigo
let malo = function(x,y){
    this.x = x;
    this.y = y;

    this.retraso = 50;
    this.fotograma = 0;


    this.direccion = Math.floor(Math.random()*4);

    this.dibuja = function(){
        ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }

    this.compruebaColision = function(x,y){
        colisiona = false;
        if(escenario[y][x] == 0) colisiona = true;
        return(colisiona);

    }

    this.mueve = function(){

        protagonista.colisionEnemigo(this.x,this.y);

        if(this.contador < this.retraso){
            this.contador++;
        }else{

        this.contador = 0;

        //Arriba
        if(this.direccion == 0){
            if(this.compruebaColision(this.x,this.y -1)==false){
                this.y--;
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }
        }
        //Abajo
        if(this.direccion == 1){
            if(this.compruebaColision(this.x,this.y + 1)==false){
                this.y++;
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }
        }
        //Izquierda
        if(this.direccion == 2){
            if(this.compruebaColision(this.x-1,this.y)==false){
                this.x--;
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }
        }
        //Derecha 
        if(this.direccion == 3){
            if(this.compruebaColision(this.x+1,this.y)==false){
                this.x++;
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }
        }
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
        ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }

    this.colisionEnemigo = function(x,y){
        if(this.x == x && this.y == y){
            this.derrota();
        }

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
        escenario[5][4] = 3;

    }

    this.derrota = function(){
        console.log('Has muerto');
        this.x = 7;
        this.y = 8;
        this.llave = false;
        escenario[5][4] = 3;
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




function iniciar(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    tileMap = new Image();
    tileMap.src = 'img/tilemap.png'

    camara = new objCamara(2,2,5,5,1,1);
    camara2 = new objCamara(7,9,6,4,7,2);

    //Crear juagador
    protagonista = new jugador();

    //Creamos los enemigos

    enemigo.push(new malo(2,1));
    enemigo.push(new malo(5,8));
    enemigo.push(new malo(13,8));

    //Creamos las antorchas
    imagenAntorcha.push(new antorcha(1,1));
    imagenAntorcha.push(new antorcha(5,9));
    imagenAntorcha.push (new antorcha(11,6));
    //Lectura de teclado
    document.addEventListener('keydown',function(tecla){
        if(tecla.keyCode == 38){
            camara.arriba();
        }
        if(tecla.keyCode == 40){
            camara.abajo();
        }
        if(tecla.keyCode == 37){
            camara.izquierda();
        }
        if(tecla.keyCode == 39){
            camara.derecha();
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
    camara.dibuja();
    camara2.dibuja();
/*for(i=0;i<imagenAntorcha.length;i++){
    imagenAntorcha[i].dibuja();
}
    protagonista.dibuja();
for(c=0;c<enemigo.length;c++){
    enemigo[c].mueve();
    enemigo[c].dibuja();
}*/

}