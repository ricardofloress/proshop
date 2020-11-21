import bcrypt from 'bcryptjs';
const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        phone: '916322152',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'jonhdoe@example.com',
        phone: '916322153',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        phone: '916322154',
        password: bcrypt.hashSync('123456', 10)
    }
];

export default users;