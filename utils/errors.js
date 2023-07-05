class IncorrectRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IncorrectRequestError';
        this.message = message;
        this.statusCode = 400;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.message = message;
        this.statusCode = 401;
    }
}

class DeletionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DeletionError';
        this.message = message;
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.message = message;
        this.statusCode = 404;
    }
}

class EmailIsBusyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailIsBusy';
        this.message = message;
        this.statusCode = 409;
    }
}

module.exports = {
    IncorrectRequestError,
    UnauthorizedError,
    DeletionError,
    NotFoundError,
    EmailIsBusyError
};