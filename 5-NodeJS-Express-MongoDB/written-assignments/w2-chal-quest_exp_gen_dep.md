cookie-parser
It reads incoming cookies from header and stores the data on the request Object. The data is then available on the cookies property of the request.
You can add further security to cookie by signing it with a secret which you can then parse with req.secret.
Ex: let cookieParser = require(‘cookie-parser’);
…
app.use(cookieParser())

      https://www.npmjs.com/package/cookie-parser

debug
A tool that helps you separate and color code different statements while your debugging. This package works in the browser and node.js. Debug give you a function that you pass your module name to and it uses the console logs everything for you.
var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

// app code…

debug('booting %o', name);

https://www.npmjs.com/package/debug

http-errors
This package creates HTTP errors for Express. You can pass a response status code and error message with the function createError. You can use the expose property to signal whether or not you want the message to be sent to client. For Example, you might not want to send back Internal server errors such as 500 or greater.

var createError = require(‘http-errors’);

var err = createError(404, ‘This video does not exist!’);

https://www.npmjs.com/package/http-errors

Chalk
A great tool for coloring console output.

const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));

https://www.npmjs.com/package/chalk

Cors
Allows cross-origin-resource-sharing. This package will allow an express app to receive request from applications on different domains.
var cors = require('cors')
var app = express()

app.use(cors())

https://www.npmjs.com/package/cors
