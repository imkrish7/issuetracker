
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var issueSchema = new Schema({
    title: String,
    issue_text: String,
    created_by: String,
    assigned_to: String,
    status_text: String,
    created_on: Date,
    last_update: Date
    
})



module.exports = mongoose.model("Issue",issueSchema);