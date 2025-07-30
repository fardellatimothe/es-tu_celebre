console.log("Script loaded successfully");

// Etudier la manière de calculer le score de célébrité
// Changer l'API mistral quand publication avec date d'expiration plan gratuit

// Lorsqu'une erreur survient, il faut annuler la fonction en renvoyant null au lieu de renvoyer 0 ou autre résultat qui est interprété.
// Il faut bloquer la recherche lorsque le nom ou prénom est vide.

// Créer un stockage via storage local pour stocker les résultats et éviter de faire des recherches à chaque fois. (possibilté d'expiration ? variable global sur toutes les instances github ?)

const handleClick = async () => {
    console.time("executionTime");
    console.log("=========================================");

    event.preventDefault();

    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const chaineYoutube = document.getElementById('youtube').value.trim();
    const chaineTwitch = document.getElementById('twitch').value.trim();
    const userInstagram = document.getElementById('insta').value.trim();
    const userTiktok = document.getElementById('tiktok').value.trim();
    const userTwitter = document.getElementById('twitter').value.trim();

    console.log("Nom:", nom);
    console.log("Prénom:", prenom);
    console.log("Chaîne YouTube:", chaineYoutube);
    console.log("Chaîne Twitch:", chaineTwitch);
    console.log("Nom d'utilisateur Instagram:", userInstagram);
    console.log("Nom d'utilisateur TikTok:", userTiktok);
    console.log("Nom d'utilisateur Twitter:", userTwitter);

    try {
        const result = await Promise.allSettled([
            searchWikipedia(prenom, nom),
            searchGPT(prenom, nom),
            searchGoogle(prenom, nom),
            searchYoutube(chaineYoutube),
            searchTwich(chaineTwitch),
            searchInstagram(userInstagram),
            searchTiktok(userTiktok),
            searchTwitter(userTwitter)
        ]);

        const wikiReponse = result[0].status === 'fulfilled' ? result[0].value : 0;
        const gptReponse = result[1].status === 'fulfilled' ? result[1].value : 0;
        const googleReponse = result[2].status === 'fulfilled' ? result[2].value : 0;
        const youtubeReponse = result[3].status === 'fulfilled' ? result[3].value : 0;
        const twitchReponse = result[4].status === 'fulfilled' ? result[4].value : 0;
        const instaReponse = result[5].status === 'fulfilled' ? result[5].value : 0;
        const tiktokReponse = result[6].status === 'fulfilled' ? result[6].value : 0;
        const twitterReponse = result[7].status === 'fulfilled' ? result[7].value : 0;

        console.log("Vérification Booléen Wikipedia:", wikiReponse);
        console.log("Vérification Booléen GPT", gptReponse);
        console.log("Vérification Score Google", googleReponse);
        console.log("Vérification Score YouTube", youtubeReponse);
        console.log("Vérification Score Twitch", twitchReponse);
        console.log("Vérification Score Instagram", instaReponse);
        console.log("Vérification Score TikTok", tiktokReponse);
        console.log("Vérification Score Twitter", twitterReponse);

        displayScore(gptReponse + wikiReponse + googleReponse + youtubeReponse + twitchReponse + instaReponse + tiktokReponse + twitterReponse);

        console.timeEnd("executionTime");
        console.log("=========================================");
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        console.log("=========================================");
    }  
}

async function searchTwitter(twitter = null) {
    console.log("Fonction searchTwitter appelée avec:", twitter);

    if (!twitter) {
        console.error("Le nom d'utilisateur Twitter est requis pour la recherche.");
        return false;
    }

    const url = `https://twitter-x-api.p.rapidapi.com/api/user/detail?username=${twitter}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2b50770698msh6ea4be8ceba4f91p1129d0jsne95622f6fec2',
            'x-rapidapi-host': 'twitter-x-api.p.rapidapi.com'
        }
    };

    try {
        console.log("Envoi de la requête à l'API Twitter pour l'utilisateur :", twitter);
        const response = await fetch(url, options);
        const data = await response.json();

        console.log("Réponse API Twitter:", data);

        if (data && data.user && data.user.result && data.user.result.legacy && typeof data.user.result.legacy.followers_count) {
            const userFollowersTwitter = data.user.result.legacy.followers_count;
            console.log("Nombre d'abonnés Twitter:", userFollowersTwitter);

            if (isNaN(userFollowersTwitter)) return 0;

            if (userFollowersTwitter < 100) return 0;
            if (userFollowersTwitter < 1000) return 1;
            if (userFollowersTwitter < 10000) return 2;
            if (userFollowersTwitter < 100000) return 3;
            if (userFollowersTwitter < 1000000) return 4;
            return 5; // Plus d'un million d'abonnés
        } else {
            throw new Error("Données utilisateur Twitter non trouvées ou mal formatées.");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur Twitter :", error);
        return 0; // Si erreur technique, on considère comme introuvable
    }
}

async function searchTiktok(tiktok = null) {
    console.log("Fonction searchTiktok appelée avec:", tiktok);

    if (!tiktok) {
        console.error("Le nom d'utilisateur TikTok est requis pour la recherche.");
        return false;
    }

    const url = `https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=${tiktok}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2b50770698msh6ea4be8ceba4f91p1129d0jsne95622f6fec2',
            'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
        }
    };

    try {
        console.log("Envoi de la requête à l'API TikTok pour l'utilisateur :", tiktok);
        const response = await fetch(url, options);
        const data = await response.json();

        console.log("Réponse API TikTok:", data);

        if (data && data.userInfo && data.userInfo.stats && data.userInfo.stats.followerCount) {
            const userFollowersTiktok = data.userInfo.stats.followerCount;
            console.log("Nombre d'abonnés TikTok:", userFollowersTiktok);

            if (isNaN(userFollowersTiktok)) return 0;

            if (userFollowersTiktok < 100) return 0;
            if (userFollowersTiktok < 1000) return 1;
            if (userFollowersTiktok < 10000) return 2;
            if (userFollowersTiktok < 100000) return 3;
            if (userFollowersTiktok < 1000000) return 4;
            return 5; // Plus d'un million d'abonnés
        } else {
            throw new Error("Données utilisateur TikTok non trouvées ou mal formatées.");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur TikTok :", error);
        return 0; // Si erreur technique, on considère comme introuvable
    }
}

async function searchInstagram(insta = null) {
    console.log("Fonction searchInstagram appelée avec:", insta);

    if (!insta) {
        console.error("Le nom d'utilisateur Instagram est requis pour la recherche.");
        return false;
    }

    const url = `https://instagram-looter2.p.rapidapi.com/profile?username=${insta}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2b50770698msh6ea4be8ceba4f91p1129d0jsne95622f6fec2',
            'x-rapidapi-host': 'instagram-looter2.p.rapidapi.com'
        }
    };

    try {
        console.log("Envoi de la requête à l'API Instagram pour l'utilisateur :", insta);
        const response = await fetch(url, options);
        const data = await response.json();

        console.log("Réponse API Instagram:", data);

        if (data && data.edge_followed_by && data.edge_followed_by.count !== undefined) {
            const userFollowersInstagram = data.edge_followed_by.count;
            console.log("Nombre d'abonnés Instagram:", userFollowersInstagram);

            if (isNaN(userFollowersInstagram)) return 0;

            if (userFollowersInstagram < 100) return 0;
            if (userFollowersInstagram < 1000) return 1;
            if (userFollowersInstagram < 10000) return 2;
            if (userFollowersInstagram < 100000) return 3;
            if (userFollowersInstagram < 1000000) return 4;
            return 5; // Plus d'un million d'abonnés
        } else {
            throw new Error("Données utilisateur Instagram non trouvées ou mal formatées.");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur Instagram :", error);
        return 0; // Si erreur technique, on considère comme introuvable
    }
}

async function searchTwich(chaineTwitch = null) {
    console.log("Fonction searchTwitch appelée avec:", chaineTwitch);

    if (!chaineTwitch) {
        console.error("Le nom de la chaîne Twitch est requis pour la recherche.");
        return false;
    }

    const clientTwitch_id = "o1be07vj17t69jaiey0ovqcgbg2cw4"
    const secretTwitch_id = "400w5cti37pp2voyb8nvtc8c9oa3zy"

    const tokenTwitch = await getTwitchAccessToken(clientTwitch_id, secretTwitch_id);
    const userTwitchId = await getTwitchUserId(chaineTwitch, clientTwitch_id, tokenTwitch);

    try {
        const response = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userTwitchId}`, {
            headers: {
                "Authorization": `Bearer ${tokenTwitch}`,
                "Client-Id": clientTwitch_id
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Twitch API error: ${res.status} - ${error.message}`);
        }

        const data = await response.json();
        const nbFollowersTwitch =  data.total; // Total des followers

        console.log("Nombre de followers Twitch:", nbFollowersTwitch);

        if (isNaN(nbFollowersTwitch)) return 0;

        if (nbFollowersTwitch < 100) return 0;
        if (nbFollowersTwitch < 1000) return 1;
        if (nbFollowersTwitch < 10000) return 2;
        if (nbFollowersTwitch < 100000) return 3;
        if (nbFollowersTwitch < 1000000) return 4;
        return 5; // Plus d'un million de followers

    } catch(error) {
        console.error("Erreur lors de la recherche de la chaîne Twitch :", error);
        return 0; // Si erreur technique, on considère 0 abonnés
    } 
}

async function getTwitchAccessToken(clientId, clientSecret) {
    console.log("Récupération du token d'accès Twitch...");
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        }),
    });

    const data = await response.json();
    console.log("Token d'accès Twitch récupéré :", data);
    return data.access_token; // Token valable 60 jours
}

async function getTwitchUserId(username, clientId, accessToken) {
    console.log("Récupération de l'ID utilisateur Twitch pour le nom :", username);
  const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
    headers: {
      "Client-ID": clientId,
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log("Données utilisateur Twitch :", data);
  return data.data[0]?.id;
}

async function searchYoutube(chaineYoutube = null) {
    console.log("Fonction searchYoutube appelée avec:", chaineYoutube);

    if (!chaineYoutube) {
        console.error("Le nom de la chaîne YouTube est requis pour la recherche.");
        return false;
    }

    const idChaine = await getYoutubeChannelId(chaineYoutube);

    if (!idChaine) {
        console.warn("Aucune chaîne YouTube trouvée pour le nom :", chaineYoutube);
        return 0; // Si aucune chaîne trouvée, on considère comme introuvable
    }

    const apiKeyYoutube = "AIzaSyCVaCLlqIShLGxqRp9-8Xqfw6zOU88S68E";
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${idChaine}&key=${apiKeyYoutube}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Réponse API YouTube (searchYoutube):", data);

        if (data.items && data.items.length > 0) {
            const stats = data.items[0].statistics;
            const subscriberCount = parseInt(stats.subscriberCount, 10);
            const viewCount = parseInt(stats.viewCount, 10);
            const videoCount = parseInt(stats.videoCount, 10);

            console.log("Abonnés:", subscriberCount, "Vues:", viewCount, "Vidéos:", videoCount);

            if (isNaN(subscriberCount)) return 0;

            if (subscriberCount < 100) return 0;
            if (subscriberCount < 1000) return 1;
            if (subscriberCount < 10000) return 2;
            if (subscriberCount < 100000) return 3;
            if (subscriberCount < 1000000) return 4;
            return 5;
        } else {
            console.warn("Aucune statistique trouvée pour la chaîne YouTube :", chaineYoutube);
            return 0; // Si aucune statistique trouvée, on considère comme introuvable
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de la chaîne YouTube :", error);
        return 0; // Si erreur technique, on considère 0 abonnés
    }
}

async function getYoutubeChannelId(chaine) {
  const apiKeyYoutube = "AIzaSyCVaCLlqIShLGxqRp9-8Xqfw6zOU88S68E";
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(chaine)}&key=${apiKeyYoutube}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Réponse API YouTube (getYoutubeChannelId):", data);

    const firstItem = data.items[0];
    
    if (firstItem.id?.kind === "youtube#channel" && firstItem.id?.channelId) {
      return firstItem.id.channelId;
    } else {
      console.warn("Le premier résultat n'est pas une chaîne valide.");
      return 0;
    }
  } catch (error) {
    console.error("Erreur lors de la recherche de l'ID de la chaîne YouTube :", error);
    return null;
  }
}

async function searchGoogle(prenom = null, nom = null) {
    console.log("Fonction searchGoogle appelée avec:", prenom, nom);

    if (!prenom || !nom) {
        console.error("Prénom et nom sont requis pour la recherche sur Google.");
        return false;
    }

    const apiKeyGOOGLE = "AIzaSyCVaCLlqIShLGxqRp9-8Xqfw6zOU88S68E";
    const cx = "d1393a82d26bb4bd2";
    const query = `${prenom} ${nom}`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKeyGOOGLE}&cx=${cx}&q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Réponse API Google:", data);

        if (data.items && data.items.length > 0) {
            const totalResults = parseInt(data.searchInformation.totalResults);
            console.log("Résultats trouvés:", totalResults);
            if (isNaN(totalResults)) return 0;

            if (totalResults < 100) return 0;
            if (totalResults < 1000) return 1;
            if (totalResults < 10000) return 2;
            if (totalResults < 100000) return 3;
            if (totalResults < 1000000) return 4;
            return 5;
        }

        return 0; // Si aucun résultat trouvé, on considère comme introuvable
    } catch (error) {
        console.error("Erreur API Google Search:", error);
        return 0; // Si erreur technique, on considère comme introuvable
    }
}

async function searchGPT(prenom = null, nom = null) {
    console.log("Fonction searchGPT appelée avec:", prenom, nom);
    
    if (!prenom || !nom) {
        console.error("Prénom et nom sont requis pour la recherche avec GPT.");
        return false;
    }

    const apiKeyGPT = "dv5PugiF7IJ6AjuDsq704eC1Ye3LAgpN";
    const model = "mistral-medium-latest"; // Ou un autre modèle comme "mistral-small-latest" ou "mistral-medium-latest"

    const systemPrompt = `Tu es un expert en notoriété publique. Réponds uniquement par 1 si tu connais cette personne, ou par 0 si tu ne la connais pas. Aucune explication, aucun texte supplémentaire, aucune ponctuation. Exemple : Q:"Connais-tu Jean Moulin ?" R:"1"; Q:"Connais-tu Michel Baltad ?" R:"0".`;
    const userPrompt = `Connais-tu ${prenom} ${nom} ?`;

    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKeyGPT}`,
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
            return 0; // Si erreur technique, on considère comme introuvable
        }
    } catch (error) {
        console.error("Erreur MistralAI:", error);
        return 0; // Si erreur technique, on considère comme introuvable
    }
}


async function searchWikipedia(prenom = null, nom = null) {
    console.log("Fonction searchWikipedia appelée avec:", prenom, nom);

    if (!prenom || !nom) {
        console.error("Prénom et nom sont requis pour la recherche sur Wikipedia.");
        return 0;
    }

    const fullName = `${prenom} ${nom}`;
    const url_fr = `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(fullName)}&format=json&origin=*`;
    const url_en = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(fullName)}&format=json&origin=*`;

    try {
        // Vérification sur Wikipédia FR
        const foundInFR = await pageExists(url_fr);
        if (foundInFR) {
            console.log("Page trouvée sur Wikipédia FR");
            return 1;
        }

        // Vérification sur Wikipédia EN si pas trouvé en FR
        const foundInEN = await pageExists(url_en);
        if (foundInEN) {
            console.log("Page trouvée sur Wikipédia EN");
            return 1;
        }

        console.log("Page non trouvée dans Wikipédia FR et EN");
        return 0;

    } catch (error) {
        console.error("Erreur lors de la recherche Wikipedia:", error);
        return 0; // Si erreur technique, on considère comme introuvable
    }
}

// Fonction utilitaire : Vérifie si la page existe pour Wikipédia
async function pageExists(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Wikipedia API response:", data);

    if (data.query && data.query.pages) {
        const page = Object.values(data.query.pages)[0];
        return page && !page.hasOwnProperty("missing");
    }
    return false;
}

function calculateScore() {
    // Simule un score basé sur des critères fictifs
}

function displayScore(score) {
    const scoreboardElement = document.getElementById('scoreboard');
    const scoreElement = document.getElementById('score');

    scoreboardElement.style.color = 'green';
    scoreElement.textContent = score;
}

function addStorage () {
    // Implémentation pour stocker les résultats dans le stockage local avec date d'expiration ?
    // Peut-être utiliser localStorage.setItem('celebrityScore', score);
}

function deleteStorage () {
    // Implémentation pour supprimer les résultats du stockage local
    // Peut-être utiliser localStorage.removeItem('celebrityScore');
}

function updateStorage() {
    // Implémentation pour mettre à jour les résultats dans le stockage local
    // Peut-être utiliser localStorage.setItem('celebrityScore', newScore);
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
