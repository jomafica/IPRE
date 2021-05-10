(function(){

    //check if area as the corret format data
    const input = document.getElementById("ips");
    const submit = (<HTMLInputElement>document.getElementById("submit"))

    let regex  = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/g);
    
    input.addEventListener("blur", (event) => {

        // duplica o valor cada vez que faz o blur
        var element = event.target as HTMLInputElement;
        const lista = element.value.match(regex); 

        if(regex.test(element.value)){ 
        
            console.log("true"); 

            input.classList.add('bg-success');
            setTimeout(function(){
                input.classList.remove('bg-success');
            }, 3000);

            submit.addEventListener("click",function(){
                if(regex.test(element.value)){
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
                        .then(res => createtable(res.json()))
                        .then(res => console.log(res))
                        .catch(err => console.error(err));

                }
            });
        }

        else {  

            input.classList.add('bg-danger'); 
            setTimeout(function(){
                input.classList.remove('bg-danger');
            }, 3000);

            console.log("False");

        };

    });

    function createtable(data: object) {

        const bodysearch = document.getElementById("bodysearch");

        const newdiv = document.createElement("div");
        newdiv.setAttribute("class","container pt-5");

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
        console.log(data);
        

        const table = document.createElement("table");



        headdiv.append(headdivbutton)
        headdiv.after(table)
        innerdiv.append(headdiv)
        newdiv.append(innerdiv)
        bodysearch.after(newdiv)

        
    };



    //reset table and textarea
    document.getElementById("reset").addEventListener("click",function(){
        
        var form = (<HTMLInputElement>document.getElementById("ips")).value;

        console.log("cleaned");

        } 
    );

})();
