function searchInput() {
    var form = (<HTMLInputElement>document.getElementById("ips")).value;
    document.getElementById("submit").onclick = function() {
        console.log(form);
    }
  };

function reset() {
    var form = (<HTMLInputElement>document.getElementById("ips")).value;
    document.getElementById("reset").onclick = function() {
        console.log("cleaned");
    }
};
