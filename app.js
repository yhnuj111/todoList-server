const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let todoItems = [{
    id: 0,
    value: 'React',
    done: false,
    delete: false
}];

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    next();
});

app.get('/items', function (req, res) {
    res.send(todoItems);
});

app.post('/items-add', function (req, res) {
    if (req.body.todoItems) {
        todoItems = [...todoItems, req.body.todoItems];
    }
    res.send(todoItems);
})

app.delete('/items-delete', function (req, res) {
    if (req.body.id) {
        todoItems.forEach(todoItem => {
            if (todoItem.id == req.body.id) {
                todoItem.delete = true;
            }
        })
    }
    res.send(todoItems);
})

app.listen(8000, function () {
    console.log('Server running at http://127.0.0.1:8000/');
});