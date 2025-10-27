import { compile } from 'morgan';
import Block from '../src/lib/block';
import { describe, test, expect, beforeAll } from '@jest/globals';


describe("Block test", () => {

    const exDifficulty = 0;
    const exMiner = "Miner";
    let genesis: Block;

    beforeAll(() => {
        genesis = new Block({
            data: "Genesis Block"
        } as Block);
    })

    test("Should be valid", () => {

        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            data: "block 2",
        } as Block);
        block.mine(exDifficulty, exMiner)
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeTruthy();
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
            data: "block 2"
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (timestamp)", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            data: "block 2"
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
            data: "block 2"
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
            data: ""
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid", () => {
        const block = new Block({
            index: -1,
            previousHash: genesis.hash,
            data: "block 2"
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test("Should NOT be valid - invalid proof of work", () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            data: "block with invalid POW",
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
            data: "unmined block",
            // nonce e miner não são definidos - bloco não foi minerado
        } as Block);
        // NÃO chame block.mine() - isso deixaria o bloco sem nonce e miner

        const valid = block.isValid(genesis.hash, genesis.index, exDifficulty);
        console.log(valid.message);
        expect(valid.success).toBeFalsy();
        expect(valid.message).toBe("No mined.");
    });


})