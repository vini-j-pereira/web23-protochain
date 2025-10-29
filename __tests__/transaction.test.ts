import { describe, test, expect } from '@jest/globals';
import Transaction from '../src/lib/transaction';
import TransactionType from '../src/lib/transactionType';


describe("Transaction test", () => {

    test("Should be valid (REGULAR default)", () => {
        const tx = new Transaction({
            data: "tx 420"
        } as Transaction);
        const valid = tx.isValid();
        expect(valid.success).toBeTruthy();
    })

    test("Should NOT be valid (invalid hash)", () => {
        const tx = new Transaction({
            data: "tx 420",
            type: TransactionType.REGULAR,
            timestamp: Date.now(),
            hash: "1986"
        } as Transaction);
        const valid = tx.isValid();
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (FEE)", () => {
        const tx = new Transaction({
            data: "tx 420",
            type: TransactionType.FEE
        } as Transaction);
        const valid = tx.isValid();
        expect(valid.success).toBeTruthy();
    })

    test("Should be valid (invalid data)", () => {
        const tx = new Transaction();
        const valid = tx.isValid();
        expect(valid.success).toBeFalsy();
    })

})