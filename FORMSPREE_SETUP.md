# Configuration Formspree - Changer l'adresse email

## Procédure pour changer l'adresse email Formspree

### Étape 1 : Créer un nouveau formulaire sur Formspree

1. Allez sur [https://formspree.io](https://formspree.io)
2. Connectez-vous ou créez un compte gratuit
3. Cliquez sur "New Form" pour créer un nouveau formulaire
4. Entrez la nouvelle adresse email où vous souhaitez recevoir les messages
5. Formspree vous donnera un endpoint unique qui ressemble à : `https://formspree.io/f/xxxxxxxxxx`
6. Copiez cet endpoint

### Étape 2 : Configurer l'endpoint dans le projet

#### Option A : Utiliser un fichier .env (Recommandé)

1. Créez un fichier `.env` à la racine du projet (au même niveau que `package.json`)
2. Ajoutez la ligne suivante dans le fichier `.env` :
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/votre-nouvel-id
   ```
3. Remplacez `votre-nouvel-id` par l'ID que Formspree vous a donné
4. **Important** : Redémarrez le serveur de développement après avoir créé/modifié le fichier `.env`

#### Option B : Modifier directement le code (Non recommandé)

Si vous ne voulez pas utiliser un fichier `.env`, vous pouvez modifier directement la ligne 74 du fichier `src/components/layout/Contact.vue` :

```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/votre-nouvel-id';
```

### Étape 3 : Tester le formulaire

1. Redémarrez votre serveur de développement (`npm run dev`)
2. Remplissez le formulaire de contact sur votre site
3. Vérifiez que vous recevez bien l'email à la nouvelle adresse

### Notes importantes

- **Ne commitez jamais le fichier `.env`** dans Git (il devrait être dans `.gitignore`)
- Le fichier `.env` est déjà configuré pour être ignoré par Git
- Si vous déployez votre site, vous devrez également configurer la variable d'environnement `VITE_FORMSPREE_ENDPOINT` sur votre plateforme d'hébergement (Vercel, Netlify, etc.)

### Exemple de fichier .env

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mjkjbqny
```

### Vérification

Pour vérifier que la configuration fonctionne :
1. Ouvrez la console du navigateur (F12)
2. Allez dans l'onglet "Network"
3. Envoyez un message via le formulaire
4. Vous devriez voir une requête vers votre endpoint Formspree

