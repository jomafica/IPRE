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
                        for( var i = 0; i < lista.length; i++) {
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
                    
                    // send post request
                    fetch('/query', options)
                        .then(res => res.json())
                        .then(res => console.log(res))
                        .catch(err => console.error(err));

                    //construir a tabela

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

    //reset table and textarea
    document.getElementById("reset").addEventListener("click",function(){
        
        var form = (<HTMLInputElement>document.getElementById("ips")).value;

        console.log("cleaned");

        } 
    );

})();
