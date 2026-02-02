/**
 * Keyboard Tester - Main Entry Point
 * 
 * Point d'entrée de l'application
 * Initialise tous les modules dans le bon ordre
 * 
 * @license GPL-3.0
 * @version 1.0.0
 */

/**
 * Initialise l'application complète
 * Appelée au chargement du DOM
 */
function initApp() {
  console.log('🚀 Démarrage de Keyboard Tester v1.0');
  
  try {
    // 1. Initialiser le clavier (doit être fait en premier)
    initKeyboard();
    
    // 2. Initialiser les statistiques
    initStats();
    
    // 3. Initialiser le gestionnaire de LED
    initLEDManager();
    
    // 4. Initialiser l'interface utilisateur
    initUI();
    
    // 5. Attacher les event listeners du clavier
    attachKeyboardListeners();
    
    console.log('✅ Application initialisée avec succès');
    console.log(`📊 ${KeyboardState.keys.length} touches détectées`);
    console.log(`⌨️  Layout: ${LAYOUTS[KeyboardState.currentLayout].name}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    alert('Une erreur est survenue lors du chargement de l\'application. Veuillez rafraîchir la page.');
  }
}

// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // Le DOM est déjà chargé
  initApp();
}
