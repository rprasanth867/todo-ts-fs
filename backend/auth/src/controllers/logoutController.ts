import { Response } from "express";
import { Method, failureResponse } from "../models/responseModels";
import { MESSAGES } from "../models/constants";
import { EnhancedRequest } from "../models/types/extendedTypes";
import { queryPromise } from "../configs/mysqlConfig";

export const logoutUser = async (req: EnhancedRequest, res: Response) => {
    const refresh_token: string = req.body.refresh_token;
    const method: Method = req.method as Method;

    if (!refresh_token) {
        res.status(400).json(failureResponse(method, 'refresh_token should not be empty'));
        return;
    }

    try {
        const getUserQuery = 'SELECT (user_id) FROM refresh_tokens WHERE jwt_token = ?';
        const user = await queryPromise(getUserQuery, [refresh_token]);
        if (user.length) {
            const deleteTokensQuery = 'DELETE FROM refresh_tokens WHERE user_id = ?';
            await queryPromise(deleteTokensQuery, [user[0].user_id]);
            res.sendStatus(204);
        } else {
            res.status(404).json(failureResponse(method, 'Refresh Token not found'));
        }
    } catch (err) {
        console.log('### ERROR OCCURRED ###', err);
        res.status(500).json(failureResponse(method, MESSAGES.serverError, err));
    }
};
