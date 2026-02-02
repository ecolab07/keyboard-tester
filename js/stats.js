/**
 * Keyboard Tester - Statistics Manager
 * 
 * Gestion des statistiques d'utilisation
 * Comptage des touches testées, affichage du progrès
 * 
 * @license GPL-3.0
 */

/**
 * Éléments DOM pour l'affichage des stats
 */
const StatsElements = {
  testedCount: null,
  totalCount: null
};

/**
 * Initialise le gestionnaire de statistiques
 */
function initStats() {
  StatsElements.testedCount = document.getElementById('testedCount');
  StatsElements.totalCount = document.getElementById('totalCount');
  
  // Afficher le nombre total de touches
  const totalKeys = KeyboardState.keys.length;
  if (StatsElements.totalCount) {
    StatsElements.totalCount.textContent = totalKeys;
  }
  
  // Afficher le compteur initial
  updateStats();
  
  console.log('✅ Statistiques initialisées');
}

/**
 * Met à jour l'affichage des statistiques
 * Compte le nombre de touches ayant la classe 'used'
 */
function updateStats() {
  const testedCount = KeyboardState.keys.filter(k => k.classList.contains('used')).length;
  
  if (StatsElements.testedCount) {
    StatsElements.testedCount.textContent = testedCount;
  }
  
  // Log de progression (tous les 10 touches)
  if (testedCount % 10 === 0 && testedCount > 0) {
    const totalKeys = KeyboardState.keys.length;
    const percentage = Math.round((testedCount / totalKeys) * 100);
    console.log(`📊 Progrès: ${testedCount}/${totalKeys} (${percentage}%)`);
  }
}

/**
 * Réinitialise les statistiques
 * Utilisé lors du reset du test
 */
function resetStats() {
  updateStats();
  console.log('✅ Statistiques réinitialisées');
}
