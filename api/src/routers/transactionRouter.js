import express from "express";
import { addTransaction, deleteTransaction, getTransaction } from "../modles/transModles/TransactionModel.js";
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const filter = {
            userId: authorization
        }
        const trans = await getTransaction(filter) || [];
        res.json({
            status: 'success',
            message: 'Return from get method transaction',
            trans,
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const result = await addTransaction(req.body)
        result?._id ?
            res.json({
                status: 'success',
                message: 'New transaction has been added'
            }) : res.json({
                status: 'error',
                message: 'Unable to add transaction'
            })
    } catch (error) {
        next(error)
    }
})

router.delete('/:_id', async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const { _id } = req.params;

        if (authorization && _id) {
            const filter = {
                userId: authorization,
                _id
            };
            const result = await deleteTransaction(filter);

            if (result._id) {
                res.json({
                    status: 'success',
                    message: 'Transaction has been deleted'
                });
            } else {
                res.json({
                    status: 'failure',
                    message: 'Transaction not found'
                });
            }
        } else {
            res.json({
                status: 'failure',
                message: 'Authorization or _id parameter missing'
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;