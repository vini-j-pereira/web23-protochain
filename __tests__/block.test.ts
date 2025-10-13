import Block from '../src/lib/block';
import { describe, test, expect, beforeAll } from '@jest/globals';


describe("Block test", () => {

    let genesis: Block;

    beforeAll(() => {
        genesis = new Block(0, "", "Genesis Block");
    })

    test("Should be valid", () => {
        const block = new Block(1, genesis.hash, "block 2");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeTruthy();
    })

    test("Should NOT be valid (previous hash)", () => {
        const block = new Block(1, "abc", "block 2");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (timestamp)", () => {
        const block = new Block(1, genesis.hash, "block 2");
        block.timestamp = -1;
        block.hash = block.getHash();
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (hash)", () => {
        const block = new Block(1, genesis.hash, "block 2");
        block.hash = "";
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (data)", () => {
        const block = new Block(1, genesis.hash, "");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid", () => {
        const block = new Block(-1, genesis.hash, "block 2");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

})