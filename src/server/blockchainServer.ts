import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';
import Block from '../lib/block';
import Transaction from '../lib/transaction';

/* c8 ignore start*/
const PORT: number = parseInt(`${process.env.BLOCKCHAIN_PORT || 3000}`);
/* c8 ignore stop*/
const app = express();
/* c8 ignore start*/
if (process.argv.includes("--run")) { app.use(morgan('tiny')) };
/* c8 ignore stop*/
app.use(express.json());

const blockchain = new Blockchain();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        numberOfBlocks: blockchain.blocks.length,
        isValid: blockchain.isValid(),
        lasBlock: blockchain.getLastBlock()
    })
})

app.get('/blocks/next', (req: Request, res: Response, next: NextFunction) => {
    res.json(blockchain.getNextBlock());
})

app.get('/blocks/:indexOrHash', (req: Request, res: Response, next: NextFunction) => {
    let block;
    if (/^[0-9]+$/.test(req.params.indexOrHash))
        block = blockchain.blocks[parseInt(req.params.indexOrHash)];
    else
        block = blockchain.getBlock(req.params.indexOrHash);

    if (!block) {
        res.sendStatus(404);
    } else {
        res.json(block);
    }
})

app.post('/blocks', (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.hash === undefined || req.body.hash === "" || !req.body.hash) {
        return res.sendStatus(422);
    }

    const block = new Block(req.body as Block);
    const validation = blockchain.addBlock(block);

    if (validation.success) {
        res.status(201).json(block);
    }
    else {
        res.status(400).json(validation);
    }
})

app.get('/transactions/{:hash}', (req: Request, res: Response, next: NextFunction) => {
    if (req.params.hash) {
        res.json(blockchain.getTransaction(req.params.hash));
    }
    else {
        res.json({
            next: blockchain.mempool.slice(0, Blockchain.TX_PER_BLOCK),
            total: blockchain.mempool.length
        });
    }
})

app.post('/transactions', (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.hash === undefined) {
        return res.sendStatus(422);
    }

    const tx = new Transaction(req.body as Transaction);
    const validation = blockchain.addTransaction(tx)

    if (validation.success) {
        res.status(201).json(tx);
    }
    else {
        res.status(400).json(validation);
    }
})

/* c8 ignore start*/
if (process.argv.includes("--run")) { app.listen(PORT, () => { console.log(`Blockchain server is running at ${PORT}`) }) }
/* c8 ignore stop*/
export {
    app
}