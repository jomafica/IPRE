(function () {
    var input = document.getElementById("ips");
    var submit = document.getElementById("submit");
    submit.disabled = true;
    input.addEventListener("blur", function (event) {
        var element = event.target;
        var regex = new RegExp(/(\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3})/);
        if (regex.test(element.value)) {
            console.log(element.value);
            input.classList.add('bg-success');
            setTimeout(function () {
                input.classList.remove('bg-success');
            }, 3000);
            submit.disabled = false;
        }
        else {
            submit.disabled = true;
            input.classList.add('bg-danger');
            setTimeout(function () {
                input.classList.remove('bg-danger');
            }, 3000);
            console.log(element.value);
        }
        ;
    });
    submit.addEventListener("click", function () {
        var form = submit.value;
        console.log(form);
    });
    document.getElementById("reset").addEventListener("click", function () {
        var form = document.getElementById("ips").value;
        console.log("cleaned");
    });
})();
//# sourceMappingURL=bundle.js.map