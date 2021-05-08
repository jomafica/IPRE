var express = require('express');
var router = express.Router();
//const {spawn} = require('child_process');
let {PythonShell} = require('python-shell')

/* POST ip reputation. */
router.post('/', (req, res) => {

  let pyshell = new PythonShell('./public/backend_call.py',{ mode: 'text'});
  pyshell.send({ args: req.body});
  //res.send(answer); 
  
  // end the input stream and allow the process to exit
  pyshell.end(function (err,code,signal) {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
  });

});

module.exports = router;

/*
var process = spawn('python3', ["./public/backend_call.py","main(req.body)"]);

process.stdout.on('data',  (data) => {

  try {

    var jsonString = data.toString('utf8'); 
    var arraySuggestions = new Array(); 
    if(FUNCTIONS.equalsIgnoreCase(jsonString,'None\n')){

    }
    else{
      var str = jsonString.replace(/\'/g,'\"'); 
      arraySuggestions = JSON.parse(str); 
      res.send(arraySuggestions);
    }  
  }
  catch (e) {
    console.log(e);
  }
}); */