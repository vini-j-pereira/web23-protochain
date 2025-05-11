export default class Block {  // Criação da Classe Block
    index: number;        //Criação de seu Atributos
    hash: string;

    constructor(index: number, hash: string){ // O constructor serve para indicar como sera inicializado o nosso objeto  
        this.index = index;
        this.hash = hash;
    }

    isValid(): boolean {     // função de validação do Bloco essa função e expecifica para essa classe
        if(this.index < 0) return false; // A utilização do (this) --> ...
        if(!this.hash) return false;      //^^^ se faz necessaria para expecificar que queremos o atributo de quem chamou a função 
        return true;
    }
}