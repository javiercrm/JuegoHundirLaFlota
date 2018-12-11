//Creamos la Clase tendra la informacion del jugador
function Player(nombre, tipoPlayer) {

    //Nombre del Jugador
    this.nombre = nombre;

    //Barcos a crear al iniciar la partida
    this.detallesBarcos = [
        { "nombre" : "portaaviones", "tamano" : 5 },
        { "nombre" : "submarino", "tamano" : 4 },
        { "nombre" : "destructor", "tamano" : 3 },
        { "nombre" : "crucero", "tamano" : 3 },
        { "nombre" : "fragata", "tamano" : 2 }
    ];

    //Total de barcos de un jugador
    this.numBarcos = this.detallesBarcos.length;

    //Creamos los barcos mediante la clase Barco
    this.enbarcaciones =  [];
    for (let i = 0; i < this.numBarcos; i++) {
        
        this.enbarcaciones[i] = new Barco (this.detallesBarcos[i].nombre, this.detallesBarcos[i].tamano);
        
    }

    //Posicion de los barcos
    this.barcos = [];

    //Coordenadas de los barcos dañados
    this.BarcosDanadosCoordenadas = [[],[],[],[],[]];
    this.actual = 0;

    //Coordenadas de agua
    this.coordenadasAgua = [];

    //Tipo De Jugador Maquina o Humano
    this.tipoPlayer = tipoPlayer;

    //Nuero de ataque del jugador y Maquina
    this.numeroAtaque = 0;

    //Saber el Daño actual que tiene cada barco
    this.tamCincoDanado = 0;
    this.tamCuatroDanado = 0;
    this.tamTresUnoDanado = 0;
    this.tamTresdosDanado = 0;
    this.tamDosDanado = 0;
    this.totalBarcos = 5;

    //Horientacion a la hora de poner los Barcos el jugador
    this.posicion = 1;

    //Informacion de La maquina para su inteligencia artificial
    this.encontrado = false;
    this.ultimaposicionFila = 0;
    this.ultimaposicionColumna = 0;
    this.posicionInicialFila = 0;
    this.posicionInicialColumna = 0;
    this.ultimaPosicion = false;
    this.tamBarcoDanado = 0;
    this.totalDanano = 0;
    this.continuar = false;
    this.orden = [];

}

//Clase Barco
function Barco(nombre, tamano) {

    //Nombre y tamaño de cada barco
    this.nombre = nombre;
    this.tamano = tamano;

}

//Añadimos los barcos al array correspondiente a cada jugador
function anadirBarco(player, inicio, longitud, horientacion){

    var pos = [];

    for (let i = 0; i < 100; i++) {

        if (player.tipoPlayer == "j") {

            pos[i+1] = document.querySelector("#jugador #j"+(i+1));

        } else if (player.tipoPlayer == "m") {

            pos[i+1] = document.querySelector("#maquina #m"+(i+1));

        }
         
    }
     

    var fila = 0;
    var columna = 0;

    if (inicio > 10) {

        fila = parseInt(inicio.toString().substr(0,1))+1;
        columna = parseInt(inicio.toString().substr(1,1));

    } else {

        fila = 1;
        columna = inicio;

    }

    if (columna == 0){

        columna = 10; 
        fila--;
    }

    if (inicio == 100) fila = 10;


    if (comprobarPuedePonerseLimiteCasillas(inicio, longitud, horientacion)){

        if (comprobarPuedePonerseOtrosBarcos(inicio, longitud, horientacion, player)) {

            var aux = inicio;
            for(let i = 1; i <= 10 ; i++){

                if(i == 1){
                    aux = 1;
                } else if (i > 0){
                    aux = i*10+1-10;
                }

                if(horientacion == 0 && i == fila){

                    if((player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) && inicio-1 >= aux) pos[inicio-1].classList.add("noPonerMasBarcos");
                    if((player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) && inicio+longitud < aux+10) pos[inicio+longitud].classList.add("noPonerMasBarcos");

                    for (let j = 0; j < longitud; j++) {

                        if (inicio > 10) {
                            if(player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) pos[inicio-10].classList.add("noPonerMasBarcos");
                        }

                        if (inicio < 91) {
                            if(player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) pos[inicio+10].classList.add("noPonerMasBarcos");
                        }

                        if(player.barcos.length == 0) pos[inicio].classList.add("barcoPosicionadoUno");
                        if(player.barcos.length == 1) pos[inicio].classList.add("barcoPosicionadoDos");
                        if(player.barcos.length == 2) pos[inicio].classList.add("barcoPosicionadoTres");
                        if(player.barcos.length == 3) pos[inicio].classList.add("barcoPosicionadoCuatro");
                        if(player.barcos.length == 4) pos[inicio].classList.add("barcoPosicionadoCinco");
                        if(player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) pos[inicio].classList.add("noPonerMasBarcos");
                        inicio++;
                    }

                } else if (horientacion == 1 && i == fila) {
                    
                    if(aux-10 > 0){

                        if((player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) && inicio-10 >= aux-10) pos[inicio-10].classList.add("noPonerMasBarcos");

                    } 

                    auxExtra = inicio;

                    for (let j = 0; j < longitud; j++) {

                        if (inicio-1 >= aux) {
                            if(player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) pos[inicio-1].classList.add("noPonerMasBarcos");
                        }

                        if (inicio+1 <= aux+9) {
                            if(player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) pos[inicio+1].classList.add("noPonerMasBarcos");
                        }

                        if(player.barcos.length == 0) pos[inicio].classList.add("barcoPosicionadoUno");
                        if(player.barcos.length == 1) pos[inicio].classList.add("barcoPosicionadoDos");
                        if(player.barcos.length == 2) pos[inicio].classList.add("barcoPosicionadoTres");
                        if(player.barcos.length == 3) pos[inicio].classList.add("barcoPosicionadoCuatro");
                        if(player.barcos.length == 4) pos[inicio].classList.add("barcoPosicionadoCinco");
                        if(player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) pos[inicio].classList.add("noPonerMasBarcos");
                        inicio += 10;
                        aux += 10;
                    }

                    if((player.barcos.length == 0 || player.barcos.length == 1 || player.barcos.length == 2 || player.barcos.length == 3 || player.barcos.length == 4) && (auxExtra+longitud*10 == inicio && auxExtra+longitud*10 < 101)) pos[auxExtra+longitud*10].classList.add("noPonerMasBarcos");

                }
            }

            player.barcos[player.barcos.length] = {"localizaciones": [[]]};

            for (let i = 0; i < longitud; i++) {
                
                if (horientacion == 0) {

                    player.barcos[player.barcos.length-1]["localizaciones"][i] = [fila, columna];
                    columna++;

                } else if (horientacion == 1) {

                    player.barcos[player.barcos.length-1]["localizaciones"][i] = [fila, columna];
                    fila ++;

                }

                
            }
        }
    }
} 


//Comprobamos los limites de casillas para saber si se puede poner el barco
function comprobarPuedePonerseLimiteCasillas(inicio, longitud, horientacion) {

    var fila = 0;
    var columna = 0;

    if (inicio > 10) {

        fila = parseInt(inicio.toString().substr(0,1)) + 1;
        columna = parseInt(inicio.toString().substr(1,1));

    } else {

        fila = 1;
        columna = inicio;

    }

    if (columna == 0){

        columna = 10; 
        fila--;
    }
    if (inicio == 100) fila = 10;

    if (horientacion == 0) {

        if ((columna - 1) + longitud > 10) {
            return false;
        }
        
    } else if (horientacion == 1)  {
        
        if ((fila - 1) + longitud > 10) {
            return false;
        }

    }

    return true;

    
}

//Comprobamos que el barco a poner no se pueda poner encima de otro
function comprobarPuedePonerseOtrosBarcos(inicio, longitud, horientacion, player) {

    var pos = [];

    for (let i = 0; i < 100; i++) {

        if (player.tipoPlayer == "j") {

            pos[i+1] = document.querySelector("#jugador #j"+(i+1));
            pos[i+1] = pos[i+1].className;       

        } else if (player.tipoPlayer == "m") {

            pos[i+1] = document.querySelector("#maquina #m"+(i+1));
            pos[i+1] = pos[i+1].className;  
            
        }
        
    }

    for (let i = 0; i < longitud; i++) {

        if (horientacion == 0) {

            if (pos[inicio] == undefined) {
                return false;
            }

            if(pos[inicio].indexOf("noPonerMasBarcos") != -1) return false;

            inicio ++;
            
        } else if (horientacion == 1) {

            if (pos[inicio] == undefined) {
                return false;
            }

            if(pos[inicio].indexOf("noPonerMasBarcos") != -1) return false;

            inicio += 10;

        }
        
        
        
    }

    return true;
    
}

//Agregamos los barcos aleatoriamente
function anadirBarcosAleatorios(player) {

    while (player.barcos.length < 5) {

        let numeroAleatorioInicio = Math.floor(Math.random() * 101);
        let numeroAleatorioHorientacion = Math.floor(Math.random() * 2);

        if (player.barcos.length == 0) {

            anadirBarco(player, numeroAleatorioInicio, 5, numeroAleatorioHorientacion);
            
        } else if (player.barcos.length == 1) {

            anadirBarco(player, numeroAleatorioInicio, 4, numeroAleatorioHorientacion);
            
        } else if (player.barcos.length == 2 || player.barcos.length == 3) {

            anadirBarco(player, numeroAleatorioInicio, 3, numeroAleatorioHorientacion);
            
        } else if (player.barcos.length == 4) {

            anadirBarco(player, numeroAleatorioInicio, 2, numeroAleatorioHorientacion);
            
        }

    }

    if (player.tipoPlayer == "m") {

        var pos = [];
        
        for (let i = 0; i < 100; i++) {
    
            pos[i+1] = document.querySelector("#maquina #m"+(i+1));
            pos[i+1].classList.remove("barcoPosicionadoUno");
            pos[i+1].classList.remove("barcoPosicionadoDos");
            pos[i+1].classList.remove("barcoPosicionadoTres");
            pos[i+1].classList.remove("barcoPosicionadoCuatro");
            pos[i+1].classList.remove("barcoPosicionadoCinco");
            
        }

    }
}

//Comprobamos la posicion del barco
function PosicionBarco(fila, columna, player, booll) {

    var cordenada = fila + "," + columna

    for (let h = 0; h < player.barcos.length; h++) {
        for (let j = 0; j < player.barcos[h].localizaciones.length; j++) {

            if (cordenada == player.barcos[h].localizaciones[j]) {

                
                switch (h) {
                    case 0:
                        
                        player.tamCincoDanado++;

                        if (player.nombre == "Player" && booll) {
                            Jugador.BarcosDanadosCoordenadas[0][Jugador.BarcosDanadosCoordenadas[0].length] = [fila, columna];
                        } else if (player.nombre == "Bot" && booll) {
                            Maquina.BarcosDanadosCoordenadas[0][Maquina.BarcosDanadosCoordenadas[0].length] = [fila, columna];
                        }

                        break;
                    
                    case 1:
                    
                        player.tamCuatroDanado++;

                        if (player.nombre == "Player" && booll) {
                            Jugador.BarcosDanadosCoordenadas[1][Jugador.BarcosDanadosCoordenadas[1].length] = [fila, columna];
                        } else if (player.nombre == "Bot" && booll) {
                            Maquina.BarcosDanadosCoordenadas[1][Maquina.BarcosDanadosCoordenadas[1].length] = [fila, columna];
                        }

                        break;
                    
                    case 2:
                        
                        player.tamTresUnoDanado++;

                        if (player.nombre == "Player" && booll) {
                            Jugador.BarcosDanadosCoordenadas[2][Jugador.BarcosDanadosCoordenadas[2].length] = [fila, columna];
                        } else if (player.nombre == "Bot" && booll) {
                            Maquina.BarcosDanadosCoordenadas[2][Maquina.BarcosDanadosCoordenadas[2].length] = [fila, columna];
                        }

                        break;
                    
                    case 3:
                    
                        player.tamTresdosDanado++;

                        if (player.nombre == "Player" && booll) {
                            Jugador.BarcosDanadosCoordenadas[3][Jugador.BarcosDanadosCoordenadas[3].length] = [fila, columna];
                        } else if (player.nombre == "Bot" && booll) {
                            Maquina.BarcosDanadosCoordenadas[3][Maquina.BarcosDanadosCoordenadas[3].length] = [fila, columna];
                        }

                        break;
                    
                    case 4:
                        
                        player.tamDosDanado++;

                        if (player.nombre == "Player" && booll) {
                            Jugador.BarcosDanadosCoordenadas[4][Jugador.BarcosDanadosCoordenadas[4].length] = [fila, columna];
                        } else if (player.nombre == "Bot" && booll) {
                            Maquina.BarcosDanadosCoordenadas[4][Maquina.BarcosDanadosCoordenadas[4].length] = [fila, columna];
                        }

                        break;

                
                }

                return h;


            }

        }

    }

    if (player.nombre == "Player" && booll) {
        Jugador.coordenadasAgua[Jugador.coordenadasAgua.length] = [fila, columna];
    } else if (player.nombre == "Bot" && booll) {
        Maquina.coordenadasAgua[Maquina.coordenadasAgua.length] = [fila, columna];
    }
    
}

//Comprobar barco hundido
function saludBarco(player) {

    if (nombre == "portaaviones" && player.BarcosDanadosCoordenadas[0].length == 5) {
        console.log("portaaviones Hundido");
    } else if (nombre == "submarino" && player.BarcosDanadosCoordenadas[1].length == 4) {
        console.log("submarino Hundido");
    }if (nombre == "destructor" && player.BarcosDanadosCoordenadas[2].length == 3) {
        console.log("destructor Hundido");
    }if (nombre == "crucero" && player.BarcosDanadosCoordenadas[3].length == 3) {
        console.log("crucero Hundido");
    }if (nombre == "fragata" && player.BarcosDanadosCoordenadas[4].length == 2) {
        console.log("fragata Hundido");
    }
    
}

function comprobarSiSepuedeLaPosicion(fila, columna, player) {

    var tocadoComprobado = false;
    var aguaComprobado = false;

    for (let h = 0; h < player.BarcosDanadosCoordenadas.length; h++) {
        for (let j = 0; j < player.BarcosDanadosCoordenadas[h].length; j++) {
     
            if (fila == player.BarcosDanadosCoordenadas[h][j][0] && columna == player.BarcosDanadosCoordenadas[h][j][1]) {
                return true;
            }

        }
    }

    for (let i = 0; i < player.coordenadasAgua.length; i++) {
        
        if (fila == player.coordenadasAgua[i][0] && columna == player.coordenadasAgua[i][1]) {
            return true;
        }
        
    }

    return false;
    
}

//Comprobamos la salud del barco y mandamos un mensaje al user cuando hunda o le hundan un barco
function comprobarVidaBarco(cordenada, player) {

    for (let h = 0; h < player.barcos.length; h++) {
        for (let j = 0; j < player.barcos[h].localizaciones.length; j++) {

            if (cordenada == player.barcos[h].localizaciones[j]) {

                
                switch (h) {
                    case 0:
                        
                        if(Maquina.tamCincoDanado == 5 && Maquina.totalBarcos > 0 && player.tipoPlayer == "m"){
                            Maquina.totalBarcos--;
                            Maquina.actual++;
                            agregarInformacion("Has hundido el "+ Maquina.enbarcaciones[0].nombre +" con una longitud de "+Maquina.enbarcaciones[0].tamano+" \nLe quedan "+Maquina.totalBarcos+" Barcos", true);
                            if(Maquina.totalBarcos == 0){
                                cargarJuego("Has Ganado<br>¿PARTIDA NUEVA?");
                            }
                        } else if(Jugador.tamCincoDanado == 6 && Jugador.totalBarcos > 0 && player.tipoPlayer == "j"){
                            Jugador.totalBarcos--;
                            Jugador.actual++;
                            agregarInformacion("Te han hundido el "+ Jugador.enbarcaciones[0].nombre +" con una longitud de "+Jugador.enbarcaciones[0].tamano+" \nTe quedan "+Jugador.totalBarcos+" Barcos", true);
                            if(Jugador.totalBarcos == 0){
                                cargarJuego("Has Perdido<br>¿PARTIDA NUEVA?");
                            }
                        }
                        break;
                    
                    case 1:
                    
                        if(Maquina.tamCuatroDanado == 4 && Maquina.totalBarcos > 0 && player.tipoPlayer == "m"){
                            Maquina.totalBarcos--;
                            Maquina.actual++;
                            agregarInformacion("Has hundido el "+ Maquina.enbarcaciones[1].nombre +" con una longitud de "+Maquina.enbarcaciones[1].tamano+" \nLe quedan "+Maquina.totalBarcos+" Barcos", true);
                            if(Maquina.totalBarcos == 0){
                                cargarJuego("Has Ganado<br>¿PARTIDA NUEVA?");
                            }
                        } else if(Jugador.tamCuatroDanado == 5 && Jugador.totalBarcos > 0 && player.tipoPlayer == "j"){
                            Jugador.totalBarcos--;
                            Jugador.actual++;
                            agregarInformacion("Te han hundido el "+ Jugador.enbarcaciones[1].nombre +" con una longitud de "+Jugador.enbarcaciones[1].tamano+" \nTe quedan "+Jugador.totalBarcos+" Barcos", true);
                            if(Jugador.totalBarcos == 0){
                                cargarJuego("Has Perdido<br>¿PARTIDA NUEVA?");
                            }
                        }

                        break;
                    
                    case 2:
                        
                        if(Maquina.tamTresUnoDanado == 3 && Maquina.totalBarcos > 0 && player.tipoPlayer == "m"){
                            Maquina.totalBarcos--;
                            Maquina.actual++;
                            agregarInformacion("Has hundido el "+ Maquina.enbarcaciones[2].nombre +" con una longitud de "+Maquina.enbarcaciones[2].tamano+" \nLe quedan "+Maquina.totalBarcos+" Barcos", true);
                            if(Maquina.totalBarcos == 0){
                                cargarJuego("Has Ganado<br>¿PARTIDA NUEVA?");
                            }
                        } else if(Jugador.tamTresUnoDanado == 4 && Jugador.totalBarcos > 0 && player.tipoPlayer == "j"){
                            Jugador.totalBarcos--;
                            Jugador.actual++;
                            agregarInformacion("Te han hundido el "+ Jugador.enbarcaciones[2].nombre +" con una longitud de "+Jugador.enbarcaciones[2].tamano+" \nTe quedan "+Jugador.totalBarcos+" Barcos", true);
                            if(Jugador.totalBarcos == 0){
                                cargarJuego("Has Perdido<br>¿PARTIDA NUEVA?");
                            }
                        }

                        break;
                    
                    case 3:
                    
                        if(Maquina.tamTresdosDanado == 3 && Maquina.totalBarcos > 0 && player.tipoPlayer == "m"){
                            Maquina.totalBarcos--;
                            Maquina.actual++;
                            agregarInformacion("Has hundido el "+ Maquina.enbarcaciones[3].nombre +" con una longitud de "+Maquina.enbarcaciones[3].tamano+" \nLe quedan "+Maquina.totalBarcos+" Barcos", true);
                            if(Maquina.totalBarcos == 0){
                                cargarJuego("Has Ganado<br>¿PARTIDA NUEVA?");
                            }
                        } else if(Jugador.tamTresdosDanado == 4 && Jugador.totalBarcos > 0 && player.tipoPlayer == "j"){
                            Jugador.totalBarcos--;
                            Jugador.actual++;
                            agregarInformacion("Te han hundido el "+ Jugador.enbarcaciones[3].nombre +" con una longitud de "+Jugador.enbarcaciones[3].tamano+" \nTe quedan "+Jugador.totalBarcos+" Barcos", true);
                            if(Jugador.totalBarcos == 0){
                                cargarJuego("Has Perdido<br>¿PARTIDA NUEVA?");
                            }
                        }

                        break;
                    
                    case 4:
                        
                        if(Maquina.tamDosDanado == 2 && Maquina.totalBarcos > 0 && player.tipoPlayer == "m"){
                            Maquina.totalBarcos--;
                            Maquina.actual++;
                            agregarInformacion("Has hundido el "+ Maquina.enbarcaciones[4].nombre +" con una longitud de "+Maquina.enbarcaciones[4].tamano+" \nLe quedan "+Maquina.totalBarcos+" Barcos", true);
                            if(Maquina.totalBarcos == 0){
                                cargarJuego("Has Ganado<br>¿PARTIDA NUEVA?");
                            }
                        } else if(Jugador.tamDosDanado == 3 && Jugador.totalBarcos > 0 && player.tipoPlayer == "j"){
                            Jugador.totalBarcos--;
                            Jugador.actual++;
                            agregarInformacion("Te han hundido el "+ Jugador.enbarcaciones[4].nombre +" con una longitud de "+Jugador.enbarcaciones[4].tamano+" \nTe quedan "+Jugador.totalBarcos+" Barcos", true);
                            if(Jugador.totalBarcos == 0){
                                cargarJuego("Has Perdido<br>¿PARTIDA NUEVA?");
                            }
                        }

                        break;

                
                }

                return true;


            }

        }

    }
    
}


//Creamos el evento click para que el jugador humano pueda atacar
function clickAtacar() {

    var playerUno = Jugador;
    var playerDos = Maquina;

    var pos = [];

    for (let i = 0; i < 100; i++) {

        pos[i+1] = document.querySelector("#maquina #m"+(i+1));
        
    }

    for (let i = 0; i < 100; i++) {

        pos[i+1].addEventListener('click', function(){

            atacar(pos[i+1]);

            atacar();

        })

    }
    
}

//Creamos la funcion que realizara el ataque
function atacar(posAtaque){

    //Recogemos las posicion de ataque en el turno del Jugador
    if (Jugador.numeroAtaque == Maquina.numeroAtaque) {
        

        if(posAtaque.className.indexOf("tocado") != -1 || posAtaque.className.indexOf("agua") != -1){
            return;
        }

        inicio = parseInt((posAtaque.id).substring(1, (posAtaque.id).length));
        
    //Recogemos la posicion de ataque en el turno de la Maquina y realizamos los calculos para su inteligencia
    } else if(Maquina.encontrado){

        

            do {

                //Si no sabe la horientacion del barco, generamos aleatoriamente una direccion de ataque
                if(Maquina.continuar == false){

                    var tam = Maquina.orden.length;
        
                    do {

                        var ataqueAleatorio = (Math.floor(Math.random() * 4))+1;
                        
                    } while (Maquina.orden.indexOf(ataqueAleatorio) != -1 || ataqueAleatorio < 1 || ataqueAleatorio > 4);
                    
                    Maquina.orden[tam] = ataqueAleatorio;

                }

                //Guadamos la posicion de ataque haciendos los calculos necesarios dependiendo de la direccion generada
                if (Maquina.ultimaposicionColumna == 10 && Maquina.ultimaposicionFila == 9){
                    posAtaque = document.getElementById("j100");
                } else if (Maquina.ultimaposicionColumna == 10) {
                    posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila+1)+ "0");
                }  else {
                    posAtaque = document.getElementById("j" + Maquina.ultimaposicionFila+Maquina.ultimaposicionColumna);
                }
                
                if (posAtaque != null) {
                    inicio = parseInt((posAtaque.id).substring((posAtaque.id).length-1, (posAtaque.id).length));
                    inicioCompleto = parseInt((posAtaque.id).substring(1, (posAtaque.id).length));
                }

                //hacemos los calculos necesarios dependiendo de la direccion generada
                switch (Maquina.orden[Maquina.orden.length-1]) {

                    case 1:
                        
                    if (Maquina.ultimaposicionColumna == 9) {
                            
                        posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila+1)+ "0");
                    
                    } else if(Maquina.ultimaposicionColumna == 10 && Maquina.ultimaposicionFila == "") {

                        posAtaque = null;

                    } else if (posAtaque.id != 99) {

                        posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila)+(Maquina.ultimaposicionColumna+1));
                        
                    } else {

                        posAtaque = document.getElementById("j100");

                    }
                    
                    if (posAtaque != null) {
                        inicio = parseInt((posAtaque.id).substring(1, (posAtaque.id).length));
                    }

                        break;
                
                    case 2:

                        if(Maquina.ultimaposicionColumna == 1){

                            posAtaque = null;

                        } else if (posAtaque.id != 100) {

                            posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila)+(Maquina.ultimaposicionColumna-1));
                            
                        } else {

                            posAtaque = document.getElementById("j99");

                        }
                        
                        if (posAtaque != null) {
                            inicio = parseInt((posAtaque.id).substring(1, (posAtaque.id).length));
                        }
                        
                        break;

                    case 3:

                        if (Maquina.ultimaposicionColumna == 10) {
                            
                            posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila+2)+ "0");
                        
                        } else {

                            posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila+1)+(Maquina.ultimaposicionColumna));
                            
                        }
                        
                        if (posAtaque != null) {
                            inicio = parseInt((posAtaque.id).substring(1, (posAtaque.id).length));
                        }
                        
                        break;

                    case 4:

                        if (Maquina.ultimaposicionColumna == 10) {
                            
                            posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila)+ "0");
                        
                        } else if(Maquina.ultimaposicionFila == 1){

                            posAtaque = document.getElementById("j" +(Maquina.ultimaposicionColumna));

                        } else {

                            posAtaque = document.getElementById("j" + (Maquina.ultimaposicionFila-1)+(Maquina.ultimaposicionColumna));
                            
                        }
                        
                        if (posAtaque != null) {
                            inicio = parseInt((posAtaque.id).substring(1, (posAtaque.id).length));
                        }
                        
                        break;
                    

                }

                //Si la posicion de ataque no es nula
                if (posAtaque != null) {

                    //Coprobamos si hay agua o esta tocado
                    if(posAtaque.className.indexOf("tocado") == -1 && posAtaque.className.indexOf("agua") == -1){
                        atacado = false;
                    //Si no esta tocado y no hay agua
                    } else {
                        atacado = true;
                        
                        //Si ya sabemos la horientacion del barco le decimos su proxima direccion de ataque
                        if (Maquina.continuar) {
                
                            if (Maquina.orden[Maquina.orden.length-1] == 1) {
                                Maquina.orden[Maquina.orden.length] = 2;
                            } else if (Maquina.orden[Maquina.orden.length-1] == 2) {
                                Maquina.orden[Maquina.orden.length] = 1;
                            } else if (Maquina.orden[Maquina.orden.length-1] == 3) {
                                Maquina.orden[Maquina.orden.length] = 4;
                            } else if (Maquina.orden[Maquina.orden.length-1] == 4) {
                                Maquina.orden[Maquina.orden.length] = 3;
                            }
    
                            Maquina.ultimaposicionFila = Maquina.posicionInicialFila;
                            Maquina.ultimaposicionColumna = Maquina.posicionInicialColumna;
    
                        } else {
                            Maquina.continuar = false;
                        }
                    }
                    
                //Si la posicion de ataque es nula
                } else {
                    atacado = true;

                    //Si ya sabemos la horientacion del barco le decimos su proxima direccion de ataque
                    if (Maquina.continuar) {
                
                        if (Maquina.orden[Maquina.orden.length-1] == 1) {
                            Maquina.orden[Maquina.orden.length] = 2;
                        } else if (Maquina.orden[Maquina.orden.length-1] == 2) {
                            Maquina.orden[Maquina.orden.length] = 1;
                        } else if (Maquina.orden[Maquina.orden.length-1] == 3) {
                            Maquina.orden[Maquina.orden.length] = 4;
                        } else if (Maquina.orden[Maquina.orden.length-1] == 4) {
                            Maquina.orden[Maquina.orden.length] = 3;
                        }

                        Maquina.ultimaposicionFila = Maquina.posicionInicialFila;
                        Maquina.ultimaposicionColumna = Maquina.posicionInicialColumna;

                    //Reseteamos la direccion
                    } else {
                        Maquina.continuar = false;
                    }
                }
                

            //Si la posicion de ataque es nula o no ha realizado el ataque volvemos al inicio del do-While
            } while(posAtaque == null || atacado == true); 

    //La maquina ataca
    } else if (Jugador.numeroAtaque > Maquina.numeroAtaque){

        var atacado = false;

        while (atacado == false) {

            var aleatorio = Math.floor(Math.random() * 101);

            posAtaque = document.getElementById("j" + aleatorio);
            inicio = parseInt((posAtaque.id).substring(1, (posAtaque.id).length));

            if(posAtaque.className.indexOf("tocado") == -1 && posAtaque.className.indexOf("agua") == -1){

                atacado = true;

            } 
                
        } 

    }

        var fila = 0;
        var columna = 0;
    
        if (inicio > 10) {
    
            fila = parseInt(inicio.toString().substr(0,1))+1;
            columna = parseInt(inicio.toString().substr(1,1));
    
        } else {
    
            fila = 1;
            columna = inicio;
    
        }
    
        if (columna == 0){

            columna = 10; 
            fila--;
        }
        if (inicio == 100) fila = 10;

    //Jugador Ataca
    if (Jugador.numeroAtaque == Maquina.numeroAtaque) {

        if (PosicionBarco(fila, columna, Maquina, true) >= 0) {

            posAtaque.classList.add("tocado");
            document.querySelector("#" +posAtaque.id+ " span").classList.add("circuloTocado");

            Jugador.numeroAtaque++;

            agregarInformacion("Jugador a tocado un barco de la Maquina", true);

            comprobarVidaBarco(fila+","+columna, Maquina)
            
        //Jugador encuentra Agua
        } else {

            agregarInformacion("Jugador a caido en agua de la Maquina", true);

            posAtaque.classList.add("agua");
            document.querySelector("#" +posAtaque.id+ " span").classList.add("circuloAgua");

            Jugador.numeroAtaque++;

        }
    //Maquina ataca cuando ha encontrado un barco
    } else if(Maquina.encontrado){

        if (PosicionBarco(fila , columna, Jugador, true) >= 0) {

            posAtaque.classList.add("tocado");
            document.querySelector("#" +posAtaque.id+ " span").classList.add("circuloTocado");

            Maquina.numeroAtaque++;

            agregarInformacion("Maquina te a tocado un barco", false);

            comprobarVidaBarco(fila+","+columna, Jugador);

            if (fila-1 == 0) {
                Maquina.ultimaposicionFila = "";
            } else {
                Maquina.ultimaposicionFila = fila-1;
            }
            
            Maquina.ultimaposicionColumna = columna;

            //Cuando hunde el barco reseteamos variables
            if(Maquina.tamBarcoDanado == 0 && Maquina.totalDanano < 5){
                Maquina.continuar = true;
                Maquina.totalDanano++;

                if(Maquina.totalDanano == 5){
                    Maquina.encontrado = false;
                    Maquina.orden.length = 0;
                    Maquina.ultimaposicionColumna = 0;
                    Maquina.ultimaposicionFila = 0;
                    Maquina.posicionInicialColumna = 0;
                    Maquina.posicionInicialFila = 0;
                    ataqueAleatorio = 0;
                    Maquina.continuar = false;
                    Maquina.tamBarcoDanado = 0;
                    Maquina.totalDanano = 0;
                }

            //Cuando hunde el barco reseteamos variables
            } else if(Maquina.tamBarcoDanado == 1 && Maquina.totalDanano < 4){
                Maquina.continuar = true;
                Maquina.totalDanano++;

                if(Maquina.totalDanano == 4){
                    Maquina.encontrado = false;
                    Maquina.orden.length = 0;
                    Maquina.ultimaposicionColumna = 0;
                    Maquina.ultimaposicionFila = 0;
                    Maquina.posicionInicialColumna = 0;
                    Maquina.posicionInicialFila = 0;
                    ataqueAleatorio = 0;
                    Maquina.continuar = false;
                    Maquina.tamBarcoDanado = 0;
                    Maquina.totalDanano = 0;
                }

            //Cuando hunde el barco reseteamos variables
            } else if((Maquina.tamBarcoDanado == 2 || Maquina.tamBarcoDanado == 3) && Maquina.totalDanano < 3){
                Maquina.continuar = true;
                Maquina.totalDanano++;

                if(Maquina.totalDanano == 3){
                    Maquina.encontrado = false;
                    Maquina.orden.length = 0;
                    Maquina.ultimaposicionColumna = 0;
                    Maquina.ultimaposicionFila = 0;
                    Maquina.posicionInicialColumna = 0;
                    Maquina.posicionInicialFila = 0;
                    ataqueAleatorio = 0;
                    Maquina.continuar = false;
                    Maquina.tamBarcoDanado = 0;
                    Maquina.totalDanano = 0;
                }

            //Cuando hunde el barco reseteamos variables
            } else if(Maquina.tamBarcoDanado == 4 && Maquina.totalDanano < 2){
                Maquina.continuar = true;
                Maquina.totalDanano++;

                if(Maquina.totalDanano == 2){
                    Maquina.encontrado = false;
                    Maquina.orden.length = 0;
                    Maquina.ultimaposicionColumna = 0;
                    Maquina.ultimaposicionFila = 0;
                    Maquina.posicionInicialColumna = 0;
                    Maquina.posicionInicialFila = 0;
                    ataqueAleatorio = 0;
                    Maquina.continuar = false;
                    Maquina.tamBarcoDanado = 0;
                    Maquina.totalDanano = 0;
                }

            }

        //Maquina Encuentra Agua
        } else {

            agregarInformacion("&nbsp;maquina a caido en agua del Jugador", false);

            posAtaque.classList.add("agua");
            document.querySelector("#" +posAtaque.id+ " span").classList.add("circuloAgua");

            Maquina.numeroAtaque++;

            if (Maquina.continuar) {

                if (Maquina.orden[Maquina.orden.length-1] == 1) {
                    Maquina.orden[Maquina.orden.length] = 2;
                } else if (Maquina.orden[Maquina.orden.length-1] == 2) {
                    Maquina.orden[Maquina.orden.length] = 1;
                } else if (Maquina.orden[Maquina.orden.length-1] == 3) {
                    Maquina.orden[Maquina.orden.length] = 4;
                } else if (Maquina.orden[Maquina.orden.length-1] == 4) {
                    Maquina.orden[Maquina.orden.length] = 3;
                }
                
            } else {
                Maquina.continuar = false;
            }

            Maquina.ultimaposicionFila = Maquina.posicionInicialFila;
            Maquina.ultimaposicionColumna = Maquina.posicionInicialColumna;

            

        }

    //Maquina ataca cuando no ha encontrado ningun barco
    } else if (Jugador.numeroAtaque > Maquina.numeroAtaque) {

        if (PosicionBarco(fila , columna, Jugador, true) >= 0) {

            posAtaque.classList.add("tocado");
            document.querySelector("#" +posAtaque.id+ " span").classList.add("circuloTocado");

            Maquina.numeroAtaque++;

            agregarInformacion("Maquina te a tocado un barco", false);

            comprobarVidaBarco(fila+","+columna, Jugador);

            Maquina.encontrado = true;

            if (fila-1 == 0) {
                Maquina.ultimaposicionFila = "";
                Maquina.posicionInicialFila = "";
            } else {
                Maquina.ultimaposicionFila = fila-1;
                Maquina.posicionInicialFila = fila-1;
            }
            
            Maquina.ultimaposicionColumna = columna;
            Maquina.posicionInicialColumna = columna;

            Maquina.tamBarcoDanado = PosicionBarco(fila , columna, Jugador, false);
            Maquina.totalDanano++;

        //Maquina encuentra agua
        } else {

        agregarInformacion("&nbsp;maquina a caido en agua del Jugador", false);

        posAtaque.classList.add("agua");
        document.querySelector("#" +posAtaque.id+ " span").classList.add("circuloAgua");

        Maquina.numeroAtaque++;

        Maquina.continuar = false;

        Maquina.totalDanano = 0;
        

    }

    } 
}
            
//Creamos y mostramos las tablas 
function crearTablas(id, player){

    var tablaJugador = "";
    var pos = 1;

    tablaJugador += "<table id="+ id +">";
    tablaJugador += "<tr>";
    tablaJugador += "<td></td>";
    tablaJugador += "<td>A</td>";
    tablaJugador += "<td>B</td>";
    tablaJugador += "<td>C</td>";
    tablaJugador += "<td>D</td>";
    tablaJugador += "<td>E</td>";
    tablaJugador += "<td>F</td>";
    tablaJugador += "<td>G</td>";
    tablaJugador += "<td>H</td>";
    tablaJugador += "<td>I</td>";
    tablaJugador += "<td>J</td>";
    tablaJugador += "</tr>";
    

    for (let i = 0; i < 10; i++) {

        tablaJugador += "<tr>";
        
        for (let j = 0; j < 11; j++) {

            if (j == 0) {

                tablaJugador += "<td>"+ (i+1) +"</td>";
                
            } else {
                tablaJugador+= "<td id="+player.tipoPlayer+ pos +" class='pos"+ pos +"'><span class='hole'></span></td>";
                pos++;
            }
            
        }

        tablaJugador += "</tr>";
        
    }

    tablaJugador += "</table>";

    document.getElementById("cuerpo").innerHTML += tablaJugador;

}

//Funcion que agrega botones a la pagina
function agregarBotones(nombre, clase){

    let boton = "<button id='"+nombre+"' class='"+clase+"'>"+nombre+"</button>";

    document.getElementById("cajaBotones").innerHTML +=boton;

    

}

//Funcion que agrega una caja de texto para mostrar informacion al usuariio
function agregarInformacion(Contenido, sobreescribir){

    if(sobreescribir){
        document.getElementById("cajatexto").innerHTML ="<h3>"+Contenido+"</h3>";
    } else {
        document.getElementById("cajatexto").innerHTML +="<h3>"+Contenido+"</h3>";
    }
    

}

//Creamos una caja para los botones
function crearCajaBotones (){

    document.getElementById("cuerpo").innerHTML += "<div id='cajaInformacion'>";
    document.getElementById("cuerpo").innerHTML += "</div>";

    document.getElementById("cajaInformacion").innerHTML += "<div id='cajatexto'>";
    document.getElementById("cajaInformacion").innerHTML += "</div>";

    document.getElementById("cajaInformacion").innerHTML += "<div id='cajaBotones'>";
    document.getElementById("cajaInformacion").innerHTML += "</div>";

}

//Agregamos a la escucha de click los botones creados
function agregarALaEscuchaBotonesConfiguracion(){

    document.getElementById("Iniciar_Juego").addEventListener('click', function(){

        document.getElementById("Iniciar_Juego").classList.remove("show");
        document.getElementById("Iniciar_Juego").classList.add("hidden");

        document.getElementById("cajaBotones").classList.add("hidden");

        mostrarPosicionAtaque();

        clickAtacar();

    })

    document.getElementById("Partida_Nueva").addEventListener('click', function(){

        anadirBarcosAleatorios(Maquina);
        document.getElementById("Partida_Nueva").classList.remove("show");
        document.getElementById("Partida_Nueva").classList.add("hidden");
        document.getElementById("Posiciones_Automaticas").classList.add("show");
        document.getElementById("Posiciones_Manuales").classList.add("show");

    })

    document.getElementById("Cambiar_Direccion").addEventListener('click', function(){

        if(Jugador.posicion == 1) Jugador.posicion = 0;
        else if (Jugador.posicion == 0) Jugador.posicion = 1;

    })

    document.getElementById("Posiciones_Automaticas").addEventListener('click', function(){

        anadirBarcosAleatorios(Jugador);

        document.getElementById("Posiciones_Automaticas").classList.remove("show");
        document.getElementById("Posiciones_Automaticas").classList.add("hidden");
        document.getElementById("Posiciones_Manuales").classList.remove("show");
        document.getElementById("Posiciones_Manuales").classList.add("hidden");

        document.getElementById("Iniciar_Juego").classList.add("show");

    })

    document.getElementById("Posiciones_Manuales").addEventListener('click', function(){

        anadirBarcosManualmente(Jugador);

        document.getElementById("Posiciones_Automaticas").classList.remove("show");
        document.getElementById("Posiciones_Automaticas").classList.add("hidden");
        document.getElementById("Posiciones_Manuales").classList.remove("show");
        document.getElementById("Posiciones_Manuales").classList.add("hidden");

        document.getElementById("Cambiar_Direccion").classList.add("show");

    })

}

//Añadimos los barcos manualmente
function anadirBarcosManualmente(player) {

    if (player.barcos.length == 5) {

        document.getElementById("Cambiar_Direccion").classList.remove("show");
        document.getElementById("Cambiar_Direccion").classList.add("hidden");

        document.getElementById("Iniciar_Juego").classList.add("show");
        return;
    }

    var longitud;

    var pos = [];

    for (let j = 0; j < 100; j++) {

        if (player.tipoPlayer == "j") {

            pos[j+1] = document.querySelector("#jugador #j"+(j+1));

        } else if (player.tipoPlayer == "m") {

            pos[j+1] = document.querySelector("#maquina #m"+(j+1));
            
        }
        
    }
    

    for (let i = 0; i < 100; i++) {

        pos[i+1].addEventListener('mouseleave', function () {

            if (player.barcos.length == 5) {
                
                return;
            }
            

            if (player.barcos.length == 0) {

                longitud = 5;
                
            } else if (player.barcos.length == 1) {

                longitud = 4;
                
            } else if (player.barcos.length == 2 || player.barcos.length == 3) {

                longitud = 3;
                
            } else if (player.barcos.length == 4) {

                longitud = 2;
                
            }
    
            if (Jugador.posicion == 1) {

                aux = 0;
    
                for (let j = 0; j < longitud; j++) {
                    
                    pos[i+1+aux].classList.remove("barcoManual");

                    aux += 10;
                    
                    
                }
                
            } else if (Jugador.posicion == 0) {

                aux = 0;
    
                for (let j = 0; j < longitud; j++) {
                    
                    pos[i+1+aux].classList.remove("barcoManual");

                    aux++;
                    
                    
                }
                
                player.anadirBarcosManualmenteBool = false;
                return true;
                
            }


            if (player.barcos.longitud == 5) {
                player.anadirBarcosManualmenteBool = false;
            }

            
            return;
    
        })
        
        pos[i+1].addEventListener('mouseenter', function(){

            if (player.barcos.length == 5) {

                return;
            }

            inicio = parseInt((pos[i+1].className).substring(3, (pos[i+1].className).length));
            var aux = inicio;

            if (comprobarPuedePonerseLimiteCasillas(inicio, longitud, Jugador.posicion)) {
    
                if (comprobarPuedePonerseOtrosBarcos(inicio, longitud, Jugador.posicion, player)) {
                    
                    for (let i = 0; i < longitud; i++) {
        
                        if (Jugador.posicion == 1 && player.barcos.length < 5) {
        
                            pos[inicio].classList.add("barcoManual");
        
                            inicio += 10;
                            
        
                        } else if (Jugador.posicion == 0 && player.barcos.length < 5) {
        
                            pos[inicio].classList.add("barcoManual");
        
                            inicio ++;
                            
        
                        }
            
                    }

                    pos[i+1].addEventListener('click', function(){

                        if (player.barcos.length < 5) {

                            if(comprobarPuedePonerseLimiteCasillas(aux, longitud, Jugador.posicion)){
                                if(comprobarPuedePonerseOtrosBarcos(aux, longitud, Jugador.posicion, Jugador)){
                                    anadirBarco(player, aux, longitud, Jugador.posicion);
                                }
                            }
                            

                            
                            
                        }

                        if(player.barcos.length == 5){
                            document.getElementById("Cambiar_Direccion").classList.remove("show");
                            document.getElementById("Cambiar_Direccion").classList.add("hidden");

                            document.getElementById("Iniciar_Juego").classList.add("show");
                        }

                    })
                    
                }
                
            }

            

        });
        
    }
}

//Coloreamos con un circulo la posicion de ataque sonde este situado el usuario sobre la tabla de maquina
function mostrarPosicionAtaque() {

    var pos = new Array();

    for (let j = 0; j < 100; j++) {

        pos[j+1] = document.querySelector("#maquina #m"+(j+1));
        
    }
    

    for (let i = 0; i < 100; i++) {

        pos[i+1].addEventListener('mouseleave', function (){

            document.querySelector("#"+pos[i+1].id+" span").classList.remove("ataque")

        })

            
        
        pos[i+1].addEventListener('mouseenter', function(){

            document.querySelector("#"+pos[i+1].id+" span").classList.add("ataque");

        })
    }
    
}


//Cargamos todos los datos necesarios al iniciar la pagina web
function cargarJuego(texto){

    //var Maquina, Jugador;

    document.getElementById("cuerpo").innerHTML = "";

    Maquina = new Player("Bot", "m");
    Jugador = new Player("Player", "j");

    crearTablas("maquina", Maquina);

    crearCajaBotones();

    agregarInformacion(texto, true);

    agregarBotones("Iniciar_Juego", "hidden");
    agregarBotones("Partida_Nueva", "show");
    agregarBotones("Cambiar_Direccion", "hidden");
    agregarBotones("Posiciones_Automaticas", "hidden");
    agregarBotones("Posiciones_Manuales", "hidden");

    crearTablas("jugador", Jugador);

    agregarALaEscuchaBotonesConfiguracion();

}


//Iniciamos la carga del juego
cargarJuego("¿PARTIDA NUEVA?");
