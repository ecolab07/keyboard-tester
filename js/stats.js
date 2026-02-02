/**
 * Joypad Tester - Statistics Manager
 * 
 * Gestion des statistiques d'utilisation
 * Comptage des commandes testées, affichage du progrès
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

  const totalControls = GamepadState.controls.length;
  if (StatsElements.totalCount) {
    StatsElements.totalCount.textContent = totalControls;
  }

  updateStats();

  console.log('✅ Statistiques initialisées');
}

/**
 * Met à jour l'affichage des statistiques
 * Compte le nombre de commandes ayant la classe 'used'
 */
function updateStats() {
  const testedCount = GamepadState.controls.filter(control => control.classList.contains('used')).length;

  if (StatsElements.testedCount) {
    StatsElements.testedCount.textContent = testedCount;
  }

  if (testedCount % 5 === 0 && testedCount > 0) {
    const totalControls = GamepadState.controls.length;
    const percentage = Math.round((testedCount / totalControls) * 100);
    console.log(`📊 Progrès: ${testedCount}/${totalControls} (${percentage}%)`);
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
