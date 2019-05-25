
document.addEventListener("DOMContentLoaded",() => {

    var issueList = document.getElementById('issueslist')
    var render = (response) =>{

        response.forEach(element => {
            var node = document.createElement('LI');
            var inode = document.createElement("P");
            var text = document.createTextNode("id : " + element._id)
            var title = document.createElement("H2");
            var titletext = document.createTextNode(element.title)
            var issues = document.createElement("P");
            var issueText = document.createTextNode(element.issue_text)
            var createdby = document.createElement("P")
            var createText = document.createTextNode("Created By : " + element.created_by);
            var assigned = document.createElement("P");
            var assignedText = document.createTextNode("Assigned : " + element.assigned_to)
            var created = document.createElement("P")
            var createdDate = document.createTextNode("Created On :" + element.created_on)
            var lastUpdate = document.createElement("P")
            var lastUpdateText = document.createTextNode("Last Updated On : " + element.last_update)
            var status = document.createElement("P")
            var div = document.createElement("DIV")
            var statusText = document.createTextNode("Status : " + element.status_text.toUpperCase())
            var close = document.createElement("Button")
            var closeText = document.createTextNode("Close")
            close.appendChild(closeText);
            var delet = document.createElement("Button")
            var deletText = document.createTextNode("Delete")
            delet.appendChild(deletText)
            delet.addEventListener("click", (e) => {
                e.preventDefault()
                var editdataurl = new URLSearchParams();
                editdataurl.append("id", element._id)
                fetch('/api/issues', {
                    method: 'delete',
                    body: editdataurl
                }).then(response => response.json()).then(response => {

                    window.location = '/apitest'
                })
            })
            close.addEventListener("click", (e) => {
                e.preventDefault()
                var editdataurl = new URLSearchParams();
                editdataurl.append("id", element._id)
                fetch('/apitest/closeissue', {
                    method: 'put',
                    body: editdataurl
                }).then(response => response.json()).then(response => {
                    
                    window.location = '/apitest'
                })
                
                close.disabled = true;

            })
            div.appendChild(close)
            div.appendChild(delet)

            status.appendChild(statusText)
            lastUpdate.appendChild(lastUpdateText)
            created.appendChild(createdDate);
            assigned.appendChild(assignedText)
            createdby.appendChild(createText)
            issues.appendChild(issueText)
            title.appendChild(titletext)
            inode.appendChild(text)
            node.appendChild(inode)
            node.appendChild(title)
            node.appendChild(issues)
            node.appendChild(createdby)
            node.appendChild(assigned)
            node.appendChild(created)
            node.appendChild(lastUpdate)
            node.appendChild(status)
            node.appendChild(div)
            if (element.status_text === "close") {
                node.setAttribute("class", "close")

            }
            issueList.appendChild(node)
        });
    }

    

      fetch('/apitest/project_issues')
          .then(response => response.json())
          .then(response => {

            render(response)
              
          })
})