import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';
import Block from '../lib/block';

const PORT: number = 3000;

const app = express();

if (process.argv.includes("--run")) { app.use(morgan('tiny'))};

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
    if (!req.body.hash === undefined || req.body.hash === "" || !req.body.hash){
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

if (process.argv.includes("--run")) {app.listen(PORT, () => { console.log(`Blockchain server is running at ${PORT}`)})}

export {
    app
}