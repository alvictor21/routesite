import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Handshake, Dumbbell, Lightbulb, Zap, Heart, GraduationCap, HandHelping, Volume2, VolumeX } from "lucide-react";

/* ============ DATA — ganti sesuai kebutuhan ============ */
// Foto ditaruh di folder public/images/
const members = [
  { foto: "/images/anggota-1.png", nama: "Dhimas Panji Prasetya Zaen", npm: "26082010271", panggilan: "Dimas", hobi: "Membaca", motto: "Motto anggota 1" },
  { foto: "/images/anggota-2.png", nama: "Arif Hidayatullah", npm: "26082010286", panggilan: "Arif", hobi: "Menggambar", motto: "Motto anggota 2" },
  { foto: "/images/anggota-3.png", nama: "Naila Agisti", npm: "26082010223", panggilan: "Naila", hobi: "Bermain musik", motto: "Motto anggota 3" },
  { foto: "/images/anggota-4.png", nama: "Ach Davin Hafizh", npm: "26082010228", panggilan: "Davin", hobi: "Olahraga", motto: "Motto anggota 4" },
  { foto: "/images/anggota-5.png", nama: "Fidela Naida", npm: "26082010210", panggilan: "Fidel", hobi: "Memasak", motto: "be yourself" },
  { foto: "/images/anggota-6.png", nama: "Frisa Liana Sinaga", npm: "26082010139", panggilan: "Frisa", hobi: "Makan", motto: "Makan" },
  { foto: "/images/anggota-7.png", nama: "Haylannisa Fuadi", npm: "26082010076", panggilan: "Nisa", hobi: "Menulis", motto: "Motto anggota 7" },
  { foto: "/images/anggota-8.png", nama: "Salwa Jazila Mahmudah", npm: "26082010186", panggilan: "Salwa", hobi: "Bermain game", motto: "Motto anggota 8" },
  { foto: "/images/anggota-9.png", nama: "Haura Athiya Balqis", npm: "26082010264", panggilan: "Haura", hobi: "Menonton film", motto: "Motto anggota 9" },
  { foto: "/images/anggota-10.png", nama: "Prayoga Adi Putra M.", npm: "26082010176", panggilan: "Yoga", hobi: "Traveling", motto: "Motto anggota 10" },
  { foto: "/images/anggota-11.png", nama: "M. Gheysar Abyan", npm: "26082010146", panggilan: "Om", hobi: "Bernyanyi", motto: "Motto anggota 11" },
  { foto: "/images/anggota-12.png", nama: "Alsyah Ar Rayyan", npm: "26082010277", panggilan: "Panggilan 12", hobi: "Berenang", motto: "Motto anggota 12" },
  { foto: "/images/anggota-13.png", nama: "Irsyad Maulana", npm: "26082010104", panggilan: "Irsyad", hobi: "Desain grafis", motto: "Motto anggota 13" },
  { foto: "/images/anggota-14.png", nama: "Fadhil Akbar A.", npm: "26082010216", panggilan: "Panggilan 14", hobi: "Coding", motto: "Make it happen" },
  { foto: "/images/anggota-15.png", nama: "Adnan Alvicor Rizki A.", npm: "26082010139", panggilan: "Victor", hobi: "Ngoding", motto: "Alon alon penting kelakon" },
];
const galeri = [1, 2, 3].map((n) => `/images/galeri-${n}.jpg`);
const why = [
  { t: "Solid", d: "Kami kompak dan saling dukung. Satu orang jatuh, semua ikut membantu bangkit.", Icon: Handshake, c: "c-pink" },
  { t: "Tangguh", d: "Panas, capek, atau tugas menumpuk, kami tetap jalan terus tanpa menyerah.", Icon: Dumbbell, c: "c-yellow" },
  { t: "Cerdas", d: "Kami mau berpikir sebelum bertindak dan selalu punya ide untuk setiap tantangan.", Icon: Lightbulb, c: "c-mint" },
  { t: "Responsif", d: "Cepat tanggap terhadap informasi dan tugas, tidak ada yang tertinggal.", Icon: Zap, c: "c-sky" },
];
const harapan = [
  { d: "Semoga hubungan pertemanan tetap terjaga sampai lulus.", Icon: Heart, c: "c-pink" },
  { d: "Semoga kuliahnya lancar.", Icon: GraduationCap, c: "c-yellow" },
  { d: "Semoga dapat terus saling bantu.", Icon: HandHelping, c: "c-mint" },
];
const links = [["why", "Why Route?"], ["know", "Know Us"], ["galeri", "Galeri"], ["cp", "CP Kelompok"], ["harapan", "Harapan"]];

/* ============ ANIMASI SCROLL ============ */
const reveal = (i = 0, x = 0) => ({
  initial: { opacity: 0, y: x ? 0 : 40, x },
  whileInView: { opacity: 1, y: 0, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
});

/* Gambar dengan placeholder otomatis kalau file belum ada */
function Img({ src, alt, className = "", anim, children }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div className={`ph ${className}`} data-ph={src.replace(/^\//, "")} {...anim}>
      {!err && <img src={src} alt={alt} onError={() => setErr(true)} />}
      {children}
    </motion.div>
  );
}

function Title({ children, sub }) {
  return (
    <>
      <motion.h2 className="sec-title" {...reveal()}>{children}</motion.h2>
      <motion.p className="sec-sub" {...reveal(1)}>{sub}</motion.p>
    </>
  );
}

function MemberCard({ m, i }) {
  const [on, setOn] = useState(false);
  return (
    <motion.button className={`flip ${on ? "on" : ""}`} aria-pressed={on} aria-label={`Lihat profil ${m.panggilan}`} onClick={() => setOn(!on)} {...reveal(i % 3)}>
      <div className="flip-in">
        <div className="face front">
          <Img src={m.foto} alt={`Foto ${m.panggilan}`} />
          <div className="nm">{m.panggilan}</div>
        </div>
        <div className="face back">
          <div><small>Nama lengkap</small><b>{m.nama}</b></div>
          <div><small>NPM</small>{m.npm}</div>
          <div><small>Nama panggilan</small>{m.panggilan}</div>
          <div><small>Hobi</small>{m.hobi}</div>
          <div className="motto">“{m.motto}”</div>
        </div>
      </div>
    </motion.button>
  );
}

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.5;
    const events = ["click", "keydown", "touchend"];

    const cleanup = () => events.forEach((e) => document.removeEventListener(e, start));
    function start() {
      audio.play().then(cleanup).catch(() => {});
    }

    start(); // coba langsung nyala saat web dibuka
    events.forEach((e) => document.addEventListener(e, start)); // cadangan: nyala di interaksi pertama
    return cleanup;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    audio.paused ? audio.play() : audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/musik.mp3" loop preload="auto"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button className="music-btn" onClick={toggle}
        aria-label={playing ? "Matikan musik" : "Nyalakan musik"}>
        {playing ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <BackgroundMusic />
      <header>
        <div className="wrap nav">
          <a href="#hero" className="logo"><i />Route</a>
          <button className="burger" aria-label="Buka menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ul className={`menu ${open ? "open" : ""}`} id="menu">
            {links.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
          </ul>
        </div>
      </header>

      <main>
        {/* 1. HERO */}
        <section className="hero" id="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <motion.span className="badge" {...reveal(0, -40)}>PENSI 2026</motion.span>
                <motion.h1 {...reveal(1, -40)}>Kelompok Route<span>Satu Tekad, Satu Semangat, Jadi Juara!!!</span></motion.h1>
                <motion.p {...reveal(2, -40)}>Kami bukan sekadar satu kelompok. Kami satu perjalanan yang dijalani bareng-bareng, dari hari pertama sampai garis akhir.</motion.p>
                <motion.a href="#know" className="btn" {...reveal(3, -40)}>Kenalan sama kami</motion.a>
              </div>
              <Img src="/images/hero.jpg" alt="Foto utama kelompok Route" className="hero-img" anim={reveal(1, 60)} />
            </div>
            <motion.div className="road" aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ originX: 0 }} />
          </div>
        </section>

        {/* 2. WHY ROUTE */}
        <section className="why" id="why">
          <div className="wrap">
            <Title sub="Empat hal yang bikin Route berbeda dan selalu bisa diandalkan.">Why Route?</Title>
            <div className="cards4">
              {why.map(({ t, d, Icon, c }, i) => (
                <motion.article key={t} className={`card ${c}`} {...reveal(i)}>
                  <div className="ic"><Icon size={28} /></div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. KNOW US */}
        <section id="know">
          <div className="wrap">
            <Title sub="Kenalan dengan anggota Route. Klik kartunya untuk lihat profil lengkap.">Know Us</Title>
            <div className="members">
              {members.map((m, i) => <MemberCard key={m.npm} m={m} i={i} />)}
            </div>
            <p className="hint">Klik kartu lagi untuk membaliknya kembali.</p>
          </div>
        </section>

        {/* 4. GALERI */}
        <section className="gallery" id="galeri">
          <div className="wrap">
            <Title sub="Potongan kenangan selama perjalanan kami.">Galeri</Title>
            <div className="grid-g">
              {galeri.map((src, i) => <Img key={src} src={src} alt={`Kenangan Route ${i + 1}`} anim={reveal(i % 3)} />)}
            </div>
          </div>
        </section>

        {/* 5. CP */}
        <section id="cp">
          <div className="wrap">
            <Title sub="Pendamping yang membimbing Route selama OSPEK.">CP Kelompok</Title>
            <motion.div className="cp-card" {...reveal()}>
              <Img src="/images/kak-fauzil.png" alt="Kak Fauzil" />
              <div>
                <h3>Kak Fauzil</h3>
                <p>Crosspen (CP) kelompok Route. Terima kasih sudah sabar membimbing dan menemani kami.</p>
                <a href="#harapan" className="btn">Lihat harapan kami</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. HARAPAN */}
        <section className="wish" id="harapan">
          <div className="wrap">
            <Title sub="Yang kami doakan untuk satu sama lain.">Harapan untuk Route</Title>
            <div className="cards3">
              {harapan.map(({ d, Icon, c }, i) => (
                <motion.article key={d} className={`card ${c}`} {...reveal(i)}>
                  <div className="ic"><Icon size={28} /></div>
                  <p>{d}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer>
        <div className="wrap">
          <div className="logo"><i />Route</div>
          <p className="slogan">Satu Tekad, Satu Semangat, Jadi Juara!!!</p>
          <p>Dibuat dengan <Heart size={16} fill="currentColor" style={{ verticalAlign: "-2px" }} /> oleh Kelompok Route</p>
          <small>© 2026 Kelompok Route. OSPEK.</small>
        </div>
      </footer>
    </>
  );
}
