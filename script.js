const audio = document.getElementById('bgMusic');

// --- 1. FITUR HATI MELAYANG ---
function createHeart() {
    const container = document.getElementById('love-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('falling-love'); 
    
    const icons = ['❤️', '💖', '💗', '💕', '🌸'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.fontSize = Math.random() * 10 + 15 + "px";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 400);

// --- 2. FITUR FADE VOLUME ---
function fadeVolume(targetVolume, duration = 1000) {
    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    const step = diff / (duration / 10); 

    const interval = setInterval(() => {
        let nextVolume = audio.volume + step;
        
        if ((step > 0 && nextVolume >= targetVolume) || (step < 0 && nextVolume <= targetVolume)) {
            audio.volume = targetVolume;
            clearInterval(interval);
        } else {
            audio.volume = Math.min(1, Math.max(0, nextVolume));
        }
    }, 10);
}

// --- 3. LOGIKA PASSWORD ---
function checkPass() {
    const val = document.getElementById('passInput').value;
    if(val === "271209") {
        audio.play().then(() => {
            fadeVolume(1.0, 2000);
        }).catch(e => {
            console.log("Autoplay ditunda oleh browser");
        });
        next(2);
    } else {
        alert("Salah sayang! 🥺 Coba diingat lagi ya...");
    }
}

// --- 4. NAVIGASI SLIDE ---
function next(n) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none'; 
    });

    const target = document.getElementById('slide' + n);
    if(target) {
        target.classList.add('active');
        target.style.display = 'flex';
    }

    const wrapper = document.getElementById('vWrapper');
    if(wrapper) wrapper.classList.remove('active');

    fadeVolume(1.0, 1000);
}

// --- 5. EFEK KETIK (TYPEWRITER) ---
function startTypewriter() {
    next(8);
    if(typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }

    // SILAKAN GANTI PESAN DI BAWAH INI
    const pesan = "Selamat ulang tahun sayang! ❤️ Aku beruntung banget punya kamu. Makasih udah selalu sabar dan ada buat aku selama ini. Semoga semua mimpi-mimpi kamu jadi kenyataan dan aku bisa terus di samping kamu selamanya. I love you more than words can say!";
    
    let i = 0;
    const target = document.getElementById('typewriter');
    target.innerHTML = "";

    function type() {
        if (i < pesan.length) {
            target.innerHTML += pesan.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            const btn = document.getElementById('btnS8');
            if(btn) btn.style.display = "inline-block";
        }
    }
    type();
}

// --- 6. PANEL KADO (GANTI KE VIDEO LOKAL) ---
function toggleSide(tipe) {
    const wrapper = document.getElementById('vWrapper');
    const content = document.getElementById('sideContent');
    if(!wrapper || !content) return;

    wrapper.classList.add('active');

    if(tipe === 'video') {
        fadeVolume(0.1, 1500); 
        content.innerHTML = `
            <div style="padding: 10px; width:100%;">
                <h4 style="margin-bottom:15px;">Our Special Vlog 🎬</h4>
                <div class="video-container">
                    <video controls style="width:100%; border-radius:15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                        <source src="video.mp4" type="video/mp4">
                        Browser kamu tidak mendukung video.
                    </video>
                </div>
                <p style="font-size:12px; margin-top:15px; color:#888;">Lagu mengecil otomatis saat nonton ❤️</p>
            </div>
        `;
    } else {
        fadeVolume(1.0, 1000);
        content.innerHTML = `
            <div style="padding: 10px; text-align:center;">
                <h4 style="margin-bottom:15px;">Our Playlist 🎵</h4>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=LINK_SPOTIFY" style="border-radius:15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <br>
                <button class="primary" onclick="window.open('LINK_SPOTIFY')" style="margin-top:15px;">Buka Spotify</button>
            </div>
        `;
    }
}