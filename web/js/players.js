//See following links:
//https://www.w3schools.com/xml/xml_parser.asp

window.onload = initialize;

function initialize() {
    downloadAllPlayers();
    document.getElementById("form-player").addEventListener("submit", addPlayer);
}

function validatePlayer(event) {
    const form = event.target;
    let player = form.playerName.value;
    let pUID = form.playerUID.value;
    let level = form.playerLevel.value;
    let defStat = form.defenseStat.value;
    let attStat = form.attackStat.value;
    let hasClan = form.hasClan.value;

    let errName = document.getElementById("error-name")
    let errUID = document.getElementById("error-UID-required")
    let errUIDFormat = document.getElementById("error-UID-format")
    let errLevel = document.getElementById("error-level-required")
    let errLvlCap = document.getElementById("error-level-cap")
    let errDef = document.getElementById("error-def-required")
    let errDefCap = document.getElementById("error-def-cap")
    let errAtt = document.getElementById("error-att-required")
    let errAttCap = document.getElementById("error-att-cap")
    let errClan = document.getElementById("error-clan")

    let error = false;

    if (!player) {
        errName.style.display = "block";
        error = true;
    } else {
        errName.style.display = "none";
        error = false;
    }

    if (!pUID) {
        errUID.style.display = "block"
        error = true;
    } else {
        errUID.style.display = "none"
        if ((/[A-Z]{2}[0-9]:[a-z]{3}[0-9]{4}[A-Z]{2}(EU|US|AS)/).test(pUID)) {
            errUIDFormat.style.display = "none";
            error = false;
        } else {
            errUIDFormat.style.display = "block";
            error = true;
        }
    }

    if (!level) {
        errLevel.style.display = "block";
        error = true;
    } else {
        errLevel.style.display = "none";
        if (parseInt(level) > 100) {
            errLvlCap.style.display = "block";
            error = true;
        } else {
            errLvlCap.style.display = "none";
            error = false;
        }
    }

    if (!defStat) {
        errDef.style.display = "block";
        error = true;
    } else {
        errDef.style.display = "none";
        if (parseInt(defStat) > 1000) {
            errDefCap.style.display = "block";
            error = true;
        } else {
            errDefCap.style.display = "none";
            error = false;
        }
    }

    if (!attStat) {
        errAtt.style.display = "block";
        error = true;
    } else {
        errAtt.style.display = "none";
        if (parseInt(attStat) > 1000) {
            errAttCap.style.display = "block";
            error = true;
        } else {
            errAttCap.style.display = "none";
            error = false;
        }
    }

    if (hasClan == '-----') {
        errClan.style.display = "block";
        error = true;
    } else {
        errClan.style.display = "none";
        error = false;
    }

    return !error;
}

function addPlayer(event) {
    event.preventDefault();

    if (validatePlayer(event)) {
        var request = new XMLHttpRequest();
        let form = event.target;
        request.open('POST', 'http://localhost:1337/players', true);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                downloadAllPlayers();
            }
        };
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send('<?xml version="1.0" encoding="UTF-8"?>' +
            '<players>' +
            '<player pUID="' + form.playerUID.value + '">' +
            '<playerTag>' + form.playerName.value + '</playerTag>' +
            '<level>' + form.playerLevel.value + '</level>' +
            '<defenseStat>' + form.defenseStat.value + '</defenseStat>' +
            '<attackStat>' + form.attackStat.value + '</attackStat>' +
            '<hasClan>' + (form.hasClan.value === 'True') + '</hasClan>' +
            '</player>' +
            '</players>'
        );
        form.reset();
    }
}

function downloadAllPlayers() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:1337/players', true);
    request.onload = function() {

        console.log(this.response);

        // Begin accessing JSON data here
        showAllPlayers(this.response);
        document.getElementById("show_all").click();
    }
    request.send();
}

function showAllPlayers(data) {

    parser = new DOMParser();
    xmlData = parser.parseFromString(data, "text/xml");

    let xmlPlayers = xmlData.getElementsByTagName("player");

    console.log(xmlPlayers);
    console.log(xmlPlayers[0]);
    //console.log(xmlPlayers[0].pUID);


    let result = "";

    for (var i = 0; i < xmlPlayers.length; i++) {
        result +=
            '<div class="card mt-2">' +
            '<div class="card-header">' + xmlPlayers[i].childNodes[0].childNodes[0].data + '</div>' +
            '<div class="card-body">' +
            '<h4 class="card-title"> Level: ' + xmlPlayers[i].childNodes[1].childNodes[0].data + '</h4>' +
            '<p class="card-text"> Defense: ' + xmlPlayers[i].childNodes[2].childNodes[0].data + '</p>' +
            '<p class="card-text"> Attack: ' + xmlPlayers[i].childNodes[3].childNodes[0].data + '</p>' +
            '<p class="card-text"> Has Clan: ' + xmlPlayers[i].childNodes[4].childNodes[0].data + '</p>' +
            '</div>' +
            '<div class="card-footer"> player UID - ' + xmlPlayers[i].getAttribute('pUID') + '</div>' +
            '</div>';
    }

    document.getElementById("players_show").innerHTML = result;
}