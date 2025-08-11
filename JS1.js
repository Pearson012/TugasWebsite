document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const verifyPopup = document.getElementById('verify-popup');
    const verifyYesBtn = document.getElementById('verify-yes');
    const verifyNoBtn = document.getElementById('verify-no');
    
    const typedTextElement = document.getElementById('typed-text');
    const textToType = "Selamat Ulang Tahun yang ke-20, Jesslyn!";
    const typingSpeed = 100;
    let charIndex = 0;

    const photoModal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaptionText = document.getElementById('modal-caption-text');
    const closeBtnPhoto = document.querySelector('.close-btn-photo');

    const letterModal = document.getElementById('letter-modal');
    const openLetterBtn = document.getElementById('open-letter-btn');
    const closeBtnLetter = document.querySelector('.close-btn-letter');
    const letterEnvelope = document.getElementById('letter-envelope');
    const letterContent = document.getElementById('letter-content');
    const modalLetterContentWrapper = document.querySelector('#letter-modal .modal-content-wrapper');

    const birthdaySong = document.getElementById('birthday-song');

    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    const startDate = new Date('2019-11-03T00:00:00');
    let countdownInterval;

    // --- STEP 1: VERIFIKASI POPUP ---
    verifyYesBtn.addEventListener('click', () => {
        verifyPopup.style.display = 'none';
        mainContent.classList.remove('hidden');
        openLetterBtn.classList.remove('hidden-btn');
        
        typeWriter();
        startConfetti();
        createBalloons(10);
        birthdaySong.play();
        countdownInterval = setInterval(updateCountdown, 1000);
    });

    verifyNoBtn.addEventListener('click', () => {
        alert("Maaf, kamu tidak memiliki akses.");
        verifyPopup.style.display = 'none';
    });

    // --- STEP 2: ANIMASI CONFETTI & BALON ---
    function startConfetti() {
        const confettiContainer = document.createElement('div');
        document.body.appendChild(confettiContainer);
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '999';

        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const colors = ['#FFD1DC', '#B3E0FF', '#FFB6C1', '#87CEEB'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animation = `confetti-fall ${Math.random() * 2 + 3}s ease-in forwards`;
            confettiContainer.appendChild(confetti);
        }
    }

    function createBalloons(count) {
        const colors = ['#FFD1DC', '#B3E0FF', '#FFB6C1', '#87CEEB', '#F0F8FF'];
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDelay = `${Math.random() * 2}s`;
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(balloon);
        }
    }
    
    // --- STEP 3: GALERI FOTO INTERAKTIF ---
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            photoModal.style.display = 'flex';
            setTimeout(() => {
                photoModal.classList.add('modal-open'); // Menggunakan kelas yang sama
            }, 10);
            const imageUrl = window.getComputedStyle(item).backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
            modalImg.src = imageUrl;
            modalCaptionText.textContent = item.getAttribute('data-caption');
        });
    });

    closeBtnPhoto.addEventListener('click', () => {
        photoModal.classList.remove('modal-open');
        setTimeout(() => {
            photoModal.style.display = 'none';
        }, 500);
    });

    // --- STEP 4: FITUR PESAN RAHASIA ---
    openLetterBtn.addEventListener('click', () => {
        letterModal.style.display = 'flex';
        // PERBAIKAN DI SINI
        modalLetterContentWrapper.classList.add('modal-open');
    });

    letterEnvelope.addEventListener('click', () => {
      letterContent.classList.add('letter-modal-open');
    });

    closeBtnLetter.addEventListener('click', () => {
        letterContent.classList.remove('letter-modal-open');
        modalLetterContentWrapper.classList.remove('modal-open');
        setTimeout(() => {
            letterModal.style.display = 'none';
        }, 500);
    });

    // Mengatasi klik di luar modal
    window.addEventListener('click', (event) => {
        if (event.target == photoModal) {
            photoModal.classList.remove('modal-open');
            setTimeout(() => {
                photoModal.style.display = 'none';
            }, 500);
        }
        if (event.target == letterModal) {
            letterContent.classList.remove('letter-modal-open');
            modalLetterContentWrapper.classList.remove('modal-open');
            setTimeout(() => {
                letterModal.style.display = 'none';
            }, 500);
        }
    });

    // --- STEP 5: COUNTDOWN KONEKSI REAL-TIME ---
    function updateCountdown() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime();

        const totalSeconds = Math.floor(diff / 1000);
        
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const remainingSecondsAfterDays = totalSeconds % (24 * 60 * 60);
        const hours = Math.floor(remainingSecondsAfterDays / (60 * 60));
        const remainingSecondsAfterHours = remainingSecondsAfterDays % (60 * 60);
        const minutes = Math.floor(remainingSecondsAfterHours / 60);
        const seconds = remainingSecondsAfterHours % 60;
        
        daysSpan.textContent = days.toString().padStart(2, '0');
        hoursSpan.textContent = hours.toString().padStart(2, '0');
        minutesSpan.textContent = minutes.toString().padStart(2, '0');
        secondsSpan.textContent = seconds.toString().padStart(2, '0');
    }
    
    function typeWriter() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
});