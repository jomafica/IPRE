const MiniSearch = require('minisearch');
(function () {
    const input = document.getElementById("ips");
    const submit = document.getElementById("submit");
    let regex = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/g);
    var lista = [];
    input.addEventListener("input", (e) => {
        var element = e.target;
        if (regex.test(element.value)) {
            lista = element.value.match(regex);
        }
        else {
            lista = [];
        }
    }, false);
    submit.addEventListener("click", () => {
        var tabledivs = document.getElementById("tablediv");
        if (tabledivs) {
            tabledivs.remove();
        }
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
            const options = {
                method: 'POST',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch('/query', options)
                .then(res => res.json())
                .then(res => createtable(res))
                .catch(err => console.error(err));
        }
    });
    function createtable(data) {
        const tostring = JSON.stringify(data);
        const tojson = JSON.parse(tostring);
        var finaldict = new Array;
        const rgx = /\'/g;
        for (var key in tojson) {
            if (tojson.hasOwnProperty(key)) {
                finaldict = JSON.parse(tojson[key].replace(rgx, "\""));
            }
        }
        ;
        let miniSearch = new MiniSearch({
            fields: ['Ip', 'id', 'Domain'],
            storeFields: ['Ip', 'Domain']
        });
        console.log(finaldict);
        miniSearch.addAll(finaldict);
        console.log(miniSearch.search('1.1.1.1'));
        const bodysearch = document.getElementById("bodysearch");
        const newdiv = document.createElement("div");
        newdiv.setAttribute("class", "container pt-5");
        newdiv.setAttribute("id", "tablediv");
        const innerdiv = document.createElement("div");
        innerdiv.setAttribute("class", "row p-3 ");
        const headdiv = document.createElement("div");
        headdiv.setAttribute("class", "shadow-none pb-3 pt-3 bg-light rounded");
        const headdivbutton = document.createElement("button");
        headdivbutton.innerHTML = "Reset";
        headdivbutton.setAttribute("type", "button");
        headdivbutton.setAttribute("class", "btn btn-outline-primary rounded");
        headdivbutton.setAttribute("id", "reset");
        headdivbutton.setAttribute("style", "width: 10em;");
        const table = document.createElement("table");
        table.setAttribute("class", "table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        Object.entries(finaldict[0]).forEach(([key, value]) => {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerText = key;
            tr.append(th);
        });
        var i;
        for (i = 0; i < finaldict.length; i++) {
            var child = finaldict[i];
            const tre = document.createElement("tr");
            Object.keys(child).forEach((k) => {
                const td = document.createElement("td");
                td.innerText = child[k];
                tre.append(td);
                tbody.append(tre);
            });
        }
        ;
        thead.append(tr);
        table.append(thead);
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