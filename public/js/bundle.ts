(function(){

    //check if area as the corret format data
    const input = document.getElementById("ips");
    const submit = (<HTMLInputElement>document.getElementById("submit"))
    submit.disabled = true;
    
    input.addEventListener("blur", (event) => {

        const element = event.target as HTMLInputElement;

        let regex  = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/);

        if(regex.test(element.value)){ //is accepting also letters. rong state

            console.log(element.value);

            input.classList.add('bg-success');
            setTimeout(function(){
                input.classList.remove('bg-success');
            }, 3000);
            
            submit.disabled = false;

        }

        else {  

            submit.disabled = true;

            input.classList.add('bg-danger'); 
            setTimeout(function(){
                input.classList.remove('bg-danger');
            }, 3000);

            console.log(element.value);

        };

    });

    //Get textarea input value
    submit.addEventListener("click",function(){

        var form = submit.value;

        console.log(form);

        } 
    );


    //reset table and textarea
    document.getElementById("reset").addEventListener("click",function(){
        
        var form = (<HTMLInputElement>document.getElementById("ips")).value;

        console.log("cleaned");

        } 
    );

})();
