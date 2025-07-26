async function callMistralChatAPI(prompt) {
    // REMPLACER "VOTRE_CLE_API_MISTRAL" PAR VOTRE VRAIE CLÉ API MISTRAL AI
    // ATTENTION : NE PAS UTILISER CECI EN PRODUCTION. C'EST UNE VULNÉRABILITÉ DE SÉCURITÉ.
    const apiKey = "dv5PugiF7IJ6AjuDsq704eC1Ye3LAgpN"; 
    const model = "mistral-large-latest"; // Ou un autre modèle comme "mistral-small-latest" ou "mistral-medium-latest"

    if (apiKey === "VOTRE_CLE_API_MISTRAL" || !apiKey) {
        console.error("Veuillez remplacer 'VOTRE_CLE_API_MISTRAL' par votre clé API réelle.");
        throw new Error("Clé API Mistral non configurée.");
    }

    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: "user", content: prompt }],
                max_tokens: 100 // Limite le nombre de tokens dans la réponse
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur détaillée de l'API Mistral:", errorData);
            throw new Error(`Erreur API Mistral AI : ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content.trim();
        } else {
            throw new Error("Aucune réponse valide de l'API Mistral AI.");
        }
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API Mistral AI :", error);
        throw error; // Rejeter l'erreur pour qu'elle soit capturée par le .catch()
    }
}

// --- Exemple d'utilisation pour le Chat ---
// Vous pouvez coller ce code directement dans la console de votre navigateur ou dans un fichier HTML avec une balise <script>

// Remplacez 'VOTRE_CLE_API_MISTRAL' par votre vraie clé API avant d'exécuter.
callMistralChatAPI("Quel est le meilleur fromage français selon vous ?")
    .then(response => {
        console.log("Réponse Mistral AI (Chat):", response);
        // Vous pouvez afficher la réponse dans un élément HTML ici, par exemple :
        // document.getElementById('outputDiv').textContent = response;
    })
    .catch(error => {
        console.error("Erreur lors de l'exécution de la fonction Mistral Chat:", error);
    });