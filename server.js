import express from "express";
const app = express();

const PORT = 3000;
const INTERVAL = process.argv[2];
const TIME = process.argv[3];

const inServer = interval => {
    return setInterval(() => {
        const date = new Date().toISOString();
        console.log(date);
    }, interval);
}

const toRunServer = (interval, time, port) => {
    if(interval === undefined && time === undefined){
        return;
    }

    app.get('/', (req, res) => {
        const timer = inServer(interval);
        setTimeout(() => {
            const date = new Date().toISOString();
            res.write(date);
            res.end();
            clearInterval(timer);
        }, time);
    });

    const server = app.listen(port, () => {
        console.log(`Server is running: ${port}`);
    });
}

toRunServer(INTERVAL, TIME, PORT);