type Messages = {
    successGet: string,
    successPut: string,
    successPost: string,
    successDelete: string,

    failureGet: string,
    failurePut: string,
    failurePost: string,
    failureDelete: string,

    urlNotFound: string,
    serverError: string,
    unauthorized: string
}

export const MESSAGES: Messages = {
    successGet: 'Successfully fetched data',
    successPut: 'Successfully updated data',
    successPost: 'Successfully created data',
    successDelete: 'Successfully deleted data',

    failureGet: 'Failed to retrieve data',
    failurePut: 'Failed to update data',
    failurePost: 'Failed to create data',
    failureDelete: 'Failed to delete data',

    urlNotFound: 'URL not found on the server',
    serverError: 'Internal Server Error',
    unauthorized: 'Unathorized access !!'
};
