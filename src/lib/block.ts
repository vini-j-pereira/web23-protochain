import sha256 from 'crypto-js/sha256';
import Validation from './validation';

export default class Block {  // Criação da Classe Block
    index: number;
    timestamp: number;        //Criação de seu Atributos
    hash: string;
    previousHash: string;
    data: string;

    constructor(index: number, previousHash: string, data: string){ // O constructor serve para indicar como sera inicializado o nosso objeto  
        this.index = index;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.getHash();
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