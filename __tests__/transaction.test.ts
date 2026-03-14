import { describe, test, expect, jest } from '@jest/globals';
import Transaction from '../src/lib/transaction';
import TransactionType from '../src/lib/transactionType';
import TransactionInput from '../src/lib/transactionInput';

jest.mock('../src/lib/transactionInput')


describe("Transaction test", () => {

    test("Should be valid (REGULAR default)", () => {
        const tx = new Transaction({
            txInput: new TransactionInput(),
            to: 'carteitaTo'
        } as Transaction);
        const valid = tx.isValid();
        expect(valid.success).toBeTruthy();
    })

    test("Should NOT be valid (invalid hash)", () => {
        const tx = new Transaction({
            txInput: new TransactionInput(),
            to: 'carteitaTo',
            type: TransactionType.REGULAR,
            timestamp: Date.now(),
            hash: "1986"
        } as Transaction);
        const valid = tx.isValid();
        expect(valid.success).toBeFalsy();
    })

    test("Should be valid (FEE)", () => {
        const tx = new Transaction({
            to: 'carteitaTo',
            type: TransactionType.FEE
        } as Transaction);
        const valid = tx.isValid();
        expect(valid.success).toBeTruthy();
    })

    test("Should be valid (invalid txInput)", () => {
        const tx = new Transaction();
        const valid = tx.isValid();
        expect(valid.success).toBeFalsy();
    })

})