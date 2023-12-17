type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const successResponse = (method: Method, message: string, data?: {[key: string]: any}) => {
    const res: {method: Method, message: string, data?: {[key: string]: string}} = {
        method,
        message
    }

    if (data) res.data = data;
    
    return res;
};

export const failureResponse = (method: Method, message: string, error?: any) => {
    const res: {method: Method, message: string, error?: any} = {
        method,
        message
    }

    if (error) res.error = error;

    return res;
};
