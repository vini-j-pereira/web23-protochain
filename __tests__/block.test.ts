import { describe, test, expect, beforeAll, jest } from '@jest/globals';
import Block from '../src/lib/block';
import BlockInfo from '../src/lib/blockInfo';
import Transaction from '../src/lib/transaction';
import TransactionType from '../src/lib/transactionType';

jest.mock('../src/lib/transaction');

describe("Block test", () => {

    const exDifficulty = 0;
    const exMiner = "Miner";
    let genesis: Block;

    beforeAll(() => {
        genesis = new Block({
            transactions: [new Transaction({
                data: "Genesis Block",
            } as Transaction)]
        } as Block);
    })

    test("Should be valid", () => {

        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        block.mine(exDifficulty, exMiner)
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeTruthy();
    })

    test("Should create from block info", () => {
        const block = Block.fromBlockInfo({
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)],
            difficulty: exDifficulty,
            feePerTx: 1,
            index: 1,
            maxDifficulty: 62,
            previousHash: genesis.hash
        } as BlockInfo)
        block.mine(exDifficulty, exMiner)

        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeTruthy();
    })

    test("Should NOT be valid(2 FEE)", () => {

        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [
                new Transaction({
                    type: TransactionType.FEE,
                    data: "FEE1"
                } as Transaction),
                new Transaction({
                    type: TransactionType.FEE,
                    data: "FEE2"
                } as Transaction)
            ]
        } as Block);
        block.mine(exDifficulty, exMiner)
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

        test("Should NOT be valid(invalid tx)", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction()]
        } as Block);
        block.mine(exDifficulty, exMiner)
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should NOT be valid (fallbacks)", () => {
        const block = new Block();
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should NOT be valid (previous hash)", () => {
        const block = new Block({
            index: 1,
            previousHash: "abc",
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (timestamp)", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        block.timestamp = -1;
        block.hash = block.getHash();
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (empty miner)", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        block.mine(exDifficulty, exMiner)
        block.hash = "";
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (data)", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid", () => {
        const block = new Block({
            index: -1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should NOT be valid - invalid proof of work", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "block with invalid POW"
            } as Transaction)]

        } as Block);

        // Mine with low difficulty but validate with high difficulty
        block.mine(0, exMiner); // Mine with difficulty 0

        const valid = block.isValid(genesis.hash, genesis.index, 2); // Validate with difficulty 2
        console.log(valid.message);
        expect(valid.success).toBeFalsy();
        expect(valid.message).toBe("Proof of work is invalid.");

    });

    test("Should NOT be valid - block not mined (missing nonce and miner)", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "unmined block"
            } as Transaction)]

            // nonce e miner não são definidos - bloco não foi minerado
        } as Block);
        // NÃO chame block.mine() - isso deixaria o bloco sem nonce e miner

        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        console.log(valid.message);
        expect(valid.success).toBeFalsy();
        expect(valid.message).toBe("No mined.");
    });


})