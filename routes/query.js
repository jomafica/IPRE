var express = require('express');
var router = express.Router();
//const {spawn} = require('child_process');
let {PythonShell} = require('python-shell')

/* POST ip reputation. */
router.post('/', (req, res, next) => {

  let options = {
    mode: 'text',
    pythonPath: '/opt/homebrew/bin/python3.9',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './public/',
    args: [JSON.stringify(req.body)]
  };
//
//  const pyshell = PythonShell.run('backend_call.py', options, function (err, results) {
//    if (err) throw err;
//    // results is an array consisting of messages collected during execution
//    console.log('results: %j', results);
//    pyshell.end;
//  });
//
//  pyshell.on('message', function (message) {
//  // received a message sent from the Python script (a simple "print" statement)
//    console.log(message);
//  });

var pyshell = new PythonShell('backend_call.py', options);

    //pyshell.send(JSON.stringify(req.body));

    pyshell.on('message', (message) => {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
        res.setHeader('content-type', 'application/json');
        res.result = {
            message: message
        };
        next();
    });

    // end the input stream and allow the process to exit
    pyshell.end( (err) => {
        if (err) {
            res.error = {
                error: err
            }
        };

        console.log('finished');
        res.result
        next();

    });
}, (req, res) => {
    if (res.result) {
        
        res.status(200).json(res.result)
    } else {
        res.status(500).json(res.error)
    }
});



//});

module.exports = router;