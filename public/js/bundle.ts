(function(){

    //check if area as the corret format data
    const input = document.getElementById("ips");
    const submit = (<HTMLInputElement>document.getElementById("submit"))
    
    input.addEventListener("blur", (event) => {

        const element = event.target as HTMLInputElement;

        let regex  = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/);

        if(regex.test(element.value)){ 
        
            console.log("true"); 

            input.classList.add('bg-success');
            setTimeout(function(){
                input.classList.remove('bg-success');
            }, 3000);

            submit.addEventListener("click",function(){
                if(regex.test(element.value)){
                    console.log("Submited");

                    var lst: [];
                    var temp_lst = [element.value]
                    var i;

                    console.log(temp_lst)
                    
                    if(temp_lst.length > 1) {
                        for( i in temp_lst) {
                            lst.join(i)
                        }
                    };

                    var json = {ips: lst};
                    console.log(JSON.stringify(json))

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
