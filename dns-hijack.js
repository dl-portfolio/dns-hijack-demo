// DNS Hijacking Demo - Motion Canvas-inspired Animations
// Using Anime.js for smooth, professional animations

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusIcon = document.getElementById('statusIcon');
const statusText = document.getElementById('statusText');
const wifiSelector = document.getElementById('wifiSelector');
const browserWindow = document.getElementById('browserWindow');
const urlText = document.getElementById('urlText');
const browserContent = document.getElementById('browserContent');

// Nodes
const laptop = document.getElementById('laptop');
const wifi = document.getElementById('wifi');
const realServer = document.getElementById('realServer');
const fakeServer = document.getElementById('fakeServer');

// Packets
const packet1 = document.getElementById('packet1');
const packet2 = document.getElementById('packet2');
const packet3 = document.getElementById('packet3');
const packet4 = document.getElementById('packet4');

let running = false;
let timeline = null;

startBtn.addEventListener('click', async () => {
  if (running) return;
  running = true;
  startBtn.disabled = true;
  await runDemo();
  startBtn.disabled = false;
  running = false;
});

resetBtn.addEventListener('click', () => {
  reset();
});

async function runDemo() {
  // Motion Canvas-style sequential animation using Anime.js timeline

  // Step 1: WiFi Selection Animation
  updateStatus('👤', 'Вы ищете WiFi в кафе...');

  // Smooth scale and glow on laptop
  anime({
    targets: laptop,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(102,126,234,0.8))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  // Popup appears with elastic animation
  anime({
    targets: wifiSelector,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 500,
    easing: 'easeOutBack',
    begin: () => wifiSelector.classList.add('show')
  });

  await wait(1500);

  // Animate WiFi network selection with stagger
  const networks = document.querySelectorAll('.wifi-network');
  await anime({
    targets: networks,
    backgroundColor: [
      { value: '#f5f5f5' },
      { value: '#667eea' },
      { value: '#f5f5f5' }
    ],
    color: [
      { value: '#333' },
      { value: '#fff' },
      { value: '#333' }
    ],
    duration: 400,
    delay: anime.stagger(400),
    easing: 'easeInOutQuad'
  }).finished;

  // Final selection
  networks[0].style.backgroundColor = '#667eea';
  networks[0].style.color = '#fff';
  await wait(1000);

  // Step 2: WiFi Connected
  updateStatus('📡', 'Подключились к "Starbucks WiFi" (хакера!)');

  anime({
    targets: wifiSelector,
    opacity: [1, 0],
    scale: [1, 0.8],
    duration: 400,
    easing: 'easeInBack',
    complete: () => wifiSelector.classList.remove('show')
  });

  anime({
    targets: laptop,
    scale: [1.15, 1],
    filter: ['drop-shadow(0 0 30px rgba(102,126,234,0.8))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'],
    duration: 400
  });

  anime({
    targets: wifi,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(255,71,87,1))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  await wait(2000);

  // Step 3: Browser Opens and URL Typing
  updateStatus('💻', 'Открываете браузер и вводите facebook.com...');

  anime({
    targets: wifi,
    scale: [1.15, 1],
    filter: ['drop-shadow(0 0 30px rgba(255,71,87,1))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'],
    duration: 400
  });

  anime({
    targets: laptop,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(102,126,234,0.8))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  // Browser window appears
  anime({
    targets: browserWindow,
    opacity: [0, 1],
    scale: [0.8, 1],
    translateY: [-20, 0],
    duration: 600,
    easing: 'easeOutBack',
    begin: () => browserWindow.classList.add('show')
  });

  await wait(500);

  // Type URL with realistic timing
  const url = 'facebook.com';
  for (let i = 0; i < url.length; i++) {
    urlText.textContent = url.substring(0, i + 1);
    await wait(120);
  }

  await wait(1500);

  // Step 4: DNS Request Packet Animation
  updateStatus('🔍', 'Ваш ноутбук спрашивает WiFi: "Где Facebook?"');

  anime({
    targets: laptop,
    scale: [1.15, 1],
    filter: ['drop-shadow(0 0 30px rgba(102,126,234,0.8))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'],
    duration: 400
  });

  await animatePacketSmooth(packet1, laptop, wifi);

  anime({
    targets: wifi,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(255,71,87,1))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  await wait(1500);

  // Step 5: Fake DNS Response
  updateStatus('⚠️', 'WiFi хакера отвечает с ПОДДЕЛЬНЫМ адресом!');

  await animatePacketSmooth(packet2, wifi, laptop);

  anime({
    targets: wifi,
    scale: [1.15, 1],
    filter: ['drop-shadow(0 0 30px rgba(255,71,87,1))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'],
    duration: 400
  });

  anime({
    targets: laptop,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(102,126,234,0.8))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  await wait(2000);

  // Step 6: Connect to Fake Server
  updateStatus('🚨', 'Ваш браузер подключается к ПОДДЕЛЬНОМУ серверу!');

  anime({
    targets: laptop,
    scale: [1.15, 1],
    filter: ['drop-shadow(0 0 30px rgba(102,126,234,0.8))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'],
    duration: 400
  });

  // Dim and gray out real server
  anime({
    targets: realServer,
    opacity: [1, 0.3],
    filter: ['grayscale(0%)', 'grayscale(100%)'],
    duration: 800,
    easing: 'easeInOutQuad'
  });

  anime({
    targets: fakeServer,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(255,71,87,1))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  await animatePacketSmooth(packet3, laptop, fakeServer);

  await wait(2000);

  // Step 7: Fake Facebook Login Page
  updateStatus('🎭', 'Вы видите поддельную страницу Facebook...');

  anime({
    targets: fakeServer,
    scale: [1.15, 1],
    filter: ['drop-shadow(0 0 30px rgba(255,71,87,1))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'],
    duration: 400
  });

  anime({
    targets: laptop,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(102,126,234,0.8))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  // Show login form with fade-in
  browserContent.innerHTML = `
    <div class="login-form" style="opacity: 0;">
      <h2>📘 Facebook</h2>
      <input type="text" class="form-input" id="emailInput" value="" readonly>
      <input type="password" class="form-input" id="passwordInput" value="" readonly>
      <button class="form-button">Войти</button>
    </div>
  `;

  anime({
    targets: '.login-form',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    easing: 'easeOutQuad'
  });

  await wait(500);

  // Type email
  const emailInput = document.getElementById('emailInput');
  const email = 'user@email.com';
  for (let i = 0; i < email.length; i++) {
    emailInput.value = email.substring(0, i + 1);
    await wait(80);
  }

  await wait(300);

  // Type password (show dots appearing)
  const passwordInput = document.getElementById('passwordInput');
  const password = '••••••••';
  for (let i = 0; i < password.length; i++) {
    passwordInput.value = password.substring(0, i + 1);
    await wait(100);
  }

  await wait(1000);

  // Step 8: Credentials Stolen!
  updateStatus('💀', 'Вы нажимаете "Войти" - пароль отправляется хакеру!');

  anime({
    targets: laptop,
    scale: [1.15, 1],
    filter: ['drop-shadow(0 0 30px rgba(102,126,234,0.8))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'],
    duration: 400
  });

  // Browser closes
  anime({
    targets: browserWindow,
    opacity: [1, 0],
    scale: [1, 0.8],
    translateY: [0, -20],
    duration: 400,
    easing: 'easeInBack',
    complete: () => browserWindow.classList.remove('show')
  });

  anime({
    targets: fakeServer,
    scale: [1, 1.15],
    filter: ['drop-shadow(0 4px 12px rgba(0,0,0,0.3))', 'drop-shadow(0 0 30px rgba(255,71,87,1))'],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });

  await animatePacketSmooth(packet4, laptop, fakeServer);

  await wait(1500);

  // Final: Attack Complete with dramatic emphasis
  updateStatus('🚨', 'УКРАДЕНО! Пароль отправлен на поддельный сервер!');

  // Shake animation on status
  anime({
    targets: '#statusDisplay',
    translateX: [
      { value: 10, duration: 100 },
      { value: -10, duration: 100 },
      { value: 10, duration: 100 },
      { value: 0, duration: 100 }
    ],
    easing: 'easeInOutQuad'
  });

  await wait(3000);
}

async function animatePacketSmooth(packet, fromNode, toNode) {
  // Get positions
  const fromRect = fromNode.getBoundingClientRect();
  const toRect = toNode.getBoundingClientRect();
  const stageRect = document.querySelector('.network-stage').getBoundingClientRect();

  // Calculate start and end positions
  const startX = fromRect.left + fromRect.width / 2 - stageRect.left;
  const startY = fromRect.top + fromRect.height / 2 - stageRect.top;
  const endX = toRect.left + toRect.width / 2 - stageRect.left;
  const endY = toRect.top + toRect.height / 2 - stageRect.top;

  // Position packet at start
  packet.style.left = `${startX}px`;
  packet.style.top = `${startY}px`;
  packet.style.transform = 'translate(-50%, -50%) scale(0.8)';

  // Appear with pop animation
  await anime({
    targets: packet,
    opacity: [0, 1],
    scale: [0.6, 1],
    duration: 300,
    easing: 'easeOutBack',
    begin: () => packet.classList.add('show')
  }).finished;

  // Fly to destination with easing
  await anime({
    targets: packet,
    left: endX,
    top: endY,
    duration: 1200,
    easing: 'easeInOutCubic'
  }).finished;

  // Impact pulse
  anime({
    targets: packet,
    scale: [1, 1.2, 0.8],
    duration: 300,
    easing: 'easeInOutQuad'
  });

  await wait(200);

  // Fade out
  await anime({
    targets: packet,
    opacity: [1, 0],
    scale: [0.8, 0.5],
    duration: 300,
    easing: 'easeInQuad',
    complete: () => packet.classList.remove('show')
  }).finished;
}

function updateStatus(icon, text) {
  // Animate status change
  anime({
    targets: statusIcon,
    scale: [1, 1.3, 1],
    rotate: [0, 10, -10, 0],
    duration: 500,
    easing: 'easeInOutQuad',
    begin: () => statusIcon.textContent = icon
  });

  anime({
    targets: statusText,
    opacity: [1, 0, 1],
    duration: 400,
    easing: 'easeInOutQuad',
    update: (anim) => {
      if (anim.progress > 50 && statusText.textContent !== text) {
        statusText.textContent = text;
      }
    }
  });
}

function reset() {
  // Cancel any running animations
  if (timeline) {
    timeline.pause();
    timeline = null;
  }
  anime.remove([laptop, wifi, realServer, fakeServer, packet1, packet2, packet3, packet4, wifiSelector, browserWindow]);

  // Hide UI elements
  wifiSelector.classList.remove('show');
  browserWindow.classList.remove('show');

  // Reset all node styles
  [laptop, wifi, realServer, fakeServer].forEach(node => {
    node.style.transform = '';
    node.style.filter = '';
    node.style.scale = '1';
  });

  realServer.style.opacity = '1';
  realServer.style.filter = 'none';

  // Hide packets
  [packet1, packet2, packet3, packet4].forEach(p => {
    p.classList.remove('show');
    p.style.opacity = '0';
  });

  // Reset WiFi networks
  document.querySelectorAll('.wifi-network').forEach(net => {
    net.style.backgroundColor = '';
    net.style.color = '';
  });

  // Reset browser
  urlText.textContent = '';
  browserContent.innerHTML = '';

  // Reset status
  statusIcon.textContent = '⏸️';
  statusText.textContent = 'Нажмите "Запустить" чтобы увидеть атаку';

  // Reset button
  startBtn.disabled = false;
  running = false;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Console message
console.log('%c🏴‍☠️ DNS HIJACKING DEMO', 'color: red; font-size: 20px; font-weight: bold');
console.log('Motion Canvas-inspired animations using Anime.js');
console.log('Smooth, professional network attack visualization');
