var objet_analogie = [];

fetch('./js/data.json').then(function (response) {
    response.json().then(function (data) {
        var modeleHeader = "<li><a href=\"#a{{id}}\"><span>{{analogie}}...</span></a></li>";
        var textHeader = "<li><a href=\"#top\" class=\"top\"> Si j'étais ...</a></li>";
        var modeleBody = "<div class=\"boîte\" id=a{{id}}><p>Si j’étais <span>{{analogie}}</span>, alors je serais <span>{{valeur_analogie}}</span> car {{explication}}. <img src=\"{{img}}\" alt=\"{{alt}}\"></div>";
        var textBody = "";
        data.forEach(function (element) {
            textHeader += modeleHeader
            textBody += modeleBody
            Object.keys(element).forEach(function (clef) {
                textHeader = textHeader.replaceAll("{{" + clef + "}}", element[clef]);
                textBody = textBody.replaceAll("{{" + clef + "}}", element[clef]);
            })
        })
        var ul = document.querySelector('ul.float');
        ul.innerHTML = textHeader;
        var section = document.querySelector('section.analogies')
        section.innerHTML = textBody;


        var allLi = document.querySelectorAll('li');
        allLi.forEach(function (li) {
            li.addEventListener('click', function () {
                console.log(li.getAttribute('id'));
            })
        })
    })



    function analogies(x) {
        var text = "";
        x.forEach(function (dataPerso) {
            text += "<div class=\"boîte\" id=p" + dataPerso.id + "><p>Si j'étais <span>" + dataPerso.analogie + "</span>, je serais <span>" + dataPerso.valeur_analogie + "</span> car " + dataPerso.explication + "</p></div>"
        })
        document.querySelector(".analogiesPerso").innerHTML = text;
    }

    const envoyer_form = document.querySelector("p.send")
    envoyer_form.addEventListener("click", ajouter_analogie)


    const cliquable = document.querySelector('.CA')
    const formulaire = document.querySelector('.ML')
    cliquable.addEventListener('click', function () {
        formulaire.classList.add('popup-visible');
        formulaire.classList.remove('popup-invisible');
    })

    formulaire.addEventListener('click', function (e) {
        if ((e.target == document.querySelector('div.ML')) || e.target == document.querySelector('.send')) {
            formulaire.classList.add('popup-invisible')
            formulaire.classList.remove('popup-visible')
        }
    })


    function ajouter_analogie() {
        const input_analogie = document.getElementById("analogie").value
        const input_valeurAnalogie = document.getElementById("valeur_analogie").value
        const input_explication = document.getElementById("explication").value
        objet_analogie.push({ "id": (objet_analogie.length + 1), "analogie": input_analogie, "valeur_analogie": input_valeurAnalogie, "explication": input_explication });
        analogies(objet_analogie)
        const lien = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=thomas.bansront&courriel=" + document.querySelector('input#mail').value + "&message= Vous avez un nouveau message = Si j'étais " + document.querySelector('input#analogie').value + ", je serais " + document.querySelector('input#valeur_analogie').value + "car" + document.querySelector('textarea#explication').value;

        fetch(lien).then(function (response) {
            response.json().then(function (api) {
                console.log("Réponse reçue : ")
                console.log(api);
                alert(api.message)
            })
        })

        resetForm();
    }

    function resetForm() {
        const formulaire = document.querySelectorAll('form input, form textarea');
        formulaire.forEach(function (entree) {
            entree.value = "";
        })
    }
})


