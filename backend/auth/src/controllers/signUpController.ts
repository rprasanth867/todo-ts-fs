import { Request, Response } from "express";
import { Method, failureResponse } from "../models/responseModels";
import { queryPromise } from "../configs/mysqlConfig";
import { MESSAGES } from "../models/constants";


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, gender } = req.body;
    const method: Method = req.method as Method;

    if (!name || !email || !password || !gender) {
        res.status(400).json(failureResponse(method, 'name, email, password, gender should not be empty'));
    }

    try {
        const query: string = 'INSERT INTO users (name, email, password, gender) values (?, ?, ?, ?)';
        await queryPromise(query, [name, email, password, gender]);
        res.sendStatus(204);
    } catch (err) {
        console.log('### ERROR OCCURRED ###', err);
        res.status(500).json(failureResponse(method, MESSAGES.failurePost, err));
    }
};
