import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DottedSurface } from './components/DottedSurface';
import { GlowCard } from './components/GlowCard';
import { ParallaxVehicleImage } from './components/ParallaxVehicleImage';
import { AnimatedCounter } from './components/AnimatedCounter';
import { 
  MapPin, Calendar, Search, Menu, X, ArrowRight, ShieldCheck, 
  Banknote, Headphones, Zap, Heart, Settings, Fuel, 
  CheckCircle2, Wrench, Navigation2, Star, Phone, Mail,
  ChevronLeft, ChevronRight, Clock, ArrowUp, Send, ChevronDown, HelpCircle
} from 'lucide-react';

const VEICOLI = [
  {
    id: 1,
    nome: "Fiat Panda",
    prezzo: "150",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Manuale",
    alimentazione: "Benzina",
    img: "/images/fiat-panda.webp",
    fallback: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    nome: "Mercedes Classe B",
    prezzo: "300",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Automatica",
    alimentazione: "Diesel",
    img: "/images/mercedes-b.png",
    fallback: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    nome: "Mercedes CLA",
    prezzo: "120",
    periodo: "Al giorno",
    tipo: "Auto",
    trasmissione: "Automatica",
    alimentazione: "Diesel/Benzina",
    img: "/images/cla.png",
    fallback: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    nome: "Fiat 500",
    prezzo: "150",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Manuale",
    alimentazione: "Benzina",
    img: "/images/fiat-500.webp",
    fallback: "https://images.unsplash.com/photo-1619767886558-efdf259cde1a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    nome: "Smart ForTwo 451",
    prezzo: "110",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Automatica",
    alimentazione: "Benzina",
    img: "/images/smart-451.webp",
    fallback: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    nome: "Smart ForTwo 453",
    prezzo: "130",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Automatica",
    alimentazione: "Benzina",
    img: "/images/smart-453.png",
    fallback: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    nome: "Lancia Ypsilon",
    prezzo: "150",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Manuale",
    alimentazione: "Benzina",
    img: "/images/LANCIA-Ypsilon.jpg",
    fallback: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    nome: "Fiat 500X",
    prezzo: "240",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Manuale",
    alimentazione: "Diesel",
    img: "/images/500X.webp",
    fallback: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 13,
    nome: "Fiat 500L",
    prezzo: "240",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Manuale",
    alimentazione: "Diesel/Benzina",
    img: "/images/500L.webp",
    fallback: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    nome: "Fiat Doblò",
    prezzo: "160",
    periodo: "3 giorni",
    tipo: "Furgoni",
    trasmissione: "Manuale",
    alimentazione: "Diesel",
    img: "/images/doblo.jpg",
    fallback: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    nome: "Doblò 5 Posti",
    prezzo: "240",
    periodo: "3 giorni",
    tipo: "Auto",
    trasmissione: "Manuale",
    alimentazione: "Diesel",
    img: "/images/doblo-5-posti.png",
    fallback: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    nome: "Ducato Maxi",
    prezzo: "90",
    periodo: "Al giorno",
    tipo: "Furgoni",
    trasmissione: "Manuale",
    alimentazione: "Diesel",
    img: "/images/fiat-ducato-maxi.png",
    fallback: "https://images.unsplash.com/photo-1595156645601-525d6b4122d2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    nome: "Peugeot Boxer Sponda",
    prezzo: "120",
    periodo: "Al giorno",
    tipo: "Furgoni",
    trasmissione: "Manuale",
    alimentazione: "Diesel",
    img: "/images/peugeot-boxer-sponda.jpg",
    fallback: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800"
  }
];

const RECENSIONI = [
  {
    id: 1,
    autore: "Marco G.",
    ruolo: "Cliente Privato",
    voto: 5,
    testo: "Ottima esperienza con Quattro Effe! Ho noleggiato una Fiat Panda per 4 giorni.\nAuto pulitissima e ottimi prezzi.\nLa possibilità di noleggiare senza carta di credito è una vera salvezza a Roma! Personale gentilissimo.",
    data: "1 settimana fa",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: 2,
    autore: "Alessia Moretti",
    ruolo: "Cliente Business",
    voto: 5,
    testo: "Servizio eccellente e trasparenza totale.\nAbbiamo preso un furgone per un trasloco nel weekend, tariffe chiare senza sorprese o costi nascosti.\nMolto consigliato per la serietà e cordialità dello staff!",
    data: "2 settimane fa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: 3,
    autore: "Francesco Tassi",
    ruolo: "Cliente Privato",
    voto: 5,
    testo: "Cortesia, puntualità e professionalità.\nHo preso una Lancia Ypsilon per una settimana: veicolo perfetto, igienizzato e con consumi bassissimi.\nComodissimo anche ricevere assistenza immediata via WhatsApp.",
    data: "1 mese fa",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: 4,
    autore: "Giulia Rinaldi",
    ruolo: "Cliente Privato",
    voto: 5,
    testo: "La sede a Fontana Candida è facilissima da raggiungere ed ha un ampio parcheggio.\nPersonale amichevole, prezzi super competitivi e parco auto nuovissimo.\nDiventerà sicuramente il mio noleggio di fiducia!",
    data: "1 mese fa",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: 5,
    autore: "Roberto M.",
    ruolo: "Ditta Individuale / Privato",
    voto: 5,
    testo: "Noleggiato furgone 9 posti per un viaggio di famiglia.\nComfort straordinario, pulizia impeccabile ed assistenza impeccabile.\nTutto fantastico, dal preventivo veloce al check-out rapido.",
    data: "2 mesi fa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: 6,
    autore: "Elena V.",
    ruolo: "Cliente Privato",
    voto: 5,
    testo: "Persona super disponibile e alla mano. Ho noleggiato una Smart per girare nel centro di Roma ed è andato tutto benissimo.\nConsigliatissimi anche per chi non possiede una carta di credito!",
    data: "3 settimane fa",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: 7,
    autore: "Giuseppe Russo",
    ruolo: "Freelance",
    voto: 5,
    testo: "Ottimo rapporto qualità-prezzo. Furgone in perfette condizioni, utilissimo per il mio lavoro.\nServizio rapido e preciso senza inutile burocrazia.",
    data: "1 mese fa",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: 8,
    autore: "Sara Nardi",
    ruolo: "Cliente Privato",
    voto: 5,
    testo: "Molto gentili e cordiali, mi hanno spiegato tutto nei minimi dettagli. Auto curatissima e pulita.\nLi ricontatterò sicuramente al mio prossimo soggiorno a Roma!",
    data: "2 mesi fa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120"
  }
];

const FAQ_ITEMS = [
  {
    id: 1,
    domanda: "Quali documenti sono necessari per noleggiare un veicolo a Roma con Quattro Effe?",
    risposta: "Al momento del ritiro del veicolo, dovrai presentare i seguenti documenti in corso di validità:\n\n• Carta d'Identità\n• Codice Fiscale\n• Patente di guida valida (di tipo B o superiore)."
  },
  {
    id: 2,
    domanda: "Si può noleggiare anche senza carta di credito? Come funziona il deposito?",
    risposta: "Sì, offriamo la possibilità speciale di noleggiare auto e furgoni anche senza carta di credito! Richiediamo un deposito cauzionale di 500 € in contanti per la maggior parte delle auto (l'importo preciso può variare o oscillare a seconda della categoria e del tipo di veicolo scelto). Il deposito ti verrà restituito al termine del noleggio dopo la verifica dello stato del mezzo."
  },
  {
    id: 3,
    domanda: "Qual è lo stato del veicolo alla consegna e come deve essere riconsegnato?",
    risposta: "Tutti i nostri veicoli vengono igienizzati accuratamente ed interamente puliti prima dello scambio, e vengono forniti con il serbatoio pieno di carburante. Il locatario riceve l'auto o il furgone pulito e con il pieno, e dovrà restituirlo nelle medesime ottime condizioni (nello stesso stato di pulizia e con il pieno di carburante effettuato)."
  },
  {
    id: 4,
    domanda: "Qual è il chilometraggio giornaliero incluso nel noleggio?",
    risposta: "Tutte le nostre tariffe standard includono un chilometraggio di 130 km al giorno. Questa soglia copre ottimamente la maggior parte delle esigenze degli automobilisti a Roma e nel Lazio. Per pacchetti a chilometraggio differente, ti invitiamo a contattarci direttamente per concordare una tariffa su misura."
  },
  {
    id: 5,
    domanda: "La vostra agenzia a Roma applica costi o tariffe nascoste?",
    risposta: "Assolutamente no. La trasparenza e la professionalità sono i pilastri fondanti di Quattro Effe s.r.l.. I costi, la cauzione in contanti e le condizioni generali vengono concordati preventivamente in modo chiaro. Non ci sarà mai alcuna sorpresa spiacevole al ritiro o al check-out."
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const [currentReview, setCurrentReview] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFooterDoc, setActiveFooterDoc] = useState<'condizioni' | 'privacy' | null>(null);
  const [showWhatsappPopup, setShowWhatsappPopup] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const footerDocRef = useRef<HTMLDivElement>(null);

  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    try {
      const saved = localStorage.getItem("quattroeffe_cookie_consent");
      return saved === null;
    } catch {
      return true;
    }
  });

  const handleAcceptCookies = (accepted: boolean) => {
    try {
      localStorage.setItem("quattroeffe_cookie_consent", accepted ? "accepted" : "declined");
    } catch (e) {
      console.error(e);
    }
    setShowCookieConsent(false);
  };

  const handleToggleFooterDoc = (doc: 'condizioni' | 'privacy') => {
    if (activeFooterDoc === doc) {
      setActiveFooterDoc(null);
    } else {
      setActiveFooterDoc(doc);
      setTimeout(() => {
        footerDocRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleScrollTo = (id: string, category?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    veicolo: '',
    note: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [mailPreviewUrl, setMailPreviewUrl] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setMailPreviewUrl("");
    
    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setFormSubmitted(true);
        if (data.previewUrl) {
          setMailPreviewUrl(data.previewUrl);
        }
      } else {
        setFormError(data.error || "Impossibile inviare la richiesta di preventivo in questo momento. Riprova più tardi.");
      }
    } catch (err: any) {
      console.error("Error submitting quote:", err);
      setFormError("Errore di connessione. Controlla la tua rete o riprova più tardi.");
    } finally {
      setFormLoading(false);
    }
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % RECENSIONI.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + RECENSIONI.length) % RECENSIONI.length);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const categories = ["Tutti", "Auto", "Furgoni"];
  
  const filteredVehicles = activeCategory === "Tutti" 
    ? VEICOLI 
    : VEICOLI.filter(v => v.tipo === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white via-15% to-slate-50/50 font-body text-brand-dark overflow-x-hidden relative">
      <DottedSurface />
      
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-3">
          <img 
            src="/images/logo.png" 
            alt="Quattro Effe s.r.l. Logo" 
            className="h-12 xs:h-16 w-auto object-contain cursor-pointer" 
            onClick={() => handleScrollTo('veicoli', 'Tutti')}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} 
          />
          <div className="hidden text-2xl font-bold font-sans tracking-tight cursor-pointer" onClick={() => handleScrollTo('veicoli', 'Tutti')}>
            Quattro <span className="text-brand-orange">Effe</span>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-gray-750">
          <button 
            onClick={() => handleScrollTo('veicoli', 'Tutti')} 
            className={`transition-colors cursor-pointer ${activeCategory === 'Tutti' ? 'text-brand-orange' : 'text-gray-600 hover:text-brand-orange'}`}
          >
            Noleggio
          </button>
          <button 
            onClick={() => handleScrollTo('veicoli', 'Auto')} 
            className={`transition-colors cursor-pointer ${activeCategory === 'Auto' ? 'text-brand-orange' : 'text-gray-600 hover:text-brand-orange'}`}
          >
            Veicoli
          </button>
          <button 
            onClick={() => handleScrollTo('veicoli', 'Furgoni')} 
            className={`transition-colors cursor-pointer ${activeCategory === 'Furgoni' ? 'text-brand-orange' : 'text-gray-600 hover:text-brand-orange'}`}
          >
            Furgoni
          </button>
          <button 
            onClick={() => handleScrollTo('chi-siamo')} 
            className="text-gray-600 hover:text-brand-orange transition-colors cursor-pointer"
          >
            Contatti
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-5">
          <a href="tel:3515964085" className="font-semibold text-gray-700 hover:text-brand-orange transition-colors flex items-center gap-1.5 focus:outline-none">
            <Phone size={15} />
            <span>Chiama Ora</span>
          </a>
          <button 
            onClick={() => handleScrollTo('preventivo')} 
            className="px-6 py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-hover transition-colors shadow-lg shadow-brand-blue/30 cursor-pointer active:scale-95"
          >
            Prenota
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-1.5 rounded-lg text-brand-dark hover:bg-gray-100 transition-colors focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop click barrier and fade support */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            
            {/* Drawer menu card */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="fixed top-[4.5rem] left-0 right-0 bg-white border-b border-gray-100/90 z-45 px-6 py-6 pb-8 shadow-2xl flex flex-col gap-6 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Naviga</span>
                
                <button 
                  onClick={() => handleScrollTo('veicoli', 'Tutti')} 
                  className="flex items-center justify-between text-left font-bold text-base text-brand-dark hover:text-brand-orange py-1"
                >
                  <span>Noleggio</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
                <button 
                  onClick={() => handleScrollTo('veicoli', 'Auto')} 
                  className="flex items-center justify-between text-left font-bold text-base text-brand-dark hover:text-brand-orange py-1"
                >
                  <span>Veicoli (Auto)</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
                <button 
                  onClick={() => handleScrollTo('veicoli', 'Furgoni')} 
                  className="flex items-center justify-between text-left font-bold text-base text-brand-dark hover:text-brand-orange py-1"
                >
                  <span>Furgoni Merci</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
                <button 
                  onClick={() => handleScrollTo('chi-siamo')} 
                  className="flex items-center justify-between text-left font-bold text-base text-brand-dark hover:text-brand-orange py-1"
                >
                  <span>Contatti &amp; Chi Siamo</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              </div>
              
              <div className="border-t border-gray-100/80 pt-5 flex flex-col gap-3">
                <a 
                  href="tel:3515964085" 
                  className="flex items-center justify-center gap-2 font-bold text-sm text-white bg-black hover:bg-gray-800 py-3.5 rounded-xl transition-colors shadow-sm"
                >
                  <Phone size={15} />
                  <span>Chiama Cellulare</span>
                </a>
                <a 
                  href="tel:0694847758" 
                  className="flex items-center justify-center gap-2 font-bold text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 py-3.5 rounded-xl transition-colors border border-gray-200"
                >
                  <span>Chiama Ufficio</span>
                </a>
                <button 
                  onClick={() => handleScrollTo('preventivo')} 
                  className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 cursor-pointer"
                >
                  Prenota / Preventivo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative container mx-auto px-6 pt-4 pb-12 lg:pt-8 lg:pb-16"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          <div className="w-full lg:w-[58%] z-10 pr-0 lg:pr-8 xl:pr-12">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-sans font-bold leading-[1.15] mb-6 tracking-tight">
              <span className="block sm:whitespace-nowrap mb-2 md:mb-4">Hai bisogno di un veicolo...</span>
              <span className="block sm:whitespace-nowrap">Non di una <span className="text-brand-orange">carta di credito.</span></span>
            </h1>
            <p className="text-brand-gray text-base xs:text-lg mb-8 max-w-xl leading-relaxed">
              Noleggia auto e furgoni a Roma in modo semplice, veloce e senza complicazioni.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a href="tel:3515964085" className="flex items-center justify-center px-6 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto shadow-md">
                <Phone className="w-5 h-5 mr-2" />
                <span>351 5964085</span>
              </a>
              <a href="tel:0694847758" className="flex items-center justify-center px-6 py-4 border border-gray-200 bg-white/40 rounded-xl font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors w-full sm:w-auto shadow-sm">
                069 4847758
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-[42%] relative mt-10 lg:mt-0 overflow-visible flex items-center justify-center">
            {/* Animated Fiat Panda shooting in from left to right with spring suspension effect */}
            <motion.div
              initial={{ x: "-120vw", opacity: 0, rotate: -4 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 42, 
                damping: 12.5, 
                mass: 1.15,
                delay: 0.3
              }}
              className="w-full overflow-visible"
            >
              <img 
                src="/images/fiat-panda-hero.png" 
                alt="Fiat Panda" 
                className="w-full max-h-[380px] lg:max-h-[420px] object-contain transform lg:scale-105 pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                onError={(e) => {
                  e.currentTarget.src = "/images/fiat-panda.webp";
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Brands Logos */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="pt-10 pb-8 overflow-hidden relative w-full bg-linear-to-r from-transparent via-gray-50/50 to-transparent"
      >
        {/* Subtle gradient overlay to fade brands at sides */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-full select-none overflow-hidden">
          <div className="animate-marquee flex gap-16 lg:gap-24 items-center justify-start py-2 whitespace-nowrap text-gray-400 font-sans font-bold tracking-widest text-lg">
            {/* First group */}
            <span className="hover:text-brand-orange transition-colors cursor-default">FIAT</span>
            <span className="italic hover:text-brand-orange transition-colors cursor-default">MERCEDES-BENZ</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">SMART</span>
            <span className="hover:text-brand-orange transition-colors cursor-default font-serif italic text-xl">Lancia</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">PEUGEOT</span>
            <span className="hover:text-brand-orange transition-colors cursor-default text-base font-semibold">RENAULT</span>
            <span className="hover:text-brand-orange transition-colors cursor-default italic">CITROËN</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">TOYOTA</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">FORD</span>
            
            {/* Duplicate group for seamless infinite looping */}
            <span className="hover:text-brand-orange transition-colors cursor-default">FIAT</span>
            <span className="italic hover:text-brand-orange transition-colors cursor-default">MERCEDES-BENZ</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">SMART</span>
            <span className="hover:text-brand-orange transition-colors cursor-default font-serif italic text-xl">Lancia</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">PEUGEOT</span>
            <span className="hover:text-brand-orange transition-colors cursor-default text-base font-semibold">RENAULT</span>
            <span className="hover:text-brand-orange transition-colors cursor-default italic">CITROËN</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">TOYOTA</span>
            <span className="hover:text-brand-orange transition-colors cursor-default">FORD</span>
          </div>
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-10 md:py-12 bg-slate-50/40 backdrop-blur-sm border-y border-gray-100/60 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h4 className="text-brand-orange font-semibold tracking-wider text-sm uppercase mb-3">COME FUNZIONA</h4>
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-12">Noleggio in 3 semplici passi</h2>
        </motion.div>
        
        <div className="container mx-auto px-6 max-w-5xl relative">
          {/* Connecting dashed line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-300 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-20 h-20 bg-brand-orange-light rounded-2xl flex items-center justify-center mb-6 shadow-inner text-brand-orange">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold font-sans text-xl mb-3">Vieni in sede</h3>
              <p className="text-gray-500 leading-relaxed">Siamo in Via di fontana candida 47, Roma.<br />Scegli il veicolo più adatto alle tue esigenze.</p>
            </div>

            <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl transform md:-translate-y-4">
              <div className="w-20 h-20 bg-brand-orange rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-orange/30 text-white">
                <Calendar size={32} />
              </div>
              <h3 className="font-bold font-sans text-xl mb-3">Date Flessibili</h3>
              <p className="text-gray-500 leading-relaxed">Scegli per 3 giorni, una settimana o un mese.<br />Prezzi chiari e convenienti per ogni durata.</p>
            </div>

            <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-20 h-20 bg-brand-orange-light rounded-2xl flex items-center justify-center mb-6 shadow-inner text-brand-orange">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-bold font-sans text-xl mb-3">Ritira e parti</h3>
              <p className="text-gray-500 leading-relaxed">Noleggiamo auto e furgoni anche Senza Carta di Credito.<br />Iter semplice e veloce.</p>
            </div>
          </div>
        </div>
      </motion.section>



      {/* Top Deals - Car Cards */}
      <motion.section 
        id="veicoli"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-10 md:py-12 bg-slate-50/40 backdrop-blur-sm border-y border-gray-100/60"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h4 className="text-brand-orange font-semibold tracking-wider text-sm uppercase mb-3">LE NOSTRE AUTO</h4>
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8">Esplora e scegli il tuo veicolo</h2>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeCategory === cat 
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid / Scroll */}
          <div className="relative px-0 sm:px-12">
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto gap-5 md:gap-8 text-left no-scrollbar snap-x snap-mandatory scroll-smooth pb-8 px-4 sm:px-0"
            >
              {filteredVehicles.map((veicolo) => (
                <GlowCard 
                  key={veicolo.id} 
                  glowColor="orange"
                  customSize={true}
                  className="group w-[280px] xs:w-[300px] shrink-0 snap-start bg-white/90 border border-gray-100 hover:shadow-xl transition-shadow flex flex-col"
                >
                  <ParallaxVehicleImage
                    src={veicolo.img}
                    alt={veicolo.nome}
                    fallback={veicolo.fallback}
                  >
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-brand-orange transition-colors shadow-sm z-10">
                      <Heart size={18} />
                    </button>
                  </ParallaxVehicleImage>
                  
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{veicolo.tipo}</span>
                  </div>
                  
                  <h3 className="font-sans font-bold text-xl mb-1">{veicolo.nome}</h3>
                  
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-2xl font-bold text-brand-orange">€{veicolo.prezzo}</span>
                    <span className="text-sm font-medium text-gray-400 mb-1">/ {veicolo.periodo}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-6 border-t border-gray-100 pt-5 mt-auto">
                    <div className="flex items-center gap-1.5 bg-gray-50/80 px-2.5 py-1.5 rounded-md">
                      <Settings size={14} className="text-gray-400" />
                      {veicolo.trasmissione}
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50/80 px-2.5 py-1.5 rounded-md">
                      <Fuel size={14} className="text-gray-400" />
                      {veicolo.alimentazione}
                    </div>
                  </div>

                  <motion.a 
                    href={`https://wa.me/393515964085?text=${encodeURIComponent(
                      `Ciao Quattro Effe! Vorrei informazioni sulla disponibilità del veicolo: *${veicolo.nome}* (€${veicolo.prezzo} / ${veicolo.periodo}). Come posso procedere per prenotarlo? Grazie!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-orange text-white text-center font-bold text-sm rounded-xl shadow-[0_4px_12px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_20px_rgba(212,175,55,0.35)] hover:bg-brand-orange-hover transition-all duration-200 mt-4 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current text-white animate-pulse" viewBox="0 0 24 24">
                      <path d="M12.008.01C5.397.01.06 5.348.06 11.956c0 2.097.546 4.142 1.587 5.946L0 24l6.335-1.662a11.82 11.82 0 005.673 1.456c6.613 0 11.95-5.34 11.95-11.95C24.004 5.34 18.618.01 12.008.01zM17.29 14.1c-.287-.144-1.7-.84-1.962-.936-.263-.096-.454-.144-.645.144-.191.288-.741.936-.908 1.127-.168.192-.335.216-.622.072-.288-.144-1.215-.448-2.315-1.43-.855-.763-1.433-1.706-1.6-1.994-.168-.288-.018-.444.126-.587.13-.129.288-.335.43-.504.144-.168.191-.288.287-.48.096-.192.048-.36-.024-.504-.072-.144-.645-1.559-.884-2.135-.233-.56-.469-.484-.645-.492-.167-.008-.36-.01-.55-.01s-.502.072-.765.36c-.263.288-1.005.983-1.005 2.399 0 1.415 1.03 2.782 1.173 2.975.144.192 2.027 3.096 4.912 4.34.686.296 1.222.473 1.639.605.69.219 1.317.188 1.812.115.552-.082 1.7-.696 1.94-1.368.238-.672.238-1.248.167-1.368-.071-.12-.262-.216-.55-.36z" />
                    </svg>
                    <span>Richiedi su WhatsApp</span>
                  </motion.a>
                </GlowCard>
              ))}
            </div>

            {/* Slider Navigation Arrows - Always visible on all screen sizes, touch-friendly */}
            <button 
              onClick={scrollLeft} 
              className="flex absolute left-1 sm:left-2 top-[40%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all items-center justify-center shadow-md cursor-pointer active:scale-95 z-20"
              aria-label="Scorri a sinistra"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={scrollRight} 
              className="flex absolute right-1 sm:right-2 top-[40%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all items-center justify-center shadow-md cursor-pointer active:scale-95 z-20"
              aria-label="Scorri a destra"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

        </div>
      </motion.section>

      {/* Richiesta Preventivo Personalizzato Module */}
      <motion.section 
        id="preventivo"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-10 md:py-12 bg-white relative"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="bg-slate-50/70 p-5 xs:p-8 md:p-14 rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-xl/5 relative overflow-hidden">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative z-10">
              
              {/* Left Side: Copy and details */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div>
                  <span className="text-brand-orange font-bold text-sm tracking-widest uppercase bg-brand-orange/10 px-4 py-2 rounded-full font-mono">
                    Preventivo Veloce
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold mt-4 mb-4 text-brand-dark leading-tight">
                    Richiedi un Preventivo Personalizzato
                  </h2>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Compila il modulo per generare una richiesta dettagliata.<br />Ti risponderemo con la nostra migliore offerta personalizzata sulle tue date ed esigenze.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {/* Badge 1: Instant Routing */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">Destinazione Diretta</h4>
                      <p className="text-xs text-gray-400 font-semibold uppercase mt-0.5 font-mono">noleggioautoinroma@gmail.com</p>
                    </div>
                  </div>

                  {/* Badge 2: No credit card compulsory */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} className="text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">Anche Senza Carta di Credito</h4>
                      <p className="text-xs text-gray-500 font-medium">Contanti o addebito alternativo concordati con lo staff.</p>
                    </div>
                  </div>

                  {/* Badge 3: Fast Support */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">Supporto Telefonico &amp; WhatsApp</h4>
                      <p className="text-xs text-gray-500 font-medium">Chiamaci in qualsiasi momento al numero <span className="whitespace-nowrap">+39 351 596 4085</span></p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Side: The Interactive Form */}
              <div className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-10 rounded-3xl border border-gray-100 shadow-lg flex flex-col justify-between">
                {!formSubmitted ? (
                  <form onSubmit={handleSubmitQuote} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">Nome e Cognome *</label>
                        <input 
                          type="text" 
                          name="nome" 
                          required
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="es. Mario Rossi"
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-slate-50/50 focus:bg-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">Numero di Telefono *</label>
                        <input 
                          type="tel" 
                          name="telefono" 
                          required
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="es. +39 333 1234567"
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-slate-50/50 focus:bg-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">Indirizzo Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="es. mario.rossi@email.it"
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-slate-50/50 focus:bg-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 outline-none transition-all text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">Veicolo di Interesse *</label>
                      <div className="relative">
                        <select 
                          name="veicolo" 
                          required
                          value={formData.veicolo}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-slate-50/50 focus:bg-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 outline-none transition-all text-sm font-medium appearance-none cursor-pointer pr-10"
                        >
                          <option value="" disabled>Seleziona un veicolo...</option>
                          <optgroup label="Auto">
                            <option value="Fiat Panda">Fiat Panda (Benzina)</option>
                            <option value="Mercedes Classe B">Mercedes Classe B (Diesel automatico)</option>
                            <option value="Mercedes CLA">Mercedes CLA (Automatico/Diesel/Benzina)</option>
                            <option value="Fiat 500">Fiat 500</option>
                            <option value="Smart ForTwo 451">Smart ForTwo 451 (Automatica)</option>
                            <option value="Smart ForTwo 453">Smart ForTwo 453 (Automatica)</option>
                            <option value="Lancia Ypsilon">Lancia Ypsilon</option>
                            <option value="Fiat 500X">Fiat 500X (Diesel)</option>
                            <option value="Fiat 500L">Fiat 500L (Diesel/Benzina)</option>
                          </optgroup>
                          <optgroup label="Furgoni">
                            <option value="Fiat Doblò">Fiat Doblò (Carico)</option>
                            <option value="Doblò 5 Posti">Doblò 5 Posti (Spazio)</option>
                            <option value="Ducato Maxi">Ducato Maxi</option>
                            <option value="Peugeot Boxer Sponda">Peugeot Boxer Sponda</option>
                          </optgroup>
                          <optgroup label="Altro">
                            <option value="Altro / Richiesta Generica">Altro (Consigliatemi voi)</option>
                          </optgroup>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-brand-orange">
                          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">Durata del noleggio e Note *</label>
                      <textarea 
                        name="note" 
                        required
                        rows={4}
                        value={formData.note}
                        onChange={handleInputChange}
                        disabled={formLoading}
                        placeholder="Indica la durata (es. 3 giorni, 1 settimana), le date desiderate di ritiro e riconsegna, ed eventuali chiarimenti o richieste particolari..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-slate-50/50 focus:bg-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 outline-none transition-all text-sm font-medium resize-none disabled:opacity-60"
                      />
                    </div>

                    {formError && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-medium leading-relaxed">
                        ⚠️ {formError}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={formLoading}
                      className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl transition-all shadow-md shadow-brand-orange/15 hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {formLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Invio in corso...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Invia Richiesta Preventivo</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col justify-center items-center text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6">
                      <CheckCircle2 size={36} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-brand-dark mb-3">Richiesta Inviata!</h3>
                    
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-6 font-medium leading-relaxed">
                      La tua richiesta di preventivo per l'auto <strong className="text-brand-orange">{formData.veicolo || 'selezionata'}</strong> è stata ricevuta direttamente nei nostri sistemi.<br />Ti ricontatteremo il prima possibile all'indirizzo <span className="text-brand-dark font-semibold">{formData.email}</span>.
                    </p>

                    {mailPreviewUrl && (
                      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left max-w-md">
                        <p className="text-xs text-amber-800 font-bold mb-2 flex items-center gap-1.5 font-mono">
                          ⚡ ANTEPRIMA EMAIL RICEVUTA (TEST)
                        </p>
                        <p className="text-xs text-amber-700 leading-relaxed mb-3">
                          L'e-mail è stata simulata con successo in modalità test.<br />Clicca il link qui sotto per vedere l'esatta e-mail recapitata alla nostra casella postale:
                        </p>
                        <a 
                          href={mailPreviewUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover px-4 py-2 rounded-xl transition-all shadow-sm"
                        >
                          Apri Posta Elettronica Ricevuta ↗
                        </a>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <button 
                        onClick={() => {
                          const subject = encodeURIComponent(`Richiesta Preventivo Noleggio - ${formData.nome}`);
                          const body = encodeURIComponent(
                            `Ciao Quattro Effe Autonoleggio,\n\n` +
                            `Vorrei richiedere un preventivo personalizzato per il noleggio di un veicolo con i seguenti dettagli:\n\n` +
                            `[Dati Personali]\n` +
                            `- Nome e Cognome: ${formData.nome}\n` +
                            `- Email: ${formData.email}\n` +
                            `- Telefono: ${formData.telefono}\n\n` +
                            `[Dettagli Noleggio]\n` +
                            `- Veicolo richiesto: ${formData.veicolo || 'Qualsiasi veicolo / Da consigliare'}\n` +
                            `- Note & Durata Noleggio:\n${formData.note}\n\n` +
                            `La ringrazio anticipatamente. Resto a disposizione per qualsiasi chiarimento.\n` +
                            `Cordiali saluti,\n` +
                            `${formData.nome}`
                          );
                          window.location.href = `mailto:noleggioautoinroma@gmail.com?subject=${subject}&body=${body}`;
                        }}
                        className="flex-1 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 text-xs cursor-pointer"
                      >
                        <Mail size={15} />
                        Invia copia mailto
                      </button>

                      <a 
                        href={`https://wa.me/393515964085?text=${encodeURIComponent(
                          `Ciao Quattro Effe! Ho appena inviato una richiesta di preventivo via email. Ecco i dettagli rapidi:\n\n` +
                          `• Nome: ${formData.nome}\n` +
                          `• Telefono: ${formData.telefono}\n` +
                          `• Veicolo: ${formData.veicolo || 'Qualsiasi'}\n` +
                          `• Note/Durata: ${formData.note}`
                        )}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-md shadow-green-500/15 flex items-center justify-center gap-1.5 active:scale-95 text-xs"
                      >
                        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.415 9.86-9.859.002-2.638-1.016-5.117-2.868-6.971C16.61 1.92 14.137.904 11.503.904c-5.441 0-9.859 4.417-9.861 9.861-.001 1.743.461 3.447 1.336 4.965l-.975 3.561 3.644-.955zM17.29 14.1c-.287-.144-1.7-.84-1.962-.936-.263-.096-.454-.144-.645.144-.191.288-.741.936-.908 1.127-.168.192-.335.216-.622.072-.288-.144-1.215-.448-2.315-1.43-.855-.763-1.433-1.706-1.6-1.994-.168-.288-.018-.444.126-.587.13-.129.288-.335.43-.504.144-.168.191-.288.287-.48.096-.192.048-.36-.024-.504-.072-.144-.645-1.559-.884-2.135-.233-.56-.469-.484-.645-.492-.167-.008-.36-.01-.55-.01s-.502.072-.765.36c-.263.288-1.005.983-1.005 2.399 0 1.415 1.03 2.782 1.173 2.975.144.192 2.027 3.096 4.912 4.34.686.296 1.222.473 1.639.605.69.219 1.317.188 1.812.115.552-.082 1.7-.696 1.94-1.368.238-.672.238-1.248.167-1.368-.071-.12-.262-.216-.55-.36z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
 
                    <button 
                      onClick={() => {
                        setFormData({ nome: '', email: '', telefono: '', veicolo: '', note: '' });
                        setFormSubmitted(false);
                      }}
                      className="mt-6 text-xs text-gray-400 hover:text-brand-orange font-bold uppercase tracking-wider underline cursor-pointer"
                    >
                      Invia un'altra richiesta
                    </button>
                  </motion.div>
                )}
              </div>

            </div>
          </div>
        </div>
      </motion.section>

      {/* Animated Stats Section (Adapted from screenshot style) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-12 md:py-16 bg-white/45 backdrop-blur-sm border-t border-gray-100"
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative">
            
            {/* Stat Item 1: 10 Anni di Esperienza */}
            <div className="relative flex flex-col items-center text-center md:items-start md:text-left group">
              {/* Spherical shadow element - Centered on mobile behind the statistics, offset on desktop */}
              <div 
                className="w-16 h-16 rounded-full absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-left-8 -top-3 md:-top-4 opacity-75 pointer-events-none blur-[0.3px]"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)',
                  boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.15), 3px 5px 12px rgba(148,163,184,0.3)',
                }}
              />
              
              <div className="relative z-10 flex items-baseline">
                <span className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-neutral-900">
                  <AnimatedCounter target={10} suffix="+" /> Anni
                </span>
              </div>
              
              <p className="text-gray-500/90 leading-relaxed text-sm md:text-[15px] mt-3 max-w-[240px] z-10 font-medium">
                di esperienza sul campo.
              </p>
            </div>

            {/* Stat Item 2: 80+ Auto */}
            <div className="relative flex flex-col items-center text-center md:items-start md:text-left group">
              {/* Spherical shadow element - Centered on mobile behind the statistics, offset on desktop */}
              <div 
                className="w-16 h-16 rounded-full absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-left-8 -top-3 md:-top-4 opacity-75 pointer-events-none blur-[0.3px]"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)',
                  boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.15), 3px 5px 12px rgba(148,163,184,0.3)',
                }}
              />
              
              <div className="relative z-10 flex items-baseline">
                <span className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-neutral-900">
                  <AnimatedCounter target={80} suffix="+" /> Auto
                </span>
              </div>
              
              <p className="text-gray-500/90 leading-relaxed text-sm md:text-[15px] mt-3 max-w-[240px] z-10 font-medium">
                e furgoni in flotta.
              </p>
            </div>

            {/* Stat Item 3: +3000 Clienti Soddisfatti */}
            <div className="relative flex flex-col items-center text-center md:items-start md:text-left group">
              {/* Spherical shadow element - Centered on mobile behind the statistics, offset on desktop */}
              <div 
                className="w-16 h-16 rounded-full absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-left-8 -top-3 md:-top-4 opacity-75 pointer-events-none blur-[0.3px]"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)',
                  boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.15), 3px 5px 12px rgba(148,163,184,0.3)',
                }}
              />
              
              <div className="relative z-10 flex items-baseline">
                <span className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-neutral-900">
                  <AnimatedCounter target={3000} prefix="+" /> Clienti
                </span>
              </div>
              
              <p className="text-gray-500/90 leading-relaxed text-sm md:text-[15px] mt-3 max-w-[240px] z-10 font-medium">
                soddisfatti a Roma.
              </p>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Chi Siamo & Dove Siamo Section with Google Maps */}
      <motion.section 
        id="chi-siamo" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-10 md:py-12 bg-white/60 backdrop-blur-sm border-y border-gray-100/80 relative"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Information */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="text-brand-orange font-bold text-sm tracking-widest uppercase bg-brand-orange/10 px-4 py-2 rounded-full font-mono">
                  La Nostra Sede
                </span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold mt-4 text-brand-dark leading-tight">
                  Chi Siamo & <br />Dove Trovarci
                </h2>
              </motion.div>
              
              <p className="text-gray-600 leading-relaxed text-base font-medium">
                <strong>Quattro Effe s.r.l.</strong> è il punto di riferimento a Roma per chi cerca un servizio di noleggio auto e furgoni all'insegna della professionalità, della trasparenza e della convenienza assoluta.<br />Con una flotta moderna e costantemente verificata, garantiamo soluzioni su misura sia per privati che per aziende.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-orange shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Indirizzo Sede</h4>
                    <p className="text-gray-500 text-sm font-medium">Via di Fontana Candida 47, 00133 Roma (RM)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-orange shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Orari di Apertura</h4>
                    <p className="text-gray-500 text-sm font-medium">Lunedì - Venerdì: 09:00 - 13:00, 15:00 - 19:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-orange shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Contatto Diretto</h4>
                    <p className="text-gray-500 text-sm font-medium flex flex-wrap gap-x-2 gap-y-1">
                      <span className="whitespace-nowrap">+39 351 5964085</span>
                      <span className="text-gray-300">|</span>
                      <span className="whitespace-nowrap">+39 069 4847758</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="https://maps.google.com/maps?q=Via%20di%20Fontana%20Candida%2047,%20Roma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-xl transition-colors gap-2 shadow-lg shadow-brand-orange/20 active:scale-95"
                >
                  <Navigation2 size={18} className="rotate-45" />
                  Calcola Percorso su Google Maps
                </a>
              </div>
            </div>

            {/* Right side: Map Embed */}
            <div className="lg:col-span-7 h-[450px] w-full relative">
              <div className="absolute inset-0 bg-white p-3 rounded-[2.5rem] shadow-xl border border-gray-100/80 overflow-hidden h-full">
                <iframe
                  title="Posizione Quattro Effe s.r.l."
                  src="https://maps.google.com/maps?q=Via%20di%20Fontana%20Candida%2047,%20Roma&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full rounded-[2rem] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Recensioni Clienti - Google Reviews Carousel */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-10 md:py-12 bg-slate-50/50 border-b border-gray-100 relative"
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-brand-orange font-bold text-sm tracking-widest uppercase bg-brand-orange/10 px-4 py-2 rounded-full font-mono">
              Opinioni Reali
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold mt-4 mb-4 text-brand-dark leading-tight">
              Cosa Dicono i Nostri Clienti
            </h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-lg font-bold text-brand-dark">4.8 su 5</span>
              <div className="flex text-yellow-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <span className="text-gray-400 text-sm font-medium">(basato su recensioni Google reali)</span>
            </div>
          </motion.div>

          <div className="relative">
            {/* Carousel Item with Motion */}
            <div className="overflow-hidden min-h-[280px] md:min-h-[240px] flex items-center justify-center">
              <motion.div 
                key={currentReview}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full bg-white p-5 xs:p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl/10 relative"
              >
                {/* Quote Icon watermark */}
                <div className="absolute top-6 right-8 text-brand-orange/10 font-serif text-8xl leading-none pointer-events-none select-none">“</div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={RECENSIONI[currentReview].avatar} 
                      alt={RECENSIONI[currentReview].autore} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-orange/20"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-brand-dark text-lg leading-tight">{RECENSIONI[currentReview].autore}</h4>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{RECENSIONI[currentReview].ruolo}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: RECENSIONI[currentReview].voto }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">{RECENSIONI[currentReview].data}</span>
                  </div>
                </div>

                <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed italic pr-4 whitespace-pre-line">
                  "{RECENSIONI[currentReview].testo}"
                </p>

                {/* Google badge info inside the card */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 tracking-wider flex items-center gap-1.5 font-mono">
                    <svg className="w-4 h-4 fill-current text-blue-500 shrink-0" viewBox="0 0 24 24">
                      <title>Google</title>
                      <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 1.185 15.449 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.834 11.57-11.77 0-.79-.085-1.4-.187-1.945H12.24z"/>
                    </svg>
                    RECENSIONE CERTIFICATA GOOGLE
                  </span>
                  
                  {/* Rating Badge */}
                  <span className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                    Sede Verificata
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={prevReview}
                className="w-12 h-12 rounded-full border border-gray-100 bg-white shadow-md hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center text-gray-600 active:scale-90"
                aria-label="Recensione Precedente"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Indicator dots */}
              <div className="flex items-center gap-2">
                {RECENSIONI.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${currentReview === index ? 'w-6 bg-brand-orange' : 'w-2.5 bg-gray-200 hover:bg-gray-300'}`}
                    aria-label={`Vai alla recensione ${index + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextReview}
                className="w-12 h-12 rounded-full border border-gray-100 bg-white shadow-md hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center text-gray-600 active:scale-90"
                aria-label="Prossima Recensione"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.section>



      {/* Sezione FAQ per SEO ed assistenza */}
      <motion.section 
        id="faq"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-12 md:py-14 bg-white relative border-b border-gray-100"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-brand-orange font-bold text-sm tracking-widest uppercase bg-brand-orange/10 px-4 py-2 rounded-full font-mono">
              Domande Frequenti
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold mt-4 mb-4 text-brand-dark leading-tight animate-fade-in-up">
              Tutto quello che c'è da sapere
            </h2>
            <p className="text-gray-500 font-medium text-base">
              Risolvi tutti i tuoi dubbi sul servizio di noleggio auto e furgoni di Quattro Effe a Roma.
            </p>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`border rounded-2xl transition-all duration-300 ${
                    isOpen 
                      ? 'border-brand-orange bg-slate-50/40 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-slate-50/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none transition-colors"
                  >
                    <span className="font-sans font-bold text-base md:text-lg text-brand-dark pr-4 flex items-center gap-3">
                      <HelpCircle size={18} className={`shrink-0 ${isOpen ? 'text-brand-orange' : 'text-gray-400'}`} />
                      {faq.domanda}
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-orange text-white rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed font-semibold whitespace-pre-line border-t border-gray-100/60 pt-4">
                          {faq.risposta}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center bg-slate-50/50 rounded-2xl p-6 border border-gray-100/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-sans font-bold text-lg text-brand-dark mb-1">Hai altre domande?</h4>
              <p className="text-gray-500 text-sm font-semibold">Siamo sempre a tua disposizione su WhatsApp per darti supporto immediato.</p>
            </div>
            <a 
              href="https://wa.me/393515964085?text=Ciao,%20vorrei%20chiedere%20alcune%20informazioni%20sulle%20condizioni%20di%20noleggio." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors font-sans text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.415 9.86-9.859.002-2.638-1.016-5.117-2.868-6.971C16.61 1.92 14.137.904 11.503.904c-5.441 0-9.859 4.417-9.861 9.861-.001 1.743.461 3.447 1.336 4.965l-.975 3.561 3.644-.955zM17.29 14.1c-.287-.144-1.7-.84-1.962-.936-.263-.096-.454-.144-.645.144-.191.288-.741.936-.908 1.127-.168.192-.335.216-.622.072-.288-.144-1.215-.448-2.315-1.43-.855-.763-1.433-1.706-1.6-1.994-.168-.288-.018-.444.126-.587.13-.129.288-.335.43-.504.144-.168.191-.288.287-.48.096-.192.048-.36-.024-.504-.072-.144-.645-1.559-.884-2.135-.233-.56-.469-.484-.645-.492-.167-.008-.36-.01-.55-.01s-.502.072-.765.36c-.263.288-1.005.983-1.005 2.399 0 1.415 1.03 2.782 1.173 2.975.144.192 2.027 3.096 4.912 4.34.686.296 1.222.473 1.639.605.69.219 1.317.188 1.812.115.552-.082 1.7-.696 1.94-1.368.238-.672.238-1.248.167-1.368-.071-.12-.262-.216-.55-.36z"/>
              </svg>
              Contattaci su WhatsApp
            </a>
          </div>

        </div>
      </motion.section>



      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md pt-14 pb-8 border-t border-gray-100 mt-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            <div>
              <h3 className="font-bold font-sans text-xl mb-6">Chi Siamo</h3>
              <ul className="space-y-4 text-gray-500 font-medium text-sm flex flex-col items-start">
                <li>
                  <button 
                    onClick={() => handleScrollTo('chi-siamo')} 
                    className="hover:text-brand-orange text-left w-full transition-colors font-medium hover:underline cursor-pointer focus:outline-none"
                  >
                    Noleggio in Roma
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleToggleFooterDoc('condizioni')} 
                    className={`hover:text-brand-orange text-left w-full transition-colors font-medium hover:underline cursor-pointer focus:outline-none flex items-center gap-1 ${activeFooterDoc === 'condizioni' ? 'text-brand-orange font-bold font-semibold' : ''}`}
                  >
                    Condizioni di Servizio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleToggleFooterDoc('privacy')} 
                    className={`hover:text-brand-orange text-left w-full transition-colors font-medium hover:underline cursor-pointer focus:outline-none flex items-center gap-1 ${activeFooterDoc === 'privacy' ? 'text-brand-orange font-bold font-semibold' : ''}`}
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold font-sans text-xl mb-6">Contatti</h3>
              <ul className="space-y-4 text-gray-500 font-medium text-sm leading-relaxed">
                <li><MapPin className="inline w-4 h-4 mr-2" /> Via di Fontana Candida 47,<br/> Roma</li>
                <li><Phone className="inline w-4 h-4 mr-2" /> 069 4847758</li>
                <li><Phone className="inline w-4 h-4 mr-2" /> 351 5964085</li>
                <li><Mail className="inline w-4 h-4 mr-2" /> noleggioautoinroma<br/>@gmail.com</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold font-sans text-xl mb-6">Recensioni</h3>
              <div className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-gray-100/80">
                <div className="text-4xl font-bold font-sans">4.8</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recensioni Google</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sezione a tendina per Condizioni e Privacy con AnimatePresence */}
          <AnimatePresence>
            {activeFooterDoc && (
              <motion.div
                ref={footerDocRef}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden border border-gray-150 bg-slate-50/70 p-6 md:p-8 rounded-3xl mb-12 shadow-inner text-left relative"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveFooterDoc(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Chiudi"
                >
                  <X size={18} />
                </button>

                {activeFooterDoc === 'condizioni' ? (
                  <div>
                    <h4 className="font-sans font-bold text-lg md:text-xl text-brand-dark mb-4 pb-2 border-b border-gray-200/60 flex items-center gap-2">
                      <CheckCircle2 className="text-brand-orange" size={20} />
                      Condizioni Generali di Servizio - Quattro Effe s.r.l.
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
                      <div className="space-y-4">
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">1. Requisiti di Noleggio</strong>
                          Il conducente deve essere in possesso di tutti i documenti in corso di validità: carta d'identità, codice fiscale e patente di guida di tipo B o superiore.
                        </p>
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">2. Tariffe e Variazioni</strong>
                          I prezzi visualizzati sul nostro sito internet sono soggetti a cambiamenti e possono variare in base alla stagionalità o alle offerte del momento.<br />La prenotazione indica una preferenza di categoria ma non garantisce un modello specifico.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">3. Pagamento Flessibile (Senza Carta)</strong>
                          La trasparenza è il nostro forte: supportiamo il noleggio anche senza carta di credito.<br />Accettiamo soluzioni di pagamento alternative (bancomat, carte di debito e contanti) previ accordi e deposito cauzionale definito in fase di contrattualizzazione.
                        </p>
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">4. Manutenzione e RC Auto</strong>
                          Tutti i veicoli sono provvisti di copertura assicurativa RCA standard e igienizzazione completa prima dello scambio.<br />Il locatario risponde per i danni causati da dolo o incuria grave.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-sans font-bold text-lg md:text-xl text-brand-dark mb-4 pb-2 border-b border-gray-200/60 flex items-center gap-2">
                      <ShieldCheck className="text-brand-orange" size={20} />
                      Informativa sul Trattamento dei Dati Personali (GDPR)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
                      <div className="space-y-4">
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">1. Titolare del Trattamento</strong>
                          Il titolare del trattamento dei tuoi dati personali è Quattro Effe s.r.l., con sede legale a Roma in Via di Fontana Candida 47, CAP 00133.<br />Per ogni chiarimento o richiesta puoi contattarci all'indirizzo email: <span className="text-brand-orange font-medium">noleggioautoinroma@gmail.com</span>.
                        </p>
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">2. Finalità del Servizio</strong>
                          Trattiamo i tuoi dati esclusivamente per la formulazione dei preventivi interattivi, per l'esecuzione del contratto di noleggio, per garantirti assistenza via WhatsApp e per l'assolvimento di obblighi civilistici e fiscali.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">3. Tipologia di Dati Raccolti</strong>
                          Raccogliamo unicamente i dati necessari alla corretta finalizzazione del preventivo e della locazione (nome, e-mail, contatto telefonico, coordinate di noleggio, dati di patente e di pagamento opportunamente protetti).
                        </p>
                        <p>
                          <strong className="text-brand-dark block mb-1 font-semibold">4. Diritti dell'Interessato</strong>
                          In quanto utente del nostro servizio, hai pieno diritto di richiedere l'accesso, la rettifica, la limitazione della conservazione o la cancellazione integrale dei tuoi dati in conformità con il Regolamento UE 2016/679 scrivendoci una semplice email.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-t border-gray-100 pt-8">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left Group: Logo + Brand Name + Copyright Notice */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-center sm:text-left">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/images/logo.png" 
                    alt="Quattro Effe s.r.l. Logo" 
                    className="h-8 w-auto object-contain grayscale opacity-80 hover:grayscale-0 transition-all" 
                    onError={(e) => e.currentTarget.style.display = 'none'} 
                  />
                  <div className="text-lg font-bold font-sans tracking-tight">
                    Quattro <span className="text-brand-orange">Effe</span>
                  </div>
                </div>
                <div className="hidden sm:block h-4 w-px bg-gray-200"></div>
                <p className="text-gray-400 font-medium text-xs md:text-sm">
                  &copy; 2026 Quattro Effe Autonoleggio s.r.l. • P.IVA 11795431003 • Tutti i diritti riservati.
                </p>
              </div>

              {/* Right Group: Social Channels Buttons */}
              <div className="flex flex-row items-center gap-3 shrink-0 my-2 md:my-0">
                <a 
                  href="https://www.instagram.com/quattroeffeautonoleggio/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] hover:scale-105 hover:shadow-md transition-all active:scale-95 cursor-pointer text-white text-xs font-semibold rounded-xl"
                  id="instagram-social-btn"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@quattroeffeautonoleggio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-black text-white text-xs font-semibold rounded-xl hover:scale-105 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  id="tiktok-social-btn"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.17 1.12 1.15 2.7 1.84 4.3 1.97v3.91c-1.51-.01-3-.41-4.28-1.21-.83-.54-1.52-1.29-1.99-2.18v8.31c-.05 2.1-.91 4.1-2.45 5.56-1.74 1.62-4.14 2.5-6.6 2.45-2.28-.05-4.47-.99-6.02-2.68-1.63-1.83-2.46-4.3-2.25-6.76.22-2.58 1.66-4.94 3.88-6.28 1.65-1 3.6-1.42 5.52-1.18V12c-1.15-.34-2.4-.04-3.32.74-.82.72-1.24 1.83-1.15 2.92.1 1.2.78 2.29 1.81 2.91 1 .58 2.26.54 3.22-.11.88-.6 1.39-1.61 1.39-2.66V0h.01a.33.33 0 0 1 .15.02z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
            <div className="w-full border-t border-gray-50 pt-4 text-center">
              <p className="text-[11px] text-gray-400 font-bold tracking-wide max-w-4xl mx-auto leading-relaxed uppercase">
                Ci teniamo a informarti che i prezzi visualizzati sul nostro sito internet sono soggetti a cambiamenti e possono variare in base alle offerte del momento.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Chat Button & Welcome Bubble */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        <AnimatePresence>
          {showWhatsappPopup && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ delay: 1, duration: 0.35 }}
              className="relative bg-white text-gray-800 text-xs font-semibold py-3 px-4 rounded-2xl shadow-2xl border border-gray-100 max-w-[260px] mr-1 flex flex-col gap-1.5"
            >
              {/* Close button */}
              <button 
                type="button"
                onClick={() => setShowWhatsappPopup(false)}
                className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 p-0.5 rounded-full transition-colors"
                title="Chiudi"
              >
                <X size={14} />
              </button>
              
              <div className="flex items-center gap-1.5 text-[#25D366] font-extrabold text-[10px] uppercase tracking-wider mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                Supporto Rapido
              </div>
              <p className="pr-3 text-gray-600 font-medium text-[11px] leading-relaxed">
                Hai un'esigenza specifica? Scrivici subito su WhatsApp per ricevere risposta immediata e preventivi veloci!
              </p>
              
              {/* Speech bubble pointer arrow */}
              <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <a 
          href="https://wa.me/393515964085?text=Salve,%20vorrei%20informazioni%20per%20il%20noleggio%20di%20un%20veicolo"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative"
          title="Contattaci su WhatsApp"
        >
          {/* Simple crisp custom SVG for WhatsApp icon to guarantee perfect rendering */}
          <svg 
            className="w-7 h-7 fill-current" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          {/* Pulse / Ring Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10 group-hover:hidden"></span>
          
          {/* Tooltip text showing on hover */}
          <span className="absolute right-16 bg-white text-gray-800 text-xs font-semibold py-2 px-3 rounded-xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap text-slate-800">
            Scrivici su WhatsApp
          </span>
        </a>
      </div>

      {/* Floating "Torna su" Back to Top Button */}
      <motion.button 
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          y: showScrollTop ? 0 : 20, 
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? 'auto' : 'none' 
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-24 right-6 bg-white hover:bg-slate-50 text-brand-dark border border-gray-100/80 p-3.5 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        title="Torna su"
      >
        <ArrowUp size={20} className="text-brand-orange group-hover:-translate-y-0.5 transition-transform" />
        
        {/* Tooltip text showing on hover */}
        <span className="absolute right-14 bg-white text-gray-800 text-xs font-semibold py-1.5 px-2.5 rounded-xl shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
          Torna su
        </span>
      </motion.button>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-24 bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-3xl shadow-2xl border border-slate-800 z-[9999] md:max-w-md flex flex-col gap-4 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand-orange/20 rounded-2xl text-brand-orange shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm tracking-tight text-white mb-1">Informativa sui Cookie</h4>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                  Utilizziamo cookie tecnici per ottimizzare l'esperienza d'uso e raccogliere statistiche anonime di consultazione. Puoi accettare tutti i cookie, decidere di rifiutarli o consultare la nostra{' '}
                  <button 
                    onClick={() => {
                      handleScrollTo('chi-siamo');
                      handleToggleFooterDoc('privacy');
                    }}
                    className="text-brand-orange hover:underline font-bold cursor-pointer inline focus:outline-none"
                  >
                    Privacy Policy
                  </button>.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 text-xs font-bold border-t border-slate-800/80 pt-3">
              <button
                onClick={() => handleAcceptCookies(false)}
                className="px-4 py-2 hover:bg-slate-800/80 text-slate-300 transition-colors rounded-xl cursor-pointer"
              >
                Rifiuta
              </button>
              <button
                onClick={() => handleAcceptCookies(true)}
                className="px-5 py-2.5 bg-brand-orange text-white hover:bg-brand-orange-hover transition-all rounded-xl shadow-md hover:shadow-brand-orange/15 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                Accetta tutti
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
