function searchInput() {
        var form = (<HTMLInputElement>document.getElementById("ips")).value;
        document.onclick = function() {
            console.log(form);
        }
  };