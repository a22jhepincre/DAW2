"use strict";
class Casella {
    /**
     * @param esMina
     */
    constructor(esMina) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
    }
}
class Tauler {
    /**
     * @param files
     * @param columnes
     */
    constructor(files, columnes) {
        this.files = files;
        this.columnes = columnes;
        this.caselles = [];
        this.inicialitzarCaselles();
    }
    inicialitzarCaselles() {
        for (let i = 0; i < this.files; i++) {
            this.caselles[i] = [];
            for (let j = 0; j < this.columnes; j++) {
                const randomNum = Math.floor(Math.random() * 10) + 1;
                const esMina = randomNum < 3;
                this.caselles[i][j] = new Casella(esMina);
            }
        }
    }
    /**
     * @param fila
     * @param columna
     * @returns Nombre de mines adjacents
     */
    comptarMinesAlVoltant(fila, columna) {
        let count = 0;
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.files && j >= 0 && j < this.columnes) {
                    if (this.caselles[i][j].esMina) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
}
class Joc {
    /**
     * @param files
     * @param columnes
     */
    constructor(files, columnes) {
        this.tauler = new Tauler(files, columnes);
        this.jocAcabat = false;
        this.dibuixarTauler();
    }
    dibuixarTauler() {
        const contenedor = document.getElementById("joc-container");
        if (!contenedor)
            return;
        contenedor.innerHTML = "";
        const taula = document.createElement("table");
        for (let i = 0; i < this.tauler.files; i++) {
            const filaTr = document.createElement("tr");
            for (let j = 0; j < this.tauler.columnes; j++) {
                const casellaTd = document.createElement("td");
                casellaTd.setAttribute("data-fila", i.toString());
                casellaTd.setAttribute("data-columna", j.toString());
                casellaTd.style.width = "30px";
                casellaTd.style.height = "30px";
                casellaTd.style.textAlign = "center";
                casellaTd.style.border = "1px solid black";
                casellaTd.style.cursor = "pointer";
                casellaTd.addEventListener("click", () => {
                    this.revelarCasella(i, j);
                });
                casellaTd.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    this.marcarCasella(i, j);
                });
                filaTr.appendChild(casellaTd);
            }
            taula.appendChild(filaTr);
        }
        contenedor.appendChild(taula);
    }
    /**
     * @param fila
     * @param columna
     */
    revelarCasella(fila, columna) {
        if (this.jocAcabat)
            return;
        const casella = this.tauler.caselles[fila][columna];
        if (casella.revelada || casella.marcada)
            return;
        casella.revelada = true;
        const td = this.getCasellaElement(fila, columna);
        if (casella.esMina) {
            td.textContent = "💣";
            td.style.backgroundColor = "red";
            this.acabarJoc();
        }
        else {
            const minesAdjacents = this.tauler.comptarMinesAlVoltant(fila, columna);
            td.textContent = minesAdjacents > 0 ? minesAdjacents.toString() : "";
            td.style.backgroundColor = "#ddd";
            if (minesAdjacents === 0) {
                this.revelarVeins(fila, columna);
            }
            // Comprova si hem guanyat després de revelar una casella no mina
            this.checkVictory();
        }
    }
    /**
     * @param fila
     * @param columna
     */
    revelarVeins(fila, columna) {
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.tauler.files && j >= 0 && j < this.tauler.columnes) {
                    if (!this.tauler.caselles[i][j].revelada) {
                        this.revelarCasella(i, j);
                    }
                }
            }
        }
    }
    /**
     * @param fila
     * @param columna
     */
    marcarCasella(fila, columna) {
        if (this.jocAcabat)
            return;
        const casella = this.tauler.caselles[fila][columna];
        if (casella.revelada)
            return;
        casella.marcada = !casella.marcada;
        const td = this.getCasellaElement(fila, columna);
        td.textContent = casella.marcada ? "🚩" : "";
    }
    /**
     * @param fila
     * @param columna
     * @returns Element HTML de la casella
     */
    getCasellaElement(fila, columna) {
        return document.querySelector(`td[data-fila="${fila}"][data-columna="${columna}"]`);
    }
    acabarJoc() {
        this.jocAcabat = true;
        alert("Has perdut! Has pitjat una mina.");
        this.mostrarTotesLesMines();
    }
    mostrarTotesLesMines() {
        for (let i = 0; i < this.tauler.files; i++) {
            for (let j = 0; j < this.tauler.columnes; j++) {
                const casella = this.tauler.caselles[i][j];
                if (casella.esMina && !casella.revelada) {
                    const td = this.getCasellaElement(i, j);
                    td.textContent = "💣";
                    td.style.backgroundColor = "red";
                }
            }
        }
    }
    /**
     * Comprova si el jugador ha guanyat.
     * Recorre totes les caselles i si totes les que no són mina estan revelades,
     * es mostra un missatge de victòria i s'acaba el joc.
     */
    checkVictory() {
        // Si el joc ja ha acabat, no cal comprovar
        if (this.jocAcabat)
            return;
        let guanyat = true;
        for (let i = 0; i < this.tauler.files; i++) {
            for (let j = 0; j < this.tauler.columnes; j++) {
                const casella = this.tauler.caselles[i][j];
                // Si la casella no és mina i no està revelada, encara no hem guanyat
                if (!casella.esMina && !casella.revelada) {
                    guanyat = false;
                    break;
                }
            }
            if (!guanyat)
                break;
        }
        if (guanyat) {
            this.jocAcabat = true;
            alert("Felicitats! Has guanyat!");
        }
    }
}
