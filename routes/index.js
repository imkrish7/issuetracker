var express = require('express');
var bodyParser = require('body-parser');
var { ObjectId } = require('mongodb');
var router = express.Router();
var issues = require('../models/issuemodel.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Issue Tracker' });
});


router.post('/api/issues',(req,res)=>{

  var title = req.body.title;
  var issue_text = req.body.text_issue;
  var name = req.body.created;
  var assigned = req.body.assigned;
  var status = req.body.status;
  if (req.body.assigned == "") {
    assigned = "Tech Support";
  }
  if (req.body.status == "") {
    status = "open"
  };
  var created_on = new Date().toUTCString();
  var last_update = new Date().toUTCString();

  var newIssue= new issues({
    title:title,
    issue_text:issue_text,
    created_by:name,
    assigned_to:assigned,
    status_text:status,
    created_on: created_on,
    last_update: last_update
  })

  newIssue.save((error,data)=>{
    if(error)
         res.send(error);

    res.send(data);     
  })
  
})

router.put('/api/issues',(req,res)=>{

        var id = req.body.id;
        var title = req.body.title;
        var issueText = (req.body.issueText) ? req.body.issueText : " ";
        var created = (req.body.created) ? req.body.created : " ";
        var assigned = (req.body.assigned) ? req.body.assigned : " ";
        var status = (req.body.status)?req.body.status: " ";
        if(req.body.assigned == "0" ){
         assigned =  "Tech Support";
        }
        if (req.body.status == "0")
         {
           status = "open"
         };
        

        issues.findById({_id:ObjectId(id)},(error,data)=>{

          if(error)
              res.send(error)

          if(data!==null){
            
            data.issue_text = issueText;
            data.created_by = created;
            data.assigned_to = assigned;
            data.status_text = status;
            data.last_update = new Date().toUTCString();

            data.save((error,updata)=>{
              if(error)
                  res.send(error)


               res.send(updata);   
            })
          }  
          else{
            res.send({"Error":"No issue found with this id: "+ id})
          }  
        })
})

router.delete('/api/issues',(req,res)=>{
  var id = req.body.id;
  if(id !== ""){
  issues.findByIdAndDelete({_id:ObjectId(id)},(error,data) => {

    if(error)
        res.send({"failed":"could not delete " + id})

    res.send({"success":"Deleted "+ id })    
  })
}
else{
  res.send({"Error":"_id error"})
}
})

router.get('/api/issues/:projectName',(req,res) => {

  var query = {};

  query.title = (req.params.projectName)? req.params.projectName : " ";
  query.status_text = (req.query.open) ?req.query.open : " ";
  if(req.query.open == 'false'){
    query.status_text = "close"
  }
  query.created_by = (req.query.created_by )?req.query.created_by : " ";
  query.assigned_to = (req.query.assigned_to)? req.query.assigned_to : " ";
  


  issues.find(query,(error,data) => {

    if(error)
        res.send(error)

     res.send(data);    
  })   
})

module.exports = router;
