const http = require("http");
const url = require('url');
const handle = require('./controller/router')
const NotFoundRouting = require('./controller/handler/notFoundRouting')

function getUrl (req) {
    const urlParse = url.parse(req.url,true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}

let server = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath = '';
    if (arrPath.length > 2) {
        trimPath = arrPath[1] + '/' + arrPath[2];
    } else {
        trimPath = arrPath[arrPath.length - 1];
    }
    let chosenHandler;
    if (typeof handle[trimPath] === 'undefined') {
        chosenHandler = NotFoundRouting.notFound;
    } else {
        chosenHandler = handle[trimPath];
    }
    chosenHandler(req, res, +arrPath[3]);
})

server.listen(3000, () => {
    console.log('server is running http://localhost:3000/student/home')
})
