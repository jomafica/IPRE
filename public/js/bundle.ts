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
                    var form = submit.value;
                    // create promisse for the back end
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
