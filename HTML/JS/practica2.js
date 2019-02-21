
//Sesion 8

function compra(objeto){
    switch(objeto){
        case 1:
            console.log('Has comprado una pocion');
        break;

        case 2:
            console.log('Has comprado magia');
        break;

        case 3:
            console.log('Has comprado una espada');
        break;
        case 4:
            console.log('Has comprado un arco');
        break;
        case 5:
            console.log('Has comprado flechas');
        break;
    }
}

//Sesion 9

function tablas(){
    for(tabla = 1; tabla < 10; tabla ++){
        console.log('Tabla del: ' + tabla);
        for(multiplicador = 1; multiplicador < 11; multiplicador++){
            console.log(tabla + ' x ' + multiplicador + ' = ' + tabla*multiplicador);
        }

    }
}


//Sesion 10

var numeroCPU = Math.floor(Math.random()*10 + 1);
var numeroUsuario;


do{


numeroUsuario= parseInt(prompt('Adivina el numero que he pensado (1-10)'));
if(numeroCPU == numeroUsuario){
    console.log('Has acertado');

}else{
    if(numeroCPU < numeroUsuario){
        alert('El numero es mas pequeño');
    }else{
        alert('El numero es mayor')
    }

    
    console.log('Has fallado');
}

}while(numeroCPU != numeroUsuario);