(function() {
  // ---------- PAGE NAVIGATION ----------
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-links a');

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active-page'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active-page');

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === pageId) {
        link.classList.add('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.dataset.page;
      if (pageId) showPage(pageId);
    });
  });

  // initial home is active; default set in html

  // ---------- BMI CALCULATOR (home & home block) ----------
  const weightHome = document.getElementById('weightHome');
  const heightHome = document.getElementById('heightHome');
  const calcHomeBtn = document.getElementById('calcHomeBtn');
  const resetHomeBtn = document.getElementById('resetHomeBtn');
  const bmiHomeResult = document.getElementById('bmiHomeResult');

  function calculateBMI(weightKg, heightCm) {
    if (weightKg > 0 && heightCm > 0) {
      let heightM = heightCm / 100;
      let bmi = weightKg / (heightM * heightM);
      return bmi.toFixed(1);
    }
    return null;
  }

  function updateBMIResult() {
    let w = parseFloat(weightHome.value);
    let h = parseFloat(heightHome.value);
    let bmiVal = calculateBMI(w, h);
    if (bmiVal !== null) {
      let category = '';
      if (bmiVal < 18.5) category = 'Underweight';
      else if (bmiVal < 25) category = 'Normal weight';
      else if (bmiVal < 30) category = 'Overweight';
      else category = 'Obese';
      bmiHomeResult.innerText = `BMI: ${bmiVal} (${category})`;
    } else {
      bmiHomeResult.innerText = 'Please enter valid numbers';
    }
  }

  calcHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateBMIResult();
  });

  resetHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    weightHome.value = '75';
    heightHome.value = '178';
    bmiHomeResult.innerText = 'Your BMI will appear here';
  });

  // optional immediate reset if needed, but fine.

  // membership form prevent page reload (demo)
  document.getElementById('membershipForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Welcome aboard! (demo signup)');
  });

  // extra: make any "join today" link switch to membership
  document.querySelectorAll('[data-page="membership"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('membership');
    });
  });

  // also home page quick trainer preview click -> trainers page?
  // not needed, but we can add gentle enhancement

  // ---------- SCHEDULE TIMER ----------
  const classes = [
    { day: 1, time: '06:00', name: 'Strength', trainer: 'Marcus' },
    { day: 1, time: '07:00', name: 'Yoga', trainer: 'Leila' },
    { day: 1, time: '10:00', name: 'HIIT', trainer: 'Carlos' },
    { day: 1, time: '18:30', name: 'HIIT', trainer: 'Carlos' },
    { day: 2, time: '07:00', name: 'Pilates', trainer: 'Jenna' },
    { day: 2, time: '09:30', name: 'Cardio', trainer: 'Leila' },
    { day: 2, time: '10:00', name: 'Strength', trainer: 'Marcus' },
    { day: 2, time: '18:30', name: 'Strength', trainer: 'Marcus' },
    { day: 3, time: '07:00', name: 'Yoga', trainer: 'Leila' },
    { day: 3, time: '09:30', name: 'Pilates', trainer: 'Jenna' },
    { day: 3, time: '10:00', name: 'HIIT', trainer: 'Carlos' },
    { day: 3, time: '18:30', name: 'HIIT', trainer: 'Carlos' },
    { day: 4, time: '06:00', name: 'HIIT', trainer: 'Carlos' },
    { day: 4, time: '07:00', name: 'Pilates', trainer: 'Jenna' },
    { day: 4, time: '10:00', name: 'Strength', trainer: 'Marcus' },
    { day: 4, time: '18:30', name: 'Strength', trainer: 'Marcus' },
    { day: 5, time: '07:00', name: 'Yoga', trainer: 'Leila' },
    { day: 5, time: '09:30', name: 'Pilates', trainer: 'Jenna' },
    { day: 5, time: '10:00', name: 'Functional', trainer: 'Carlos' },
    { day: 5, time: '18:30', name: 'HIIT', trainer: 'Carlos' },
    { day: 6, time: '07:00', name: 'Zumba', trainer: 'Jenna' },
    { day: 6, time: '09:30', name: 'Yoga', trainer: 'Leila' },
    { day: 6, time: '10:00', name: 'Boxing', trainer: 'Carlos' },
    { day: 6, time: '14:00', name: 'Strength', trainer: 'Marcus' }
  ];

  function getNextClass() {
    const now = new Date();
    const currentDay = now.getDay() === 0 ? 7 : now.getDay();
    const currentTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    let nextClass = null;

    for (let cls of classes) {
      const classDay = cls.day;
      const classTime = cls.time;

      if (classDay > currentDay || (classDay === currentDay && classTime > currentTime)) {
        nextClass = cls;
        break;
      }
    }

    if (!nextClass) {
      nextClass = classes[0];
    }

    return nextClass;
  }

  function updateTimer() {
    const now = new Date();
    const nextClass = getNextClass();
    const [hours, minutes] = nextClass.time.split(':');
    const nextClassDate = new Date();
    nextClassDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    if (nextClassDate <= now) {
      nextClassDate.setDate(nextClassDate.getDate() + 1);
    }

    const timeDiff = nextClassDate - now;
    const hrs = String(Math.floor(timeDiff / (1000 * 60 * 60)) % 24).padStart(2, '0');
    const mins = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
    const secs = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');

    const timerDisplay = document.getElementById('timerDisplay');
    const nextClassInfo = document.getElementById('nextClassInfo');

    if (timerDisplay) {
      timerDisplay.innerText = `${hrs}:${mins}:${secs}`;
    }
    if (nextClassInfo) {
      nextClassInfo.innerText = `${nextClass.name} with ${nextClass.trainer} at ${nextClass.time}`;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);

})();
