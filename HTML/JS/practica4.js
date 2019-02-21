
let canvas;
let ctx;
let FPS = 50;

let imgShit;

function iniciar(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    imgShit = new Image();
    imgShit.src = 'img/shit.png';


    setInterval(function(){
        principal();

    },1000/FPS);

}


let protagonista = function(x,y){
    this.x = x;
    this.y = y;
    this.velocidad = 8;

    this.dibuja = function(){

        ctx.drawImage(imgShit,this.x, this.y);

    }

    this.texto =function(){
        ctx.font = '30px impact';
        ctx.fillStyle = '#555555';
        ctx.fillText('X: ' + this.x, 400, 350);
        
    }

    this.arriba = function(){
        this.y -= this.velocidad;
    }
    this.abajo = function(){
        this.y += this.velocidad;
    }
    this.izquierda = function(){
        this.x -= this.velocidad;
    }
    this.derecha = function(){
        this.x += this.velocidad;
    }
}



let personaje = function(x,y){
    this.x = x;
    this.y = y;
    this.derecha = true;

    this.dibuja = function(){
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x,this.y,50,50);
    }

    
    this.mueve = function(velocidad){
        if(this.derecha){
            if(this.x < 400){
                this.x += velocidad;
            }else{
                this.derecha = false;
            }
        }else{
            if(this.x > 50){
            this.x-= velocidad;
            }else{
                this.derecha = true;

            }

        }
        
    }
}

let per1 = new personaje(10,50);
let per2 = new personaje(10,120);
let per3 = new personaje(10,230);

let prota = new protagonista(100,200);


document.addEventListener('keydown',function(tecla){
    if(tecla.keyCode == 38){
        prota.arriba();
    }
    if(tecla.keyCode == 40){
        prota.abajo();
    }
    if(tecla.keyCode == 37){
        prota.izquierda();
    }
    if(tecla.keyCode == 39){
        prota.derecha();
    }
})




function borraCanvas(){
    canvas.widht = 500;
    canvas.height = 400;
}

function principal(){
    borraCanvas();
    per1.dibuja();
    per2.dibuja();
    per3.dibuja();
    per1.mueve(1);
    per2.mueve(3);
    per3.mueve(12);
    prota.dibuja();
    prota.texto();
    
}

