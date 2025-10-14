// Mocked block class

import Validation from '../validation';

export default class Block {  // Criação da Classe Block
    index: number;
    timestamp: number;        //Criação de seu Atributos
    hash: string;
    previousHash: string;
    data: string;

    constructor(block?: Block){ // O constructor serve para indicar como sera inicializado o nosso objeto  
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.data = block?.data || "";
        this.hash = block?.hash || this.getHash();
    }

    getHash(): string{
        return this.hash || "abc";
    }

    isValid(previousHash: string, previuIndex: number): Validation {     // função de validação do Bloco essa função e expecifica para essa classe
        if(!previousHash || previuIndex < 0 || this.index < 0)
            return new Validation(false, "Invalid mock block.");

        return new Validation();
    }
}