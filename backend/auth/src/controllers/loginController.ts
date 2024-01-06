import { Request, Response } from "express";
import { Method, failureResponse, successResponse } from "../models/responseModels";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";
import { queryPromise } from "../configs/mysqlConfig";
import { MESSAGES } from "../models/constants";

export const authenticateUserLogin = async (req: Request, res: Response) => {
    const { email, password }: {email: string | undefined, password: string | undefined} = req.body;
    const method: Method = req.method as Method;

    if (!email || !password) {
        res.status(400).json(failureResponse(method, 'Email and Password should not be empty'));
    }

    try {
        const query = 'SELECT * FROM users;'
        const users = await queryPromise(query);
        let user: {[key: string]: any} | undefined = users.find((user: any) => user.email === email);
        user = JSON.parse(JSON.stringify(user));

        if (user) {
            if (user.password === password) {
                const payload = {
                    token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                }
                const addRefreshQuery = 'INSERT INTO refresh_tokens (jwt_token, user_id) values (?, ?)';
                await queryPromise(addRefreshQuery, [payload.refresh_token, user.user_id]);
                res.status(200).json(successResponse(method, 'Authenticated User Successfully', payload));
            } else {
                res.status(400).json(failureResponse(method, 'Email or Password is incorrect'));
            }
        } else {
            res.status(404).json(failureResponse(method, 'User not found'));
        }
    } catch(err) {
        console.log('### ERROR OCCURRED ###', err);
        res.status(500).json(failureResponse(method, MESSAGES.serverError, err));
    }
};
