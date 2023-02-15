class JuegoBarcos {
    tablero = [];
    tableroDisparos = [];
    barcosDanados = 0;
    init(table, tableDisparos) {
        this.crearTablero(20,20);
        this.posicionarBarcos(10);
        this.pintarTablero(table, this.tablero);
        this.pintarTablero(tableDisparos, this.tableroDisparos);
    }
    initBack() {
        this.crearTablero(20, 20);
        this.posicionarBarcos(10)
    }
    crearTablero(numX, numY) {
        for(let x=0; x<numX; x++) {
            this.tableroDisparos[x] = []
            this.tablero[x] = [];
            for(let y=0; y<numY; y++) {
                let casilla = {
                    barco:false,
                    tocado:false,
                    posX:x,
                    posY:y
                }
                let marca = {
                    tiro : true,
                    marcar: false,
                    acierto : false
                }
                this.tablero[x][y] = casilla;
                this.tableroDisparos[x][y] = marca;
            }
        }
    }
    pintarTablero(table, tablero) {
        tablero.forEach( (item) => {
            var tr = document.createElement('tr');
            item.forEach( (i) => {
                var td = document.createElement('td');
                if(i.barco) { 
                    td.classList.add('barco');
                    if(i.tocado) {
                        td.classList.add('tocado');  
                    }  
                }
                if(i.tiro) {
                    td.classList.add('tiro');
                    if(i.marcar) {
                        td.classList.add('marcar');
                        if(i.acierto) {
                            td.classList.add('tiroAcertado'); 
                        }else {
                            td.classList.add('tiroFallido');
                        }    
                    }
                }  
                tr.appendChild(td);
            })
            table.appendChild(tr);
        })
    }
    posicionarBarcos(num) {
        for(let i=0; i<num; i++) {
            var pos = this.generarPosiciones();
            while(this.tablero[pos[0]][pos[1]].barco) {
                pos = this.generarPosiciones();
            }
            this.tablero[pos[0]][pos[1]].barco = true;
        }
    }
    generarPosiciones() {
        let posx = Math.floor(Math.random() * 20);
        let posy = Math.floor(Math.random() * 20);
        return [posy, posx];
    }
    comprobarDisparo(tablero, tableroDisparo, posY, posX) {
        var res = {
            error : false,
            mensaje : ""
        }
        if(posX > tablero[0].length-1 || posX < 0 || posY > tablero[0].length-1 || posY < 0) {
            res.error = true;
            res.mensaje = "disparo fuera del tablero, inserte una posicion correcta";
            return res;
        }else {
            if(tablero[posX][posY].barco) {
                if(!tablero[posX][posY].tocado) this.barcosDanados++;
                tablero[posX][posY].tocado = true;
                tableroDisparo[posX][posY].marcar = true;
                tableroDisparo[posX][posY].acierto = true;
                res.mensaje = "barco enemigo dañado";
                return res;
            }else {
                tableroDisparo[posX][posY].marcar = true;
                res.mensaje = "disparo fallido";
                return res;
            }
        }
    }
}
export {JuegoBarcos};