class IncorrectRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HTTP 400 Bad Request';
        this.message = message;
        this.statusCode = 400;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HTTP 401 Unauthorized';
        this.message = message;
        this.statusCode = 401;
    }
}

class DeletionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HTTP 403 Forbidden';
        this.message = message;
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HTTP 404 Page not found';
        this.message = message;
        this.statusCode = 404;
    }
}

class EmailIsBusyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HTTP 409 Conflict';
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