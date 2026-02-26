window.ToolEngine = {
  steps: [],
  init: function(getStepsFn) {
    this.getStepsFn = getStepsFn;
    document.getElementById('btn-exec').onclick = () => this.start();
  },
  start: function() {
    const data = this.getStepsFn();
    if (!data) return;
    this.steps = data.steps;

    document.getElementById('placeholder-msg').style.display = 'none';
    const problemArea = document.getElementById('problem-display');
    problemArea.innerHTML = data.problem;
    problemArea.style.display = 'block';

    const resultsArea = document.getElementById('results-area');
    resultsArea.style.borderStyle = 'solid';

    const nav = document.getElementById('step-nav');
    const display = document.getElementById('step-display');
    nav.innerHTML = ''; display.innerHTML = '';

    this.steps.forEach((step, i) => {
      const btn = document.createElement('button');
      btn.className = 'step-btn';
      btn.id = `btn-step-${i}`;
      btn.innerText = step.title;
      if (i > 0) btn.disabled = true;
      btn.onclick = () => this.toggleStep(i);
      nav.appendChild(btn);
    });

      renderMathInElement(problemArea, { delimiters: [{left: "$$", right: "$$", display: true}, {left: "$", right: "$", display: false}], fleqn: true });
          // --- 【追加】問題エリア（QUESTION）までスクロール ---
    problemArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.toggleStep(0);
  },
  toggleStep: function(index) {
    const content = document.getElementById(`step-content-${index}`);
    if (content) {
      for (let i = index; i < this.steps.length; i++) this.removeStep(i);
    } else {
      this.addStep(index);
    }
  },
  addStep: function(index) {
    const display = document.getElementById('step-display');
    const step = this.steps[index];
    const div = document.createElement('div');
    div.className = 'step-content-flow';
    div.id = `step-content-${index}`;
    div.innerHTML = `<div class="step-body">${step.content}</div>`;
    display.appendChild(div);

    document.getElementById(`btn-step-${index}`).classList.add('active');
    const nextBtn = document.getElementById(`btn-step-${index + 1}`);
    if (nextBtn) nextBtn.disabled = false;

    renderMathInElement(div, { delimiters: [{left: "$$", right: "$$", display: true}, {left: "$", right: "$", display: false}], fleqn: true });
    div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },
  removeStep: function(index) {
    const el = document.getElementById(`step-content-${index}`);
    if (el) el.remove();
    document.getElementById(`btn-step-${index}`).classList.remove('active');
    const nextBtn = document.getElementById(`btn-step-${index + 1}`);
    if (nextBtn) nextBtn.disabled = true;
  }
};
