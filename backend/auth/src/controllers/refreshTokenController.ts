import { Response } from "express";
import { EnhancedRequest } from "../models/types/extendedTypes";
import { generateAccessToken } from "../utils/tokens";
import { queryPromise } from "../configs/mysqlConfig";
import { Method, failureResponse, successResponse } from "../models/responseModels";
import { MESSAGES } from "../models/constants";


export const generateNewToken = async (req: EnhancedRequest, res: Response) => {
    const user_id = req.user.user_id;
    const method: Method = req.method as Method;
    
    try {
        const getUserQuery = 'SELECT * FROM users WHERE user_id = ?;';
        const getUserQueryRes = await queryPromise(getUserQuery, [user_id]);
        const user = JSON.parse(JSON.stringify(getUserQueryRes[0]));
        const newAccessToken = generateAccessToken(user);
        const payload = {
            token: newAccessToken,
            refresh_token: req.body.refresh_token
        };
        res.status(200).json(successResponse(method, MESSAGES.tokenUpdated, payload));
    } catch(err) {
        console.log('### ERROR OCCURED ###', err);
        res.status(500).json(failureResponse(method, MESSAGES.serverError, err));
    }
};
