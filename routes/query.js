var express = require('express');
const {spawn} = require('child_process');
var router = express.Router();

/* POST ip reputation. */
router.post('/', function(req, res) {
  var process = spawn('python', ["./backend_call.py",req.body]);

  process.stdout.on('data', function (data) {
    try {
      var jsonString = data.toString('utf8'); 
      var arraySuggestions = new Array(); 
      if(FUNCTIONS.equalsIgnoreCase(jsonString,'None\n')){

      }
      else{
        var str = jsonString.replace(/\'/g,'\"'); 
        arraySuggestions = JSON.parse(str); 
        res.send(finalResult);
      }  
    }
    catch (e) {
      console.log(e);
    }
  });
});

module.exports = router;