import jwt, { Secret } from "jsonwebtoken"

export const generateAccessToken = (data: any): string => {
    return jwt.sign(data, process.env.ACCESS_SECRET_TOKEN as Secret, {expiresIn: '1m'})
};

export const generateRefreshToken = (data: any): string => {
    return jwt.sign(data, process.env.REFRESH_SECRET_TOKEN as Secret);
};
