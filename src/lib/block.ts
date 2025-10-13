import sha256 from 'crypto-js/sha256';

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

    isValid(previousHash: string, previuIndex: number): boolean {     // função de validação do Bloco essa função e expecifica para essa classe
        if(previuIndex !== this.index -1) return false; // A utilização do (this) --> ...
        if(this.hash !== this.getHash()) return false;      //^^^ se faz necessaria para expecificar que queremos o atributo de quem chamou a função 
        if(!this.data) return false;
        if(this.timestamp < 1) return false;
        if(this.previousHash !== previousHash) return false;
        return true;
    }
}