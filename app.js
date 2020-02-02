const express = require('express');
const app = express();
const PORT = 5000;

// set parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// data buatan
let courses = [
    {
        id: 1,
        title: 'React for Beginners',
        description: 'Learn React concepts step by step and build your React application.',
        price: 250000
    },
    {
        id: 2,
        title: 'Road to React Hooks',
        description: 'Understanding React Hooks and build quite complex application.',
        price: 200000
    },
    {
        id: 3,
        title: 'Getting Started with Node & Express',
        description: 'Learn Node and Express and build Restful services from scratch.',
        price: 250000
    }
];

app.get('/', (req, res, next) => {
    res.status(200).send('Hi from me!');
});

// show all data
app.get('/api/course', (req, res, next) => {
    res.status(200).json(courses);
});

// show single data
app.get('/api/course/:id', (req, res, next) => {
    // courses.find(data => {
    //     if (data.id == req.params.id) {
    //         return res.status(200).json(data);
    //     }
    // });

    var dataFix = courses.find(data => data.id == req.params.id);

    if (!dataFix) {
        return res.status(404).json({ message: `ID ${req.params.id} Tidak ditemukan!` });
    }

    res.status(200).json(dataFix);
});

// insert data
app.post('/api/course', (req, res, next) => {
    // pemborosan
    // const titleCourse = req.body.title;
    // const description = req.body.description;
    // const price = req.body.price;

    const { title, description, price } = req.body;

    var data = {
        id: courses.length + 1,
        title,
        description,
        price
    };

    courses.push(data);
    res.status(200).json(courses);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
