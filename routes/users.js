var express = require('express');
var router = express.Router();
var { ObjectId } = require('mongodb');
var issues = require('../models/issuemodel.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('issuestarter',{title:"Issue"});
});

router.get('/project_issues',(req,res) => {

   issues.find({}, (error, data) => {

     if (error)
       res.send(error)
     
   
     res.send(data);
   })
})



router.put('/closeissue',(req,res) => {
  var id = req.body.id;

  if (id !== "") {
    issues.findById({ _id: ObjectId(id)}, (error, data) => {

      if (error)
        res.send({
          "failed": "could not Close " + id
        })

      if(data!==null){
        
        data.status_text = "close" 
        
        data.save((error,data)=>{

          if(error)
              res.send({"failed":"could not save"})

           res.send({ "success": "Close " + data })
        })
       
    }
    })
  } else {
    res.send({
      "Error": "_id error"
    })
  }
})
module.exports = router;
