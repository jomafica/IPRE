(function () {
    var input = document.getElementById("ips");
    var submit = document.getElementById("submit");
    var lista = new Array;
    var regex = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/g);
    input.addEventListener("input", function () {
        var element = event.target;
        if (regex.test(element.value)) {
            console.log(element.value);
            return lista = element.value.match(regex);
        }
        else {
            lista = [];
        }
    }, false);
    submit.addEventListener("click", function () {
        if (regex.test(lista.toString())) {
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
                .then(function (res) { return res.json(); })
                .then(function (res) { return createtable(res); })["catch"](function (err) { return console.error(err); });
        }
    });
    function createtable(data) {
        var tostring = JSON.stringify(data);
        var tojson = JSON.parse(tostring);
        var bodysearch = document.getElementById("bodysearch");
        var newdiv = document.createElement("div");
        newdiv.setAttribute("class", "container pt-5");
        newdiv.setAttribute("id", "tablediv");
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
        var table = document.createElement("table");
        table.setAttribute("class", "table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var tre = document.createElement("tr");
        var finaldict = new Array;
        var rgx = /\'/g;
        for (var key in tojson) {
            if (tojson.hasOwnProperty(key)) {
                finaldict = JSON.parse(tojson[key].replace(rgx, "\""));
            }
        }
        finaldict.forEach(function (elmnt) {
            for (var key_1 in elmnt) {
                var th = document.createElement("th");
                th.setAttribute("scope", "col");
                th.innerText = key_1;
                tr.append(th);
                if (Object.prototype.hasOwnProperty.call(elmnt, key_1)) {
                    var element = elmnt[key_1];
                    var td = document.createElement("td");
                    td.innerText = element;
                    tre.append(td);
                }
            }
        });
        thead.append(tr);
        table.append(thead);
        tbody.append(tre);
        thead.after(tbody);
        headdiv.append(headdivbutton);
        innerdiv.append(headdiv);
        newdiv.append(innerdiv);
        bodysearch.after(newdiv);
        headdiv.after(table);
    }
    ;
    document.getElementById("reset").addEventListener("click", function () {
        var form = document.getElementById("tablediv");
        form.remove();
        console.log("cleaned");
    });
})();
//# sourceMappingURL=bundle.js.map