import sha256 from 'crypto-js/sha256';
import Validation from './validation';

export default class Block {   // Iniciando a Classe Block
                              // Criação de seu Atributos
    index: number;           // O Index é o numero referente a possição do Bloco na chain
    timestamp: number;      // Otimestamp é uma representação numérica de um ponto no tempo, especificico refrente ao "Época do Unix" 
    hash: string;          // O hash é a impressão digital do bloco que garante sua segurança e ligação na blockchain.
    previousHash: string; // Cada bloco tem seu próprio hash e o hash do bloco anterior, o que mantém todos ligados e garante a segurança da blockchain. 
    data: string;        // O data e responsalve por receber e armazenar todos os dados de um bloco  

    constructor(block?: Block){ // O constructor serve para indicar como sera inicializado o nosso objeto  
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.data = block?.data || "";
        this.hash = block?.hash || this.getHash();
    }

    getHash(): string{
        return sha256(this.index + this.data + this.timestamp + this.previousHash).toString();
    }

    isValid(previousHash: string, previuIndex: number): Validation {     // função de validação do Bloco essa função e expecifica para essa classe
        if(previuIndex !== this.index -1) return new Validation(false, "Invalide index."); // A utilização do (this) --> ...
        if(this.hash !== this.getHash()) return new Validation(false, "Invalide hash.");      //^^^ se faz necessaria para expecificar que queremos o atributo de quem chamou a função 
        if(!this.data) return new Validation(false, "Invalide data.");
        if(this.timestamp < 1) return new Validation(false, "Invalide timestamp.");
        if(this.previousHash !== previousHash) return new Validation(false, "Invalide previousHas.");
        return new Validation();
    }
}