/**
 * UCP Enablement Hub - Interactive Application
 * Polaris-aligned JavaScript for navigation, calculators, and interactive elements
 */

// =============================================================================
// Initialization
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initSmoothScroll();
  initNavHighlight();
  initCapabilityCards();
  initQuiz();
  initCalculator();
  initTalkTracks();
  initCopyButtons();
  initHeroDiagram();
  initCapabilitiesDiagram();
  initFAQ();
  initHeroStats();
  initProgressTracking();
  initKeyboardShortcuts();
});

// =============================================================================
// Theme Toggle
// =============================================================================

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('ucp-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
  }
  
  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('ucp-theme', newTheme);
  });
}

// =============================================================================
// Mobile Navigation
// =============================================================================

function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
  
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  
  // Close mobile nav when link clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggle.contains(e.target)) {
      mobileNav.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

// =============================================================================
// Smooth Scroll
// =============================================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // Nav height
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =============================================================================
// Navigation Highlight
// =============================================================================

function initNavHighlight() {
  const sections = document.querySelectorAll('.module[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
}

// =============================================================================
// Capability Cards (Expand/Collapse)
// =============================================================================

function initCapabilityCards() {
  const cards = document.querySelectorAll('.capability-card');
  
  cards.forEach(card => {
    const expandBtn = card.querySelector('.capability-expand');
    
    expandBtn.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      
      // Close all other cards
      cards.forEach(c => c.classList.remove('expanded'));
      cards.forEach(c => c.querySelector('.capability-expand').setAttribute('aria-expanded', 'false'));
      
      // Toggle current card
      if (!isExpanded) {
        card.classList.add('expanded');
        expandBtn.setAttribute('aria-expanded', 'true');
        expandBtn.querySelector('span').textContent = 'Hide Details';
      } else {
        expandBtn.querySelector('span').textContent = 'View Details';
      }
    });
  });
}

// =============================================================================
// Quiz Functionality
// =============================================================================

function initQuiz() {
  const quizzes = document.querySelectorAll('.quiz');
  
  quizzes.forEach(quiz => {
    const options = quiz.querySelectorAll('.quiz-option');
    const feedback = quiz.querySelector('.quiz-feedback');
    
    options.forEach(option => {
      option.addEventListener('click', () => {
        // Disable all options
        options.forEach(opt => opt.disabled = true);
        
        const isCorrect = option.dataset.correct === 'true';
        
        if (isCorrect) {
          option.classList.add('correct');
          feedback.textContent = '✓ Correct! UCP is an open industry standard co-developed by multiple partners.';
          feedback.style.color = 'var(--success)';
        } else {
          option.classList.add('incorrect');
          // Find and highlight correct answer
          options.forEach(opt => {
            if (opt.dataset.correct === 'true') {
              opt.classList.add('correct');
            }
          });
          feedback.textContent = '✗ Not quite. UCP is an open standard, not proprietary to any single company.';
          feedback.style.color = 'var(--critical)';
        }
      });
    });
  });
}

// =============================================================================
// Readiness Calculator
// =============================================================================

function initCalculator() {
  const calculator = document.getElementById('readiness-calculator');
  if (!calculator) return;
  
  const questions = calculator.querySelectorAll('.calc-question');
  const progressFill = document.getElementById('calc-progress');
  const currentQSpan = document.getElementById('current-q');
  const resultDiv = document.getElementById('calc-result');
  
  let currentQuestion = 1;
  let totalScore = 0;
  const totalQuestions = questions.length;
  
  // Create real-time score preview element
  createScorePreview(calculator);
  
  questions.forEach(question => {
    const options = question.querySelectorAll('.calc-option');
    
    options.forEach(option => {
      option.addEventListener('click', () => {
        // Add selected state
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // Add score
        const score = parseInt(option.dataset.score);
        totalScore += score;
        
        // Update real-time score preview
        updateScorePreview(totalScore, totalQuestions, currentQuestion);
        
        // Move to next question with slide animation
        setTimeout(() => {
          if (currentQuestion < totalQuestions) {
            // Slide out current question
            question.classList.add('slide-out-left');
            
            setTimeout(() => {
              question.classList.remove('active', 'slide-out-left');
              currentQuestion++;
              
              // Slide in next question
              const nextQuestion = questions[currentQuestion - 1];
              nextQuestion.classList.add('slide-in-right');
              nextQuestion.classList.add('active');
              
              setTimeout(() => {
                nextQuestion.classList.remove('slide-in-right');
              }, 400);
              
              // Update progress
              const progress = (currentQuestion / totalQuestions) * 100;
              progressFill.style.width = `${progress}%`;
              currentQSpan.textContent = currentQuestion;
            }, 300);
          } else {
            showCalculatorResult(totalScore, totalQuestions);
          }
        }, 300);
      });
    });
  });
  
  // Restart button
  const restartBtn = document.getElementById('restart-calc');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentQuestion = 1;
      totalScore = 0;
      
      // Reset UI
      resultDiv.classList.remove('active');
      questions.forEach((q, i) => {
        q.classList.remove('active', 'slide-out-left', 'slide-in-right');
        if (i === 0) q.classList.add('active');
        q.querySelectorAll('.calc-option').forEach(opt => opt.classList.remove('selected'));
      });
      
      progressFill.style.width = '12.5%';
      currentQSpan.textContent = '1';
      
      // Reset score preview
      updateScorePreview(0, totalQuestions, 1);
      
      // Show questions container
      calculator.querySelector('.calculator-questions').style.display = 'block';
      calculator.querySelector('.calculator-progress').style.display = 'flex';
    });
  }
}

function createScorePreview(calculator) {
  const progress = calculator.querySelector('.calculator-progress');
  if (!progress || progress.querySelector('.score-preview')) return;
  
  const preview = document.createElement('div');
  preview.className = 'score-preview';
  preview.innerHTML = `
    <span class="score-preview-label">Current Score:</span>
    <span class="score-preview-value">0%</span>
    <div class="score-preview-bar">
      <div class="score-preview-fill" style="width: 0%"></div>
    </div>
  `;
  progress.appendChild(preview);
}

function updateScorePreview(currentScore, totalQuestions, currentQ) {
  const preview = document.querySelector('.score-preview');
  if (!preview) return;
  
  // Calculate current percentage (max score is questions answered * 3)
  const maxPossibleNow = currentQ * 3;
  const percentage = Math.round((currentScore / maxPossibleNow) * 100);
  
  const valueEl = preview.querySelector('.score-preview-value');
  const fillEl = preview.querySelector('.score-preview-fill');
  
  valueEl.textContent = `${percentage}%`;
  fillEl.style.width = `${percentage}%`;
  
  // Color based on tier
  if (percentage >= 80) {
    fillEl.style.background = 'var(--success)';
  } else if (percentage >= 60) {
    fillEl.style.background = 'var(--primary)';
  } else if (percentage >= 40) {
    fillEl.style.background = 'var(--warning)';
  } else {
    fillEl.style.background = 'var(--critical)';
  }
}

function showCalculatorResult(score, totalQuestions) {
  const calculator = document.getElementById('readiness-calculator');
  const resultDiv = document.getElementById('calc-result');
  const scoreCircle = document.getElementById('score-circle');
  const scoreValue = document.getElementById('score-value');
  const scoreLabel = document.getElementById('score-label');
  const resultDetails = document.getElementById('result-details');
  
  // Hide questions
  calculator.querySelector('.calculator-questions').style.display = 'none';
  calculator.querySelector('.calculator-progress').style.display = 'none';
  
  // Show results
  resultDiv.classList.add('active');
  
  // Calculate percentage (max score is 24 = 8 questions × 3 points each)
  const maxScore = totalQuestions * 3;
  const percentage = Math.round((score / maxScore) * 100);
  
  // Determine tier for styling
  let tier, label, recommendations, businessImpact;
  
  if (percentage >= 80) {
    tier = 'high';
    label = 'Highly Ready';
    recommendations = [
      'This merchant is an ideal UCP early adopter',
      'Position as competitive differentiator',
      'Focus on first-mover advantage messaging',
      'Suggest pilot program with Google Shopping agent'
    ];
    businessImpact = {
      revenue: '15-25%',
      revenueLabel: 'Potential incremental revenue from AI channels',
      tickets: '40-60%',
      ticketsLabel: 'Estimated WISMO ticket reduction'
    };
  } else if (percentage >= 60) {
    tier = 'ready';
    label = 'Ready';
    recommendations = [
      'Good fit for UCP adoption',
      'Address any specific gaps identified',
      'Emphasize low implementation effort',
      'Start with post-purchase (Order) capability value'
    ];
    businessImpact = {
      revenue: '10-15%',
      revenueLabel: 'Potential incremental revenue from AI channels',
      tickets: '30-40%',
      ticketsLabel: 'Estimated WISMO ticket reduction'
    };
  } else if (percentage >= 40) {
    tier = 'emerging';
    label = 'Emerging';
    recommendations = [
      'Consider a phased approach',
      'Focus on building AI/innovation appetite',
      'Start education on agentic commerce trends',
      'Revisit in 3-6 months for reassessment'
    ];
    businessImpact = {
      revenue: '5-10%',
      revenueLabel: 'Potential future opportunity',
      tickets: '20-30%',
      ticketsLabel: 'Possible ticket reduction with Order capability'
    };
  } else {
    tier = 'not-ready';
    label = 'Not Ready';
    recommendations = [
      'UCP may not be the priority right now',
      'Focus on foundational commerce improvements',
      'Build case for innovation investment',
      'Monitor competitor moves in AI commerce'
    ];
    businessImpact = {
      revenue: '—',
      revenueLabel: 'Focus on foundations first',
      tickets: '—',
      ticketsLabel: 'Address core operations'
    };
  }
  
  // Animate score circle with tier color
  setTimeout(() => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    scoreCircle.style.strokeDashoffset = offset;
    scoreCircle.className = `score-fill tier-${tier}`;
    
    // Animate counter
    animateCounter(scoreValue, 0, percentage, 1200);
    scoreValue.className = `score-value tier-${tier}`;
  }, 100);
  
  scoreLabel.textContent = label;
  
  resultDetails.innerHTML = `
    <h4>Recommendations</h4>
    <ul>
      ${recommendations.map(r => `<li>${r}</li>`).join('')}
    </ul>
    <div class="business-impact">
      <div class="impact-metric">
        <span class="impact-value">${businessImpact.revenue}</span>
        <span class="impact-label">${businessImpact.revenueLabel}</span>
      </div>
      <div class="impact-metric">
        <span class="impact-value">${businessImpact.tickets}</span>
        <span class="impact-label">${businessImpact.ticketsLabel}</span>
      </div>
    </div>
  `;
}

// Counter Animation Helper
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  const diff = end - start;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + diff * easeOut);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// =============================================================================
// Talk Tracks Selector
// =============================================================================

function initTalkTracks() {
  const buttons = document.querySelectorAll('.scenario-btn');
  const tracks = document.querySelectorAll('.talk-track');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.dataset.scenario;
      
      // Update buttons
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update tracks
      tracks.forEach(track => {
        track.classList.remove('active');
        if (track.dataset.track === scenario) {
          track.classList.add('active');
        }
      });
    });
  });
}

// =============================================================================
// Toast Notifications
// =============================================================================

function showToast(message, type = 'success', duration = 3000) {
  // Create container if it doesn't exist
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Auto-remove after duration
  setTimeout(() => {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// =============================================================================
// Copy Buttons
// =============================================================================

function initCopyButtons() {
  // Code copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeId = btn.dataset.copy;
      const code = document.getElementById(codeId);
      
      if (code) {
        await copyToClipboard(code.textContent, btn);
      }
    });
  });
  
  // Track copy buttons
  document.querySelectorAll('.copy-track-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const trackId = btn.dataset.track;
      const track = document.querySelector(`.talk-track[data-track="${trackId}"] .track-content`);
      
      if (track) {
        await copyToClipboard(track.textContent, btn);
      }
    });
  });
  
  // Key Takeaways copy buttons
  document.querySelectorAll('.copy-takeaways-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const module = btn.dataset.module;
      const takeawaysBox = btn.closest('.key-takeaways');
      const takeaways = takeawaysBox?.querySelectorAll('.takeaways-list li');
      
      if (takeaways) {
        let text = `Key Takeaways - ${module.charAt(0).toUpperCase() + module.slice(1).replace('-', ' ')}\n\n`;
        takeaways.forEach((li, i) => {
          const content = li.querySelector('span:last-child')?.textContent.trim();
          if (content) {
            text += `${i + 1}. ${content}\n\n`;
          }
        });
        
        await copyToClipboard(text.trim(), btn);
        
        // Visual feedback
        btn.classList.add('copied');
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied!
        `;
        
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2000);
      }
    });
  });
}

async function copyToClipboard(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  } catch (err) {
    // Fallback for browsers without clipboard API
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Copied to clipboard!', 'success');
    } catch (fallbackErr) {
      showToast('Failed to copy. Please select and copy manually.', 'error');
      console.error('Failed to copy:', fallbackErr);
    }
  }
}

// =============================================================================
// Hero Diagram (Animated SVG)
// =============================================================================

function initHeroDiagram() {
  const container = document.getElementById('hero-diagram');
  if (!container) return;
  
  container.innerHTML = `
    <svg viewBox="0 0 400 300" class="hero-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:var(--primary)"/>
          <stop offset="100%" style="stop-color:#00a878"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Central UCP Node -->
      <g class="ucp-node" filter="url(#glow)">
        <circle cx="200" cy="150" r="50" fill="url(#heroGrad)" opacity="0.9"/>
        <text x="200" y="145" text-anchor="middle" fill="white" font-size="14" font-weight="700">UCP</text>
        <text x="200" y="162" text-anchor="middle" fill="white" font-size="8" opacity="0.9">Protocol</text>
      </g>
      
      <!-- Agent Node -->
      <g class="agent-node">
        <circle cx="80" cy="80" r="35" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
        <text x="80" y="75" text-anchor="middle" fill="var(--text)" font-size="20">🤖</text>
        <text x="80" y="95" text-anchor="middle" fill="var(--text-subdued)" font-size="9">AI Agent</text>
      </g>
      
      <!-- Consumer Node -->
      <g class="consumer-node">
        <circle cx="320" cy="80" r="35" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
        <text x="320" y="75" text-anchor="middle" fill="var(--text)" font-size="20">👤</text>
        <text x="320" y="95" text-anchor="middle" fill="var(--text-subdued)" font-size="9">Consumer</text>
      </g>
      
      <!-- Merchant Node -->
      <g class="merchant-node">
        <circle cx="200" cy="260" r="35" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
        <text x="200" y="255" text-anchor="middle" fill="var(--text)" font-size="20">🏪</text>
        <text x="200" y="275" text-anchor="middle" fill="var(--text-subdued)" font-size="9">Merchant</text>
      </g>
      
      <!-- Connecting Lines with Animation -->
      <g class="connections">
        <line x1="115" y1="100" x2="155" y2="125" stroke="var(--primary)" stroke-width="2" stroke-dasharray="5,5" class="connection-line"/>
        <line x1="285" y1="100" x2="245" y2="125" stroke="var(--primary)" stroke-width="2" stroke-dasharray="5,5" class="connection-line"/>
        <line x1="200" y1="200" x2="200" y2="225" stroke="var(--primary)" stroke-width="2" stroke-dasharray="5,5" class="connection-line"/>
      </g>
      
      <!-- Capability Labels -->
      <g class="labels">
        <rect x="110" y="105" width="50" height="18" rx="9" fill="var(--primary-light)"/>
        <text x="135" y="117" text-anchor="middle" fill="var(--primary)" font-size="8" font-weight="600">Identity</text>
        
        <rect x="240" y="105" width="55" height="18" rx="9" fill="var(--primary-light)"/>
        <text x="267" y="117" text-anchor="middle" fill="var(--primary)" font-size="8" font-weight="600">Checkout</text>
        
        <rect x="175" y="200" width="50" height="18" rx="9" fill="var(--primary-light)"/>
        <text x="200" y="212" text-anchor="middle" fill="var(--primary)" font-size="8" font-weight="600">Order</text>
      </g>
    </svg>
    
    <style>
      .hero-svg {
        width: 100%;
        max-width: 400px;
      }
      
      .ucp-node {
        animation: pulse-glow 2s ease-in-out infinite;
      }
      
      .connection-line {
        animation: dash 1.5s linear infinite;
      }
      
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.9; }
        50% { opacity: 1; }
      }
      
      @keyframes dash {
        to {
          stroke-dashoffset: -10;
        }
      }
      
      .agent-node, .consumer-node, .merchant-node {
        animation: float 3s ease-in-out infinite;
      }
      
      .consumer-node {
        animation-delay: 0.5s;
      }
      
      .merchant-node {
        animation-delay: 1s;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    </style>
  `;
}

// =============================================================================
// Capabilities Diagram
// =============================================================================

function initCapabilitiesDiagram() {
  const container = document.getElementById('capabilities-diagram');
  if (!container) return;
  
  container.innerHTML = `
    <svg viewBox="0 0 800 400" class="capabilities-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="capGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#008060"/>
          <stop offset="100%" style="stop-color:#00a878"/>
        </linearGradient>
        <linearGradient id="capGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#5c6ac4"/>
          <stop offset="100%" style="stop-color:#7b8adb"/>
        </linearGradient>
        <linearGradient id="capGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00848e"/>
          <stop offset="100%" style="stop-color:#00a6b2"/>
        </linearGradient>
      </defs>
      
      <!-- Flow Container -->
      <g class="flow">
        <!-- Consumer -->
        <g transform="translate(50, 180)">
          <rect x="0" y="0" width="100" height="60" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
          <text x="50" y="25" text-anchor="middle" font-size="20">👤</text>
          <text x="50" y="45" text-anchor="middle" fill="var(--text)" font-size="11" font-weight="600">Consumer</text>
        </g>
        
        <!-- Arrow 1 -->
        <g transform="translate(160, 200)">
          <line x1="0" y1="10" x2="40" y2="10" stroke="var(--border)" stroke-width="2"/>
          <polygon points="40,10 30,5 30,15" fill="var(--border)"/>
          <text x="20" y="0" text-anchor="middle" fill="var(--text-subdued)" font-size="9">Request</text>
        </g>
        
        <!-- AI Agent -->
        <g transform="translate(210, 180)">
          <rect x="0" y="0" width="100" height="60" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
          <text x="50" y="25" text-anchor="middle" font-size="20">🤖</text>
          <text x="50" y="45" text-anchor="middle" fill="var(--text)" font-size="11" font-weight="600">AI Agent</text>
        </g>
        
        <!-- Arrow 2 -->
        <g transform="translate(320, 200)">
          <line x1="0" y1="10" x2="40" y2="10" stroke="var(--primary)" stroke-width="2"/>
          <polygon points="40,10 30,5 30,15" fill="var(--primary)"/>
          <text x="20" y="0" text-anchor="middle" fill="var(--primary)" font-size="9" font-weight="600">UCP</text>
        </g>
        
        <!-- UCP Hub -->
        <g transform="translate(370, 120)">
          <rect x="0" y="0" width="140" height="180" rx="12" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="2"/>
          <text x="70" y="30" text-anchor="middle" fill="var(--primary)" font-size="14" font-weight="700">UCP Protocol</text>
          
          <!-- Capability 1: Checkout -->
          <g transform="translate(15, 45)">
            <rect x="0" y="0" width="110" height="35" rx="6" fill="url(#capGrad1)"/>
            <text x="55" y="15" text-anchor="middle" fill="white" font-size="16">🛒</text>
            <text x="55" y="28" text-anchor="middle" fill="white" font-size="9" font-weight="600">Checkout</text>
          </g>
          
          <!-- Capability 2: Identity -->
          <g transform="translate(15, 90)">
            <rect x="0" y="0" width="110" height="35" rx="6" fill="url(#capGrad2)"/>
            <text x="55" y="15" text-anchor="middle" fill="white" font-size="16">🔐</text>
            <text x="55" y="28" text-anchor="middle" fill="white" font-size="9" font-weight="600">Identity</text>
          </g>
          
          <!-- Capability 3: Order -->
          <g transform="translate(15, 135)">
            <rect x="0" y="0" width="110" height="35" rx="6" fill="url(#capGrad3)"/>
            <text x="55" y="15" text-anchor="middle" fill="white" font-size="16">📦</text>
            <text x="55" y="28" text-anchor="middle" fill="white" font-size="9" font-weight="600">Order</text>
          </g>
        </g>
        
        <!-- Arrow 3 -->
        <g transform="translate(520, 200)">
          <line x1="0" y1="10" x2="40" y2="10" stroke="var(--primary)" stroke-width="2"/>
          <polygon points="40,10 30,5 30,15" fill="var(--primary)"/>
          <text x="20" y="0" text-anchor="middle" fill="var(--primary)" font-size="9" font-weight="600">API</text>
        </g>
        
        <!-- Shopify Platform -->
        <g transform="translate(570, 140)">
          <rect x="0" y="0" width="180" height="140" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
          <text x="90" y="25" text-anchor="middle" fill="var(--text)" font-size="12" font-weight="700">Shopify Platform</text>
          
          <!-- Platform components -->
          <g transform="translate(15, 40)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="var(--surface-subdued)" stroke="var(--border-subdued)" stroke-width="1"/>
            <text x="35" y="17" text-anchor="middle" fill="var(--text-subdued)" font-size="9">Catalog</text>
            <text x="35" y="30" text-anchor="middle" font-size="14">📋</text>
          </g>
          
          <g transform="translate(95, 40)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="var(--surface-subdued)" stroke="var(--border-subdued)" stroke-width="1"/>
            <text x="35" y="17" text-anchor="middle" fill="var(--text-subdued)" font-size="9">Cart</text>
            <text x="35" y="30" text-anchor="middle" font-size="14">🛒</text>
          </g>
          
          <g transform="translate(15, 90)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="var(--surface-subdued)" stroke="var(--border-subdued)" stroke-width="1"/>
            <text x="35" y="17" text-anchor="middle" fill="var(--text-subdued)" font-size="9">Payments</text>
            <text x="35" y="30" text-anchor="middle" font-size="14">💳</text>
          </g>
          
          <g transform="translate(95, 90)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="var(--surface-subdued)" stroke="var(--border-subdued)" stroke-width="1"/>
            <text x="35" y="17" text-anchor="middle" fill="var(--text-subdued)" font-size="9">Orders</text>
            <text x="35" y="30" text-anchor="middle" font-size="14">📦</text>
          </g>
        </g>
      </g>
      
      <!-- Foundation Standards -->
      <g transform="translate(0, 350)">
        <text x="400" y="15" text-anchor="middle" fill="var(--text-subdued)" font-size="10">
          Built on: REST + JSON-RPC • AP2 (Agent Payments) • A2A (Agent-to-Agent) • MCP (Model Context Protocol)
        </text>
      </g>
    </svg>
    
    <style>
      .capabilities-svg {
        width: 100%;
        max-width: 800px;
      }
    </style>
  `;
}

// =============================================================================
// Scroll Animations (Intersection Observer with Stagger)
// =============================================================================

const observeElements = () => {
  // Track which groups have been animated to apply stagger only once
  const animatedGroups = new Set();
  
  const observer = new IntersectionObserver((entries) => {
    // Group entries by parent section
    const groupedEntries = {};
    
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        const parent = entry.target.closest('.module, .quick-nav');
        const parentId = parent ? parent.id : 'default';
        
        if (!groupedEntries[parentId]) {
          groupedEntries[parentId] = [];
        }
        groupedEntries[parentId].push(entry.target);
      }
    });
    
    // Apply staggered animation to each group
    Object.keys(groupedEntries).forEach(groupId => {
      const elements = groupedEntries[groupId];
      
      elements.forEach((el, index) => {
        // Apply stagger delay only if group hasn't been animated yet
        const delay = animatedGroups.has(groupId) ? 0 : index * 100;
        
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
      });
      
      // Mark group as animated
      animatedGroups.add(groupId);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all animatable elements
  const selectors = [
    '.module-header',
    '.content-block',
    '.capability-card',
    '.model-card',
    '.quick-nav-card',
    '.positioning-card',
    '.integration-item',
    '.resource-category',
    '.reference-card',
    '.info-card',
    '.enterprise-section'
  ];
  
  document.querySelectorAll(selectors.join(', ')).forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
};

// Add animation styles
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                  transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Slight scale for cards */
    .quick-nav-card.animate-on-scroll,
    .capability-card.animate-on-scroll,
    .model-card.animate-on-scroll,
    .positioning-card.animate-on-scroll {
      transform: translateY(24px) scale(0.98);
    }
    
    .quick-nav-card.visible,
    .capability-card.visible,
    .model-card.visible,
    .positioning-card.visible {
      transform: translateY(0) scale(1);
    }
  `;
  document.head.appendChild(style);
};

// =============================================================================
// FAQ Module
// =============================================================================

function initFAQ() {
  const faqContainer = document.querySelector('.faq-container');
  if (!faqContainer) return;

  // Initialize accordion functionality
  initFAQAccordion();
  
  // Initialize category tabs
  initFAQCategoryTabs();
  
  // Initialize search
  initFAQSearch();
}

function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (!question || !answer) return;
    
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items in the same section
      const parentSection = item.closest('.faq-section');
      if (parentSection) {
        parentSection.querySelectorAll('.faq-question').forEach(q => {
          q.setAttribute('aria-expanded', 'false');
          q.closest('.faq-item').querySelector('.faq-answer')?.classList.remove('open');
        });
      }
      
      // Toggle current item
      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
}

function initFAQCategoryTabs() {
  const tabs = document.querySelectorAll('.faq-tab');
  const sections = document.querySelectorAll('.faq-section');
  
  if (!tabs.length || !sections.length) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show/hide sections based on category
      sections.forEach(section => {
        const sectionCategory = section.dataset.category;
        
        if (category === 'all') {
          section.classList.remove('hidden');
        } else if (sectionCategory === category || sectionCategory === 'all') {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
      
      // Clear search when switching tabs
      const searchInput = document.getElementById('faq-search');
      if (searchInput) {
        searchInput.value = '';
        // Reset any hidden items from search
        document.querySelectorAll('.faq-item.hidden').forEach(item => {
          item.classList.remove('hidden');
        });
      }
    });
  });
}

function initFAQSearch() {
  const searchInput = document.getElementById('faq-search');
  if (!searchInput) return;
  
  let debounceTimer;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.toLowerCase().trim();
      filterFAQItems(query);
    }, 200);
  });
}

function filterFAQItems(query) {
  const faqItems = document.querySelectorAll('.faq-item');
  const sections = document.querySelectorAll('.faq-section');
  
  if (!query) {
    // Show all items when query is empty
    faqItems.forEach(item => item.classList.remove('hidden'));
    sections.forEach(section => section.classList.remove('hidden'));
    return;
  }
  
  // Filter items based on query
  faqItems.forEach(item => {
    const questionText = item.querySelector('.faq-question span')?.textContent.toLowerCase() || '';
    const answerText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
    
    if (questionText.includes(query) || answerText.includes(query)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
  
  // Hide sections that have no visible items
  sections.forEach(section => {
    const visibleItems = section.querySelectorAll('.faq-item:not(.hidden)');
    if (visibleItems.length === 0 && !section.classList.contains('objection-reference')) {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  });
  
  // Also filter objection quick reference
  const objectionQuicks = document.querySelectorAll('.objection-quick');
  objectionQuicks.forEach(objection => {
    const qText = objection.querySelector('.objection-q')?.textContent.toLowerCase() || '';
    const aText = objection.querySelector('.objection-a')?.textContent.toLowerCase() || '';
    
    if (qText.includes(query) || aText.includes(query)) {
      objection.style.display = '';
    } else {
      objection.style.display = 'none';
    }
  });
}

// =============================================================================
// Hero Stats Animation
// =============================================================================

function initHeroStats() {
  const stats = document.querySelectorAll('.stat');
  if (!stats.length) return;
  
  const heroSection = document.querySelector('.hero');
  let hasAnimated = false;
  
  const animateStats = () => {
    if (hasAnimated) return;
    hasAnimated = true;
    
    stats.forEach((stat, index) => {
      const valueEl = stat.querySelector('.stat-value');
      if (!valueEl) return;
      
      const finalValue = valueEl.dataset.value || valueEl.textContent;
      const suffix = valueEl.dataset.suffix || '';
      const prefix = valueEl.dataset.prefix || '';
      
      // Extract numeric value
      const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
      
      // Add animation class with stagger
      setTimeout(() => {
        stat.classList.add('stat-animating');
        
        // Animate the number
        animateStatCounter(valueEl, 0, numericValue, 1500, prefix, suffix);
        
        // Add completion class
        setTimeout(() => {
          stat.classList.add('stat-complete');
        }, 1600);
      }, index * 200);
    });
  };
  
  // Use Intersection Observer to trigger animation when hero is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(animateStats, 300);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });
  
  if (heroSection) {
    observer.observe(heroSection);
  }
}

function animateStatCounter(element, start, end, duration, prefix = '', suffix = '') {
  const startTime = performance.now();
  const diff = end - start;
  
  // Store original content for screen readers
  element.setAttribute('aria-label', `${prefix}${end}${suffix}`);
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out expo for dramatic effect)
    const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = start + diff * easeOut;
    
    // Format the number appropriately
    let displayValue;
    if (Number.isInteger(end)) {
      displayValue = Math.round(current);
    } else {
      displayValue = current.toFixed(1);
    }
    
    element.textContent = `${prefix}${displayValue}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Ensure final value is exact
      element.textContent = `${prefix}${end}${suffix}`;
    }
  }
  
  requestAnimationFrame(update);
}

// =============================================================================
// Progress Tracking System
// =============================================================================

function initProgressTracking() {
  const STORAGE_KEY = 'ucp-hub-progress';
  const modules = document.querySelectorAll('.module[id]');
  
  if (!modules.length) return;
  
  // Load saved progress
  let progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  
  // Create progress indicator
  createProgressIndicator(modules.length, progress);
  
  // Track module views
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const moduleId = entry.target.getAttribute('id');
        if (!progress[moduleId]) {
          progress[moduleId] = {
            viewed: true,
            timestamp: Date.now()
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
          updateProgressIndicator(modules.length, progress);
          
          // Update nav link with checkmark
          const navLink = document.querySelector(`.nav-link[data-section="${moduleId}"]`);
          if (navLink && !navLink.querySelector('.nav-check')) {
            navLink.classList.add('viewed');
          }
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-10% 0px -10% 0px'
  });
  
  modules.forEach(module => observer.observe(module));
  
  // Check for return visit
  const lastVisit = localStorage.getItem('ucp-hub-last-visit');
  const now = Date.now();
  
  if (lastVisit && (now - parseInt(lastVisit)) > 3600000) { // More than 1 hour
    const viewedCount = Object.keys(progress).length;
    if (viewedCount > 0 && viewedCount < modules.length) {
      showContinuePrompt(progress, modules);
    }
  }
  
  localStorage.setItem('ucp-hub-last-visit', now.toString());
}

function createProgressIndicator(total, progress) {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  const viewedCount = Object.keys(progress).length;
  const percentage = Math.round((viewedCount / total) * 100);
  
  const indicator = document.createElement('div');
  indicator.className = 'progress-indicator';
  indicator.innerHTML = `
    <div class="progress-ring">
      <svg viewBox="0 0 36 36">
        <path class="progress-ring-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke-width="3"
        />
        <path class="progress-ring-fill"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke-width="3"
          stroke-dasharray="${percentage}, 100"
        />
      </svg>
      <span class="progress-text">${viewedCount}/${total}</span>
    </div>
    <span class="progress-label">Modules</span>
  `;
  
  // Insert before theme toggle
  const themeToggle = nav.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.parentNode.insertBefore(indicator, themeToggle);
  }
}

function updateProgressIndicator(total, progress) {
  const indicator = document.querySelector('.progress-indicator');
  if (!indicator) return;
  
  const viewedCount = Object.keys(progress).length;
  const percentage = Math.round((viewedCount / total) * 100);
  
  const ringFill = indicator.querySelector('.progress-ring-fill');
  const progressText = indicator.querySelector('.progress-text');
  
  if (ringFill) {
    ringFill.style.strokeDasharray = `${percentage}, 100`;
  }
  if (progressText) {
    progressText.textContent = `${viewedCount}/${total}`;
  }
  
  // Add celebration effect when complete
  if (viewedCount === total) {
    indicator.classList.add('complete');
    showToast('Congratulations! You\'ve viewed all modules.', 'success');
  }
}

function showContinuePrompt(progress, modules) {
  // Find last viewed module
  let lastModule = null;
  let lastTimestamp = 0;
  
  Object.keys(progress).forEach(moduleId => {
    if (progress[moduleId].timestamp > lastTimestamp) {
      lastTimestamp = progress[moduleId].timestamp;
      lastModule = moduleId;
    }
  });
  
  // Find next unviewed module
  let nextModule = null;
  for (let i = 0; i < modules.length; i++) {
    const moduleId = modules[i].getAttribute('id');
    if (!progress[moduleId]) {
      nextModule = moduleId;
      break;
    }
  }
  
  if (nextModule) {
    const prompt = document.createElement('div');
    prompt.className = 'continue-prompt';
    prompt.innerHTML = `
      <div class="continue-content">
        <span class="continue-icon">📚</span>
        <div class="continue-text">
          <strong>Welcome back!</strong>
          <span>Continue where you left off?</span>
        </div>
        <a href="#${nextModule}" class="continue-btn">Continue</a>
        <button class="continue-dismiss" aria-label="Dismiss">×</button>
      </div>
    `;
    
    document.body.appendChild(prompt);
    
    // Animate in
    setTimeout(() => prompt.classList.add('visible'), 100);
    
    // Dismiss handlers
    prompt.querySelector('.continue-dismiss').addEventListener('click', () => {
      prompt.classList.remove('visible');
      setTimeout(() => prompt.remove(), 300);
    });
    
    prompt.querySelector('.continue-btn').addEventListener('click', () => {
      prompt.classList.remove('visible');
      setTimeout(() => prompt.remove(), 300);
    });
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (prompt.parentNode) {
        prompt.classList.remove('visible');
        setTimeout(() => prompt.remove(), 300);
      }
    }, 10000);
  }
}

// =============================================================================
// Keyboard Shortcuts
// =============================================================================

function initKeyboardShortcuts() {
  const modules = Array.from(document.querySelectorAll('.module[id]'));
  const moduleIds = modules.map(m => m.getAttribute('id'));
  let shortcutsModalOpen = false;
  
  document.addEventListener('keydown', (e) => {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.matches('input, textarea, select')) return;
    
    const key = e.key.toLowerCase();
    
    // ? - Show shortcuts help
    if (key === '?' || (e.shiftKey && key === '/')) {
      e.preventDefault();
      toggleShortcutsModal();
      return;
    }
    
    // Escape - Close modal
    if (key === 'escape' && shortcutsModalOpen) {
      toggleShortcutsModal();
      return;
    }
    
    // D - Toggle dark mode
    if (key === 'd' && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      document.getElementById('theme-toggle')?.click();
      return;
    }
    
    // J/K - Navigate modules
    if (key === 'j' || key === 'k') {
      e.preventDefault();
      navigateModules(key === 'j' ? 'next' : 'prev', moduleIds);
      return;
    }
    
    // 1-8 - Jump to specific module
    if (/^[1-8]$/.test(key)) {
      e.preventDefault();
      const index = parseInt(key) - 1;
      if (moduleIds[index]) {
        scrollToModule(moduleIds[index]);
      }
      return;
    }
    
    // Home - Go to top
    if (key === 'home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // End - Go to bottom
    if (key === 'end') {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }
  });
  
  function toggleShortcutsModal() {
    let modal = document.getElementById('shortcuts-modal');
    
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'shortcuts-modal';
      modal.className = 'shortcuts-modal';
      modal.innerHTML = `
        <div class="shortcuts-content">
          <div class="shortcuts-header">
            <h3>Keyboard Shortcuts</h3>
            <button class="shortcuts-close" aria-label="Close">×</button>
          </div>
          <div class="shortcuts-body">
            <div class="shortcuts-section">
              <h4>Navigation</h4>
              <div class="shortcut-row"><kbd>J</kbd><span>Next module</span></div>
              <div class="shortcut-row"><kbd>K</kbd><span>Previous module</span></div>
              <div class="shortcut-row"><kbd>1</kbd>-<kbd>8</kbd><span>Jump to module</span></div>
              <div class="shortcut-row"><kbd>Home</kbd><span>Go to top</span></div>
              <div class="shortcut-row"><kbd>End</kbd><span>Go to bottom</span></div>
            </div>
            <div class="shortcuts-section">
              <h4>Actions</h4>
              <div class="shortcut-row"><kbd>D</kbd><span>Toggle dark mode</span></div>
              <div class="shortcut-row"><kbd>?</kbd><span>Show this help</span></div>
              <div class="shortcut-row"><kbd>Esc</kbd><span>Close modal</span></div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      modal.querySelector('.shortcuts-close').addEventListener('click', toggleShortcutsModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) toggleShortcutsModal();
      });
    }
    
    shortcutsModalOpen = !shortcutsModalOpen;
    modal.classList.toggle('open', shortcutsModalOpen);
    document.body.classList.toggle('modal-open', shortcutsModalOpen);
  }
  
  function navigateModules(direction, moduleIds) {
    // Find current module
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    let currentIndex = -1;
    
    for (let i = 0; i < moduleIds.length; i++) {
      const module = document.getElementById(moduleIds[i]);
      if (module && module.offsetTop <= scrollPosition) {
        currentIndex = i;
      }
    }
    
    let targetIndex;
    if (direction === 'next') {
      targetIndex = Math.min(currentIndex + 1, moduleIds.length - 1);
    } else {
      targetIndex = Math.max(currentIndex - 1, 0);
    }
    
    if (moduleIds[targetIndex]) {
      scrollToModule(moduleIds[targetIndex]);
    }
  }
  
  function scrollToModule(moduleId) {
    const module = document.getElementById(moduleId);
    if (module) {
      const offset = 80;
      const targetPosition = module.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }
}

// Page load animation
const initPageLoadAnimation = () => {
  // Add loaded class to body after a brief delay
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
};

// Initialize animations after page load
window.addEventListener('load', () => {
  addAnimationStyles();
  initPageLoadAnimation();
  observeElements();
});
