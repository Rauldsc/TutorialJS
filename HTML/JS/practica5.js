

//Sesion 18

function iniciar(){

}

let mochila = [];

mochila.push('A');
mochila.push('B');
mochila.push('C');
mochila.push('D');
mochila.push('E');

function muestraInventario(){
    for(a = 0; a < mochila.length;a++){
        console.log(a + '-' +  mochila[a]);
    }
}
function vender(){
    mochila.splice(2,1);
    muestraInventario();
}



/*
for(a=0; a<mochila.length;a++){
    console.log(mochila[a]);
}*/

