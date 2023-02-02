fetch('data.json').then(function (response) {
    response.json().then(function (data) {
        console.log(data);
        const titre = "Portrait Chinois"
        const sous_titre = "Thomas Bansront"
        const modele = "<div class=\"box\" id=b{{id}}><p class=\"text-box\" id=t{{id}}>{{analogie}}</p></div>"

        let boites = "";
        data.forEach(function (element) {
            boites += modele
            element.analogie = element.analogie.charAt(0).toUpperCase() + element.analogie.slice(1);
            Object.keys(element).forEach(function (clef) {
                boites = boites.replaceAll("{{" + clef + "}}", element[clef]);
            })
            element.analogie = element.analogie.toLowerCase();
        });
        
        script(data);

    })
})