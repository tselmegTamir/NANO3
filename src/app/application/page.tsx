"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800&family=Onest:wght@400;500;600;700&display=swap');

  .app-page {
    --green:#157a55;--green-deep:#0e5e41;--green-900:#072a1d;--green-800:#0b3a28;
    --mint:#9ff0c4;--mint-soft:#e4f6ec;--cream:#f6f4ec;--paper:#ffffff;
    --muted:#5f7068;--muted-2:#8a9b92;--line:rgba(10,40,30,0.10);
    --radius:24px;--shadow:0 30px 60px -28px rgba(7,42,29,0.55);
    font-family:"Onest",system-ui,sans-serif;
    color:#0a2419;background:var(--cream);line-height:1.55;
    -webkit-font-smoothing:antialiased;overflow-x:hidden;min-height:100vh;
  }
  .app-page *{margin:0;padding:0;box-sizing:border-box}
  .app-page h1,.app-page h2,.app-page h3,.app-page .display{
    font-family:"Unbounded",sans-serif;letter-spacing:-0.02em;line-height:1.05;
  }
  .app-page a{color:inherit;text-decoration:none}
  .app-page img{display:block;max-width:100%}
  .app-page .wrap{width:100%;max-width:1180px;margin:0 auto;padding:0 24px}
  .app-page .eyebrow{
    display:inline-flex;align-items:center;gap:8px;
    font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;
    color:var(--green);
  }
  .app-page .eyebrow::before{content:"";width:22px;height:2px;background:var(--green);border-radius:2px}
  .app-page .eyebrow.light{color:var(--mint)}
  .app-page .eyebrow.light::before{background:var(--mint)}

  /* HERO */
  .app-page .hero{
    position:relative;
    background:radial-gradient(900px 500px at 12% -5%,rgba(159,240,196,0.16),transparent 60%),
      radial-gradient(700px 600px at 110% 30%,rgba(159,240,196,0.10),transparent 55%),
      linear-gradient(160deg,var(--green-800),var(--green-900) 75%);
    color:#eafff4;overflow:hidden;
    border-bottom-left-radius:42px;border-bottom-right-radius:42px;
  }
  .app-page .hero::after{
    content:"";position:absolute;inset:0;pointer-events:none;opacity:0.5;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  }
  .app-page .hero-grid{
    position:relative;z-index:2;
    display:grid;grid-template-columns:1.05fr 0.95fr;gap:40px;align-items:center;
    padding:74px 0 90px;
  }
  .app-page .hero h1{font-size:clamp(38px,5.4vw,64px);font-weight:700;margin:18px 0 0}
  .app-page .hero h1 .accent{color:var(--mint)}
  .app-page .hero p.lead{font-size:clamp(16px,1.6vw,19px);color:#bfe6d2;max-width:30em;margin-top:20px}
  .app-page .hero-cta{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:32px}
  .app-page .store-badge{
    display:inline-flex;align-items:center;gap:11px;
    background:#0a2419;border:1px solid rgba(255,255,255,0.14);
    color:#fff;padding:12px 18px;border-radius:15px;transition:transform .18s,border-color .2s;
  }
  .app-page .store-badge:hover{transform:translateY(-2px);border-color:rgba(159,240,196,0.5)}
  .app-page .store-badge svg{width:24px;height:24px;flex-shrink:0}
  .app-page .store-badge .t{text-align:left;line-height:1.15}
  .app-page .store-badge .t small{display:block;font-size:10px;opacity:0.72;letter-spacing:.3px}
  .app-page .store-badge .t b{font-size:16px;font-weight:600}
  .app-page .hero-trust{display:flex;align-items:center;gap:10px;margin-top:26px;font-size:14px;color:#a9d6bf}
  .app-page .hero-trust .qr{width:120px;height:120px;border-radius:14px;background:#fff;padding:8px;flex-shrink:0}
  .app-page .hero-trust .qr img{width:100%;height:100%}

  /* phones */
  .app-page .hero-stage{position:relative;height:560px}
  .app-page .phone{
    position:relative;width:268px;border-radius:38px;
    background:#0a2419;padding:10px;
    box-shadow:0 40px 80px -30px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.06);
  }
  .app-page .phone .screen{border-radius:29px;overflow:hidden;background:#0d4f37;position:relative}
  .app-page .phone .notch{
    position:absolute;top:14px;left:50%;transform:translateX(-50%);
    width:88px;height:24px;background:#0a2419;border-radius:999px;z-index:3;
  }
  .app-page .phone img{width:100%;display:block}
  .app-page .hero-stage .phone{position:absolute}
  .app-page .phone-a{top:0;right:30px;z-index:3;animation:floaty 6s ease-in-out infinite}
  .app-page .phone-b{top:120px;right:240px;z-index:2;transform:scale(0.86);opacity:0.96;animation:floatyb 6s ease-in-out infinite .8s}
  @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
  @keyframes floatyb{0%,100%{transform:scale(0.86) translateY(0)}50%{transform:scale(0.86) translateY(-16px)}}
  .app-page .chip{
    position:absolute;z-index:5;background:#fff;color:#0a2419;
    border-radius:14px;padding:11px 15px;box-shadow:0 18px 36px -16px rgba(0,0,0,0.5);
    display:flex;align-items:center;gap:10px;font-weight:600;font-size:14px;
    animation:floaty 5.5s ease-in-out infinite;
  }
  .app-page .chip .dot{width:30px;height:30px;border-radius:9px;background:var(--mint-soft);color:var(--green);display:flex;align-items:center;justify-content:center}
  .app-page .chip-1{top:70px;left:-6px}
  .app-page .chip-2{bottom:90px;right:6px;animation-delay:1.2s}
  @media(max-width:900px){
    .app-page .hero-grid{grid-template-columns:1fr;gap:10px;padding:50px 0 70px;text-align:center}
    .app-page .eyebrow,.app-page .hero-cta,.app-page .hero-trust{justify-content:center}
    .app-page .hero p.lead{margin-left:auto;margin-right:auto}
    .app-page .hero-stage{display:none}
  }

  /* SECTIONS */
  .app-page section{position:relative}
  .app-page .pad{padding:90px 0}
  .app-page .section-head{max-width:640px}
  .app-page .section-head h2{font-size:clamp(28px,3.6vw,42px);font-weight:700;margin:16px 0 0}
  .app-page .section-head p{color:var(--muted);font-size:17px;margin-top:14px}
  .app-page .center{margin-left:auto;margin-right:auto;text-align:center}
  .app-page .center .eyebrow{justify-content:center}

  /* feature cards */
  .app-page .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
  .app-page .feat-card{
    background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);
    padding:30px;transition:transform .25s,box-shadow .25s;
  }
  .app-page .feat-card:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
  .app-page .feat-card .ico{
    width:52px;height:52px;border-radius:15px;background:var(--mint-soft);color:var(--green);
    display:flex;align-items:center;justify-content:center;margin-bottom:18px;
  }
  .app-page .feat-card h3{font-size:20px;font-weight:600;margin-bottom:8px}
  .app-page .feat-card p{color:var(--muted);font-size:15px}
  @media(max-width:820px){.app-page .feat-grid{grid-template-columns:1fr}}

  /* app tour */
  .app-page .tour{background:var(--paper);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
  .app-page .tour-wrap{position:relative;overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none}
  .app-page .tour-wrap::-webkit-scrollbar{display:none}
  .app-page .tour-track{
    display:flex;gap:26px;padding:48px 24px 54px;scroll-snap-type:x mandatory;
    width:max-content;margin:0 auto;
  }
  .app-page .tour-item{scroll-snap-align:center;flex:0 0 auto;width:240px;text-align:center}
  .app-page .tour-item .ph{
    width:240px;border-radius:32px;background:#0a2419;padding:8px;margin:0 auto 18px;
    box-shadow:0 26px 50px -26px rgba(7,42,29,0.6);position:relative;
  }
  .app-page .tour-item .ph .scr{border-radius:25px;overflow:hidden}
  .app-page .tour-item .ph .nt{position:absolute;top:12px;left:50%;transform:translateX(-50%);width:72px;height:20px;background:#0a2419;border-radius:999px;z-index:2}
  .app-page .tour-item h4{font-family:"Unbounded";font-size:16px;font-weight:600}
  .app-page .tour-item span{color:var(--muted-2);font-size:13px}

  /* steps */
  .app-page .steps{background:linear-gradient(160deg,var(--green-800),var(--green-900));color:#eafff4;border-radius:42px;margin:0 24px}
  .app-page .steps .wrap{padding:80px 24px}
  .app-page .steps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:46px}
  .app-page .step{position:relative;padding-top:18px}
  .app-page .step .n{font-family:"Unbounded";font-size:42px;font-weight:700;color:var(--mint);opacity:.95}
  .app-page .step h4{font-size:18px;font-weight:600;margin:10px 0 6px}
  .app-page .step p{color:#a9d6bf;font-size:14px}
  .app-page .step::before{content:"";position:absolute;top:34px;left:54px;right:-22px;height:2px;background:rgba(159,240,196,0.25)}
  .app-page .step:last-child::before{display:none}
  @media(max-width:820px){.app-page .steps-grid{grid-template-columns:1fr 1fr}.app-page .step::before{display:none}}

  /* download */
  .app-page .dl{padding:90px 0}
  .app-page .dl-card{
    position:relative;overflow:hidden;
    background:linear-gradient(155deg,var(--green),var(--green-deep));
    color:#eafff4;border-radius:36px;padding:60px;
    display:grid;grid-template-columns:1.3fr 0.7fr;gap:40px;align-items:center;
    box-shadow:var(--shadow);
  }
  .app-page .dl-card::after{
    content:"";position:absolute;inset:0;opacity:.5;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  }
  .app-page .dl-card h2{font-size:clamp(26px,3.2vw,38px);font-weight:700;position:relative;z-index:2}
  .app-page .dl-card p{color:#cdeedd;margin-top:14px;position:relative;z-index:2;max-width:30em}
  .app-page .dl-card .badges{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px;position:relative;z-index:2}
  .app-page .qr-box{
    position:relative;z-index:2;background:#fff;border-radius:24px;padding:22px;text-align:center;justify-self:end;
    box-shadow:0 30px 60px -24px rgba(0,0,0,0.45);
  }
  .app-page .qr-box img{width:190px;height:190px;margin:0 auto}
  .app-page .qr-box p{color:#0a2419;font-weight:600;font-size:14px;margin-top:12px}
  @media(max-width:820px){
    .app-page .dl-card{grid-template-columns:1fr;padding:40px 28px;text-align:center}
    .app-page .dl-card .badges{justify-content:center}
    .app-page .qr-box{justify-self:center}
  }

  /* reveal animation */
  .app-page .reveal{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
  .app-page .reveal.in{opacity:1;transform:none}
`;

export default function ApplicationPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    document.querySelectorAll(".app-page .reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <Header />
      <div className="app-page">

        {/* HERO */}
        <header className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow light">Дижитал зээлийн апп</span>
              <h1>Зээлээ <span className="accent">хаанаас ч,<br />хэзээ ч</span> аваарай</h1>
              <p className="lead">
                Нано Капиталын аппаар зээлийн хүсэлтээ хэдхэн минутад илгээж, шийдвэрээ богино хугацаанд аван, төлбөрөө апп дотроосоо аюулгүй төлөөрэй.
              </p>
              <div className="hero-cta">
                <a className="store-badge" href="https://apps.apple.com/us/app/nano-2-0/id6745950337">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.23 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.27 3.13-2.53.99-1.45 1.4-2.85 1.42-2.93-.03-.01-2.72-1.04-2.75-4.13zM14.6 4.42c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-3 1.54-.66.76-1.24 1.98-1.08 3.15 1.14.09 2.3-.58 3.02-1.44z"/></svg>
                  <span className="t"><small>Татах:</small><b>App Store</b></span>
                </a>
                <a className="store-badge" href="https://play.google.com/store/apps/details?id=mn.nano.pay">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1L13.5 12 3.7 1.7l-.1.1zM17 8.4l-3.3 3.3 3.3 3.3 3.9-2.2c1.1-.6 1.1-1.7 0-2.3L17 8.4zM4.4 1.3l8.3 8.3 2.6-2.6L5.6.8C5.2.6 4.8.6 4.4.8v.5zM12.7 14.4l-8.3 8.3v.4c.4.2.8.2 1.2 0l9.7-5.5-2.6-3.2z"/></svg>
                  <span className="t"><small>Татах:</small><b>Google Play</b></span>
                </a>
              </div>
              <div className="hero-trust">
                <div className="qr">
                  <img src="/assets/images/nano-qr-small.png" alt="QR код" />
                </div>
                <span>QR кодыг уншуулж<br />төхөөрөмждөө тохирсон хувилбарыг автоматаар татна уу</span>
              </div>
            </div>
            <div className="hero-stage">
              <div className="chip chip-1"><span className="dot">✓</span> Зээл зөвшөөрөгдсөн</div>
              <div className="phone phone-b">
                <span className="notch" />
                <div className="screen"><img src="/assets/images/nano-screen-loans.jpeg" alt="Зээлүүд" /></div>
              </div>
              <div className="phone phone-a">
                <span className="notch" />
                <div className="screen"><img src="/assets/images/nano-screen-home.jpeg" alt="Үндсэн нүүр" /></div>
              </div>
              <div className="chip chip-2"><span className="dot">%</span> 3.0%-аас эхлэх хүү</div>
            </div>
          </div>
        </header>

        {/* FEATURE STRIP */}
        <section className="pad">
          <div className="wrap">
            <div className="section-head center reveal">
              <span className="eyebrow">Яагаад Нано Капитал гэж?</span>
              <h2>Санхүүгийн түнш — таны халаасанд</h2>
              <p>Хэдхэн товшилтоор зээлийн бүх үйлчилгээ. Хурдан, ил тод, найдвартай.</p>
            </div>
            <div className="feat-grid">
              <div className="feat-card reveal">
                <div className="ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9z"/>
                  </svg>
                </div>
                <h3>Хурдан шийдвэр</h3>
                <p>Зээлийн хүсэлтээ гар утсаараа илгээж, хариу шийдвэрээ богино хугацаанд аваарай.</p>
              </div>
              <div className="feat-card reveal">
                <div className="ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3>Аюулгүй орчин</h3>
                <p>Хэрэглэгчийн мэдээлэл найдвартай хамгаалагдсан, шифрлэгдсэн орчинд ажиллана.</p>
              </div>
              <div className="feat-card reveal">
                <div className="ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>
                  </svg>
                </div>
                <h3>Бүрэн ил тод</h3>
                <p>Төлбөр, зээлийн түүх болон үлдэгдлээ хүссэн үедээ апп дотроосоо хянана.</p>
              </div>
            </div>
          </div>
        </section>

        {/* APP TOUR */}
        <section className="tour" id="screens">
          <div className="wrap" style={{ paddingTop: 70 }}>
            <div className="section-head center reveal">
              <span className="eyebrow">Аппын аялал</span>
              <h2>Бүртгэлээс зээл хүртэл — нэг апп дотор</h2>
            </div>
          </div>
          <div className="tour-wrap reveal">
            <div className="tour-track">
              {[
                { src: "/assets/images/nano-screen-register.jpeg", title: "Бүртгүүлэх", sub: "Шинэ хэрэглэгч" },
                { src: "/assets/images/nano-screen-login.jpeg",    title: "Нэвтрэх",    sub: "Хурууны хээ, царайгаар" },
                { src: "/assets/images/nano-screen-home2.jpeg",   title: "Үндсэн нүүр", sub: "Зээлийн саналууд" },
                { src: "/assets/images/nano-screen-requests.jpeg", title: "Хүсэлтүүд", sub: "Илгээсэн хүсэлтийн төлөв" },
                { src: "/assets/images/nano-screen-loans2.jpeg",   title: "Зээлүүд",    sub: "Идэвхтэй ба хаагдсан" },
                { src: "/assets/images/nano-screen-profile.jpeg",  title: "Хэрэглэгч", sub: "Хувийн мэдээлэл, данс" },
              ].map((item) => (
                <div className="tour-item" key={item.title}>
                  <div className="ph">
                    <span className="nt" />
                    <div className="scr"><img src={item.src} alt={item.title} /></div>
                  </div>
                  <h4>{item.title}</h4>
                  <span>{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section style={{ padding: "10px 0 90px" }}>
          <div className="steps">
            <div className="wrap">
              <div className="section-head reveal" style={{ maxWidth: 560 }}>
                <span className="eyebrow light">Хэрхэн ажилладаг вэ?</span>
                <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 700, marginTop: 16, color: "#fff" }}>
                  4 алхамд зээлээ аваарай
                </h2>
              </div>
              <div className="steps-grid">
                <div className="step reveal">
                  <div className="n">01</div>
                  <h4>Бүртгүүлэх</h4>
                  <p>Утасны дугаар, регистрээрээ хэдхэн минутад бүртгэл үүсгэнэ.</p>
                </div>
                <div className="step reveal">
                  <div className="n">02</div>
                  <h4>Хүсэлт илгээх</h4>
                  <p>Тохирох зээлийн бүтээгдэхүүнээ сонгон хүсэлтээ илгээнэ.</p>
                </div>
                <div className="step reveal">
                  <div className="n">03</div>
                  <h4>Зөвшөөрөл</h4>
                  <p>Хүсэлтийн шийдвэрийг богино хугацаанд хүлээн авна.</p>
                </div>
                <div className="step reveal">
                  <div className="n">04</div>
                  <h4>Зээлээ авах</h4>
                  <p>Зээлээ данс руугаа аван, төлбөрөө апп дотроосоо хянана.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD */}
        <section className="dl" id="download">
          <div className="wrap">
            <div className="dl-card reveal">
              <div>
                <span className="eyebrow light">Аппликэйшн татаж авах</span>
                <h2 style={{ marginTop: 14 }}>Өнөөдөр л татаж аваарай</h2>
                <p>
                  Өөрийн төхөөрөмжид тохирсон хувилбарыг сонгон татаж авна уу. QR кодыг уншуулахад таны утасны үйлдлийн системд тохирсон хувилбар автоматаар нээгдэнэ.
                </p>
                <div className="badges">
                  <a className="store-badge" href="https://apps.apple.com/us/app/nano-2-0/id6745950337">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.23 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.27 3.13-2.53.99-1.45 1.4-2.85 1.42-2.93-.03-.01-2.72-1.04-2.75-4.13zM14.6 4.42c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-3 1.54-.66.76-1.24 1.98-1.08 3.15 1.14.09 2.3-.58 3.02-1.44z"/></svg>
                    <span className="t"><small>Татах:</small><b>App Store</b></span>
                  </a>
                  <a className="store-badge" href="https://play.google.com/store/apps/details?id=mn.nano.pay">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1L13.5 12 3.7 1.7l-.1.1zM17 8.4l-3.3 3.3 3.3 3.3 3.9-2.2c1.1-.6 1.1-1.7 0-2.3L17 8.4zM4.4 1.3l8.3 8.3 2.6-2.6L5.6.8C5.2.6 4.8.6 4.4.8v.5zM12.7 14.4l-8.3 8.3v.4c.4.2.8.2 1.2 0l9.7-5.5-2.6-3.2z"/></svg>
                    <span className="t"><small>Татах:</small><b>Google Play</b></span>
                  </a>
                </div>
              </div>
              <div className="qr-box">
                <img src="/assets/images/nano-qr-large.png" alt="Татах QR код" />
                <p>QR кодыг уншуулна уу</p>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
