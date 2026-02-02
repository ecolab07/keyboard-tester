/**
 * Keyboard Tester - UI Manager
 * 
 * Gestion de l'interface utilisateur
 * Bouton de réinitialisation, sélecteur de layout, etc.
 * 
 * @license GPL-3.0
 */

/**
 * Réinitialise le test complet
 * Efface toutes les touches testées et réinitialise tous les modules
 */
function resetTest() {
  // Retirer toutes les classes 'used' et 'active' des touches
  KeyboardState.keys.forEach(k => {
    k.classList.remove('used', 'active');
  });
  
  // Réinitialiser les modules
  resetChattering();
  resetStats();
  
  console.log('🔄 Test réinitialisé');
}

/**
 * Initialise les contrôles UI
 * Attache les event listeners aux boutons et sélecteurs
 */
function initUI() {
  // Bouton de réinitialisation
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetTest);
  }
  
  // Sélecteur de layout
  const layoutSelector = document.getElementById('layoutSelector');
  if (layoutSelector) {
    layoutSelector.addEventListener('change', (e) => {
      changeLayout(e.target.value);
    });
  }
  
  console.log('✅ Interface utilisateur initialisée');
}
