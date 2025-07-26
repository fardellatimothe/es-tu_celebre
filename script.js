console.log("Script loaded successfully");

// tester les deux fonctions ensembles pour voir si je peux synchroniser les requêtes
// rajouter l'affichage du score avec une nouvelle fonction
// trouver un moyen de cacher l'api mistral ai surement grace à un env virtuel requetable avec une api

const handleClick = async () => {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();

    console.log("Nom:", nom);
    console.log("Prénom:", prenom);

    // const wikiReponse = await wikipedia(prenom, nom);
    const gptReponse = await searchGPT(prenom, nom);

    // console.log("Vérification Wikipedia:", wiki);
    console.log("Booléen GPT", gptReponse);



    // if (wiki) {
    //     console.log("L'utilisateur est célèbre !");
    // } else {
    //     console.log("L'utilisateur n'est pas célèbre.");
    // }
}

async function searchGPT(prenom = null, nom = null) {
    console.log("Fonction searchGPT appelée avec:", prenom, nom);
    
    if (!prenom || !nom) {
        console.error("Prénom et nom sont requis pour la recherche sur Wikipedia.");
        return false;
    }

    const apiKey = "dv5PugiF7IJ6AjuDsq704eC1Ye3LAgpN";
    const model = "mistral-large-latest"; // Ou un autre modèle comme "mistral-small-latest" ou "mistral-medium-latest"

    const systemPrompt = `Tu es un expert en notoriété publique. Réponds uniquement par 1 si tu connais cette personne, ou par 0 si tu ne la connais pas. Aucune explication, aucun texte supplémentaire, aucune ponctuation. Exemple : Q:"Connais-tu Jean Moulin ?" R:"1"; Q:"Connais-tu Michel Baltad ?" R:"0".`;
    const userPrompt = `Connais-tu ${prenom} ${nom} ?`;

    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                max_tokens: 100 // Limite le nombre de tokens dans la réponse
            })
        });

        

        try {
            const data = await response.json();
            console.log("Mistral API Response:", data);
            const boolGPT = parseInt(data.choices[0].message.content.trim(), 10);
            console.log("Réponse GPT booléen:", boolGPT);

            if (isNaN(boolGPT) || boolGPT < 0 || boolGPT > 1) {
                throw new Error("Le score GPT n'est pas valide. Il doit être un nombre entre 0 et 5.");
            }
            return boolGPT;
        } catch (error) {
            console.error("Erreur lors de l'extraction du texte de la réponse de MistralAI:", error);
            return null;
        }
    } catch (error) {
        console.error("Erreur MistralAI:", error);
        return false;
    }
}


async function searchWikipedia(prenom = null, nom = null) {
    console.log("Fonction searchWikipedia appelée avec:", prenom, nom);

    if (!prenom || !nom) {
        console.error("Prénom et nom sont requis pour la recherche sur Wikipedia.");
        return false;
    }

    const fullName = `${prenom} ${nom}`;
    const url_fr = `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(fullName)}&format=json&origin=*`;
    const url_en = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(fullName)}&format=json&origin=*`;

    try {
        let response = await fetch(url_fr);
        let data = await response.json();

        console.log("Wikipedia FR API response:", data);

        try {
            let page = Object.values(data.query.pages)[0]; // Récupère le premier objet page
            console.log("Page data:", page);

            // ✅ Vérifie si le champ "missing" existe
            if (page.hasOwnProperty("missing")) {
                return false; // Page n'existe pas
            }
            return true; // Page existe
        } catch (error) {
            console.error("Erreur lors de la récupération des données en français:", error);
            
            try {
                response = await fetch(url_en);
                data = await response.json();

                page = Object.values(data.query.pages)[0]; // Récupère le premier objet page

                console.log("Page data:", page);

                // ✅ Vérifie si le champ "missing" existe
                if (page.hasOwnProperty("missing")) {
                    return false; // Page n'existe pas
                }
                return true; // Page existe
            } catch (error) {
                console.error("Erreur lors de la récupération des données en anglais:", error);
                return false; // Page n'existe pas
            }
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données de Wikipedia:", error);
        return false; // En cas d'erreur, on considère que la page n'existe pas
    }
}

function calculateScore() {
    // Simule un score basé sur des critères fictifs
}



// const scale = document.getElementById('scale');
// scale.innerHTML = '';

// for (let i = 0; i <= 5; i++) {
//     const item = document.createElement('div');
//     item.className = 'scale-item';
//     item.textContent = i;
    
//     if (i <= score) {
//         item.classList.add('active');
//     }
    
//     scale.appendChild(item);
// }

// result.style.display = 'block';
// result.scrollIntoView({ behavior: 'smooth' });

// document.getElementById('start').addEventListener('click', () => {
//     document.getElementById('visible').classList.remove('active');
//     document.getElementById('hidden').classList.add('active');
// });
