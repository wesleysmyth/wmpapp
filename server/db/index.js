const conn = require('./conn');
const Teacher = require('./models/Teacher');
const Class = require('./models/Class');
const AgeGroup = require('./models/AgeGroup');
const Term = require('./models/Term');
const School = require('./models/School');
const Exchange = require('./models/Exchange');

const ageGroupData = require('../constants/ageGroups');
const termData = require('../constants/terms');

Class.belongsTo(Teacher);
Teacher.hasMany(Class);

Class.belongsTo(AgeGroup);
AgeGroup.hasMany(Class);

Class.belongsTo(Term);
Term.hasMany(Class);

Class.belongsTo(School);
School.hasMany(Class);

Exchange.belongsTo(Class, { as:  'classA' }); // creates classAId on Exchange
Exchange.belongsTo(Class, { as:  'classB' }); // creates classBId on Exchange

const teachers = [
    {
        firstName: 'Leonard',
        lastName: 'Alnes',
        email: 'k@m.com',
        password: 'z'
    },
    {
        firstName: 'Moon',
        lastName: 'Alnes',
        email: 'moon@m.com',
        password: 'z'
    },
    {
        firstName: 'Nacy',
        lastName: 'Yo yo',
        email: 'cantstopnanc@m.com',
        password: 'z'
    },
    {
        firstName: 'Corn',
        lastName: 'Flakes',
        email: 'cornstar88@m.com',
        password: 'z'
    },
    {
        firstName: 'Corny',
        lastName: 'Flakes',
        email: 'kris.alnes@gmail.com',
        password: 'z'
    }
];

const schools = [
    {
        schoolName: 'Åse Barneskole',
        address1: 'Åsegjerdet 24',
        zip: '6017',
        city: 'Ålesund',
        state: null,
        country: 'NO'
    },
    {
        schoolName: 'PS 66',
        address1: '101 Groton Long Point Rd',
        zip: '06340',
        city: 'Groton',
        state: 'CT',
        country: 'US'
    },
    {
        schoolName: 'Lerstad Barneskole',
        address1: 'Kyrkjehaugen 2',
        address2: '',
        zip: '6014',
        city: 'Ålesund',
        state: 'Møre og Romsdal',
        country: 'NO'
    },
    {
        schoolName: 'Enghaveskolen',
        address1: 'Roesskovsvej 125',
        address2: '',
        zip: '5200',
        city: 'Odense',
        state: '',
        country: 'DK'
    },
    {
        schoolName: 'Trinity Primary and Preschool',
        address1: 'P.O Box 6391',
        address2: '',
        zip: '',
        city: 'Uganda',
        state: 'Bukoto-Mukalazi Zone Kampala',
        country: 'DK'
    }
];

const classes = [
    {
        teacherId: 1,
        name: '1A',
        size: 30,
        ageGroupId:1,
        termId: 1,
        schoolId: 2
    },
    {
        teacherId: 4,
        name: '4E',
        size: 28,
        termId: 1,
        ageGroupId: 1,
        schoolId: 4
    },
    {
        teacherId: 5,
        name: '5G',
        size: 28,
        termId: 1,
        ageGroupId: 1,
        schoolId: 5
    },
    {
        teacherId: 1,
        name: '1B',
        size: 28,
        ageGroupId: 1,
        termId: 1,
        schoolId: 1
    },
    {
        teacherId: 2,
        name: '3F',
        size: 28,
        ageGroupId: 1,
        termId: 1,
        schoolId: 2
    },
    {
        teacherId: 2,
        name: '4E',
        size: 28,
        termId: 2,
        ageGroupId: 2,
        schoolId: 3
    },
    // class that will match with xx
    {
        teacherId: 3,
        name: 'yy',
        size: 28,
        termId: 2,
        ageGroupId: 2,
        schoolId: 1
    },
    // class that will not find  match
    {
        teacherId: 1,
        name: 'xx',
        size: 28,
        termId: 2,
        ageGroupId: 2,
        schoolId: 5
    }
]

const date = new Date();
const expires = date.setDate(date.getDate() + 7);

const exchanges = [
    {
        status: 'pending',
        classAId: 1,
        classBId: 2,
        verifyExchangeToken: 'ECd2gFnExPx4H8uRz25XwfCaGQy9Wl0Op',
        verifyExchangeTokenExpires: expires
    },
    {
        status: 'initiated',
        classAId: 3
    },
    {
        status: 'initiated',
        classAId: 4
    },
    {
        status: 'initiated',
        classAId: 5
    },
    {
        status: 'initiated',
        classAId: 7
    },
    {
        status: 'initiated',
        classAId: 6
    }
]


const sync = () => conn.sync({ force: true });

const seed = () => {
    return sync({ force: true })
        .then(() => {

            const teacherPromises = teachers.map(teacher => {
                return Teacher.create(teacher);
            })
            return Promise.all(teacherPromises)
            .then(result => {
                const ageGroupPromises = ageGroupData.map(group => AgeGroup.create(group));
                const termPromises = termData.map(term => Term.create(term));
                const schoolPromises = schools.map(school => School.create(school));

                return Promise.all([...ageGroupPromises, ...termPromises, ...schoolPromises]);
            })
            .then(result => {
                const classPromises = classes.map((_class, i) => Class.create(_class));

                return Promise.all(classPromises);
            })
            .then(classes => {
                const exchangePromises = exchanges.map(exchange => Exchange.create(exchange));
                return Promise.all(exchangePromises);
            })
        })
        .catch((error) => {
            console.log('error===', error)
        })
}

module.exports = {
    sync,
    seed,
    conn,
    models: {
        Teacher,
        Class,
        AgeGroup,
        Term,
        School,
        Exchange
    }
}
