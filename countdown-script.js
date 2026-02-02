// State management
let currentPageIndex = 0;
let yesButtonScale = 1;
const totalScreens = 16; // 0-15

// Query all screens
const screens = document.querySelectorAll('.screen');

// Initialize floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsBackground');
    const heartSymbols = ['💕', '💖', '💗', '💝', '💓', '❤️', '🌹', '🌸'];
    
    // Create 20 floating hearts
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random positioning
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 12 + 's';
        heart.style.animationDuration = (Math.random() * 6 + 10) + 's';
        
        container.appendChild(heart);
    }
}

// Show specific page by index
function showPage(index) {
    // Validate index
    if (index < 0 || index >= totalScreens) return;
    
    // Hide current screen
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen) {
        currentScreen.classList.remove('active');
        currentScreen.classList.add('fade-out');
        
        // Remove fade-out class after animation
        setTimeout(() => {
            currentScreen.classList.remove('fade-out');
        }, 600);
    }
    
    // Show new screen after a brief delay
    setTimeout(() => {
        screens[index].classList.add('active');
        currentPageIndex = index;
    }, 300);
}

// Navigate to next page
function nextPage() {
    const nextIndex = currentPageIndex + 1;
    if (nextIndex < totalScreens) {
        showPage(nextIndex);
    }
}

// Handle NO button click
function handleNo() {
    const yesBtn = document.getElementById('btnYes');
    const noBtn = document.getElementById('btnNo');
    
    // Increase YES button scale
    yesButtonScale += 0.15;
    yesBtn.style.transform = `scale(${yesButtonScale})`;
    
    // Add stronger glow effect
    const glowIntensity = Math.min(yesButtonScale * 0.5, 1);
    yesBtn.style.boxShadow = `
        0 ${15 + yesButtonScale * 5}px ${50 + yesButtonScale * 10}px rgba(196, 30, 58, ${0.5 + glowIntensity * 0.3}),
        0 0 ${30 + yesButtonScale * 10}px rgba(212, 175, 55, ${0.3 + glowIntensity * 0.3}) inset
    `;
    
    // Shrink NO button
    const noScale = Math.max(0.6, 1 - (yesButtonScale - 1) * 0.6);
    noBtn.style.transform = `scale(${noScale})`;
    
    // Add shake animation to NO button
    noBtn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
    
    // After multiple clicks, make NO button jump around
    if (yesButtonScale > 2) {
        noBtn.style.position = 'relative';
        const randomX = (Math.random() - 0.5) * 60;
        const randomY = (Math.random() - 0.5) * 40;
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }
    
    // Optional: make NO button text change
    if (yesButtonScale > 2.5) {
        noBtn.textContent = 'Maybe...?';
    }
    if (yesButtonScale > 3.5) {
        noBtn.textContent = 'Fine, YES';
        noBtn.style.opacity = '0.5';
    }
}

// Add shake animation dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(1); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) scale(0.95); }
        20%, 40%, 60%, 80% { transform: translateX(10px) scale(0.95); }
    }
`;
document.head.appendChild(shakeStyle);

// Handle YES button click
function handleYes() {
    // Hide proposal screen
    const proposalScreen = screens[14];
    proposalScreen.classList.remove('active');
    
    // Show success screen
    setTimeout(() => {
        showPage(15);
        createConfetti();
        createHeartBurst();
    }, 300);
}

// Create confetti animation
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = [
        '#C41E3A',
        '#8B0000',
        '#D4AF37',
        '#E8B4BC',
        '#B392AC',
        '#5D1049'
    ];
    
    // Create 150 confetti pieces
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 1;
        const duration = Math.random() * 2 + 3;
        
        confetti.style.backgroundColor = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.left = left + '%';
        confetti.style.animationDelay = delay + 's';
        confetti.style.animationDuration = duration + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
    
    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 6000);
}

// Create heart burst effect
function createHeartBurst() {
    const container = document.getElementById('heartsBackground');
    const hearts = ['💕', '💖', '💗', '💝', '💓', '❤️', '🌹'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 20 + 25) + 'px';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '2000';
        
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 250;
        
        heart.animate([
            {
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1.5) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1500);
    }
}

// Add sparkle effect to YES button on hover
function addYesButtonSparkle() {
    const yesBtn = document.getElementById('btnYes');
    if (!yesBtn) return;
    
    yesBtn.addEventListener('mouseenter', () => {
        // Create sparkle particles
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = '#D4AF37';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 40;
            
            sparkle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            });
            
            yesBtn.parentElement.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 600);
        }
    });
}

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (currentPageIndex >= 0 && currentPageIndex < 14) {
            nextPage();
        } else if (currentPageIndex === 14) {
            handleYes();
        }
    } else if (e.key === 'ArrowRight' && currentPageIndex < 14) {
        nextPage();
    } else if (e.key === 'y' || e.key === 'Y') {
        if (currentPageIndex === 14) {
            handleYes();
        }
    }
});

// Add subtle parallax effect to background on mouse move
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});

// Prevent accidental navigation away
window.addEventListener('beforeunload', (e) => {
    if (currentPageIndex > 0 && currentPageIndex < 15) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    
    // Add sparkle effect after slight delay
    setTimeout(() => {
        addYesButtonSparkle();
    }, 1000);
    
    // Ensure first screen is active
    showPage(0);
});

// Add progress tracking (optional - could display as dots)
function getProgress() {
    return Math.round((currentPageIndex / (totalScreens - 1)) * 100);
}

// Log progress for debugging
window.addEventListener('DOMContentLoaded', () => {
    console.log('💕 Valentine Countdown Website Loaded');
    console.log(`Total screens: ${totalScreens}`);
    console.log('Navigation: Click buttons or use Enter/Arrow keys');
});
