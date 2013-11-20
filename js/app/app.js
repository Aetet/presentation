$(document).ready(function () {
    var results = document.getElementById("presentation");
    results.innerHTML = tmpl("presentationTemplate", {hello: 'Adam'});

});