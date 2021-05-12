(function(){

    //check if area as the corret format data
    const input = document.getElementById("ips");
    const submit = (<HTMLInputElement>document.getElementById("submit"))
    var lista : Array<string> = [];
    let regex  = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/g);

    input.addEventListener("input",() => {
        var element = event.target as HTMLInputElement;
        if(regex.test(element.value)){
            console.log(element.value.match(regex))
            lista = element.value.match(regex)
            click(lista);
        } else { click([]) }
    },false);

    function click(arrays : Array<string>) {
        submit.addEventListener("click",() => {

            if(regex.test(arrays.toString())){
                console.log("Submited");

                var lst = new Array;

                if(arrays.length > 0) {
                    var l = arrays.length
                    for( var i = 0; i < l; i++) {
                        lst.push(arrays[i]);
                    }
                } else {
                    lst = arrays
                };


                var json = {ips: lst};

                const options = {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                
                // send post request and call function
                fetch('/query', options)
                    .then(res => res.json())
                    .then(res => createtable(res))
                    .catch(err => console.error(err));

            }
        });
    };


    function createtable(data: Object) {

        const tostring = JSON.stringify(data);
        const tojson = JSON.parse(tostring);

        const bodysearch = document.getElementById("bodysearch");

        const newdiv = document.createElement("div");
        newdiv.setAttribute("class","container pt-5");
        newdiv.setAttribute("id", "tablediv")

        const innerdiv = document.createElement("div");
        innerdiv.setAttribute("class","row p-3");

        const headdiv = document.createElement("div");
        headdiv.setAttribute("class","shadow-none pb-3 pt-3 bg-light rounded");

        const headdivbutton = document.createElement("button");
        headdivbutton.innerHTML = "Reset";
        headdivbutton.setAttribute("type","button");
        headdivbutton.setAttribute("class","btn btn-outline-primary rounded");
        headdivbutton.setAttribute("id","reset");
        headdivbutton.setAttribute("style","width: 10em;");

        //create table now
        const table = document.createElement("table");
        table.setAttribute("class", "table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const tre = document.createElement("tr");

        var finaldict = new Array;
        
        const rgx = /\'/g;
        for (var key in tojson) {
            if(tojson.hasOwnProperty(key)){
                finaldict = JSON.parse(tojson[key].replace(rgx, "\""))
            }
          }

        
        finaldict.forEach(elmnt => {
            for (const key in elmnt) {
                const th = document.createElement("th");
                th.setAttribute("scope","col");
                th.innerText = key
                tr.append(th)

                if (Object.prototype.hasOwnProperty.call(elmnt, key)) {
                    const element = elmnt[key]
                    const td = document.createElement("td");
                    td.innerText = element
                    tre.append(td)
                }
            }
        });


        thead.append(tr)
        table.append(thead)
        tbody.append(tre)
        thead.after(tbody)

        headdiv.append(headdivbutton)
        innerdiv.append(headdiv)
        newdiv.append(innerdiv)
        bodysearch.after(newdiv)
        headdiv.after(table)

        
    };



    //reset table and textarea
    document.getElementById("reset").addEventListener("click",function(){
        
        var form = (<HTMLInputElement>document.getElementById("tablediv"));
        form.remove()

        console.log("cleaned");

        } 
    );

})();
