/**
 * Joypad Tester - Gamepad Logic
 * 
 * Gestion de la détection des manettes, matching avec les éléments DOM,
 * mise à jour des états des boutons et des sticks.
 * 
 * @license GPL-3.0
 */

/**
 * État global du gamepad
 */
const GamepadState = {
  controls: [],
  buttonControls: new Map(),
  sticks: [],
  activeIndex: null,
  animationFrame: null
};

/**
 * Initialise le module gamepad
 * Récupère toutes les commandes du DOM et configure l'état initial
 */
function initGamepad() {
  GamepadState.controls = [...document.querySelectorAll('.control')];
  GamepadState.buttonControls = new Map();
  GamepadState.sticks = [...document.querySelectorAll('.stick')];

  GamepadState.controls
    .filter(control => control.dataset.button !== undefined)
    .forEach(control => {
      const index = Number(control.dataset.button);
      if (!GamepadState.buttonControls.has(index)) {
        GamepadState.buttonControls.set(index, []);
      }
      GamepadState.buttonControls.get(index).push(control);
    });

  GamepadState.sticks.forEach(stick => resetStickPosition(stick));

  console.log(`✅ Gamepad initialisé : ${GamepadState.controls.length} commandes détectées`);
}

/**
 * Attache les event listeners pour la connexion des manettes
 */
function attachGamepadListeners() {
  window.addEventListener('gamepadconnected', (event) => {
    GamepadState.activeIndex = event.gamepad.index;
    updateConnectionStatus(event.gamepad);
    startPolling();
  });

  window.addEventListener('gamepaddisconnected', (event) => {
    if (GamepadState.activeIndex === event.gamepad.index) {
      GamepadState.activeIndex = null;
      updateConnectionStatus(null);
    }
  });

  // Démarrer le polling si une manette est déjà connectée
  const existingGamepad = getActiveGamepad();
  if (existingGamepad) {
    updateConnectionStatus(existingGamepad);
    startPolling();
  } else {
    updateConnectionStatus(null);
  }

  console.log('✅ Event listeners gamepad attachés');
}

/**
 * Démarre la boucle de polling
 */
function startPolling() {
  if (GamepadState.animationFrame) {
    return;
  }

  const poll = () => {
    updateGamepadState();
    GamepadState.animationFrame = requestAnimationFrame(poll);
  };

  poll();
}

/**
 * Met à jour l'état des commandes selon la manette active
 */
function updateGamepadState() {
  const gamepad = getActiveGamepad();
  if (!gamepad) {
    updateConnectionStatus(null);
    return;
  }

  updateConnectionStatus(gamepad);
  updateButtons(gamepad);
  updateSticks(gamepad);
  updateStats();
}

/**
 * Récupère la manette active ou la première disponible
 * @returns {Gamepad|null}
 */
function getActiveGamepad() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  if (GamepadState.activeIndex !== null) {
    return pads[GamepadState.activeIndex] || null;
  }
  return [...pads].find(Boolean) || null;
}

/**
 * Met à jour le statut de connexion dans l'UI
 * @param {Gamepad|null} gamepad
 */
function updateConnectionStatus(gamepad) {
  const statusEl = document.getElementById('connectionStatus');
  const nameEl = document.getElementById('gamepadName');

  if (!statusEl || !nameEl) {
    return;
  }

  if (gamepad) {
    statusEl.textContent = 'Manette connectée';
    statusEl.classList.add('connected');
    nameEl.textContent = gamepad.id || 'Manette détectée';
  } else {
    statusEl.textContent = 'Aucune manette détectée';
    statusEl.classList.remove('connected');
    nameEl.textContent = 'Branchez une manette et appuyez sur un bouton';
  }
}

/**
 * Met à jour l'état des boutons pressés
 * @param {Gamepad} gamepad
 */
function updateButtons(gamepad) {
  GamepadState.buttonControls.forEach((elements, index) => {
    const button = gamepad.buttons[index];
    const pressed = button && (button.pressed || button.value >= CONFIG.BUTTON_ACTIVE_THRESHOLD);

    elements.forEach(element => {
      element.classList.toggle('active', Boolean(pressed));
      if (pressed) {
        element.classList.add('used');
      }
    });
  });
}

/**
 * Met à jour l'état des sticks analogiques
 * @param {Gamepad} gamepad
 */
function updateSticks(gamepad) {
  GamepadState.sticks.forEach(stick => {
    const axisX = Number(stick.dataset.axisX);
    const axisY = Number(stick.dataset.axisY);
    const valueX = clampAxis(gamepad.axes[axisX] || 0);
    const valueY = clampAxis(gamepad.axes[axisY] || 0);
    const magnitude = Math.hypot(valueX, valueY);
    const isActive = magnitude > CONFIG.AXIS_DEADZONE;

    setStickPosition(stick, valueX, valueY);
    stick.classList.toggle('active', isActive);
    if (isActive) {
      stick.classList.add('used');
    }
  });
}

/**
 * Réinitialise la position visuelle d'un stick
 * @param {HTMLElement} stick
 */
function resetStickPosition(stick) {
  setStickPosition(stick, 0, 0);
}

/**
 * Met à jour la position du stick
 * @param {HTMLElement} stick
 * @param {number} x
 * @param {number} y
 */
function setStickPosition(stick, x, y) {
  const dot = stick.querySelector('.stick-dot');
  if (!dot) {
    return;
  }

  const maxOffset = CONFIG.STICK_MAX_OFFSET;
  dot.style.transform = `translate(${x * maxOffset}px, ${y * maxOffset}px)`;
}

/**
 * Normalise et limite une valeur d'axe
 * @param {number} value
 * @returns {number}
 */
function clampAxis(value) {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.max(-1, Math.min(1, value));
}
