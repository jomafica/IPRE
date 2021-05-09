(function () {
    var input = document.getElementById("ips");
    var submit = document.getElementById("submit");
    input.addEventListener("blur", function (event) {
        var element = event.target;
        var regex = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/);
        if (regex.test(element.value)) {
            console.log("true");
            input.classList.add('bg-success');
            setTimeout(function () {
                input.classList.remove('bg-success');
            }, 3000);
            submit.addEventListener("click", function () {
                if (regex.test(element.value)) {
                    console.log("Submited");
                    var lst;
                    var temp_lst = [element.value];
                    var i;
                    console.log(temp_lst);
                    if (temp_lst.length > 1) {
                        for (i in temp_lst) {
                            lst.join(i);
                        }
                    }
                    ;
                    var json = { ips: lst };
                    console.log(JSON.stringify(json));
                    var options = {
                        method: 'POST',
                        body: JSON.stringify(json),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                    fetch('/query', options)
                        .then(function (res) { return res.json(); })
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
    document.getElementById("reset").addEventListener("click", function () {
        var form = document.getElementById("ips").value;
        console.log("cleaned");
    });
})();
//# sourceMappingURL=bundle.js.map