import Block from '../src/lib/block';
import { describe, test, expect, beforeAll } from '@jest/globals';


describe("Block test", () => {

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
            data: "block 2"
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeTruthy();
    })

    test("Should NOT be valid (fallbacks)", () => {
        const block = new Block();
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should NOT be valid (previous hash)", () => {
        const block = new Block({
            index: 1, 
            previousHash: "abc", 
            data: "block 2"
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index);
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
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (hash)", () => {
        const block = new Block({
            index: 1, 
            previousHash: genesis.hash, 
            data: "block 2"
        } as Block);
        block.hash = "";
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (data)", () => {
        const block = new Block({
            index: 1, 
            previousHash: genesis.hash, 
            data: ""
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid", () => {
        const block = new Block({
            index: -1, 
            previousHash: genesis.hash, 
            data: "block 2"
        } as Block);
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

})