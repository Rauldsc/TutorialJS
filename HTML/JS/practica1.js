var turno = 1;
var vida = 100;

//Estados Jugador

var vivo = true;
var envenenado = false;
var quemado = false;
var muerto = false;

//Jugadas CPU

var atacar = 0;
var quemar = 1;
var envenenar = 2;
var fallar = 3;

//Items

var pocion = 0;
var colaFenix = 1;
var pocionQuemaduras = 2;
var pocionVeneno = 3;


function muestraEstadoJugador(){
    console.log('Vida: ' + vida);
    if(envenenado == true){
    console.log('Envenenado');
    }
    if(quemado == true){
    console.log('Quemado');
    }
}

function usarItem(objeto){
    if(objeto == pocion){
        vida += 30;
    }
    if(objeto == colaFenix && vivo == false){
        vivo = true;
        vida = 30;
    }
    if(objeto == pocionQuemaduras && quemado == true){
        quemado = false;
    }
    if(objeto == pocionVeneno && envenenado == true){
       envenenado = false ;
    }
    muestraEstadoJugador();

}

function JuegaTurno(){
    var jugadaCPU = Math.floor(Math.random()* 4); 
if(vida > 0){
    console.log(jugadaCPU);

    if(jugadaCPU == atacar){
        vida -= 10;
        console.log('He atacado al jugador');
    }
    if(jugadaCPU == quemar){
        quemado = true;
        console.log('He quemado al jugador');
    }
    if(jugadaCPU == envenenar){
        envenenado = true;
        console.log('He envenenado al jugador');
    }
    if(jugadaCPU == fallar){
        console.log('He fallado');
    }
    muestraEstadoJugador();
}else{
    muerto = true;
    console.log('Has muerto');
}
}