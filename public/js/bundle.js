(function () {
    var input = document.getElementById("ips");
    var submit = document.getElementById("submit");
    var regex = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/g);
    input.addEventListener("blur", function (event) {
        var element = event.target;
        var lista = element.value.match(regex);
        if (regex.test(element.value)) {
            console.log("true");
            input.classList.add('bg-success');
            setTimeout(function () {
                input.classList.remove('bg-success');
            }, 3000);
            submit.addEventListener("click", function () {
                if (regex.test(element.value)) {
                    console.log("Submited");
                    var lst = new Array;
                    if (lista.length > 0) {
                        var l = lista.length;
                        for (var i = 0; i < l; i++) {
                            lst.push(lista[i]);
                        }
                    }
                    else {
                        lst = lista;
                    }
                    ;
                    var json = { ips: lst };
                    var options = {
                        method: 'POST',
                        body: JSON.stringify(json),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                    fetch('/query', options)
                        .then(function (res) { return createtable(res.json()); })
                        .then(function (res) { return console.log(res); })["catch"](function (err) { return console.error(err); });
                }
            });
        }
        else {
            input.classList.add('bg-danger');
            setTimeout(function () {
                input.classList.remove('bg-danger');
            }, 3000);
            console.log("False");
        }
        ;
    });
    function createtable(data) {
        var bodysearch = document.getElementById("bodysearch");
        var newdiv = document.createElement("div");
        newdiv.setAttribute("class", "container pt-5");
        var innerdiv = document.createElement("div");
        innerdiv.setAttribute("class", "row p-3");
        var headdiv = document.createElement("div");
        headdiv.setAttribute("class", "shadow-none pb-3 pt-3 bg-light rounded");
        var headdivbutton = document.createElement("button");
        headdivbutton.innerHTML = "Reset";
        headdivbutton.setAttribute("type", "button");
        headdivbutton.setAttribute("class", "btn btn-outline-primary rounded");
        headdivbutton.setAttribute("id", "reset");
        headdivbutton.setAttribute("style", "width: 10em;");
        console.log(data);
        var table = document.createElement("table");
        headdiv.append(headdivbutton);
        headdiv.after(table);
        innerdiv.append(headdiv);
        newdiv.append(innerdiv);
        bodysearch.after(newdiv);
    }
    ;
    document.getElementById("reset").addEventListener("click", function () {
        var form = document.getElementById("ips").value;
        console.log("cleaned");
    });
})();
//# sourceMappingURL=bundle.js.map