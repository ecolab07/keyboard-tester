# 🎹 Keyboard Tester

Un outil web complet pour tester tous les touches de votre clavier physique. Détecte les problèmes de double frappe (chattering), affiche l'état des touches de verrouillage, et supporte plusieurs layouts.

## ✨ Fonctionnalités

- **Test complet du clavier** : 105+ touches incluant pavé numérique, touches fonction, et navigation
- **Détection AltGr** : Différencie correctement AltGr de Ctrl+Alt (avec gestion du fantôme ControlLeft)
- **Détection de chattering** : Alerte en cas de double frappe involontaire (< 50ms)
- **LED virtuelles** : Affichage de l'état Caps Lock, Num Lock, Scroll Lock
- **Support multi-layouts** : AZERTY (FR), QWERTY (US/UK), BÉPO, AZERTY Apple
- **Statistiques en temps réel** : Compteur de touches testées
- **100% offline** : Aucune dépendance externe, fonctionne sans connexion
- **Interface responsive** : Tout visible sans scroll

## 🚀 Installation

Aucune installation nécessaire ! Clonez simplement le dépôt et ouvrez `index.html` dans votre navigateur.

```bash
git clone https://github.com/votre-username/keyboard-tester.git
cd keyboard-tester
# Ouvrez index.html dans votre navigateur préféré
```

Ou téléchargez directement et double-cliquez sur `index.html`.

## 📖 Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Sélectionnez votre layout de clavier (optionnel)
3. Appuyez sur chaque touche de votre clavier
4. Les touches testées deviennent bleues
5. Le compteur se met à jour en temps réel
6. Cliquez sur "Réinitialiser" pour recommencer

### Détection de problèmes

- **Chattering** : Si une touche produit des doubles frappes involontaires, une alerte modale apparaît
- **LED** : Les voyants Caps/Num/Scroll s'allument automatiquement selon l'état de votre clavier
- **Touches spéciales** : Print Screen, touches mortes (^), et AltGr sont correctement gérés

## 📁 Structure du projet

```
keyboard-tester/
├── index.html              # Page principale
├── css/
│   ├── main.css           # Styles généraux
│   ├── keyboard.css       # Styles du clavier et des touches
│   └── components.css     # Styles des composants (LED, modal, stats)
├── js/
│   ├── config.js          # Configuration globale (seuils, constantes)
│   ├── layouts.js         # Définitions des layouts de clavier
│   ├── keyboard.js        # Logique de détection et matching des touches
│   ├── led-manager.js     # Gestion des LED de verrouillage
│   ├── chattering.js      # Détection de double frappe
│   ├── stats.js           # Gestion des statistiques
│   ├── ui.js              # Gestion de l'interface (modal, reset)
│   └── main.js            # Point d'entrée et initialisation
├── README.md              # Ce fichier
└── LICENSE                # Licence GPL v3
```

## 🔧 Technologies utilisées

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+ (Vanilla, pas de frameworks)

## 🐛 Problèmes connus

- **Print Screen** : Peut être capturé par le système d'exploitation avant le navigateur
- **Touches mortes** : Certaines touches (^, ¨) peuvent ne pas s'activer immédiatement
- **Layouts physiques** : Les codes de touches dépendent du layout physique du clavier, pas du layout logiciel

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add amazing feature'`)
4. Pushez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

### Idées de contributions

- Ajouter plus de layouts (Dvorak, Colemak, etc.)
- Améliorer la détection de layout physique
- Ajouter l'export de rapport PDF
- Support des claviers ergonomiques
- Mode daltonien pour les couleurs

## 📜 Licence

Ce projet est sous licence GNU General Public License v3.0 - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Inspiré par les outils de test de clavier en ligne
- Développé avec ❤️ pour la communauté open source

## 📝 Changelog

### v1.0 (2025-02-01)
- Version initiale
- Support AZERTY, QWERTY, BÉPO
- Détection AltGr et chattering
- LED virtuelles
- Interface complète sans scroll
