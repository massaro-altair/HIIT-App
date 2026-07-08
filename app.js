(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     DATA: Workout definitions
     ═══════════════════════════════════════════ */
  const WORKOUTS = {
    nivel1: {
      name: 'Nível 1',
      totalSeconds: 1500,
      phases: [
        { start: 0, end: 60, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
        { start: 60, end: 180, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 180, end: 240, speedMin: 10, speedMax: 12, effort: 'Máximo', level: 'maximo' },
        { start: 240, end: 360, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 360, end: 420, speedMin: 10, speedMax: 12, effort: 'Máximo', level: 'maximo' },
        { start: 420, end: 540, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
        { start: 540, end: 600, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 600, end: 660, speedMin: 10, speedMax: 12, effort: 'Máximo', level: 'maximo' },
        { start: 660, end: 840, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 840, end: 900, speedMin: 10, speedMax: 12, effort: 'Máximo', level: 'maximo' },
        { start: 900, end: 960, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
        { start: 960, end: 1080, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 1080, end: 1140, speedMin: 10, speedMax: 12, effort: 'Máximo', level: 'maximo' },
        { start: 1140, end: 1200, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
        { start: 1200, end: 1260, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 1260, end: 1320, speedMin: 10, speedMax: 12, effort: 'Máximo', level: 'maximo' },
        { start: 1320, end: 1440, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 1440, end: 1500, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
      ]
    },
    nivel2: {
      name: 'Nível 2',
      totalSeconds: 1500,
      phases: [
        { start: 0, end: 60, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
        { start: 60, end: 120, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 120, end: 240, speedMin: 10, speedMax: 12, effort: 'Moderado Alto', level: 'moderado-alto' },
        { start: 240, end: 300, speedMin: 13, speedMax: 15, effort: 'Máximo', level: 'maximo' },
        { start: 300, end: 360, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
        { start: 360, end: 480, speedMin: 10, speedMax: 12, effort: 'Moderado Alto', level: 'moderado-alto' },
        { start: 480, end: 540, speedMin: 13, speedMax: 15, effort: 'Máximo', level: 'maximo' },
        { start: 540, end: 660, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 660, end: 720, speedMin: 10, speedMax: 12, effort: 'Moderado Alto', level: 'moderado-alto' },
        { start: 720, end: 780, speedMin: 13, speedMax: 15, effort: 'Máximo', level: 'maximo' },
        { start: 780, end: 900, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
        { start: 900, end: 960, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 960, end: 1080, speedMin: 10, speedMax: 12, effort: 'Moderado Alto', level: 'moderado-alto' },
        { start: 1080, end: 1200, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 1200, end: 1320, speedMin: 10, speedMax: 12, effort: 'Moderado Alto', level: 'moderado-alto' },
        { start: 1320, end: 1380, speedMin: 13, speedMax: 15, effort: 'Máximo', level: 'maximo' },
        { start: 1380, end: 1440, speedMin: 7, speedMax: 9, effort: 'Moderado', level: 'moderado' },
        { start: 1440, end: 1500, speedMin: 5, speedMax: 6, effort: 'Fácil', level: 'facil' },
      ]
    }
  };

  const COLORS = {
    facil: '#00ff88',
    moderado: '#ffdd00',
    'moderado-alto': '#ff7700',
    maximo: '#ff0044'
  };

  /* ═══════════════════════════════════════════
     AUDIO ENGINE
     ═══════════════════════════════════════════ */
  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playBeep(freq, duration, volume) {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq || 800, ctx.currentTime);
      gain.gain.setValueAtTime(volume || 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (duration || 0.15));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + (duration || 0.15));
    } catch (e) {
    }
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR';
    u.rate = 0.95;
    u.pitch = 1.0;
    u.volume = 1.0;
    window.speechSynthesis.speak(u);
  }

  /* ═══════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════ */
  var state = {
    workout: null,
    elapsed: 0,
    countdown: 15,
    running: false,
    isCountdownPhase: true,
    completed: false,
    intervalId: null,
    announcedPre: false,
    beepedSecond: -1,
    lastCountdownSecond: -1
  };

  /* ═══════════════════════════════════════════
     DOM REFS
     ═══════════════════════════════════════════ */
  function $(id) { return document.getElementById(id); }

  var dom = {};

  function cacheDom() {
    dom.screenSelect = $('screen-select');
    dom.screenWorkout = $('screen-workout');
    dom.workoutNameTop = $('workout-name-top');
    dom.timerDisplay = $('timer-display');
    dom.phaseDisplay = $('phase-display');
    dom.speedDisplay = $('speed-display');
    dom.speedRange = $('speed-range');
    dom.ringFg = document.querySelector('.ring-fg');
    dom.phaseBarFill = $('phase-bar-fill');
    dom.phaseTotal = $('phase-total');
    dom.btnControl = $('btn-control');
    dom.iconPlay = $('icon-play');
    dom.iconPause = $('icon-pause');
    dom.btnBack = $('btn-back');
    dom.cards = document.querySelectorAll('.card');
  }

  /* ═══════════════════════════════════════════
     SCREEN MANAGER
     ═══════════════════════════════════════════ */
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.toggle('active', s.id === id);
    });
  }

  /* ═══════════════════════════════════════════
     UI UPDATES
     ═══════════════════════════════════════════ */
  function formatTime(sec) {
    var m = Math.floor(Math.abs(sec) / 60);
    var s = Math.floor(Math.abs(sec) % 60);
    return (sec < 0 ? '-' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function getPhase(workout, seconds) {
    for (var i = 0; i < workout.phases.length; i++) {
      var p = workout.phases[i];
      if (seconds >= p.start && seconds < p.end) {
        return { index: i, phase: p };
      }
    }
    return null;
  }

  function updateUI() {
    var w = state.workout;
    if (!w) return;

    /* Countdown */
    if (state.isCountdownPhase) {
      var c = state.countdown;
      dom.timerDisplay.textContent = formatTime(-c);
      dom.timerDisplay.style.color = '#00ccff';
      dom.phaseDisplay.textContent = 'Prepare-se';
      dom.phaseDisplay.style.color = '#00ccff';
      dom.speedDisplay.textContent = '\u2014';
      dom.speedDisplay.style.color = '#00ccff';
      dom.speedRange.textContent = 'Contagem regressiva';
      dom.ringFg.style.stroke = '#00ccff';

      var countdownProgress = 1 - (c / 15);
      var circ = 816.81;
      dom.ringFg.style.strokeDashoffset = circ * (1 - countdownProgress);
      dom.phaseBarFill.style.width = '0%';
      return;
    }

    /* Completed */
    if (state.completed) {
      dom.timerDisplay.textContent = '00:00';
      dom.timerDisplay.style.color = COLORS.facil;
      dom.phaseDisplay.textContent = 'Conclu\u00eddo';
      dom.phaseDisplay.style.color = COLORS.facil;
      dom.speedDisplay.textContent = '\u2014';
      dom.speedDisplay.style.color = COLORS.facil;
      dom.speedRange.textContent = 'Treino finalizado';
      dom.ringFg.style.stroke = COLORS.facil;
      dom.ringFg.style.strokeDashoffset = 0;
      dom.phaseBarFill.style.width = '100%';
      dom.phaseBarFill.style.color = COLORS.facil;
      dom.phaseBarFill.style.background = COLORS.facil;
      return;
    }

    /* Workout in progress */
    var elapsed = state.elapsed;
    var remaining = w.totalSeconds - elapsed;
    var result = getPhase(w, elapsed);
    if (!result) return;

    var phase = result.phase;
    var idx = result.index;
    var phaseProgress = (elapsed - phase.start) / (phase.end - phase.start);
    var overallProgress = elapsed / w.totalSeconds;
    var color = COLORS[phase.level] || '#00ff88';

    dom.timerDisplay.textContent = formatTime(remaining);
    dom.timerDisplay.style.color = color;
    dom.phaseDisplay.textContent = phase.effort;
    dom.phaseDisplay.style.color = color;

    var midSpeed = Math.round((phase.speedMin + phase.speedMax) / 2);
    dom.speedDisplay.textContent = midSpeed;
    dom.speedDisplay.style.color = color;
    dom.speedRange.textContent = phase.speedMin + ' - ' + phase.speedMax + ' km/h';
    dom.speedRange.style.color = color;

    var circ = 816.81;
    dom.ringFg.style.strokeDashoffset = circ * (1 - overallProgress);
    dom.ringFg.style.stroke = color;

    dom.phaseBarFill.style.width = (phaseProgress * 100) + '%';
    dom.phaseBarFill.style.color = color;
    dom.phaseBarFill.style.background = color;

    /* ─── Announce 10s before phase change ─── */
    var secondsToEnd = phase.end - elapsed;
    if (secondsToEnd <= 10 && secondsToEnd > 9 && !state.announcedPre) {
      var nextIdx = idx + 1;
      if (nextIdx < w.phases.length) {
        var nextPhase = w.phases[nextIdx];
        speak('Aten\u00e7\u00e3o! Em 10 segundos, ' + nextPhase.effort.toLowerCase() + ', ' + nextPhase.speedMin + ' a ' + nextPhase.speedMax + ' quil\u00f4metros por hora');
      } else {
        speak('Faltam 10 segundos para o fim do treino');
      }
      state.announcedPre = true;
    }

    /* ─── Beep last 3s before phase change ─── */
    if (secondsToEnd <= 3 && secondsToEnd > 0) {
      var floorSec = Math.ceil(secondsToEnd);
      if (floorSec !== state.beepedSecond) {
        playBeep(800, 0.12, 0.25);
        state.beepedSecond = floorSec;
      }
    }

    /* ─── Reset flags on phase boundary ─── */
    if (secondsToEnd <= 0 && idx < w.phases.length - 1) {
      state.announcedPre = false;
      state.beepedSecond = -1;
    }
  }

  /* ═══════════════════════════════════════════
     TIMER ENGINE
     ═══════════════════════════════════════════ */
  function tick() {
    if (state.isCountdownPhase) {
      state.countdown -= 0.1;
      if (state.countdown <= 0) {
        state.countdown = 0;
        state.isCountdownPhase = false;
        state.elapsed = 0;
        state.announcedPre = false;
        state.beepedSecond = -1;
        updateUI();
        speak('Vai!');
        return;
      }
      updateUI();
      handleCountdownSpeech();
      return;
    }

    state.elapsed += 0.1;
    if (state.elapsed >= state.workout.totalSeconds) {
      state.elapsed = state.workout.totalSeconds;
      finishWorkout();
      return;
    }
    updateUI();
  }

  function handleCountdownSpeech() {
    var cInt = Math.ceil(state.countdown);
    if (cInt === state.lastCountdownSecond) return;
    state.lastCountdownSecond = cInt;

    switch (cInt) {
      case 15:
        speak('Prepare-se! O treino vai come\u00e7ar!');
        break;
      case 10:
        speak('Faltam 10 segundos');
        break;
      case 5:
        speak('5');
        playBeep(660, 0.1, 0.2);
        break;
      case 4:
        speak('4');
        playBeep(660, 0.1, 0.2);
        break;
      case 3:
        speak('3');
        playBeep(800, 0.15, 0.3);
        break;
      case 2:
        speak('2');
        playBeep(800, 0.15, 0.3);
        break;
      case 1:
        speak('1');
        playBeep(800, 0.15, 0.3);
        break;
    }
  }

  function startTimer() {
    if (state.intervalId) return;
    state.running = true;
    state.intervalId = setInterval(tick, 100);
    dom.iconPlay.style.display = 'none';
    dom.iconPause.style.display = 'block';
  }

  function pauseTimer() {
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
    state.running = false;
    dom.iconPlay.style.display = 'block';
    dom.iconPause.style.display = 'none';
    window.speechSynthesis.cancel();
  }

  function finishWorkout() {
    pauseTimer();
    state.completed = true;
    updateUI();
    speak('Parab\u00e9ns! Treino conclu\u00eddo!');
    dom.btnControl.style.display = 'none';
  }

  /* ═══════════════════════════════════════════
     SELECT WORKOUT
     ═══════════════════════════════════════════ */
  function selectWorkout(id) {
    resetState();
    state.workout = WORKOUTS[id];
    dom.workoutNameTop.textContent = 'Treino ' + state.workout.name;
    dom.phaseTotal.textContent = '25:00';
    dom.btnControl.style.display = 'flex';
    dom.iconPlay.style.display = 'block';
    dom.iconPause.style.display = 'none';
    updateUI();
    showScreen('screen-workout');

    /* Unlock audio context (requires user gesture) */
    getAudioCtx();

    /* Auto-start countdown */
    startTimer();
  }

  function resetState() {
    pauseTimer();
    state.elapsed = 0;
    state.countdown = 15;
    state.isCountdownPhase = true;
    state.completed = false;
    state.announcedPre = false;
    state.beepedSecond = -1;
    state.lastCountdownSecond = -1;
  }

  /* ═══════════════════════════════════════════
     EVENT BINDING
     ═══════════════════════════════════════════ */
  function init() {
    cacheDom();

    dom.cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var workoutId = card.getAttribute('data-workout');
        selectWorkout(workoutId);
      });
    });

    dom.btnControl.addEventListener('click', function () {
      if (state.completed) return;
      if (state.running) {
        pauseTimer();
      } else {
        startTimer();
      }
    });

    dom.btnBack.addEventListener('click', function () {
      pauseTimer();
      window.speechSynthesis.cancel();
      showScreen('screen-select');
    });

    updateUI();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
