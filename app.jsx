
const { useState, useEffect, useRef } = React;

// ── THEME ──────────────────────────────────────────────────────────────────
const themes = {
  day: {
    bg: 'linear-gradient(135deg, #fce4ec, #f8bbd0, #f48fb1)', 
    bg2: 'linear-gradient(135deg, #f8bbd0, #f48fb1, #fce4ec)', 
    bg3: 'linear-gradient(135deg, #f48fb1, #fce4ec, #f8bbd0)',
    card: 'rgba(255,255,255,0.72)', cardBorder: 'rgba(220,180,210,0.35)',
    text: '#3D2B3D', text2: '#7A5C78', text3: '#B08AAA',
    accent: '#E8A0BF', accent2: '#C97BB2', accent3: '#A8D5B5',
    nav: 'rgba(255,248,252,0.88)', shadow: 'rgba(180,120,160,0.18)',
    hero: 'linear-gradient(135deg,#ffd6e7 0%,#ffb3c6 25%,#ff85a1 50%,#ffb3c6 75%,#ffd6e7 100%)',
    petal1:'#F4C2D2',petal2:'#D4B0D8',petal3:'#B8D8C8',petal4:'#F7D4A0',
    bubble:'rgba(255,255,255,0.9)',bubbleText:'#5A3A5A',
    inputBg:'rgba(255,255,255,0.8)',inputBorder:'#D4A8D0',
    btnPrimary:'linear-gradient(135deg,#E8A0BF,#C97BB2)',
    btnSecondary:'rgba(232,160,191,0.15)',
    dashCard:'rgba(255,255,255,0.85)',
    overlay:'rgba(61,43,61,0.45)',
    bg: '#ffd6e7',
  },
  night: {
    bg: '#1A0F1E', bg2: '#211628', bg3: '#180D20',
    card: 'rgba(40,20,50,0.80)', cardBorder: 'rgba(180,100,180,0.30)',
    text: '#F0E0F5', text2: '#C9A8D8', text3: '#8A6A9A',
    accent: '#C97BB2', accent2: '#9B59B0', accent3: '#5BA87A',
    nav: 'rgba(20,10,28,0.92)', shadow: 'rgba(150,60,180,0.25)',
    hero: 'linear-gradient(135deg,#1A0F1E 0%,#2D1040 50%,#0F1E18 100%)',
    petal1:'#8B3A6A',petal2:'#6A3A8B',petal3:'#3A6A5A',petal4:'#8B6A2A',
    bubble:'rgba(40,20,50,0.95)',bubbleText:'#F0E0F5',
    inputBg:'rgba(30,15,40,0.8)',inputBorder:'#7A4A8A',
    btnPrimary:'linear-gradient(135deg,#9B59B0,#C97BB2)',
    btnSecondary:'rgba(180,100,180,0.15)',
    dashCard:'rgba(35,18,45,0.90)',
    overlay:'rgba(10,5,15,0.65)',
  }
};

// ── GLOBAL STYLES ──────────────────────────────────────────────────────────
function injectStyles(t){
  let s=document.getElementById('dynstyle');
  if(!s){s=document.createElement('style');s.id='dynstyle';document.head.appendChild(s);}
  s.textContent=`
  :root{
    --bg:${t.bg};--bg2:${t.bg2};--bg3:${t.bg3};
    --card:${t.card};--cb:${t.cardBorder};
    --tx:${t.text};--tx2:${t.text2};--tx3:${t.text3};
    --ac:${t.accent};--ac2:${t.accent2};--ac3:${t.accent3};
    --nav:${t.nav};--sh:${t.shadow};
    --hero:${t.hero};
    --p1:${t.petal1};--p2:${t.petal2};--p3:${t.petal3};--p4:${t.petal4};
    --bub:${t.bubble};--bubt:${t.bubbleText};
    --ib:${t.inputBg};--ibr:${t.inputBorder};
    --bp:${t.btnPrimary};--bs:${t.btnSecondary};
    --dc:${t.dashCard};--ov:${t.overlay};
  }
  body{background:var(--bg);color:var(--tx);}
  *{scrollbar-width:thin;scrollbar-color:var(--ac) transparent;}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:var(--ac);border-radius:3px}
  a{text-decoration:none;color:inherit}
  .playfair{font-family:'Playfair Display',serif}
  .cormorant{font-family:'Cormorant Garamond',serif}
  @keyframes floatUp{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
  @keyframes blink{0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(0.05)}}
  @keyframes wave{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
  @keyframes petal-fall{0%{transform:translateY(-20px) rotate(0deg);opacity:0}100%{transform:translateY(100vh) rotate(720deg);opacity:0.6}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  @keyframes slideIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}
  @keyframes popIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
  .fade-in{animation:fadeIn 0.6s ease forwards}
  .slide-in{animation:slideIn 0.5s ease forwards}
  .pop-in{animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards}
  `;
}

// ── PETAL RAIN ────────────────────────────────────────────────────────────
function PetalRain(){
  const petals=['🌸','🌺','🌼','🌷','✿','❀'];
  return(
    <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
      {Array.from({length:12}).map((_,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:`${Math.random()*100}%`,
          top:'-40px',
          fontSize:`${12+Math.random()*14}px`,
          animation:`petal-fall ${6+Math.random()*8}s linear ${Math.random()*10}s infinite`,
          opacity:0.5,
        }}>{petals[i%petals.length]}</div>
      ))}
    </div>
  );
}

// ── ARTSY CHARACTER ────────────────────────────────────────────────────────
function ArtsyCharacter({size=80,waving=false,talking=false}){
  return(
    <img 
      src="https://i.postimg.cc/Jng2jHHk/artsy-gif-ezgif-com-optimize.gif"
      alt="Artsy"
      style={{
        width:size*1.6,
        height:size*1.6,
        objectFit:'cover',
        borderRadius:'50%'
      }}
    />
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────
function Navbar({page,setPage,dark,setDark,user,setUser}){
  const [open,setOpen]=useState(false);
  const navLinks=[
    {id:'home',label:'Home'},
    {id:'shop',label:'Shop'},
    {id:'customize',label:'Customize'},
    {id:'recommendations',label:'Recommendations'},
    {id:'about',label:'About Artsy'},
    {id:'contact',label:'Contact'},
  ];
  return(
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,
      background:'var(--nav)',backdropFilter:'blur(16px)',
      borderBottom:'1px solid var(--cb)',
      padding:'0 1.5rem',height:'64px',
      display:'flex',alignItems:'center',justifyContent:'space-between',
      boxShadow:`0 2px 20px var(--sh)`,transition:'all 0.3s'
    }}>
      <div onClick={()=>setPage('home')} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'8px'}}>
        <span style={{fontSize:'24px'}}>🌸</span>
        <div>
          <div className="playfair" style={{fontSize:'15px',fontWeight:700,color:'var(--ac2)',lineHeight:1}}>Artsy's</div>
          <div className="cormorant" style={{fontSize:'12px',color:'var(--tx2)',letterSpacing:'2px',lineHeight:1}}>PALETTE & PETALS</div>
        </div>
      </div>

      {/* Desktop Nav */}
      <div style={{display:'flex',gap:'6px',alignItems:'center'}} className="desktop-nav">
        {navLinks.map(l=>(
          <button key={l.id} onClick={()=>setPage(l.id)} style={{
            background:page===l.id?'var(--bs)':'transparent',
            border:'none',color:page===l.id?'var(--ac2)':'var(--tx2)',
            padding:'6px 12px',borderRadius:'20px',cursor:'pointer',
            fontSize:'13px',fontWeight:page===l.id?700:400,
            transition:'all 0.2s',fontFamily:'Lato,sans-serif'
          }}>{l.label}</button>
        ))}
        <button onClick={()=>setDark(!dark)} style={{
          background:'var(--bs)',border:'none',borderRadius:'50%',
          width:'36px',height:'36px',cursor:'pointer',fontSize:'18px',
          display:'flex',alignItems:'center',justifyContent:'center',
          transition:'all 0.3s',transform:dark?'rotate(180deg)':'rotate(0)'
        }}>{dark?'🌙':'☀️'}</button>
        {user
          ?<button onClick={()=>setPage('dashboard')} style={{
              background:'var(--bp)',border:'none',color:'#fff',
              padding:'7px 16px',borderRadius:'20px',cursor:'pointer',
              fontSize:'13px',fontWeight:700
            }}>Dashboard</button>
          :<button onClick={()=>setPage('login')} style={{
              background:'var(--bp)',border:'none',color:'#fff',
              padding:'7px 16px',borderRadius:'20px',cursor:'pointer',
              fontSize:'13px',fontWeight:700
            }}>Login</button>
        }
      </div>

      {/* Mobile Hamburger */}
      <button onClick={()=>setOpen(!open)} style={{
        display:'none',background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'var(--tx)'
      }} className="hamburger">☰</button>

      {open&&(
        <div style={{
          position:'fixed',top:'64px',left:0,right:0,
          background:'var(--nav)',backdropFilter:'blur(16px)',
          padding:'1rem',display:'flex',flexDirection:'column',gap:'6px',
          borderBottom:'1px solid var(--cb)',zIndex:99
        }}>
          {navLinks.map(l=>(
            <button key={l.id} onClick={()=>{setPage(l.id);setOpen(false)}} style={{
              background:page===l.id?'var(--bs)':'transparent',
              border:'none',color:'var(--tx)',padding:'10px 16px',
              borderRadius:'12px',cursor:'pointer',fontSize:'14px',textAlign:'left'
            }}>{l.label}</button>
          ))}
          <div style={{display:'flex',gap:'8px',marginTop:'6px'}}>
            <button onClick={()=>setDark(!dark)} style={{
              flex:1,background:'var(--bs)',border:'none',borderRadius:'12px',
              padding:'10px',cursor:'pointer',fontSize:'20px'
            }}>{dark?'🌙':'☀️'}</button>
            {!user&&<button onClick={()=>{setPage('login');setOpen(false)}} style={{
              flex:2,background:'var(--bp)',border:'none',color:'#fff',
              borderRadius:'12px',padding:'10px',cursor:'pointer',fontSize:'13px',fontWeight:700
            }}>Login / Sign Up</button>}
          </div>
        </div>
      )}

      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:block!important}}`}</style>
    </nav>
  );
}

// ── ARTSY CHAT WIDGET ──────────────────────────────────────────────────────
function ArtsynWidget(){
  const [open,setOpen]=useState(false);
  const [step,setStep]=useState(0);
  const [msgs,setMsgs]=useState([]);
  const [input,setInput]=useState('');

  const script=[
    {from:'artsy',text:"Heyy buddie! 🌸 Need help choosing flowers?",opts:["Yes please!","Just browsing 😊"]},
    {from:'artsy',text:"Ohhh gifting someone special? That's so adorable! 💕",opts:["Yes, it's a gift!","It's for me 🌷"]},
    {from:'artsy',text:"Let me help you build the perfect bouquet! 🎀 Who's it for?",opts:["Partner 💑","Friend 👯","Mom 🤍","Myself 🌸"]},
    {from:'artsy',text:"Great choice! 🌺 I'd suggest Roses + Peonies with a pastel ribbon. Want to customize?",opts:["Let's customize! 🎨","Show me pre-made 🛒"]},
  ];

  useEffect(()=>{
    if(open&&msgs.length===0){
      setTimeout(()=>setMsgs([{from:'artsy',text:script[0].text}]),500);
    }
  },[open]);

  const handleOpt=(opt)=>{
    setMsgs(m=>[...m,{from:'user',text:opt}]);
    const next=step+1;
    if(next<script.length){
      setTimeout(()=>{
        setMsgs(m=>[...m,{from:'artsy',text:script[next].text}]);
        setStep(next);
      },800);
    } else {
      setTimeout(()=>setMsgs(m=>[...m,{from:'artsy',text:"I'll take you to the shop! 🌷 Check out our gorgeous bouquets 🎀"}]),800);
    }
  };

  const sendMsg=()=>{
    if(!input.trim())return;
    setMsgs(m=>[...m,{from:'user',text:input}]);
    setInput('');
    setTimeout(()=>setMsgs(m=>[...m,{from:'artsy',text:"That sounds lovely! 🌸 Let me check our collection for you... ✨"}]),700);
  };

  const curScript=script[step];

  return(
    <div style={{position:'fixed',bottom:'24px',right:'24px',zIndex:200}}>
      {open&&(
        <div className="pop-in" style={{
          position:'absolute',bottom:'80px',right:0,width:'300px',
          background:'var(--card)',backdropFilter:'blur(20px)',
          border:'1px solid var(--cb)',borderRadius:'20px',
          boxShadow:`0 8px 40px var(--sh)`,overflow:'hidden'
        }}>
          <div style={{background:'var(--bp)',padding:'12px 16px',display:'flex',alignItems:'center',gap:'10px'}}>
            <ArtsyCharacter size={44} waving={true} talking={true}/>
            <div>
              <div style={{color:'#fff',fontWeight:700,fontFamily:'Playfair Display,serif',fontSize:'14px'}}>Artsy</div>
              <div style={{color:'rgba(255,255,255,0.8)',fontSize:'11px'}}>🟢 Here to help!</div>
            </div>
          </div>
          <div style={{height:'240px',overflowY:'auto',padding:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{
                alignSelf:m.from==='artsy'?'flex-start':'flex-end',
                background:m.from==='artsy'?'var(--bub)':'var(--bp)',
                color:m.from==='artsy'?'var(--bubt)':'#fff',
                padding:'8px 12px',borderRadius:m.from==='artsy'?'4px 14px 14px 14px':'14px 4px 14px 14px',
                fontSize:'13px',maxWidth:'85%',lineHeight:1.5,
                boxShadow:`0 2px 8px var(--sh)`
              }}>{m.text}</div>
            ))}
            {curScript?.opts&&msgs.length>0&&msgs[msgs.length-1]?.from==='artsy'&&(
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'4px'}}>
                {curScript.opts.map(o=>(
                  <button key={o} onClick={()=>handleOpt(o)} style={{
                    background:'var(--bs)',border:'1px solid var(--cb)',
                    color:'var(--ac2)',padding:'5px 10px',borderRadius:'20px',
                    fontSize:'12px',cursor:'pointer',fontFamily:'Lato,sans-serif'
                  }}>{o}</button>
                ))}
              </div>
            )}
          </div>
          <div style={{padding:'10px',borderTop:'1px solid var(--cb)',display:'flex',gap:'8px'}}>
            <input value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&sendMsg()}
              placeholder="Type a message..." style={{
                flex:1,background:'var(--ib)',border:'1px solid var(--ibr)',
                borderRadius:'20px',padding:'7px 14px',fontSize:'13px',
                color:'var(--tx)',outline:'none'
              }}/>
            <button onClick={sendMsg} style={{
              background:'var(--bp)',border:'none',borderRadius:'50%',
              width:'34px',height:'34px',color:'#fff',cursor:'pointer',fontSize:'16px'
            }}>↑</button>
          </div>
        </div>
      )}
     <div onClick={()=>setOpen(!open)} style={{
        display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',
        cursor:'pointer',
      }}>
        <div style={{
          background:'var(--bp)',color:'#fff',
          padding:'6px 12px',borderRadius:'20px',
          fontSize:'11px',fontWeight:700,textAlign:'center',
          boxShadow:`0 4px 16px var(--sh)`,
          whiteSpace:'nowrap',
          animation:'pulse 2.5s ease-in-out infinite'
        }}>💬 Chat with Artsy<br/>the Florist!</div>
        <div style={{
          width:'80px',height:'80px',borderRadius:'50%',
          border:'3px solid var(--ac)',
          overflow:'hidden',
          boxShadow:`0 4px 20px var(--sh)`,
          transition:'transform 0.3s',
          transform:open?'scale(0.9)':'scale(1)',
        }}>
          <img src="/artsy2.jpg" alt="Artsy" style={{
            width:'100%',height:'100%',objectFit:'cover',
            objectPosition:'top',display:'block'
          }}/>
        </div>
      </div>
    </div>
  );}

// ── HERO / HOME PAGE ───────────────────────────────────────────────────────
function HomePage({setPage}){
  const [chatStep,setChatStep]=useState(0);
  const [showBubble,setShowBubble]=useState(false);
  const [shown,setShown]=useState([]);

  const heroChat=[
    "Heyy buddie, looking for a bouquet? 🌸",
    "I see! Gifting it to your loved ones, right? 💕",
    "I have great options for you! Let me tell you a secret… you can even customize your bouquet yourself! 🎨✨"
  ];

  useEffect(()=>{
    setTimeout(()=>{setShowBubble(true);setShown([0]);},1200);
  },[]);

  const nextMsg=()=>{
    if(chatStep<heroChat.length-1){
      const n=chatStep+1;
      setChatStep(n);
      setShown(s=>[...s,n]);
    }
  };

  return(
    <div style={{minHeight:'100vh',background:'var(--hero)',paddingTop:'64px',position:'relative',overflow:'hidden'}}>
      <PetalRain/>
      {/* Decorative circles */}
      <div style={{position:'absolute',top:'10%',left:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'var(--p1)',opacity:0.12,filter:'blur(60px)'}}/>
      <div style={{position:'absolute',bottom:'15%',right:'8%',width:'400px',height:'400px',borderRadius:'50%',background:'var(--p2)',opacity:0.10,filter:'blur(80px)'}}/>

      {/* Hero Section */}
      <section style={{
        display:'flex',alignItems:'center',justifyContent:'center',
        flexDirection:'column',minHeight:'calc(100vh - 64px)',
        padding:'2rem',textAlign:'center',gap:'1.5rem',position:'relative',zIndex:1
      }}>
        <div className="fade-in" style={{animationDelay:'0.2s',opacity:0}}>
  <div style={{fontSize:'13px',letterSpacing:'4px',color:'var(--ac2)',marginBottom:'8px',textTransform:'uppercase'}}>Welcome to</div>
  <h1 className="playfair" style={{
    fontSize:'clamp(2.5rem,7vw,5rem)',fontWeight:700,lineHeight:1.1,
    background:'linear-gradient(135deg,#C2185B,#8E24AA,#4A148C)',
    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'
  }}>Artsy's Palette<br/><em>& Petals</em></h1>
  <p className="cormorant" style={{fontSize:'clamp(1rem,2.5vw,1.4rem)',color:'var(--tx2)',marginTop:'12px',fontStyle:'italic'}}>
    Where every bloom tells your story 🌺
  </p>
</div>

        {/* Artsy Intro */}
        <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:'12px'}}>
          <div className="fade-in" style={{animationDelay:'0.8s',opacity:0}}>
            <ArtsyCharacter size={130} waving={true} talking={shown.length>0}/>
          </div>

          {showBubble&&(
            <div style={{display:'flex',flexDirection:'column',gap:'8px',maxWidth:'360px',width:'100%'}}>
              {shown.map(i=>(
                <div key={i} className="slide-in" style={{
                  background:'var(--bub)',backdropFilter:'blur(12px)',
                  border:'1px solid var(--cb)',borderRadius:'16px 16px 16px 4px',
                  padding:'12px 18px',color:'var(--bubt)',fontSize:'15px',
                  boxShadow:`0 4px 20px var(--sh)`,lineHeight:1.6
                }}>{heroChat[i]}</div>
              ))}
              {chatStep<heroChat.length-1
                ?<button onClick={nextMsg} style={{
                    alignSelf:'flex-start',background:'var(--bp)',border:'none',
                    color:'#fff',padding:'10px 24px',borderRadius:'24px',cursor:'pointer',
                    fontSize:'14px',fontWeight:700,boxShadow:`0 4px 16px var(--sh)`,
                    transition:'transform 0.2s'
                  }}>Yes, continue! 🌸</button>
                :<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  <button onClick={()=>setPage('shop')} style={{
                    background:'var(--bp)',border:'none',color:'#fff',
                    padding:'10px 24px',borderRadius:'24px',cursor:'pointer',
                    fontSize:'14px',fontWeight:700
                  }}>Browse Bouquets 🌷</button>
                  <button onClick={()=>setPage('customize')} style={{
                    background:'transparent',border:'2px solid var(--ac)',color:'var(--ac2)',
                    padding:'10px 24px',borderRadius:'24px',cursor:'pointer',
                    fontSize:'14px',fontWeight:700
                  }}>Customize 🎨</button>
                </div>
              }
            </div>
          )}
        </div>

        {/* Feature pills */}
        <div className="fade-in" style={{animationDelay:'1.5s',opacity:0,display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center',marginTop:'12px'}}>
          {['🌸 Handcrafted Bouquets','🎨 Custom Designs','🚚 Same-day Delivery','💝 Gift Wrapping'].map(f=>(
            <div key={f} style={{
              background:'var(--card)',backdropFilter:'blur(12px)',
              border:'1px solid var(--cb)',borderRadius:'24px',
              padding:'8px 18px',fontSize:'13px',color:'var(--tx2)',
              boxShadow:`0 2px 12px var(--sh)`
            }}>{f}</div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section style={{padding:'4rem 2rem',position:'relative',zIndex:1}}>
        <h2 className="playfair" style={{textAlign:'center',fontSize:'2.2rem',color:'var(--tx)',marginBottom:'2.5rem'}}>
          This Week's <em>Favourites</em> 🌺
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1.5rem',maxWidth:'960px',margin:'0 auto'}}>
          {bouquets.slice(0,4).map((b,i)=>(
            <BouquetCard key={b.id} bouquet={b} delay={i*0.1} setPage={()=>{}}/>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'2.5rem'}}>
          <button onClick={()=>setPage('shop')} style={{
            background:'var(--bp)',border:'none',color:'#fff',
            padding:'14px 40px',borderRadius:'30px',cursor:'pointer',
            fontSize:'15px',fontWeight:700,boxShadow:`0 4px 20px var(--sh)`
          }}>View All Bouquets 🌸</button>
        </div>
      </section>
    </div>
  );
}

// ── BOUQUET DATA ──────────────────────────────────────────────────────────
const bouquets=[
  {id:1,name:'Romantic Roses',
   image:'https://noongifts.com/cdn/shop/products/a-dozen-red-roses-with-eucalyptus-leaves-bouquet.jpg?v=1680114335',
   flowers:'Red Roses,Eucalyptus',price:699,desc:'Classic romance in every petal',tag:'Bestseller'},

  {id:2,name:'Lavender Dream',
   image:'https://i.etsystatic.com/6821569/r/il/bc4422/4618144250/il_570xN.4618144250_8k3w.jpg',
   flowers:'Lavender, White Peonies, Lilac',price:899,desc:'A dreamy blend of calm and beauty',tag:'Popular'},

  {id:3,name:'Spring Garden Mix',
   image:'https://media.karousell.com/media/photos/products/2020/10/24/tulips__daisies_bouquet_1603560766_ad4a9809.jpg',
   flowers:'Tulips, Daisies, Iris, Greenery',price:599,desc:'A burst of spring freshness',tag:'Seasonal'},

  {id:4,name:'Sunflower Joy',
   image:'https://png.pngtree.com/thumb_back/fw800/background/20240513/pngtree-a-sunset-bouquet-with-marigolds-sunflowers-and-roses-image_15766322.jpg',
   flowers:'Sunflowers, Orange Roses, Marigold',price:799,desc:'Bright and cheerful arrangement',tag:'Happy Pick'},

  {id:5,name:'Peony Paradise',
   image:'https://i.pinimg.com/736x/79/27/72/7927724910de30059642728b3cfb2506.jpg',
   flowers:'Pink Peonies, Blush Roses, Ranunculus',price:1499,desc:'Luxuriously soft and romantic',tag:'Premium'},

  {id:6,name:'Orchid Elegance',
   image:'https://cdn.bloomsflora.com/uploads/product/bloomsflora/1403_98_15655.webp',
   flowers:'Purple Orchids, Anthuriums, Palms',price:1799,desc:'Exotic sophistication in a vase',tag:'Luxury'},

  {id:7,name:'Wildflower Whisper',
   image:'https://luxelocksstudio.com/wp-content/uploads/2025/11/wildflower-wedding-11-683x1024.jpg',
   flowers:'Daisies, Cosmos, Cornflowers, Herbs',price:499,desc:'Free-spirited meadow charm',tag:'Whimsical'},

  {id:8,name:'Blush & Bloom',
   image:'https://floramoments.sg/cdn/shop/articles/Peonies_Singapore_c80e2c59-4151-478d-be8a-1933f69f619c.jpg?v=1772857681',
   flowers:'Blush Roses, Peonies, Sweet Peas',price:1099,desc:'The perfect soft romantic gift',tag:'Gift Pick'},
];
function BouquetCard({bouquet,delay=0,onAdd}){
  const [added,setAdded]=useState(false);
  const [hovered,setHovered]=useState(false);
  const [showOrder,setShowOrder]=useState(false);
  const [showContact,setShowContact]=useState(false);

  const handleAdd=()=>{
    setAdded(true);
    onAdd&&onAdd(bouquet);
    setTimeout(()=>setAdded(false),2000);
  };

  return(
    <>
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      className="fade-in" style={{
        animationDelay:`${delay}s`,opacity:0,
        background:'var(--card)',backdropFilter:'blur(16px)',
        border:'1px solid var(--cb)',borderRadius:'20px',
        overflow:'hidden',boxShadow:hovered?`0 12px 40px var(--sh)`:`0 4px 16px var(--sh)`,
        transition:'transform 0.3s,box-shadow 0.3s',
        transform:hovered?'translateY(-6px)':'none'
      }}>
      <div style={{height:'150px',position:'relative',overflow:'hidden',background:`linear-gradient(135deg,var(--p1) 40%,var(--p2))`}}>
        {bouquet.image
          ?<img src={bouquet.image} alt={bouquet.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
          :<div style={{height:'140px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'64px'}}>{bouquet.emoji}</div>
        }
        {bouquet.tag&&(
          <div style={{position:'absolute',top:'10px',right:'10px',background:'var(--bp)',color:'#fff',padding:'3px 10px',borderRadius:'12px',fontSize:'10px',fontWeight:700}}>{bouquet.tag}</div>
        )}
      </div>
      <div style={{padding:'14px'}}>
        <h3 className="playfair" style={{fontSize:'16px',marginBottom:'4px',color:'var(--tx)'}}>{bouquet.name}</h3>
        <p style={{fontSize:'12px',color:'var(--tx3)',marginBottom:'4px'}}>{bouquet.flowers}</p>
        <p style={{fontSize:'12px',color:'var(--tx2)',marginBottom:'12px',fontStyle:'italic'}}>{bouquet.desc}</p>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'8px'}}>
          <span style={{fontSize:'18px',fontWeight:700,color:'var(--ac2)'}}>₹{bouquet.price}</span>
          <div style={{display:'flex',gap:'6px'}}>
            <button onClick={handleAdd} style={{
              background:added?'var(--ac3)':'var(--bs)',
              border:`1px solid var(--cb)`,color:added?'#fff':'var(--ac2)',
              padding:'6px 12px',borderRadius:'12px',cursor:'pointer',fontSize:'12px',fontWeight:700,
              transition:'all 0.3s'
            }}>{added?'Added ✓':'+ Cart'}</button>
            <button onClick={()=>setShowOrder(true)} style={{
              background:'var(--bp)',border:'none',color:'#fff',
              padding:'6px 14px',borderRadius:'12px',cursor:'pointer',fontSize:'12px',fontWeight:700
            }}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>

    {showOrder&&(
      <div style={{position:'fixed',inset:0,background:'var(--ov)',backdropFilter:'blur(8px)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}} onClick={()=>setShowOrder(false)}>
        <div className="pop-in" onClick={e=>e.stopPropagation()} style={{background:'var(--card)',backdropFilter:'blur(20px)',border:'1px solid var(--cb)',borderRadius:'24px',padding:'2.5rem',maxWidth:'420px',width:'100%',boxShadow:`0 20px 60px var(--sh)`}}>
          <h2 className="playfair" style={{fontSize:'1.8rem',marginBottom:'1.5rem',textAlign:'center'}}>Your Order 🛒</h2>
          <div style={{background:'var(--bs)',borderRadius:'16px',padding:'1.25rem',marginBottom:'1.5rem'}}>
            <img src={bouquet.image} alt={bouquet.name} style={{width:'100%',height:'160px',objectFit:'cover',borderRadius:'12px',marginBottom:'12px'}}/>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
              <span style={{fontWeight:700,fontSize:'16px',color:'var(--tx)'}}>{bouquet.name}</span>
              <span style={{fontWeight:700,fontSize:'18px',color:'var(--ac2)'}}>₹{bouquet.price}</span>
            </div>
            <p style={{fontSize:'13px',color:'var(--tx2)',marginBottom:'4px'}}>🌸 {bouquet.flowers}</p>
            <p style={{fontSize:'12px',color:'var(--tx3)',fontStyle:'italic'}}>{bouquet.desc}</p>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderTop:'1px solid var(--cb)',borderBottom:'1px solid var(--cb)',marginBottom:'1.5rem'}}>
            <span style={{color:'var(--tx2)'}}>Total</span>
            <span style={{fontWeight:700,fontSize:'20px',color:'var(--ac2)'}}>₹{bouquet.price}</span>
          </div>
          <button onClick={()=>{setShowOrder(false);setShowContact(true);}} style={{width:'100%',background:'var(--bp)',border:'none',color:'#fff',padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'15px',fontWeight:700,marginBottom:'10px'}}>Place Order 🌸</button>
          <button onClick={()=>setShowOrder(false)} style={{width:'100%',background:'transparent',border:'1px solid var(--cb)',color:'var(--tx2)',padding:'10px',borderRadius:'14px',cursor:'pointer',fontSize:'13px'}}>Continue Shopping</button>
        </div>
      </div>
    )}

    {showContact&&(
      <div style={{position:'fixed',inset:0,background:'var(--ov)',backdropFilter:'blur(8px)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}} onClick={()=>setShowContact(false)}>
        <div className="pop-in" onClick={e=>e.stopPropagation()} style={{background:'var(--card)',backdropFilter:'blur(20px)',border:'1px solid var(--cb)',borderRadius:'24px',padding:'2.5rem',maxWidth:'380px',width:'100%',textAlign:'center',boxShadow:`0 20px 60px var(--sh)`}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🌸</div>
          <h2 className="playfair" style={{fontSize:'1.6rem',marginBottom:'8px'}}>How would you like to order?</h2>
          <p style={{color:'var(--tx2)',fontSize:'13px',marginBottom:'2rem'}}>Choose your preferred way to place your order for <strong>{bouquet.name}</strong> 💕</p>
          <a href={`https://wa.me/919999999999?text=Hi Artsy! I'd like to order:%0A%0A🌸 ${bouquet.name}%0A💐 ${bouquet.flowers}%0A💰 ₹${bouquet.price}%0A%0APlease confirm my order!`} target="_blank" rel="noreferrer" style={{display:'block',marginBottom:'12px'}}>
            <button style={{width:'100%',background:'#25D366',border:'none',color:'#fff',padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'15px',fontWeight:700}}>📱 Order via WhatsApp</button>
          </a>
          <a href={`mailto:artsyspalette.petals@gmail.com?subject=Order: ${bouquet.name}&body=Hi Artsy!%0A%0AI'd like to order:%0A%0A🌸 Bouquet: ${bouquet.name}%0A💐 Flowers: ${bouquet.flowers}%0A💰 Price: ₹${bouquet.price}%0A%0APlease confirm my order!`} target="_blank" rel="noreferrer" style={{display:'block',marginBottom:'12px'}}>
            <button style={{width:'100%',background:'var(--bp)',border:'none',color:'#fff',padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'15px',fontWeight:700}}>✉️ Order via Email</button>
          </a>
          <button onClick={()=>setShowContact(false)} style={{background:'transparent',border:'none',color:'var(--tx3)',cursor:'pointer',fontSize:'13px'}}>Cancel</button>
        </div>
      </div>
    )}
    </>
  );
}


// ── SHOP PAGE ──────────────────────────────────────────────────────────────
function ShopPage(){
  const [cart,setCart]=useState([]);
  const [filter,setFilter]=useState('All');
  const tags=['All','Bestseller','Popular','Seasonal','Premium','Luxury','Gift Pick'];

  const filtered=filter==='All'?bouquets:bouquets.filter(b=>b.tag===filter);
  const addToCart=(b)=>setCart(c=>[...c,b]);

  return(
    <div style={{minHeight:'100vh',paddingTop:'80px',padding:'80px 2rem 3rem',background:'var(--bg)'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <h1 className="playfair" style={{fontSize:'2.5rem',color:'var(--tx)'}}>Our <em>Bouquet Collection</em> 🌸</h1>
          <p style={{color:'var(--tx2)',marginTop:'8px'}}>Handcrafted with love in Mancherial, Telangana 💕</p>
          {cart.length>0&&(
            <div style={{
              display:'inline-block',marginTop:'12px',
              background:'var(--bp)',color:'#fff',
              padding:'8px 20px',borderRadius:'20px',fontSize:'13px',fontWeight:700
            }}>🛒 {cart.length} item{cart.length>1?'s':''} in cart</div>
          )}
        </div>

        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center',marginBottom:'2rem'}}>
          {tags.map(t=>(
            <button key={t} onClick={()=>setFilter(t)} style={{
              background:filter===t?'var(--bp)':'var(--bs)',
              border:`1px solid var(--cb)`,
              color:filter===t?'#fff':'var(--tx2)',
              padding:'7px 18px',borderRadius:'20px',cursor:'pointer',fontSize:'13px',
              transition:'all 0.2s',fontWeight:filter===t?700:400
            }}>{t}</button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'1.5rem'}}>
          {filtered.map((b,i)=>(
            <BouquetCard key={b.id} bouquet={b} delay={i*0.08} onAdd={addToCart}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CUSTOMIZE PAGE ────────────────────────────────────────────────────────
function CustomizePage(){
  const [form,setForm]=useState({flowers:[],color:'Pink',wrap:'Kraft Paper',size:'Medium',ribbon:false,card:false,msg:''});
  const [preview,setPreview]=useState(false);

  const flowers=[
    {name:'Roses 🌹',    price:299},
    {name:'Tulips 🌷',   price:149},
    {name:'Lilies 🪷',   price:250},
    {name:'Sunflowers 🌻',price:179},
    {name:'Orchids 💜',  price:399},
    {name:'Peonies 🌸',  price:349},
  ];
  const colors=['Pink','Red','White','Yellow','Purple','Peach','Mixed'];
  const wraps=['Kraft Paper','White Tissue','Pastel Blue','Blush Pink','Sage Green','Velvet Burgundy'];
  const sizes=['Small — ₹599','Medium — ₹999','Large — ₹1499','Jumbo — ₹1999'];

  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleFlower=(fname)=>setForm(f=>({
    ...f,
    flowers:f.flowers.includes(fname)
      ?f.flowers.filter(x=>x!==fname)
      :[...f.flowers,fname]
  }));

  const sizePrice=sizes.findIndex(s=>s.startsWith(form.size))*400+599;
  const flowerPrice=form.flowers.reduce((sum,fname)=>{
    const f=flowers.find(fl=>fl.name.startsWith(fname));
    return sum+(f?f.price:0);
  },0);
  const price=sizePrice+flowerPrice;

  const imageMap={
    'Roses 🌹':'https://img.freepik.com/free-photo/close-up-blooming-flower_23-2152023680.jpg?w=400',
    'Tulips 🌷':'https://i.pinimg.com/474x/60/6d/21/606d21db417960fd77d6e35682131a22.jpg',
    'Lilies 🪷':'https://i.pinimg.com/474x/a5/6f/1d/a56f1d52f4a5783b234deaffb480985a.jpg',
    'Sunflowers 🌻':'https://wallpapersok.com/images/hd/enjoy-the-beauty-of-a-sunflower-with-this-sunflower-aesthetic-iphone-wallpaper-q24bhvdl6uuvakcx.jpg',
    'Orchids 💜':'https://market99.com/cdn/shop/files/WW10006632-4_2048x.jpg?v=1737487688',
    'Peonies 🌸':'https://s.widget-club.com/images/YyiR86zpwIMIfrCZoSs4ulVD9RF3/cb94b85535b2dec11a9173b8f79728d1/v31Ai62F5rXwCpbePEyI.jpg?q=70&w=500',
  };

  const getImage=(fname)=>{
    const match=flowers.find(f=>f.name.startsWith(fname));
    return match?imageMap[match.name]:'';
  };

  return(
    <div style={{minHeight:'100vh',paddingTop:'80px',padding:'80px 2rem 3rem',background:'var(--bg2)'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <h1 className="playfair" style={{textAlign:'center',fontSize:'2.5rem',marginBottom:'0.5rem'}}>
          Build Your <em>Dream Bouquet</em> 🎨
        </h1>
        <p style={{textAlign:'center',color:'var(--tx2)',marginBottom:'2.5rem'}}>Choose every detail — make it perfectly yours 💕</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem'}} className="custom-grid">
          <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>

            {/* Flower Type */}
            <div style={{background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',borderRadius:'16px',padding:'1.25rem'}}>
              <label style={{fontWeight:700,color:'var(--tx)',marginBottom:'10px',display:'block'}}>🌸 Choose Your Flower</label>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {flowers.map(f=>{
                  const fname=f.name.split(' ')[0];
                  const selected=form.flowers.includes(fname);
                  return(
                    <button key={f.name} onClick={()=>toggleFlower(fname)} style={{
                      background:selected?'var(--bp)':'var(--bs)',
                      border:`1px solid var(--cb)`,
                      color:selected?'#fff':'var(--tx2)',
                      padding:'7px 14px',borderRadius:'20px',cursor:'pointer',
                      fontSize:'13px',transition:'all 0.2s',
                      display:'flex',flexDirection:'column',alignItems:'center',gap:'2px'
                    }}>
                      <span>{selected&&'✓ '}{f.name}</span>
                      <span style={{fontSize:'11px',opacity:0.85}}>+₹{f.price}</span>
                    </button>
                  );
                })}
                {form.flowers.length>0&&(
                  <div style={{width:'100%',marginTop:'8px',fontSize:'12px',color:'var(--ac2)',fontWeight:600}}>
                    ✨ Selected: {form.flowers.join(' + ')}
                  </div>
                )}
              </div>
            </div>

            {/* Color */}
            <div style={{background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',borderRadius:'16px',padding:'1.25rem'}}>
              <label style={{fontWeight:700,color:'var(--tx)',marginBottom:'10px',display:'block'}}>🎨 Choose Color for Wrapping Paper</label>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {colors.map(c=>(
                  <button key={c} onClick={()=>upd('color',c)} style={{
                    background:form.color===c?'var(--bp)':'var(--bs)',
                    border:`1px solid var(--cb)`,color:form.color===c?'#fff':'var(--tx2)',
                    padding:'7px 14px',borderRadius:'20px',cursor:'pointer',fontSize:'13px',transition:'all 0.2s'
                  }}>{c}</button>
                ))}
              </div>
            </div>

            {/* Wrapping */}
            <div style={{background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',borderRadius:'16px',padding:'1.25rem'}}>
              <label style={{fontWeight:700,color:'var(--tx)',marginBottom:'10px',display:'block'}}>🎁 Wrapping Paper</label>
              <select value={form.wrap} onChange={e=>upd('wrap',e.target.value)} style={{
                width:'100%',background:'var(--ib)',border:`1px solid var(--ibr)`,
                borderRadius:'10px',padding:'10px',color:'var(--tx)',fontSize:'14px',outline:'none'
              }}>
                {wraps.map(w=><option key={w}>{w}</option>)}
              </select>
            </div>

            {/* Size */}
            <div style={{background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',borderRadius:'16px',padding:'1.25rem'}}>
              <label style={{fontWeight:700,color:'var(--tx)',marginBottom:'10px',display:'block'}}>📏 Bouquet Size</label>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {sizes.map(s=>{
                  const sz=s.split(' —')[0];
                  return(
                    <button key={s} onClick={()=>upd('size',sz)} style={{
                      background:form.size===sz?'var(--bp)':'var(--bs)',
                      border:`1px solid var(--cb)`,color:form.size===sz?'#fff':'var(--tx2)',
                      padding:'9px 14px',borderRadius:'12px',cursor:'pointer',fontSize:'13px',
                      textAlign:'left',transition:'all 0.2s'
                    }}>{s}</button>
                  );
                })}
              </div>
            </div>

            {/* Extras */}
            <div style={{background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',borderRadius:'16px',padding:'1.25rem'}}>
              <label style={{fontWeight:700,color:'var(--tx)',marginBottom:'10px',display:'block'}}>✨ Add Extras</label>
              {[['ribbon','🎀 Add Ribbon (+₹100)'],['card','💌 Greeting Card (+₹50)']].map(([k,l])=>(
                <label key={k} style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',marginBottom:'8px'}}>
                  <input type="checkbox" checked={form[k]} onChange={e=>upd(k,e.target.checked)}
                    style={{width:'18px',height:'18px',accentColor:'var(--ac2)'}}/>
                  <span style={{color:'var(--tx2)',fontSize:'14px'}}>{l}</span>
                </label>
              ))}
              {form.card&&(
                <textarea value={form.msg} onChange={e=>upd('msg',e.target.value)}
                  placeholder="Your heartfelt message... 💕"
                  style={{
                    width:'100%',marginTop:'8px',background:'var(--ib)',border:`1px solid var(--ibr)`,
                    borderRadius:'10px',padding:'10px',color:'var(--tx)',fontSize:'13px',
                    outline:'none',resize:'vertical',minHeight:'80px'
                  }}/>
              )}
            </div>
          </div>

          {/* Preview */}
          <div style={{position:'sticky',top:'80px',alignSelf:'start'}}>
            <div style={{background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',borderRadius:'20px',padding:'2rem',textAlign:'center'}}>

              {/* Flower images */}
              <div style={{display:'flex',flexDirection:'column',gap:'12px',alignItems:'center',marginBottom:'16px'}}>
                {form.flowers.length===0?(
                  <div style={{width:'160px',height:'160px',borderRadius:'16px',border:'2px solid var(--cb)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px',background:'var(--bs)'}}>🌸</div>
                ):(
                  form.flowers.map(fname=>(
                    <div key={fname} style={{width:'160px',height:'160px',borderRadius:'16px',overflow:'hidden',border:'2px solid var(--cb)',flexShrink:0}}>
                      <img src={getImage(fname)} alt={fname} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                    </div>
                  ))
                )}
              </div>

              <h2 className="playfair" style={{fontSize:'1.4rem',marginBottom:'8px',color:'var(--tx)'}}>Your Custom Bouquet</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'1.5rem'}}>
                {[
                  ['Flowers',form.flowers.length>0?form.flowers.join(' + '):'None selected'],
                  ['Color',form.color],['Wrap',form.wrap],['Size',form.size],
                  ['Ribbon',form.ribbon?'Yes ✓':'No'],['Card',form.card?'Yes ✓':'No']
                ].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:'13px'}}>
                    <span style={{color:'var(--tx3)'}}>{k}</span>
                    <span style={{color:'var(--tx)',fontWeight:600}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{borderTop:'1px solid var(--cb)',paddingTop:'1rem',marginBottom:'1rem'}}>
                <div style={{fontSize:'24px',fontWeight:700,color:'var(--ac2)'}}>
                  ₹{price+(form.ribbon?100:0)+(form.card?50:0)}
                </div>
                <div style={{fontSize:'12px',color:'var(--tx3)'}}>Total estimated price</div>
              </div>
              <button onClick={()=>setPreview(true)} style={{
                width:'100%',background:'var(--bp)',border:'none',color:'#fff',
                padding:'14px',borderRadius:'14px',cursor:'pointer',
                fontSize:'15px',fontWeight:700,marginBottom:'10px'
              }}>Create My Bouquet 🌸</button>
              <button style={{
                width:'100%',background:'transparent',border:`1px solid var(--cb)`,color:'var(--tx2)',
                padding:'10px',borderRadius:'14px',cursor:'pointer',fontSize:'13px'
              }}>Save to Wishlist 💝</button>
            </div>
          </div>
        </div>

        {preview&&(
          <div style={{
            position:'fixed',inset:0,background:'var(--ov)',backdropFilter:'blur(8px)',
            zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'
          }} onClick={()=>setPreview(false)}>
            <div className="pop-in" onClick={e=>e.stopPropagation()} style={{
              background:'var(--card)',backdropFilter:'blur(20px)',
              border:'1px solid var(--cb)',borderRadius:'24px',
              padding:'2.5rem',textAlign:'center',maxWidth:'380px',width:'100%',
              boxShadow:`0 20px 60px var(--sh)`
            }}>
              <div style={{fontSize:'72px',marginBottom:'16px'}}>🎉</div>
              <h2 className="playfair" style={{fontSize:'1.8rem',marginBottom:'8px'}}>Order via WhatsApp!</h2>
              <p style={{color:'var(--tx2)',fontSize:'14px',marginBottom:'1.5rem'}}>
                Your custom {form.color} bouquet with {form.flowers.join(' + ')||'flowers'} is ready to order!
              </p>
              <a href={`https://wa.me/919999999999?text=Hi Artsy! I'd like to order a custom bouquet:%0AFlowers: ${form.flowers.join(' + ')}%0AColor: ${form.color}%0AWrap: ${form.wrap}%0ASize: ${form.size}%0ARibbon: ${form.ribbon?'Yes':'No'}%0ACard: ${form.card?`Yes - "${form.msg}"`:'No'}%0APrice: ₹${price+(form.ribbon?100:0)+(form.card?50:0)}`}
                target="_blank" rel="noreferrer">
                <button style={{
                  width:'100%',background:'#25D366',border:'none',color:'#fff',
                  padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'15px',fontWeight:700,marginBottom:'10px'
                }}>📱 Order on WhatsApp</button>
              </a>
              <button onClick={()=>setPreview(false)} style={{
                background:'transparent',border:'none',color:'var(--tx3)',cursor:'pointer',fontSize:'13px'
              }}>Close</button>
            </div>
          </div>
        )}
      </div>
      <style>{`@media(max-width:640px){.custom-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

// ── RECOMMENDATIONS PAGE ──────────────────────────────────────────────────
function RecommendationsPage(){
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [result,setResult]=useState(null);

  const questions=[
    {q:"Who are you gifting? 💕",opts:["Partner 💑","Mom 🤍","Friend 👯","Myself 🌸","Colleague 💼"]},
    {q:"What's the occasion? 🎉",opts:["Birthday 🎂","Anniversary 💍","Just Because 🌷","Get Well 🤗","Thank You 🙏"]},
    {q:"What's your budget? 💰",opts:["Under ₹800","₹800–₹1200","₹1200–₹1600","No limit 👑"]},
    {q:"Pick a vibe! ✨",opts:["Romantic 💘","Cheerful 🌈","Elegant 🌿","Wild & Free 🌻"]},
  ];

  const recommend=()=>{
    const picks={
      'Romantic 💘':bouquets[0],'Cheerful 🌈':bouquets[3],'Elegant 🌿':bouquets[5],'Wild & Free 🌻':bouquets[6]
    };
    const vibe=answers[3];
    setResult(picks[vibe]||bouquets[1]);
  };

  const ans=(i,o)=>{
    const newA={...answers,[i]:o};
    setAnswers(newA);
    if(i<questions.length-1)setStep(i+1);
    else recommend();
  };

  return(
    <div style={{minHeight:'100vh',paddingTop:'80px',padding:'80px 2rem 3rem',background:'var(--bg3)'}}>
      <div style={{maxWidth:'600px',margin:'0 auto'}}>
        <h1 className="playfair" style={{textAlign:'center',fontSize:'2.5rem',marginBottom:'0.5rem'}}>
          Find Your <em>Perfect Bouquet</em> 🌸
        </h1>
        <p style={{textAlign:'center',color:'var(--tx2)',marginBottom:'2.5rem'}}>Let Artsy guide you! Answer a few questions 💕</p>

        <div style={{display:'flex',gap:'6px',marginBottom:'2rem',justifyContent:'center'}}>
          {questions.map((_,i)=>(
            <div key={i} style={{
              height:'4px',flex:1,borderRadius:'4px',
              background:i<=step?'var(--ac2)':'var(--cb)',transition:'background 0.3s'
            }}/>
          ))}
        </div>

        {!result?(
          <div className="fade-in" key={step} style={{
            background:'var(--card)',backdropFilter:'blur(16px)',
            border:'1px solid var(--cb)',borderRadius:'24px',padding:'2.5rem',
            textAlign:'center',boxShadow:`0 8px 32px var(--sh)`
          }}>
            <ArtsyCharacter size={80} talking={true}/>
            <h2 className="playfair" style={{fontSize:'1.4rem',margin:'1rem 0',color:'var(--tx)'}}>
              {questions[step].q}
            </h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'1.5rem'}}>
              {questions[step].opts.map(o=>(
                <button key={o} onClick={()=>ans(step,o)} style={{
                  background:'var(--bs)',border:`1px solid var(--cb)`,
                  color:'var(--tx)',padding:'13px 20px',borderRadius:'14px',
                  cursor:'pointer',fontSize:'14px',transition:'all 0.2s',
                  textAlign:'left',fontFamily:'Lato,sans-serif'
                }}>{o}</button>
              ))}
            </div>
          </div>
        ):(
          <div className="pop-in" style={{
            background:'var(--card)',backdropFilter:'blur(16px)',
            border:'1px solid var(--cb)',borderRadius:'24px',padding:'2.5rem',
            textAlign:'center',boxShadow:`0 8px 32px var(--sh)`
          }}>
            <div style={{fontSize:'72px',marginBottom:'16px'}}>{result.emoji}</div>
            <div style={{
              display:'inline-block',background:'var(--bp)',color:'#fff',
              padding:'4px 16px',borderRadius:'12px',fontSize:'12px',fontWeight:700,marginBottom:'12px'
            }}>✨ Perfect Match!</div>
            <h2 className="playfair" style={{fontSize:'1.8rem',marginBottom:'8px'}}>{result.name}</h2>
            <p style={{color:'var(--tx2)',marginBottom:'6px',fontSize:'14px'}}>{result.flowers}</p>
            <p style={{color:'var(--tx3)',fontStyle:'italic',fontSize:'13px',marginBottom:'1.5rem'}}>{result.desc}</p>
            <div style={{fontSize:'28px',fontWeight:700,color:'var(--ac2)',marginBottom:'1.5rem'}}>₹{result.price}</div>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              <button style={{
                background:'var(--bp)',border:'none',color:'#fff',
                padding:'12px 28px',borderRadius:'14px',cursor:'pointer',fontSize:'14px',fontWeight:700
              }}>Add to Cart 🛒</button>
              <button onClick={()=>{setResult(null);setStep(0);setAnswers({});}} style={{
                background:'transparent',border:`1px solid var(--cb)`,color:'var(--tx2)',
                padding:'12px 28px',borderRadius:'14px',cursor:'pointer',fontSize:'14px'
              }}>Try Again 🔄</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────
function AboutPage(){
  return(
    <div style={{minHeight:'100vh',paddingTop:'80px',padding:'80px 2rem 3rem',background:'var(--bg)'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'3rem'}}>
          <ArtsyCharacter size={140} waving={true}/>
          <h1 className="playfair" style={{fontSize:'2.8rem',marginTop:'1rem'}}>
            Meet <em>Artsy</em> 🌸
          </h1>
          <p className="cormorant" style={{fontSize:'1.3rem',color:'var(--tx2)',fontStyle:'italic',marginTop:'8px'}}>
            Your personal florist & bouquet designer
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'2rem'}}>
          {[
            {icon:'🌺',title:'Our Story',text:'Artsy started as a passion project in the lanes of Mancherial, Telangana — turning wild blooms into wearable art. Every bouquet is a hand-picked, hand-arranged masterpiece.'},
            {icon:'🎨',title:'Our Philosophy',text:'We believe flowers speak what words cannot. Our arrangements are created with intention — matching the energy of the occasion and the personality of the giver.'},
            {icon:'💐',title:'What We Do',text:'From romantic roses to wildflower meadows, we craft bouquets for every emotion. Custom orders, pre-designed collections, and same-day delivery available.'},
            {icon:'🏡',title:'Find Us',text:'Located in Suryanagar, Mancherial, Telangana. Visit our studio or order online. We deliver with love, anywhere in the region.'},
          ].map(c=>(
            <div key={c.title} className="fade-in" style={{
              background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
              borderRadius:'20px',padding:'1.5rem',boxShadow:`0 4px 20px var(--sh)`
            }}>
              <div style={{fontSize:'36px',marginBottom:'10px'}}>{c.icon}</div>
              <h3 className="playfair" style={{fontSize:'1.2rem',marginBottom:'8px'}}>{c.title}</h3>
              <p style={{color:'var(--tx2)',fontSize:'14px',lineHeight:1.7}}>{c.text}</p>
            </div>
          ))}
        </div>

        <div style={{
          background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
          borderRadius:'24px',padding:'2rem',textAlign:'center'
        }}>
          <h2 className="playfair" style={{fontSize:'1.8rem',marginBottom:'1rem'}}>Our Signature Touch ✨</h2>
          <div style={{display:'flex',justifyContent:'center',gap:'2rem',flexWrap:'wrap'}}>
            {['200+ Bouquets Crafted','100% Fresh Flowers','Same-Day Delivery','Custom Orders Welcome'].map(s=>(
              <div key={s} style={{color:'var(--tx2)',fontSize:'14px',textAlign:'center'}}>
                <div style={{fontSize:'24px',fontWeight:700,color:'var(--ac2)'}}>✓</div>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────────
function ContactPage(){
  const [form,setForm]=useState({name:'',email:'',msg:''});
  const [sent,setSent]=useState(false);
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));

  return(
    <div style={{minHeight:'100vh',paddingTop:'80px',padding:'80px 2rem 3rem',background:'var(--bg2)'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 className="playfair" style={{textAlign:'center',fontSize:'2.5rem',marginBottom:'0.5rem'}}>
          Get in <em>Touch</em> 🌸
        </h1>
        <p style={{textAlign:'center',color:'var(--tx2)',marginBottom:'2.5rem'}}>We'd love to hear from you 💕</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            {[
              {icon:'📱',label:'WhatsApp',val:'+919999999999',href:'https://wa.me/919999999999',color:'#25D366'},
              {icon:'📞',label:'Call Us',val:'+919999999999',href:'tel:+919999999999',color:'var(--ac2)'},
              {icon:'✉️',label:'Email',val:'artsyspalette.petals@gmail.com',href:'mailto:artsyspalette.petals@gmail.com',color:'var(--ac)'},
              {icon:'📍',label:'Address',val:'Suryanagar, Mancherial\nTelangana, India',href:'#',color:'var(--ac3)'},
            ].map(c=>(
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
                background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
                borderRadius:'16px',padding:'1.25rem',display:'flex',gap:'14px',alignItems:'flex-start',
                boxShadow:`0 4px 16px var(--sh)`,transition:'transform 0.2s',
                textDecoration:'none',color:'inherit'
              }}>
                <span style={{fontSize:'28px'}}>{c.icon}</span>
                <div>
                  <div style={{fontWeight:700,color:c.color,marginBottom:'4px'}}>{c.label}</div>
                  <div style={{color:'var(--tx2)',fontSize:'14px',whiteSpace:'pre-line'}}>{c.val}</div>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div style={{
              background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
              borderRadius:'16px',height:'160px',display:'flex',flexDirection:'column',
              alignItems:'center',justifyContent:'center',gap:'8px'
            }}>
              <div style={{fontSize:'40px'}}>🗺️</div>
              <div style={{color:'var(--tx3)',fontSize:'13px'}}>Suryanagar, Mancherial, Telangana</div>
              <a href="https://maps.google.com/?q=Mancherial,Telangana,India" target="_blank" rel="noreferrer">
                <button style={{
                  background:'var(--bp)',border:'none',color:'#fff',
                  padding:'7px 18px',borderRadius:'12px',cursor:'pointer',fontSize:'12px'
                }}>Open in Maps 📍</button>
              </a>
            </div>
          </div>

          <div style={{
            background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
            borderRadius:'20px',padding:'2rem',boxShadow:`0 8px 32px var(--sh)`
          }}>
            <h3 className="playfair" style={{fontSize:'1.4rem',marginBottom:'1.5rem'}}>Send a Message 💌</h3>
            {sent?(
              <div style={{textAlign:'center',padding:'2rem 0'}}>
                <div style={{fontSize:'48px',marginBottom:'12px'}}>🌸</div>
                <h3 style={{color:'var(--ac2)',marginBottom:'8px'}}>Message Sent!</h3>
                <p style={{color:'var(--tx2)',fontSize:'14px'}}>Artsy will get back to you soon 💕</p>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {[['name','Your Name 🌷','text'],['email','Email Address ✉️','email']].map(([k,ph,t])=>(
                  <input key={k} type={t} placeholder={ph} value={form[k]} onChange={e=>upd(k,e.target.value)}
                    style={{
                      background:'var(--ib)',border:`1px solid var(--ibr)`,borderRadius:'12px',
                      padding:'12px 16px',color:'var(--tx)',fontSize:'14px',outline:'none',
                      transition:'border-color 0.2s'
                    }}/>
                ))}
                <textarea placeholder="Your message 💬" value={form.msg} onChange={e=>upd('msg',e.target.value)}
                  rows={4} style={{
                    background:'var(--ib)',border:`1px solid var(--ibr)`,borderRadius:'12px',
                    padding:'12px 16px',color:'var(--tx)',fontSize:'14px',outline:'none',
                    resize:'vertical',fontFamily:'Lato,sans-serif'
                  }}/>
                <a href={`mailto:artsyspalette.petals@gmail.com?subject=Message from ${form.name}&body=${form.msg}%0A%0AFrom: ${form.name} (${form.email})`} 
   target="_blank" rel="noreferrer" style={{display:'block'}}>
  <button onClick={()=>setSent(true)} style={{
    width:'100%',background:'var(--bp)',border:'none',color:'#fff',
    padding:'13px',borderRadius:'12px',cursor:'pointer',fontSize:'14px',fontWeight:700,marginBottom:'12px'
  }}>Send Message 🌸</button>
</a>
                <a href={`https://wa.me/919999999999?text=Hi Artsy! ${form.msg}`} target="_blank" rel="noreferrer">
                  <button style={{
                    width:'100%',background:'#25D366',border:'none',color:'#fff',
                    padding:'13px',borderRadius:'12px',cursor:'pointer',fontSize:'14px',fontWeight:700
                  }}>WhatsApp Instead 📱</button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────
function LoginPage({setUser,setPage}){
  const [mode,setMode]=useState('login');
  const [form,setForm]=useState({name:'',email:'',password:''});
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));

  const submit=()=>{
    if(form.email&&form.password){
      setUser({name:form.name||form.email.split('@')[0],email:form.email});
      setPage('dashboard');
    }
  };

  return(
    <div style={{
      minHeight:'100vh',paddingTop:'64px',display:'flex',alignItems:'center',
      justifyContent:'center',padding:'80px 1rem 2rem',
      background:'var(--hero)',position:'relative',overflow:'hidden'
    }}>
      <PetalRain/>
      <div className="pop-in" style={{
        background:'var(--card)',backdropFilter:'blur(20px)',
        border:'1px solid var(--cb)',borderRadius:'28px',
        padding:'2.5rem',width:'100%',maxWidth:'400px',
        boxShadow:`0 20px 60px var(--sh)`,position:'relative',zIndex:1,textAlign:'center'
      }}>
        <ArtsyCharacter size={80} waving={true}/>
        <h2 className="playfair" style={{fontSize:'1.8rem',margin:'1rem 0 0.25rem'}}>
          {mode==='login'?'Welcome Back! 🌸':'Join Us! 🌺'}
        </h2>
        <p style={{color:'var(--tx2)',fontSize:'13px',marginBottom:'1.5rem'}}>
          {mode==='login'?'Sign in to your floral world 💕':'Create your account 🎨'}
        </p>

        <div style={{display:'flex',gap:'0',marginBottom:'1.5rem',border:`1px solid var(--cb)`,borderRadius:'12px',overflow:'hidden'}}>
          {['login','signup'].map(m=>(
            <button key={m} onClick={()=>setMode(m)} style={{
              flex:1,background:mode===m?'var(--bp)':'transparent',
              border:'none',color:mode===m?'#fff':'var(--tx2)',
              padding:'10px',cursor:'pointer',fontSize:'13px',fontWeight:700,transition:'all 0.2s'
            }}>{m==='login'?'Login':'Sign Up'}</button>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'1.5rem'}}>
          {mode==='signup'&&(
            <input type="text" placeholder="Your Name 🌷" value={form.name} onChange={e=>upd('name',e.target.value)}
              style={{background:'var(--ib)',border:`1px solid var(--ibr)`,borderRadius:'12px',padding:'12px 16px',color:'var(--tx)',fontSize:'14px',outline:'none'}}/>
          )}
          <input type="email" placeholder="Email Address ✉️" value={form.email} onChange={e=>upd('email',e.target.value)}
            style={{background:'var(--ib)',border:`1px solid var(--ibr)`,borderRadius:'12px',padding:'12px 16px',color:'var(--tx)',fontSize:'14px',outline:'none'}}/>
          <input type="password" placeholder="Password 🔒" value={form.password} onChange={e=>upd('password',e.target.value)}
            style={{background:'var(--ib)',border:`1px solid var(--ibr)`,borderRadius:'12px',padding:'12px 16px',color:'var(--tx)',fontSize:'14px',outline:'none'}}/>
        </div>

        <button onClick={submit} style={{
          width:'100%',background:'var(--bp)',border:'none',color:'#fff',
          padding:'13px',borderRadius:'14px',cursor:'pointer',fontSize:'15px',fontWeight:700,marginBottom:'12px'
        }}>{mode==='login'?'Sign In 🌸':'Create Account 🌺'}</button>

        <div style={{color:'var(--tx3)',fontSize:'12px',marginBottom:'12px'}}>— or continue with —</div>

        <button style={{
          width:'100%',background:'var(--bs)',border:`1px solid var(--cb)`,color:'var(--tx)',
          padding:'11px',borderRadius:'14px',cursor:'pointer',fontSize:'13px',fontWeight:600
        }}>🔵 Continue with Google</button>

        <p style={{color:'var(--tx3)',fontSize:'12px',marginTop:'1rem'}}>
          {mode==='login'?'No account? ':'Have an account? '}
          <span onClick={()=>setMode(mode==='login'?'signup':'login')} style={{color:'var(--ac2)',cursor:'pointer',fontWeight:700}}>
            {mode==='login'?'Sign Up':'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

// ── DASHBOARD PAGE ────────────────────────────────────────────────────────
function DashboardPage({user,setPage}){
  const orders=[
    {id:'#ORD001',item:'Romantic Roses',status:'Delivered',date:'Mar 15',price:1299},
    {id:'#ORD002',item:'Lavender Dream',status:'Processing',date:'Mar 17',price:1099},
  ];
  const wishlist=[bouquets[4],bouquets[5]];

  return(
    <div style={{minHeight:'100vh',paddingTop:'80px',padding:'80px 2rem 3rem',background:'var(--bg)'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        {/* Header */}
        <div style={{
          background:'var(--card)',backdropFilter:'blur(16px)',border:'1px solid var(--cb)',
          borderRadius:'24px',padding:'2rem',marginBottom:'2rem',
          display:'flex',gap:'1.5rem',alignItems:'center',flexWrap:'wrap'
        }}>
          <div style={{
            width:'72px',height:'72px',borderRadius:'50%',
            background:'var(--bp)',display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:'28px',fontWeight:700,color:'#fff',flexShrink:0
          }}>{user?.name?.[0]?.toUpperCase()||'A'}</div>
          <div>
            <h2 className="playfair" style={{fontSize:'1.6rem'}}>Hey, {user?.name}! 🌸</h2>
            <p style={{color:'var(--tx2)',fontSize:'14px'}}>{user?.email}</p>
          </div>
          <div style={{marginLeft:'auto',display:'flex',gap:'10px'}}>
            <button onClick={()=>setPage('shop')} style={{
              background:'var(--bp)',border:'none',color:'#fff',
              padding:'10px 20px',borderRadius:'12px',cursor:'pointer',fontSize:'13px',fontWeight:700
            }}>Shop Now 🌷</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'2rem'}}>
          {[['🛒','Orders','2'],['💝','Wishlist','2'],['🌸','Saved','1']].map(([ic,l,v])=>(
            <div key={l} style={{
              background:'var(--dc)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
              borderRadius:'16px',padding:'1.25rem',textAlign:'center'
            }}>
              <div style={{fontSize:'32px',marginBottom:'8px'}}>{ic}</div>
              <div style={{fontSize:'22px',fontWeight:700,color:'var(--ac2)'}}>{v}</div>
              <div style={{fontSize:'12px',color:'var(--tx3)'}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div style={{
          background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
          borderRadius:'20px',padding:'1.5rem',marginBottom:'1.5rem'
        }}>
          <h3 className="playfair" style={{fontSize:'1.3rem',marginBottom:'1rem'}}>Order History 🛍️</h3>
          {orders.map(o=>(
            <div key={o.id} style={{
              display:'flex',alignItems:'center',justifyContent:'space-between',
              padding:'12px',borderRadius:'12px',background:'var(--bs)',marginBottom:'8px',flexWrap:'wrap',gap:'8px'
            }}>
              <div>
                <div style={{fontWeight:700,fontSize:'14px'}}>{o.item}</div>
                <div style={{color:'var(--tx3)',fontSize:'12px'}}>{o.id} · {o.date}</div>
              </div>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <span style={{
                  background:o.status==='Delivered'?'#E1F5EE':'#FAEEDA',
                  color:o.status==='Delivered'?'#085041':'#854F0B',
                  padding:'4px 12px',borderRadius:'12px',fontSize:'12px',fontWeight:700
                }}>{o.status}</span>
                <span style={{fontWeight:700,color:'var(--ac2)',fontSize:'15px'}}>₹{o.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist */}
        <div style={{
          background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
          borderRadius:'20px',padding:'1.5rem'
        }}>
          <h3 className="playfair" style={{fontSize:'1.3rem',marginBottom:'1rem'}}>Wishlist 💝</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'1rem'}}>
            {wishlist.map(b=>(
              <div key={b.id} style={{
                background:'var(--bs)',border:`1px solid var(--cb)`,borderRadius:'16px',
                padding:'1rem',textAlign:'center'
              }}>
                <div style={{fontSize:'40px',marginBottom:'8px'}}>{b.emoji}</div>
                <div style={{fontWeight:700,fontSize:'14px',marginBottom:'4px'}}>{b.name}</div>
                <div style={{color:'var(--ac2)',fontWeight:700,fontSize:'16px',marginBottom:'10px'}}>₹{b.price}</div>
                <button style={{
                  background:'var(--bp)',border:'none',color:'#fff',
                  padding:'7px 16px',borderRadius:'10px',cursor:'pointer',fontSize:'12px',fontWeight:700
                }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:480px){div[style*="grid-template-columns: repeat(3,1fr)"]{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────
function App(){
  const [dark,setDark]=useState(false);
  const [page,setPage]=useState('home');
  const [user,setUser]=useState(null);

  useEffect(()=>{
    injectStyles(dark?themes.night:themes.day);
    document.body.style.background='var(--bg)';
    document.body.style.color='var(--tx)';
  },[dark]);

  const pages={
    home:<HomePage setPage={setPage}/>,
    shop:<ShopPage/>,
    customize:<CustomizePage/>,
    recommendations:<RecommendationsPage/>,
    about:<AboutPage/>,
    contact:<ContactPage/>,
    login:<LoginPage setUser={setUser} setPage={setPage}/>,
    dashboard:user?<DashboardPage user={user} setPage={setPage}/>:<LoginPage setUser={setUser} setPage={setPage}/>,
  };

  return(
    <div style={{minHeight:'100vh',transition:'background 0.5s,color 0.5s'}}>
      <Navbar page={page} setPage={setPage} dark={dark} setDark={setDark} user={user} setUser={setUser}/>
      <main>{pages[page]||pages.home}</main>
      <ArtsynWidget/>

      {/* Footer */}
      <footer style={{
        background:'var(--card)',backdropFilter:'blur(12px)',border:'1px solid var(--cb)',
        padding:'2.5rem 2rem',textAlign:'center',marginTop:'0'
      }}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'12px'}}>
          <span style={{fontSize:'24px'}}>🌸</span>
          <span className="playfair" style={{fontSize:'1.2rem',color:'var(--ac2)',fontWeight:700}}>Artsy's Palette & Petals</span>
        </div>
        <p style={{color:'var(--tx3)',fontSize:'13px',marginBottom:'8px'}}>
          Suryanagar, Mancherial, Telangana, India
        </p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',marginBottom:'12px'}}>
          {['Home','Shop','Customize','Contact'].map(l=>(
            <span key={l} onClick={()=>setPage(l.toLowerCase())} style={{
              color:'var(--tx2)',fontSize:'13px',cursor:'pointer',
              borderBottom:'1px solid transparent',transition:'border-color 0.2s'
            }}>{l}</span>
          ))}
        </div>
        <p style={{color:'var(--tx3)',fontSize:'12px'}}>
          Made with 🌸 by Artsy · © 2025 All rights reserved
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
