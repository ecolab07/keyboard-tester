# 🎮 Joypad Tester

Un outil web pour tester toutes les commandes d'un joypad (boutons, gâchettes, sticks) avec une représentation graphique fidèle. Basé sur l'apparence et les modules réutilisables de Keyboard Tester, ce projet est désormais orienté manettes.

## ✨ Fonctionnalités

- **Test complet du joypad** : boutons principaux, D-pad, L1/L2/R1/R2, Start/Select/Home
- **Sticks analogiques** : visualisation en temps réel des positions des sticks
- **Retour visuel immédiat** : chaque commande pressée devient active et se marque comme testée
- **Statistiques en temps réel** : compteur de commandes testées
- **100% offline** : aucune dépendance externe, fonctionne sans connexion
- **Interface responsive** : la manette s'adapte aux écrans plus petits

## 🚀 Installation

Aucune installation nécessaire ! Clonez simplement le dépôt et ouvrez `index.html` dans votre navigateur.

```bash
git clone https://github.com/votre-username/joypad-tester.git
cd joypad-tester
# Ouvrez index.html dans votre navigateur préféré
```

Ou téléchargez directement et double-cliquez sur `index.html`.

## 📖 Utilisation

1. Branchez votre manette (USB/Bluetooth)
2. Ouvrez `index.html` dans votre navigateur
3. Appuyez sur chaque bouton, gâchette et stick
4. Les commandes testées deviennent bleues
5. Le compteur se met à jour en temps réel
6. Cliquez sur "Réinitialiser" pour recommencer

### Conseils

- Les sticks se valident lorsqu'ils dépassent la zone morte (déplacement visible du point)
- Certaines manettes nécessitent une interaction utilisateur avant d'être détectées par le navigateur

## 📁 Structure du projet

```
joypad-tester/
├── index.html              # Page principale
├── css/
│   ├── main.css           # Styles généraux
│   ├── gamepad.css        # Styles de la manette et des commandes
│   └── components.css     # Styles des composants (stats, boutons, status)
├── js/
│   ├── config.js          # Configuration globale
│   ├── gamepad.js         # Logique de la manette (Gamepad API)
│   ├── stats.js           # Gestion des statistiques
│   ├── ui.js              # Gestion de l'interface
│   └── main.js            # Point d'entrée et initialisation
├── README.md              # Ce fichier
└── LICENSE                # Licence GPL v3
```

## 🔧 Technologies utilisées

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+ (Vanilla, Gamepad API)

## 🐛 Problèmes connus

- **Détection manette** : certains navigateurs exigent une interaction utilisateur pour activer la Gamepad API
- **Mapping** : les boutons sont basés sur le mapping standard (XInput), les manettes exotiques peuvent varier

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add amazing feature'`)
4. Pushez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

### Idées de contributions

- Ajouter un mode de calibration des sticks
- Afficher les valeurs analogiques exactes
- Support des layouts PlayStation / Switch
- Mode daltonien pour les couleurs

## 📜 Licence

Ce projet est sous licence GNU General Public License v3.0 - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Basé sur l'outil Keyboard Tester
- Développé avec ❤️ pour la communauté open source

## 📝 Changelog

### v1.1 (2025-02-01)
- Ajout de la représentation graphique de joypad
- Support Gamepad API et sticks analogiques

### v1.0 (2025-02-01)
- Version initiale (base clavier issue de Keyboard Tester)
