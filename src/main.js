// Copyright (C) 2023, European Union, Cristiano L. Fontana
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.


// Creating an Immediately Invoked Function Expression (IIFE) to wrap the code
// and not polluting the global namespace
(function() {
    var counterCorrect = 0;
    var counterAll = 0;

    // The verba information was taken from:
    // https://nl.wikipedia.org/wiki/Lijst_van_sterke_en_onregelmatige_werkwoorden_in_het_Nederlands
    var verba = JSON.parse(document.getElementById('verba').textContent);
    
    // Get the elements from the document
    var buttonStart = document.getElementById("start");
    var selectLanguage = document.getElementById("language");
    var divOutput = document.getElementById("output");
    
    // Get the elements from the output div
    var inputInfinitief = document.getElementById("infinitief");
    var inputImperfectumSingularis = document.getElementById("imperfectum_singularis");
    var inputImperfectumPluralis = document.getElementById("imperfectum_pluralis");
    var inputParticipium = document.getElementById("participium");
    var buttonCheck = document.getElementById("check");
    
    var divResult = document.getElementById("result");
    var divCorrect = document.getElementById("correct_version");
    var divCounter = document.getElementById("counter");
    
    var functionCheck = null;
    
    // Add an event listener to the start button
    buttonStart.addEventListener("click", function() {
        // Clear up the output
        divResult.innerHTML = "";
        divCorrect.innerHTML = "";
        inputInfinitief.value = "";
        inputImperfectumSingularis.value = "";
        inputImperfectumPluralis.value = "";
        inputParticipium.value = "";
    
        // Choose a random entry from the data array
        var chosenEntry = verba[Math.floor(Math.random() * verba.length)];
    
        var language = selectLanguage.value;
    
        // Show the chosen entry in the output div
        if (language == "nederlands") {
            const infinitief = chosenEntry.prefix + chosenEntry.infinitief;
            divOutput.innerHTML = infinitief;
            inputInfinitief.value = infinitief;
        } else if (language == "engels") {
            divOutput.innerHTML = chosenEntry.engels;
        } else if (language == "italiaans") {
            divOutput.innerHTML = chosenEntry.italiaans;
        }
    
        // Add an event listener to the check button
        buttonCheck.removeEventListener("click", functionCheck);
    
        functionCheck = function() {
            // Get the values from the input fields
            var valueInfinitief = inputInfinitief.value.trim().toLowerCase();
            var valueImperfectumSingularis = inputImperfectumSingularis.value.trim().toLowerCase();
            var valueImperfectumPluralis = inputImperfectumPluralis.value.trim().toLowerCase();
            var valueParticipium = inputParticipium.value.trim().toLowerCase();
    
            counterAll += 1;
    
            // Compare the values with the chosen entry
            if (valueInfinitief == (chosenEntry["prefix"] + chosenEntry["infinitief"])
                && valueImperfectumSingularis == chosenEntry["imperfectum singularis"]
                && valueImperfectumPluralis == chosenEntry["imperfectum pluralis"]
                && valueParticipium == chosenEntry.participium) {
    
                counterCorrect += 1;
    
                // If they match, show a success message
                divResult.innerHTML = "Correct!!";
                divCorrect.innerHTML = "";
            } else {
                // If they don't match, show an error message
                divResult.innerHTML = "Verkeerd";
                divCorrect.innerHTML = "Correct antwoord: ";
    
                if (language !== "nederlands") {
                    divCorrect.innerHTML += chosenEntry.prefix + chosenEntry.infinitief + ", ";
                }
    
                divCorrect.innerHTML = "<ul>";
                divCorrect.innerHTML += "<li><em>Infinitief:</em> " + (chosenEntry["prefix"] + chosenEntry["infinitief"]) + "</li>";
                divCorrect.innerHTML += "<li><em>Imperfectum singularis:</em> " + chosenEntry["imperfectum singularis"] + "</li>";
                divCorrect.innerHTML += "<li><em>Imperfectum pluralis:</em> " + chosenEntry["imperfectum pluralis"] + "</li>";
                divCorrect.innerHTML += "<li><em>Participium:</em> " + chosenEntry["participium"] + "</li>";
                divCorrect.innerHTML += "</ul>";
            }
    
            divCounter.innerHTML = counterCorrect + "/" + counterAll;
        };
    
        buttonCheck.addEventListener("click", functionCheck);
    });
})();
