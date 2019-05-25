
document.addEventListener("DOMContentLoaded",()=>{


    var edit= document.getElementById('edit')
    var formdata = document.getElementById('editForm');
    edit.addEventListener("click",(e)=>{

        e.preventDefault();
        
        var edit_Data = new FormData(formdata);
        console.log(edit_Data)
        

        var editdataurl = new URLSearchParams();

        for(const pair of edit_Data){
            editdataurl.append(pair[0],pair[1]);
        }

        fetch('/api/issues', {
            method: 'put',
            body: editdataurl
        }).then(response=>response.json()).then(response=>console.log(response))

    })


    var del = document.querySelector("#del")
    var delData = document.getElementById('delete')
    del.addEventListener("click",(e)=>{
        e.preventDefault();

        var del_data = new FormData(delData);

        var editdataurl = new URLSearchParams();

         for (const pair of del_data) {
             
             editdataurl.append(pair[0], pair[1]);
         }

         fetch('/api/issues', {
             method: 'delete',
             body: editdataurl
         }).then(response => response.json()).then(response => console.log(response))
    })


  
})

