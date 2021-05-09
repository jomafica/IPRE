var express = require('express');
var router = express.Router();
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

  var pyshell = new PythonShell('backend_call.py', options);

  pyshell.on('message', (message) => {
      //console.log(message);
      return res.result = {
          Results: message
      };
  });

  // end the input stream and allow the process to exit
  pyshell.end( (err) => {
      if (err) {
          return res.error = {
              error: err
          }
      };
      //console.log('finished');
      next();

    });
}, (req, res) => {
    if (res.result) {
        res.status(200).json(res.result)
    } else {
        res.status(500).json(res.error)
    }
});

module.exports = router;