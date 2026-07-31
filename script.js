const duduContainer = document.getElementById('dudu-container');
const bubuContainer = document.getElementById('bubu-container');
const flowersContainer = document.getElementById('flowers-container');
const extraContainer = document.getElementById('extra-container');
const backpackContainer = document.getElementById('backpack-container');
const loveContainer = document.getElementById('love-container');
const kissContainer = document.getElementById('kiss-container');
const mainMessage = document.getElementById('main-message');
const subMessage = document.getElementById('sub-message');
const heartsContainer = document.getElementById('hearts-container');
const bgMusic = document.getElementById('bg-music');
const activePointers = {};
let isHugged = false;
let musicStarted = false;
function spawnBackgroundHeart() {
    if(isHugged) return; 
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff'];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    heartsContainer.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 5000);
}
setInterval(spawnBackgroundHeart, 150);
function setupDraggable(element) {
    element.addEventListener('pointerdown', (e) => {
        if(isHugged) return;
        bgMusic.volume = 0.5; 
        bgMusic.play().catch(err => console.log("Audio play failed:", err));
        musicStarted = true;
        activePointers[e.pointerId] = {
            element: element,
            offsetX: e.clientX - element.getBoundingClientRect().left - element.offsetWidth/2,
            offsetY: e.clientY - element.getBoundingClientRect().top - element.offsetHeight/2
        };
        element.style.cursor = 'grabbing';
        element.setPointerCapture(e.pointerId);
    });
    element.addEventListener('pointermove', (e) => {
        if(isHugged) return;
        if (activePointers[e.pointerId] && activePointers[e.pointerId].element === element) {
            const offsetX = activePointers[e.pointerId].offsetX;
            const offsetY = activePointers[e.pointerId].offsetY;
            const parent = element.parentElement;
            const parentRect = parent.getBoundingClientRect();
            let newX = e.clientX - parentRect.left - offsetX;
            let newY = e.clientY - parentRect.top - offsetY;
            newX = Math.max(element.offsetWidth/2, Math.min(newX, parentRect.width - element.offsetWidth/2));
            newY = Math.max(element.offsetHeight/2, Math.min(newY, parentRect.height - element.offsetHeight/2));
            element.style.left = (newX / parentRect.width) * 100 + '%';
            element.style.top = (newY / parentRect.height) * 100 + '%';
            checkCollision();
        }
    });
    const endDrag = (e) => {
        if (activePointers[e.pointerId]) {
            delete activePointers[e.pointerId];
            element.style.cursor = 'grab';
            element.releasePointerCapture(e.pointerId);
            if (Object.keys(activePointers).length === 0 && !isHugged) {
                bgMusic.pause();
            }
        }
    };
    element.addEventListener('pointerup', endDrag);
    element.addEventListener('pointercancel', endDrag);
}
setupDraggable(duduContainer);
setupDraggable(bubuContainer);
function checkCollision() {
    if(isHugged) return;
    const dRect = duduContainer.getBoundingClientRect();
    const bRect = bubuContainer.getBoundingClientRect();
    const dCenter = {
        x: dRect.left + dRect.width / 2,
        y: dRect.top + dRect.height / 2
    };
    const bCenter = {
        x: bRect.left + bRect.width / 2,
        y: bRect.top + bRect.height / 2
    };
    const distance = Math.hypot(dCenter.x - bCenter.x, dCenter.y - bCenter.y);
    if (distance < 180) {
        triggerHug();
    }
}
function triggerHug() {
    isHugged = true;
    if (bgMusic.paused) {
        bgMusic.play().catch(err => console.log("Audio play failed:", err));
    }
    duduContainer.classList.add('hidden');
    bubuContainer.classList.add('hidden');
    flowersContainer.classList.remove('hidden');
    mainMessage.innerText = "Aww! Flowers for you! 🌸";
    subMessage.innerText = "My sweet Sasmita...";
    heartExplosion(30);
    setTimeout(() => {
        flowersContainer.classList.add('hidden');
        extraContainer.classList.remove('hidden');
        mainMessage.innerText = "You're my Kuchipuchi pu! 🥰";
        subMessage.innerText = "Can't get enough of you!";
        heartExplosion(40);
        setTimeout(() => {
            extraContainer.classList.add('hidden');
            backpackContainer.classList.remove('hidden');
            mainMessage.innerText = "Yay! Always carrying you! 🎒";
            subMessage.innerText = "Never letting you go...";
            heartExplosion(50);
            setTimeout(() => {
                backpackContainer.classList.add('hidden');
                loveContainer.classList.remove('hidden');
                mainMessage.innerText = "I love you so much! 💖";
                subMessage.innerText = "My everything...";
                heartExplosion(60);
                setTimeout(() => {
                    loveContainer.classList.add('hidden');
                    kissContainer.classList.remove('hidden');
                    mainMessage.innerText = "We're always together! 💕";
                    subMessage.innerText = "I love you to eternity, meri sasmita ✨";
                    heartExplosion(200);
                }, 3500);
            }, 3500);
        }, 3500);
    }, 3500);
}
function heartExplosion(count) {
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#ff99ac'];
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'confetti-heart';
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 300;
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        const rot = (Math.random() * 720 - 360) + 'deg';
        heart.style.setProperty('--tx', tx);
        heart.style.setProperty('--ty', ty);
        heart.style.setProperty('--rot', rot);
        heart.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        heart.style.left = '50%';
        heart.style.top = '50%';
        heartsContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}
