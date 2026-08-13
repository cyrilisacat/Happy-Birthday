const defaultData = {
  name: 'Bud',
  message: `Ni hao unsa mani xiao long bao! Yes, uh, I would like to greet you da happy birthday And wish you a, wah the best of everything. Sorry I'm not a speaking straighting But I'm just adjusting hahahahahhahahahahahahhahahahahahha charot. Sana gets mo yung reference kasi kung hindi, edi wag 😡 

Ito na seeruse na talaga ahahahha

May every moment be filled with joy, laughter, and love on your special day. I want you to know that I am always here for you because life is better with you in it.  (Hindi 'yan makasagot siguro lomoloha na 'yan sha hahahahhahahaha)

Happy Birthday, bruvvaa!

P.S. Feel ko after ni'to, ililibre mo'ko, feel ko lang naman...
P.P.S What if panoorin mo na yung reels na sinesend ko sa tiktok?! 😞😞😞`,
  bg1: '#FFE66D',
  bg2: '#87CEEB',
  bg3: '#FFF6B3',
  bg4: '#BEE7FF',
  accent: '#FF6B9D',
};

// Page Elements
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const acceptBtn = document.getElementById('accept-btn');
const declineBtn = document.getElementById('decline-btn');

// Page 2 Elements
const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const bg1Input = document.getElementById('bg1-input');
const bg2Input = document.getElementById('bg2-input');
const accentInput = document.getElementById('accent-input');
const birthdayName = document.getElementById('birthday-name');
const birthdayMessage = document.getElementById('birthday-message');
const applyButton = document.getElementById('apply-design');
const customizerToggle = document.getElementById('customizer-toggle');
const closeCustomizer = document.getElementById('close-customizer');
const customizerPanel = document.getElementById('customizer');

let backgroundAudio = null;
let musicEnabled = false;
let evilLaughAudio = null;
let audioUnmuted = false;

function autoPlayEvilLaugh() {
  if (!evilLaughAudio) {
    evilLaughAudio = new Audio('evil laugh.mp4');
    evilLaughAudio.volume = 0.7;
    evilLaughAudio.loop = true;
    evilLaughAudio.muted = true; // Start muted to bypass autoplay restrictions
  }

  evilLaughAudio.currentTime = 0;
  evilLaughAudio.play().catch(() => {
    console.log('Evil laugh audio blocked.');
  });
}

// Unmute audio on first user interaction
function unmuteAudioOnInteraction() {
  if (!audioUnmuted && evilLaughAudio) {
    evilLaughAudio.muted = false;
    audioUnmuted = true;
  }
}

// Add click listener to unmute on first interaction
document.addEventListener('click', unmuteAudioOnInteraction, { once: true });

// Auto-play music when page 2 loads
function autoPlayBackgroundMusic() {
  if (!backgroundAudio) {
    backgroundAudio = new Audio('background music.mp4');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5;
  }
  
  if (backgroundAudio.paused) {
    backgroundAudio.play().catch(err => {
      console.log('Audio auto-play prevented by browser policy');
    });
  }
  musicEnabled = true;
}

// Stop background music
function stopBackgroundMusic() {
  if (backgroundAudio && !backgroundAudio.paused) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
  }
  musicEnabled = false;
}

function setDesign(data) {
  document.documentElement.style.setProperty('--bg1', data.bg1);
  document.documentElement.style.setProperty('--bg2', data.bg2);
  document.documentElement.style.setProperty('--accent', data.accent);
  birthdayName.textContent = `Happy Birthday, ${data.name || 'Dear'}! 🎉`;
  
  // Format message as paragraphs
  const message = data.message || defaultData.message;
  const paragraphs = message.split('\n\n').filter(p => p.trim());
  birthdayMessage.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
}

function syncFormValues(data) {
  nameInput.value = data.name;
  messageInput.value = data.message;
  bg1Input.value = data.bg1;
  bg2Input.value = data.bg2;
  accentInput.value = data.accent;
}

function applyDesign() {
  const customData = {
    name: nameInput.value.trim() || defaultData.name,
    message: messageInput.value.trim() || defaultData.message,
    bg1: bg1Input.value || defaultData.bg1,
    bg2: bg2Input.value || defaultData.bg2,
    accent: accentInput.value || defaultData.accent,
  };

  syncFormValues(customData);
  setDesign(customData);
  closeCustomizerPanel();
}

function openCustomizerPanel() {
  customizerPanel.classList.add('show');
}

function closeCustomizerPanel() {
  customizerPanel.classList.remove('show');
}

// Page Navigation
function goToPage(pageNum) {
  if (pageNum === 1) {
    page2.classList.remove('active');
    requestAnimationFrame(() => {
      page1.classList.add('active');
    });
    stopBackgroundMusic();
    document.body.style.backgroundImage = 'none';
    document.body.style.background = `
      repeating-linear-gradient(45deg, rgba(255, 182, 193, 0.3), rgba(255, 182, 193, 0.3) 10px, transparent 10px, transparent 20px),
      repeating-linear-gradient(-45deg, rgba(173, 216, 230, 0.3), rgba(173, 216, 230, 0.3) 10px, transparent 10px, transparent 20px),
      repeating-conic-gradient(from 45deg at 20% 30%, rgba(255, 215, 0, 0.25) 0deg 90deg, rgba(255, 192, 203, 0.25) 90deg 180deg, rgba(135, 206, 250, 0.25) 180deg 270deg, rgba(221, 160, 221, 0.25) 270deg 360deg)
    `;
  } else if (pageNum === 2) {
    page1.classList.remove('active');
    requestAnimationFrame(() => {
      page2.classList.add('active');
    });
    document.body.style.backgroundImage = "url('background.jpeg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    setTimeout(() => {
      autoPlayBackgroundMusic();
    }, 150);
  }
}

let declineClickCount = 0;

function playExplosionSound() {
  const explosionSound = new Audio('explosion.mp4');
  explosionSound.volume = 0.8;
  explosionSound.play().catch(() => {
    console.log('Explosion audio blocked until user interaction.');
  });
}

function handleDecline() {
  declineClickCount++;
  
  // First No click: cat background
  if (declineClickCount === 1) {
    document.body.style.backgroundImage = "url('cat-background.jpeg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }

  // Third No click: explosion background and sound
  if (declineClickCount === 3) {
    document.body.style.backgroundImage = "url('fire.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    playExplosionSound();
    declineBtn.disabled = true;
    declineBtn.textContent = 'Nope...';
  }
  
  // Make the button harder to click each time
  const randomX = Math.random() * 150 - 75;
  const randomY = Math.random() * 150 - 75;
  declineBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.9)`;
  
  // Reset after a moment
  setTimeout(() => {
    declineBtn.style.transform = 'translate(0, 0) scale(1)';
  }, 300);
}

// Event Listeners - Page Navigation
acceptBtn.addEventListener('click', () => goToPage(2));
declineBtn.addEventListener('click', handleDecline);

// Event Listeners - Page 2 Controls
applyButton.addEventListener('click', applyDesign);
customizerToggle.addEventListener('click', openCustomizerPanel);
closeCustomizer.addEventListener('click', closeCustomizerPanel);

// Close customizer when clicking outside
customizerPanel.addEventListener('click', (e) => {
  if (e.target === customizerPanel) {
    closeCustomizerPanel();
  }
});

// Initialize
syncFormValues(defaultData);
setDesign(defaultData);
autoPlayEvilLaugh();
