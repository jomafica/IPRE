(function(){

    //check if area as the corret format data
    const input = document.getElementById("ips");
    
    input.addEventListener("input",checktext);
    
    function checktext(txt){

        console.log(txt.target.value);

        }; 


    //Get textarea input value
    document.getElementById("submit").addEventListener("click",function(){

        var form = (<HTMLInputElement>document.getElementById("ips")).value;

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
