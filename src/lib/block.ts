import sha256 from 'crypto-js/sha256';
import Validation from './validation';
import BlockInfo from './blockInfo';
import Transaction from './transaction';
import TransactionType from './transactionType';

export default class Block {   // Iniciando a Classe Block
    // Criação de seu Atributos
    index: number;           // O Index é o numero referente a posição do Bloco na chain
    timestamp: number;      // Otimestamp é uma representação numérica de um ponto no tempo, especificico refrente ao "Época do Unix" 
    hash: string;          // O hash é a impressão digital do bloco que garante sua segurança e ligação na blockchain.
    previousHash: string; // Cada bloco tem seu próprio hash e o hash do bloco anterior, o que mantém todos ligados e garante a segurança da blockchain. 
    transactions: Transaction[];        // O data e responsalve por receber e armazenar todos os dados de um bloco
    nonce: number;
    miner: string

    constructor(block?: Block) { // O constructor serve para indicar como sera inicializado o nosso objeto  
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";

        this.transactions = block?.transactions
            ? block.transactions.map(tx => new Transaction(tx))
            : [] as Transaction[];

        this.nonce = block?.nonce || 0;
        this.miner = block?.miner || "";
        this.hash = block?.hash || this.getHash();

    }

    getHash(): string {
        const txs = this.transactions && this.transactions.length
            ? this.transactions.map(tx => tx.hash).reduce((a, b) => a + b)
            : "";
        return sha256(this.index + txs + this.timestamp + this.previousHash + this.nonce + this.miner).toString();
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

    isValid(previousHash: string, previuIndex: number, difficulty: number): Validation {

        if (this.transactions && this.transactions.length) {
            if (this.transactions.filter(tx => tx.type === TransactionType.FEE).length > 1) {
                return new Validation(false, "Too may fees.");
            }
                

            const validation = this.transactions.map(tx => tx.isValid());
            const errors = validation.filter(v => !v.success).map(v => v.message);
            if (errors.length > 0) {
                return new Validation(false, "Invalid block due to invalid tx: " + errors.reduce((a, b) => a + b));
            }
                

        }


        if (previuIndex !== this.index - 1) return new Validation(false, "Invalide index.");
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

    static fromBlockInfo(blockInfo: BlockInfo): Block {
        const block = new Block();
        block.index = blockInfo.index;
        block.previousHash = blockInfo.previousHash;
        block.transactions = blockInfo.transactions;
        return block;
    }
}