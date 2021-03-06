const conn = require('../conn');
const School = require('./School');
const Class = require('./Class');
const Sequelize = conn.Sequelize;
const phone = require('phone');
const { extractDataForFrontend } = require('../../utils/helpers');
const { saltHashPassword, validatePassword } = require('../../utils/security');


let Teacher = conn.define('teacher', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please fill in your first name.'}
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please fill in your last name.'}
        }
    },
    email: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'This email address is already registered.'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'The email you entered is not a valid email address.'
            },
            notEmpty: { msg: 'Please fill in email address.' },
        }
    },
    phone: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Phone number cannot be empty.'},
            isPhone(value) {
                if (value === '') {
                    return
                }

                const phoneValid = phone(value);

                if (!phoneValid.length) {
                    throw new Error('The number you entered is not valid phone number');
                }
            }
        }
    },
    salt: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    resetPasswordToken: Sequelize.STRING,
    resetPasswordExpires: Sequelize.DATE
})

Teacher.prototype.getFullname = function() {
    return this.firstName + ' ' + this.lastName;
}

Teacher.prototype.destroyTokens = function() {
    this.updateAttributes({
        resetPasswordExpires: null,
        resetPasswordToken: null
    });
};

// May want to make this async since node is single threaded
Teacher.beforeCreate((teacher) => {
    if (!teacher.password) {
        throw new Error('You need to enter a password.')
    }

    const hashedPw = saltHashPassword(teacher.password);
    teacher.salt = hashedPw.salt;
    teacher.password = hashedPw.passwordHash;
});


Teacher.beforeUpdate((teacher, options) => {
    if (options.fields.indexOf('password') > -1) {
        const hashedPw = saltHashPassword(teacher.password);
        teacher.salt = hashedPw.salt;
        teacher.password = hashedPw.passwordHash;
    }
});

// ClassMethods

Teacher.getTeacherAndAssociations = function(id) {
    return Teacher.findOne({
        where: { id },
        include: [ {
                model: Class,
                include: [ School ]
            }]
        })
        .then((teacher) => {
            if (!teacher){
                return null;
            }

            teacher = teacher.dataValues;

            // formats classes for FE dropdown
            if (teacher.classes) {
                teacher.schools = [];
                teacher.classes = teacher.classes.map((_class) => {
                    teacher.schools.push(_class.school.dataValues);
                    return {
                        label: _class.name,
                        value: _class.id
                    }
                });
            }
            return extractDataForFrontend(teacher, {})
    });
}

module.exports = Teacher;
