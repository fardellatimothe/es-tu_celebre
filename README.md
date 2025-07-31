---
# ✨ Es-tu célèbre ? Le test ultime ! ✨

Salut ! Prêt(e) à découvrir si tu es une **star en devenir** ou si tu préfères la discrétion ? Ce petit projet amusant analyse ta **célébrité** en te donnant un score de **0 (inconnu)** à **5 (star)**.

Basé sur les données publiques de diverses plateformes, il te suffit de lancer le test pour obtenir ton résultat !

---
## 🚀 Comment ça marche ?

C'est **super simple** !
1.  Renseigne ton **Nom** et ton **Prénom** (obligatoire).
2.  Ajoute tes noms d'utilisateur sur tes réseaux sociaux préférés (optionnel, pour un score plus précis).

Notre algorithme magique fera le reste pour te donner ton score de célébrité !

### 📏 Ton score de célébrité :

* **0 : Anonyme** 👻 - Agent secret ou ninja ? Le monde ne te connaît pas encore !
* **1 : Connu(e) de quelques-uns** 👋 - Tes amis et ta famille te connaissent, et c'est déjà un bon début !
* **2 : Notoriété locale** 🏘️ - La star de ton quartier ou de ta ville, c'est peut-être toi !
* **3 : Petite notoriété** 📢 - Tu commences à faire parler de toi !
* **4 : Très connu(e)** 🌟 - Tu es sur le point de percer...
* **5 : Star internationale** 🤩 - Lumière sur toi ! Tu es partout, le monde est à tes pieds !

---
## 💡 Les plateformes analysées et leurs données

Pour calculer ton score, nous interrogeons diverses API publiques. Plus tu renseignes d'informations, plus le test est complet !

---
## 💡 Les plateformes analysées et leurs données

Pour calculer ton score, nous interrogeons diverses API publiques. Plus tu renseignes d'informations, plus le test est complet !

| Plateforme / API | Entrée fournie | Résultat analysé |
| :------------------------------- | :------------------------- | :------------------------------------------- |
| 🌐 **Wikipédia** (API Wikimédia) | Nom & Prénom | Page existante sur la personne (Oui/Non) |
| 🤖 **GPT** (API MistralAI - medium) | Nom & Prénom | IA connaît la personne (Oui/Non) |
| 🔍 **Google** (API Google Custom Search) | Nom & Prénom | Score de 0 à 5 selon le nombre de résultats* |
| 📺 **Youtube** (API Google Youtube v3) | Nom de la chaîne | Score de 0 à 5 selon le nombre de résultats* |
| 🎮 **Twitch** (API Twitch Helix) | Nom de la chaîne | Score de 0 à 5 selon le nombre de résultats* |
| 📸 **Instagram** (API RapidAPI Instagram Looter) | Nom d'utilisateur Instagram | Score de 0 à 5 selon le nombre de résultats* |
| 🕺 **TikTok** (API RapidAPI TikTok API) | Nom d'utilisateur TikTok | Score de 0 à 5 selon le nombre de résultats* |
| 🐦 **Twitter/X** (API RapidAPI Twitter API) | Nom d'utilisateur Twitter | Score de 0 à 5 selon le nombre de résultats* |

* **Échelle des scores de 0 à 5 (pour Google, YouTube, Twitch, Instagram, TikTok, Twitter/X) :**
    * `0` : 0-100 résultats
    * `1` : 100-1k résultats
    * `2` : 1k-10k résultats
    * `3` : 10k-100k résultats
    * `4` : 100k-1M résultats
    * `5` : +1M résultats

---
## ⚠️ Bon à savoir

* **Homonymie :** Ton score est basé sur les informations publiques de ton nom, prénom et réseaux sociaux. En cas d'homonymie, des données d'autres personnes portant le même nom pourraient influencer le résultat.
* **Juste pour s'amuser :** Ce score de célébrité ne veut absolument rien dire ! C'est le fruit de mon amusement en code (même si... bon, si t'es pas célèbre, t'es pas célèbre ! 😉).
* **Limite de requêtes :** Pour préserver les APIs gratuites que j'utilise, le nombre de requêtes est limité à **5 par jour**. Merci de respecter cette mesure pour le bien de tous !

---
## 🔒 Avertissement Légal : Utilisation des APIs

Les clés d'APIs de ce projet sont visibles dans le fichier JavaScript. Elles sont **strictement dédiées à l'usage de ce test, à des fins non commerciales et personnelles**.

**Toute utilisation malveillante, frauduleuse ou détournée de ces APIs est formellement interdite.** Cela inclut l'usurpation d'identité ou la tentative de contourner les limites de requêtes. En cas d'abus, je me réserve le droit de poursuivre en justice et de prendre toutes les mesures légales nécessaires pour protéger mes intérêts et ceux des fournisseurs d'APIs.

Merci d'utiliser ce projet de manière responsable et dans un esprit de jeu !

---
Alors, prêt(e) à lancer le test et découvrir ton niveau de célébrité ? 😉