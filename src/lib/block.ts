import sha256 from 'crypto-js/sha256';
import Validation from './validation';

export default class Block {   // Iniciando a Classe Block
    // Criação de seu Atributos
    index: number;           // O Index é o numero referente a posição do Bloco na chain
    timestamp: number;      // Otimestamp é uma representação numérica de um ponto no tempo, especificico refrente ao "Época do Unix" 
    hash: string;          // O hash é a impressão digital do bloco que garante sua segurança e ligação na blockchain.
    previousHash: string; // Cada bloco tem seu próprio hash e o hash do bloco anterior, o que mantém todos ligados e garante a segurança da blockchain. 
    data: string;        // O data e responsalve por receber e armazenar todos os dados de um bloco
    nonce: number;
    miner: string

    constructor(block?: Block) { // O constructor serve para indicar como sera inicializado o nosso objeto  
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.data = block?.data || "";
        this.nonce = block?.nonce || 0;
        this.miner = block?.miner || "";
        this.hash = block?.hash || this.getHash();

    }

    getHash(): string {
        return sha256(this.index + this.data + this.timestamp + this.previousHash + this.nonce + this.miner).toString();
    }

    mine(difficulty: number, miner: string) {
        this.miner = miner;
        const prefix = new Array(difficulty + 1).join("0");

        do {
            this.nonce++;
            
            this.hash = this.getHash();
        }
        while (!this.hash.startsWith(prefix));
    }

    isValid(previousHash: string, previuIndex: number, difficulty: number): Validation {     // função de validação do Bloco essa função e expecifica para essa classe
        if (previuIndex !== this.index - 1) return new Validation(false, "Invalide index."); // A utilização do (this) --> ...
        if (!this.data) return new Validation(false, "Invalide data.");
        if (this.timestamp < 1) return new Validation(false, "Invalide timestamp.");
        if (this.previousHash !== previousHash) return new Validation(false, "Invalide previousHas.");
        if (!this.nonce || !this.miner) return new Validation(false, "No mined.");

        if (this.hash !== this.getHash()) {
            return new Validation(false, "Invalide hash.");
        }

        const prefix = new Array(difficulty + 1).join("0");
        if (!this.hash.startsWith(prefix)) {
            return new Validation(false, "Proof of work is invalid.");
        }

        return new Validation();
    }
}