import { Request, Response } from "express";
import { queryPromise } from "../configs/mysqlConfig";
import { MESSAGES } from "../models/constants";
import { failureResponse, successResponse } from "../models/responseModels";


export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = 'SELECT * FROM todo_list;';
        const queryRes = await queryPromise(query);
        const formatedQueryRes = queryRes.map((todo: any) => ({...todo, is_completed: Boolean(todo.is_completed)}));
        const payload = successResponse('GET', MESSAGES.successGet, formatedQueryRes);
        res.status(200).json(payload);
    } catch (err: any) {
        console.log('### ERROR OCCURRED ###', err);
        const payload = failureResponse('GET', MESSAGES.failureGet, err);
        res.status(500).json(payload);
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { name, is_completed } = req.body;
        const query = 'INSERT INTO todo_list (name, is_completed) values (?, ?);';
        const queryRes = await queryPromise(query, [name, is_completed]);
        const payload = successResponse('POST', MESSAGES.successPost, queryRes);
        res.status(204).json(payload);
    } catch (err) {
        console.log('### ERROR OCCURRED ###', err);
        const payload = failureResponse('POST', MESSAGES.failurePost, err)
        res.status(500).json(payload);
    }
};

export const updateTodo = async (req: Request, res:  Response) => {
    try {
        const { name, is_completed } = req.body;
        const { todoId } = req.params;
        const query = `UPDATE todo_list SET name = ?, is_completed = ? WHERE todo_id = ?;`;
        const queryRes = await queryPromise(query, [name, is_completed, todoId]);
        const payload = successResponse('PUT', MESSAGES.successPut, queryRes);
        res.status(204).json(payload);
    } catch(err) {
        console.log('### ERROR OCCURRED ###', err);
        const payload = failureResponse('PUT', MESSAGES.failurePut, err);
        res.status(500).json(payload);
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { todoId } = req.params;
        const query = 'DELETE FROM todo_list WHERE todo_id = ?';
        const queryRes = await queryPromise(query, [todoId]);
        const payload = successResponse('POST', MESSAGES.successPost, queryRes);
        res.status(204).json(payload);
    } catch (err) {
        console.log('### ERROR OCCURRED ###', err);
        const payload = failureResponse('POST', MESSAGES.failurePost, err)
        res.status(500).json(payload);
    }
};
