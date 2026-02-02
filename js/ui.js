/**
 * Joypad Tester - UI Manager
 * 
 * Gestion de l'interface utilisateur
 * Bouton de réinitialisation, infos de connexion
 * 
 * @license GPL-3.0
 */

/**
 * Réinitialise le test complet
 * Efface toutes les commandes testées et réinitialise les sticks
 */
function resetTest() {
  GamepadState.controls.forEach(control => {
    control.classList.remove('used', 'active');
  });

  GamepadState.sticks.forEach(stick => resetStickPosition(stick));
  resetStats();

  console.log('🔄 Test réinitialisé');
}

/**
 * Initialise les contrôles UI
 */
function initUI() {
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetTest);
  }

  console.log('✅ Interface utilisateur initialisée');
}
