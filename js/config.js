/**
 * Joypad Tester - Configuration
 * 
 * Constantes globales, seuils de détection, paramètres
 * 
 * @license GPL-3.0
 */

const CONFIG = {
  /**
   * Seuil de détection d'un bouton pressé
   */
  BUTTON_ACTIVE_THRESHOLD: 0.5,

  /**
   * Zone morte des sticks analogiques
   */
  AXIS_DEADZONE: 0.25,

  /**
   * Déplacement maximal du point du stick
   */
  STICK_MAX_OFFSET: 18
};

// Geler la configuration pour éviter les modifications accidentelles
Object.freeze(CONFIG);
