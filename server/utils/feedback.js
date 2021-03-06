const { ERROR } = require('../db/firstSeed/feedbackTypes');

const feedback = (type, messages) => {
    return { type, messages }
};

const extractSequelizeErrorMessages = (error, defaultError) => {
    if (typeof error === 'string') {
        return [ error ];
    } else if (error && error.name && (error.name.indexOf('SequelizeDatabaseError') > -1) && !error.errors) {
       return [ defaultError ];
    } else if (error && error.name &&(error.name.indexOf('Sequelize') > -1) && error.errors) {
        return error.errors.map(err => err.message);
    } else {
        return [ defaultError ];
    }
};

const sendError = (errorCode, error, defaultError, res) => {
    const errorMessages = extractSequelizeErrorMessages(error, defaultError);
    return res.status(errorCode).send({ feedback: feedback(ERROR, errorMessages) });
}

module.exports = {
    feedback,
    extractSequelizeErrorMessages,
    sendError
};
