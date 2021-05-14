import MiniSearch from 'minisearch';

(function(){

    //check if area as the correct format data
    const input = document.getElementById("ips");
    const submit = (<HTMLInputElement>document.getElementById("submit"))
    let regex  = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/g);
    var lista: Array<string> = [];

    input.addEventListener("input",(e) => {
        var element = e.target as HTMLInputElement;
    
        if(regex.test(element.value)){
            
            lista = element.value.match(regex);
            
        } 
        else { 
            lista = [] 
        }
        
    },false);

    submit.addEventListener("click",() => {

        var tabledivs = (<HTMLInputElement>document.getElementById("tablediv"));
        if(tabledivs){
            tabledivs.remove();
        }

        if(regex.test(lista.toString())){
            console.log("Submited");

            var lst = new Array;

            if(lista.length > 0) {
                var l = lista.length
                for( var i = 0; i < l; i++) {
                    lst.push(lista[i]);
                }
            } else {
                lst = lista
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


    function createtable(data: Object) {

        // Create a json body array
        const tostring = JSON.stringify(data);
        const tojson = JSON.parse(tostring);
        var finaldict = new Array;
        const rgx = /\'/g;
        
        for (var key in tojson) {
            if(tojson.hasOwnProperty(key)){
                finaldict = JSON.parse(tojson[key].replace(rgx, "\""))
            }
        };

        // Get element to append after the table
        const bodysearch = document.getElementById("bodysearch");

        // Create placeholder
        const newdiv = document.createElement("div");
        newdiv.setAttribute("class","container pt-5");
        newdiv.setAttribute("id", "tablediv")

        // Create div for table
        const innerdiv = document.createElement("div");
        innerdiv.setAttribute("class","row p-3 ");

        // Create div for button
        const headdiv = document.createElement("div");
        headdiv.setAttribute("class","shadow-none pb-3 pt-3 bg-light rounded");

        // Div for search/button
        const buttodiv = document.createElement("div");
        buttodiv.setAttribute("class","p-4");

        // Create button
        const headdivbutton = document.createElement("button");
        headdivbutton.innerHTML = "Reset search";
        headdivbutton.setAttribute("type","button");
        headdivbutton.setAttribute("class","btn btn-outline-primary rounded");
        headdivbutton.setAttribute("id","reset");
        headdivbutton.setAttribute("style","width: 10em;");

        // Create search input
        const searchin = document.createElement("input");
        searchin.setAttribute("type","search");
        searchin.setAttribute("class","form-control");
        searchin.setAttribute("id","search");

        // Search input parameters

        let miniSearch = new MiniSearch({
            fields: ['id','Ip','Domain'], // fields to index for full-text search
            storeFields: ['Ip', 'Domain'] // fields to return with search results
        })
          
          // Index all documents
        console.log(finaldict)
        miniSearch.addAll(finaldict)
        
        // Search with default options
        console.log(miniSearch.search('1.1.1.1'));
        
        //create table now
        const table = document.createElement("table");
        table.setAttribute("class", "table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        

        // Create everything for the table ---------

        // Defining headers
        Object.entries(finaldict[0]).forEach( ([key, value]) => {
                const th = document.createElement("th");
                th.setAttribute("scope","col");
                th.innerText = key
                tr.append(th)
        });

        // Create row for each value
        var i;
        for(i = 0; i < finaldict.length; i++){
            var child = finaldict[i];
            const tre = document.createElement("tr");
            Object.keys(child).forEach( (k) => {
                const td = document.createElement("td");
                td.innerText = child[k]
                tre.append(td)
                tbody.append(tre)
        
            });
        };
        
        // Construct table
        
        thead.append(tr);
        table.append(thead);
        thead.after(tbody);
        headdiv.append(buttodiv);
        buttodiv.append(searchin);
        //searchin.after(headdivbutton);   
        innerdiv.append(headdiv);
        newdiv.append(innerdiv);
        bodysearch.after(newdiv);
        headdiv.after(table);

    };

    //reset table and textarea
    document.getElementById("reset").addEventListener("click",function(){
        
        var form = (<HTMLInputElement>document.getElementById("tablediv"));
        form.remove()

        console.log("cleaned");

        } 
    );

})();
