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
                    var form = submit.value;
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