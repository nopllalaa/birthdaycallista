let slideSekarang = -1;
let charIndex = 0;
let speed = 50;
let timer;

const daftarKonten = [
    { judul: "Hai Cantik ❤️", pesan: "Selamat bertambah umurr yaa sayang kuu", foto: "foto1.jpg" },
    { judul: "Inget Ini?", pesan: "Ini kali pertama kita foto bareng. Kamu cantik banget, dan disitu aku ngerasa kalau ternyata aku mulai suka sama kamu.", foto: "foto2.jpg" },
    { judul: "HAPPY BIRTHDAY YA🎂", pesan: "Semoga di umur yang baru ini, kamu makin bahagia dan semua impianmu tercapai..", foto: "foto3.jpg" },
    { judul: "oiyaa hehe😅", pesan: "Hadiah nya nyusul yaa beb.😅", 
        foto: "foto4", foto: "foto4.jpg" },
    { judul: "Hadiah Buat Kamu! 🎉", pesan: "Klik kejutan di bawah ini yaa.. Aku saranin urut biar josh", foto: "foto5.jpg" },
    // Slide Rahasia
    { judul: "Nonton Video Yuk 🎬", pesan: "Video ini adalah video vlogku selama pembuatan web ini, jangan ilfeel sama muka ku yang lagi jelek dan rambut yang jegrik itu ya hehehehe", foto: "foto6.jpg", link: "https://youtu.be/D_jbiXg7uj0", label: "Putar Video" },
    { judul: "Special Playlist for Special People🎵", pesan: "Dengerin Playlist yang aku buat khusus buat kamu, semoga suka yaa..!", foto: "foto7.png", link: "https://open.spotify.com/playlist/4MaGBzcHy4y3wk4IEsWawz?si=ac9c7e5fe86745c5&pt=3b1550aa78e099c979e22ccde09e040c", label: "Buka Playlist" },
    { judul: "Surat Buat Sayang ✉️", pesan: "Surat ini spesial aku buat 4u, oh iya nanti kalo uda buka suratnya lagunya langsung skip ke detik 30 aja ya", foto: "foto8.png", link: "https://gifft.me/o/b/8ext3rvlb5du68ztt37zkcbc", label: "Baca Surat" }
];

function mulaiAtauLanjut() {
    const lagu = document.getElementById("lagu");
    if (lagu && lagu.paused) { lagu.play().catch(e => console.log("Musik start")); }

    if (slideSekarang < 4) { // Cuma bisa lanjut sampai slide menu (index 4)
        slideSekarang++;
        updateTampilan();
    }
}

function backSlide() {
    if (slideSekarang > 0) {
        // Kalau dari slide rahasia (5,6,7), balik ke menu (4)
        if (slideSekarang > 4) { slideSekarang = 4; } 
        else { slideSekarang--; }
        updateTampilan();
    }
}

function loncatKeSlide(index) {
    slideSekarang = index;
    updateTampilan();
}

function updateTampilan() {
    clearTimeout(timer);
    const data = daftarKonten[slideSekarang];
    
    // Pastikan elemen ada sebelum diakses
    const elements = {
        judul: document.getElementById("judul"),
        foto: document.getElementById("foto-slide"),
        pesan: document.getElementById("pesan"),
        extra: document.getElementById("extra-buttons"),
        next: document.getElementById("btn-next"),
        back: document.getElementById("btn-back"),
        action: document.getElementById("btn-action-rahasia")
    };

    elements.judul.innerHTML = data.judul;
    elements.foto.src = data.foto;
    elements.pesan.innerHTML = "";
    charIndex = 0;

    // Logika Tampilan
    if (slideSekarang === 4) { // Menu Pilihan
        elements.extra.style.display = "block";
        elements.next.style.display = "none";
        elements.action.style.display = "none";
    } else if (slideSekarang > 4) { // Slide Rahasia
        elements.extra.style.display = "none";
        elements.next.style.display = "none";
        elements.action.style.display = "block";
        elements.action.innerHTML = data.label;
        elements.action.onclick = () => window.open(data.link, '_blank');
    } else { // Slide Biasa
        elements.extra.style.display = "none";
        elements.next.style.display = "inline-block";
        elements.next.innerHTML = (slideSekarang === 0) ? "Mulai ✨" : "Lanjut &raquo;";
        elements.action.style.display = "none";
    }

    elements.back.style.display = (slideSekarang > 0) ? "inline-block" : "none";
    typeWriter(data.pesan, "pesan");
}

function typeWriter(text, id) {
    if (charIndex < text.length) {
        document.getElementById(id).innerHTML += text.charAt(charIndex);
        charIndex++;
        timer = setTimeout(() => typeWriter(text, id), speed);
    }
}
// Fungsi untuk menciptakan taburan hati
setInterval(() => {
    const heart = document.createElement('div');
    const shapes = ['❤️', '💖', '✨', '🌸', '💕']; // Variasi simbol
    
    heart.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
    heart.className = "heart-sprinkle";
    
    // Posisi horizontal acak dari kiri ke kanan
    heart.style.left = Math.random() * 100 + "vw";
    
    // Ukuran acak biar lebih alami
    heart.style.fontSize = (Math.random() * 15 + 15) + "px";
    
    // Kecepatan terbang acak (antara 3 sampai 6 detik)
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    
    document.body.appendChild(heart);
    
    // Hapus elemen setelah terbang supaya browser gak lemot
    setTimeout(() => {
        heart.remove();
    }, 6000);
}, 300); // Muncul setiap 300ms
// Fungsi buat ledakan confetti
function hujanConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Warna warni acak
        const colors = ['#ff6b81', '#ff4757', '#7bed9f', '#70a1ff', '#eccc68', '#ffa502'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Posisi acak
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.width = Math.random() * 8 + 5 + "px";
        confetti.style.height = confetti.style.width;
        
        // Kecepatan acak
        confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
        confetti.style.opacity = Math.random();
        
        document.body.appendChild(confetti);
        
        // Hapus biar gak berat
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Modifikasi fungsi loncatKeSlide biar pas diklik ada confetti
const fungsiLoncatLama = loncatKeSlide; 
loncatKeSlide = function(index) {
    hujanConfetti(); // Tambah confetti tiap klik menu rahasia
    fungsiLoncatLama(index);
};
const lagu = document.getElementById("lagu");
if (lagu) lagu.volume = 1.0; // Naikin volume maksimal pas slide hadiah