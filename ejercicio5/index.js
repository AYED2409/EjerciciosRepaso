import { JuegoBarcos } from "./JuegoBarcos/JuegoBarcos.js";
const inputJugada = document.getElementById('jugada');
const btnEnviar = document.getElementById('btnEnviar');
const tableDisparo = document.getElementById('tableDisparo');
const msj = document.getElementById('mensaje');
const info = document.getElementById('info');
const tableDisparoPC = document.getElementById('tableDisparoB')
const table =document.getElementById('table');
//const reg = new RegExp('^([(]\\d+[,]\\d+[)])$', 'g');
const player = new JuegoBarcos();
var pc = new JuegoBarcos();
pc.initBack();
pc.pintarTablero(tableDisparoPC, pc.tableroDisparos);
player.init(table, tableDisparo);
btnEnviar.addEventListener('click', () => {
    var reg =/^([(]\d+[,]\d+[)])$/g;
    if(reg.test(inputJugada.value) ) {
        var indice = inputJugada.value.indexOf(",");
        let posy = parseInt(`${inputJugada.value.substring(1, indice)}`, 10);
        let posx = parseInt(`${inputJugada.value.substring(indice+1, inputJugada.value.length-1)}`, 10);
        var comprobarDisp = player.comprobarDisparo(pc.tablero, player.tableroDisparos, posy, posx);
        if(comprobarDisp.error) {
            mensaje.innerHTML = comprobarDisp.mensaje;
        }else{
            mensaje.innerHTML = "";
            info.innerHTML = comprobarDisp.mensaje;
            tableDisparo.innerHTML = "";
            player.pintarTablero(tableDisparo, player.tableroDisparos);
            if(player.barcosDanados == 10 ) {
                info.innerHTML = "ganaste la partida";
                btnEnviar.disabled = true;
                inputJugada.disabled = true;
            }else{
                var pos = pc.generarPosiciones();
                while(pc.tableroDisparos[pos[1]][pos[0]].marcar) {
                    pos = pc.generarPosiciones();
                }
                pc.comprobarDisparo(player.tablero, pc.tableroDisparos, pos[0], pos[1]);
                tableDisparoPC.innerHTML = "";
                pc.pintarTablero(tableDisparoPC, pc.tableroDisparos);
                table.innerHTML = "";
                player.pintarTablero(table, player.tablero);
                if(pc.barcosDanados == 10) {
                    info.innerHTML = "El rival gano la partida, PERDISTE";
                    inputJugada.disabled = true;
                    btnEnviar.disabled = true;
                }
            }    
        }
    }else {
        msj.innerHTML = "formato de posiciones incorrecto (col,fil): ejemplo (0,2)";
    }  
})