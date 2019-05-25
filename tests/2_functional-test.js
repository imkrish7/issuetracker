

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;

const server = require('../routes/index');

chai.use(chaiHttp);

suite("Functional Tests ", () => {

      suite('POST /api/issues/{project} => object with issue data', function () {

          test('Every field filled in', function (done) {
              chai.request(server)
                  .post('/api/issues/test')
                  .send({
                      title: 'Title',
                      text_issue: 'text',
                      created: 'Functional Test - Every field filled in',
                      assigned: 'Chai and Mocha',
                      status: 'In QA'
                  })
                  .end(function (err, res) {
                      assert.equal(res.status, 200);
                      assert.isObject(res.body);
                      assert.equal(res.body.title,title)
                      assert.equal(res.body.issue_text,text_issue)
                      assert.equal(res.body.created_by,created)
                      assert.equal(res.body.assigned_to,assigned);
                      assert.equal(res.body.status,status)
                      done();
                  });
          });

          test('Required fields filled in', function (done) {

            chai.request(server)
                .post('/api/issues/test')
                .send({
                    title: 'Title',
                    text_issue: 'text',
                    created: 'Functional Test - Every field filled in',
                })
                .end((error,res)=>{
                     assert.equal(res.status, 200);
                     assert.isObject(res.body);
                     assert.equal(res.body.title, title)
                     assert.equal(res.body.issue_text, text_issue)
                     assert.equal(res.body.created_by, created)
                     assert.equal(res.body.assigned_to, "Tech Support");
                     assert.equal(res.body.status, "open")
                     done();
                })

          });

          test('Missing required fields', function (done) {

            console.log("It would not happen because form would not submited without required file")
            // chai.request(server)
            //     .post

          });

      });


      suite('PUT /api/issues/{project} => text', function () {

          test('No body', function (done) {
                 console.log("It would not happen because form would not submited without required file")
          });

          test('One field to update', function (done) {

            chai.request(server)
                .put('/api/issues')
                .send({
                    id: '5ce831702b2bb82b9012c898',
                    issueText: "It's Bizarr"
                })
                end((err,res)=>{
                    res.equal(res.status,200);
                    res.equal(res.body._id, id)
                    res.equal(res.body.issue_text,issueText)
                    done()
                })
          });

          test('Multiple fields to update', function (done) {

                chai.request(server)
                    .put('/api/issues')
                    .send({
                        id: '5ce831702b2bb82b9012c898',
                        created: "Krishna",
                        assigned: "Tech Support"
                    })
                end((err, res) => {
                    res.equal(res.status, 200);
                    res.equal(res.body._id,id);
                    res.equal(res.body.created_by, created)
                    res.equal(res.body.assigned_to,assigned)
                    done()
                })
          });

      });


       suite('GET /api/issues/{project} => Array of objects with issue data', function () {

           test('No filter', function (done) {
               chai.request(server)
                   .get('/api/issues')
                   .query({})
                   .end(function (err, res) {
                       assert.equal(res.status, 200);
                       assert.isArray(res.body);
                       assert.property(res.body[0], 'issue_title');
                       assert.property(res.body[0], 'issue_text');
                       assert.property(res.body[0], 'created_on');
                       assert.property(res.body[0], 'updated_on');
                       assert.property(res.body[0], 'created_by');
                       assert.property(res.body[0], 'assigned_to');
                       assert.property(res.body[0], 'open');
                       assert.property(res.body[0], 'status_text');
                       assert.property(res.body[0], '_id');
                       done();
                   });
           });

           test('One filter', function (done) {
                        chai.request(server)
                            .get('/api/issues/projectName')
                            .query({})
                            .end(function (err, res) {
                                assert.equal(res.status, 200);
                                assert.isArray(res.body);
                                assert.property(res.body[0], 'issue_title');
                                assert.property(res.body[0], 'issue_text');
                                assert.property(res.body[0], 'created_on');
                                assert.property(res.body[0], 'updated_on');
                                assert.property(res.body[0], 'created_by');
                                assert.property(res.body[0], 'assigned_to');
                                assert.property(res.body[0], 'open');
                                assert.property(res.body[0], 'status_text');
                                assert.property(res.body[0], '_id');
                                done();
                            });
           });

           test('Multiple filters (test for multiple fields you know will be in the db for a return)', function (done) {
                chai.request(server)
                    .get('/api/issues/projectName')
                    .query({
                        open: false,
                        created_by: "Krishna"
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.isArray(res.body);
                        assert.property(res.body[0].status_text, open);
                        assert.property(res.body[0].created_by, created_by);
                        done();
                    });
           });

       });

       suite('DELETE /api/issues/{project} => text', function () {

           test('No _id', function (done) {
                chai.request(server)
                    .delete('/api/issues')
                    .send({
                        id:""
                    })
                    .end((error,res) => {
                        assert.equal(res.status,200)
                        assert.equal(res.body.Error, "_id error")
                        done()
                    })
           });

           test('Valid _id', function (done) {

             test('No _id', function (done) {
                 chai.request(server)
                     .delete('/api/issues')
                     .send({
                         id: "5ce831702b2bb82b9012c898"
                     })
                     .end((error, res) => {
                         assert.equal(res.status, 200)
                         assert.equal(res.body.success, "Deleted " + id)
                         done()
                     })
             });
           });

       });

}) 