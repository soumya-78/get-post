console.log("welcome to project 6");

// create some variable to change the parameter key value that is parameter1 and parameter2 etc
let paramsCount = 0;

//working on the part of content type and showing accordingly whether to show parameter box or json box;
let parametersbox = document.getElementById("parametersBox");
parametersbox.style.display = "none";

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener('click', () => {
    // console.log("clicked")
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";

})


let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener('click', () => {
    // console.log("clicked")
    document.getElementById("requestJsonBox").style.display = "block";
    document.getElementById("parametersBox").style.display = "none";

})

//to add parameter boxes using + button
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
    // console.log("clicked");
    let html = `<div id="parametersBox">
                     <div class="form-row my-2">
                         <label for="url" class="col-sm-2 col-form-label">Parameter ${paramsCount + 2}</label>
                         <div class="col-md-4">
                             <input type="text" class="form-control" id="parameterKey${paramsCount + 2}" placeholder="Enter Parameter ${paramsCount + 2} Key">
                         </div>
                         <div class="col-md-4">
                             <input type="text" class="form-control" id="parameterValue${paramsCount + 2}"
                              placeholder="Enter parameter ${paramsCount + 2} Value">
                         </div>                     
                         <button  class="btn btn-primary deleteParam"> - </button>
                     </div>`
    paramsCount++;
    let params = document.getElementById("params");
    params.innerHTML += html;


    //deleting part after clicking the "-" button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            // console.log("reached here");
            // var result = confirm("Want to delete?");
            // if (result) {
            //Logic to delete the item
            e.target.parentNode.remove();
            // }

        })
    }
})



//now after clicking the submit button i want to show the json folder
var submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    document.getElementById("responsePrism").innerHTML = "fetching response please wait...."
    // console.log("clicked");

    let url = document.getElementById("url").value;
    let requesttype = document.querySelector('input[name="requestType"]:checked').value;
    let contenttype = document.querySelector('input[name="contentType"]:checked').value;
    // console.log(contenttype)


    if (contenttype == 'params') {
        data = {};
        for (let i = 0; i < paramsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
                // console.log(document.getElementById('parameterKey' + 2).value)

            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("requestJsonText").value;
    }
    // console.log(url);
    // console.log(requesttype);
    // console.log(contenttype);
    console.log(data);

    if (requesttype == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById("responseJsonText").value = text;
                document.getElementById("responsePrism").innerHTML = text;
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById("responseJsonText").value = text;
                document.getElementById("responsePrism").innerHTML = text;
            });
    }

})