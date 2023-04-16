const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const db = require('./models')

const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});



