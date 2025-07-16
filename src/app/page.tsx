'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

function Section({ children, className = "", ...rest }: SectionProps) {
  return (
    <section className={`w-full max-w-7xl mx-auto px-6 py-20 ${className}`} {...rest}>
      {children}
    </section>
  );
}

function Card({ children, className = "", gradient = false, id }: { children: React.ReactNode; className?: string; gradient?: boolean; id?: string }) {
  const baseClasses = "rounded-3xl shadow-2xl border border-white/10 backdrop-blur-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl";
  const bgClasses = gradient 
    ? "bg-gradient-to-br from-[var(--gray-belt)]/40 via-[var(--black-belt)]/60 to-[var(--gray-belt)]/40" 
    : "bg-[var(--gray-belt)]/30";
  
  return (
    <div id={id} className={`${baseClasses} ${bgClasses} ${className}`}>
      {children}
    </div>
  );
}

function FloatingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-[var(--gray-belt)]/90 via-[var(--black-belt)]/80 to-[var(--gray-belt)]/90 border border-[var(--red-belt)]/30 rounded-3xl shadow-2xl px-8 py-6 text-white backdrop-blur-xl hover:border-[var(--red-belt)]/60 transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-[var(--gray-belt)]/20 to-transparent hover:from-[var(--gray-belt)]/40 transition-all duration-300 group">
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--red-belt)] to-[var(--red-belt)]/70 mt-2 group-hover:scale-125 transition-transform duration-300 shadow-lg"></div>
      <div>
        <h4 className="font-bold text-lg text-white mb-2">{title}</h4>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ScrollArrow({ targetId }: { targetId: string }) {
  const [visible, setVisible] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!arrowRef.current) return;
    const handleScroll = () => {
      if (!arrowRef.current) return;
      const rect = arrowRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5) setVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setVisible(false);
    }
  };

  return visible ? (
    <div ref={arrowRef} className="flex justify-center mt-8 animate-bounce cursor-pointer select-none" onClick={handleClick} aria-label="Scroll para próxima seção">
      <div className="rounded-full bg-[var(--red-belt)] p-3 shadow-lg animate-pulse">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6v20M16 26l-8-8M16 26l8-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  ) : null;
}

export default function Home() {
  const floatingCards = [
    {
      title: "Seu Progresso",
      value: "17",
      subtitle: "Semanas de treino",
      color: "text-[var(--red-belt)]",
    },
    {
      title: "Bônus Exclusivo",
      value: "+6",
      subtitle: "Semanas extras",
      color: "text-[var(--red-belt)]",
    },
    {
      title: "Suporte",
      value: "24/7",
      subtitle: "Grupo Telegram",
      color: "text-[var(--red-belt)]",
    },
  ];
  const [cardIdx, setCardIdx] = useState(0);
  const prevCard = () => setCardIdx((prev) => (prev === 0 ? floatingCards.length - 1 : prev - 1));
  const nextCard = () => setCardIdx((prev) => (prev === floatingCards.length - 1 ? 0 : prev + 1));

  // Galeria de imagens do autor
  const galeriaImgs = [
    "/images/galeria-1.jpeg",
    "/images/galeria-2.jpeg",
    "/images/galeria-3.png",
    "/images/galeria-4.png",
    "/images/galeria-5.png",
    "/images/galeria-6.png",
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const openModal = (idx: number) => { setModalIdx(idx); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const prevImg = () => setModalIdx((prev) => (prev === 0 ? galeriaImgs.length - 1 : prev - 1));
  const nextImg = () => setModalIdx((prev) => (prev === galeriaImgs.length - 1 ? 0 : prev + 1));

  return (
    <div className="font-sans min-h-screen flex flex-col bg-[var(--black-belt)] text-[var(--white-belt)] relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[var(--gray-belt)] to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(196,18,31,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(196,18,31,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      {/* Planet Glow Effect */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[150vw] h-[60vw] bg-gradient-to-t from-[var(--red-belt)]/20 via-transparent to-transparent rounded-full blur-3xl opacity-60 -z-10"></div>

      {/* HERO */}
      <Section className="flex flex-col items-center text-center justify-center min-h-screen pt-32 pb-32 relative">
        <div className="mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--gray-belt)]/80 to-[var(--black-belt)]/80 border border-[var(--red-belt)]/30 shadow-2xl backdrop-blur-xl">
          <span className="text-sm font-bold tracking-widest text-[var(--red-belt)] uppercase">🔥 Gás Infinito – Performance Jiu-Jitsu</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9] bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent drop-shadow-2xl">
          O Segredo do <span className="bg-gradient-to-r from-[var(--red-belt)] to-[var(--red-belt)]/80 bg-clip-text text-transparent">GÁS INFINITO</span><br/>no Tatame
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed">
          Transforme seu condicionamento com a planilha faixa preta de resistência, força e explosão. <span className="text-[var(--red-belt)] font-bold">Treine como os campeões!</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a href="https://pay.hotmart.com/J97697022X?off=nnc0goo2&bid=1752639346953" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-white to-white/95 text-[var(--red-belt)] font-black py-5 px-12 rounded-2xl text-2xl shadow-2xl border-2 border-transparent hover:from-[var(--red-belt)] hover:to-[var(--red-belt)]/90 hover:text-white hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl">
            <span className="inline-block group-hover:scale-110 transition-transform duration-300">Quero meu gás infinito</span>
          </a>
        </div>

        {/* Enhanced Floating Cards */}
        <div className="relative w-full flex flex-row justify-center gap-8 mt-8">
          {/* Desktop: mostrar todos os cards */}
          <div className="hidden md:flex flex-row gap-8 w-full justify-center">
            {floatingCards.map((card, idx) => (
              <FloatingCard key={idx} className={`rotate-${idx === 0 ? "[-4deg]" : idx === 2 ? "[4deg]" : "[2deg]"} scale-95 transform hover:rotate-0 hover:scale-100`}>
                <div className="text-center">
                  <div className={`font-black text-xl mb-3 ${card.color}`}>{card.title}</div>
                  <div className="text-4xl font-black text-white mb-2">{card.value}</div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">{card.subtitle}</div>
                </div>
              </FloatingCard>
            ))}
          </div>
          {/* Mobile: carrossel */}
          <div className="md:hidden w-full flex flex-row items-center justify-center gap-2">
            <button onClick={prevCard} aria-label="Anterior" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl font-black transition disabled:opacity-40"><span>&lt;</span></button>
            <FloatingCard className="w-full max-w-xs mx-2">
              <div className="text-center">
                <div className={`font-black text-xl mb-3 ${floatingCards[cardIdx].color}`}>{floatingCards[cardIdx].title}</div>
                <div className="text-4xl font-black text-white mb-2">{floatingCards[cardIdx].value}</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">{floatingCards[cardIdx].subtitle}</div>
              </div>
            </FloatingCard>
            <button onClick={nextCard} aria-label="Próximo" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl font-black transition disabled:opacity-40"><span>&gt;</span></button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center mt-12 text-sm text-white/50 font-mono">
          <span className="hover:text-[var(--red-belt)] transition-colors duration-300">brbjjextraordinario.metodose7e.com</span>
          <span className="hidden sm:inline">•</span>
          <span className="hover:text-[var(--red-belt)] transition-colors duration-300">metodose7e.com</span>
          <span className="hidden sm:inline">•</span>
          <span className="hover:text-[var(--red-belt)] transition-colors duration-300">Hotmart</span>
        </div>

        <ScrollArrow targetId="oque-e" />
      </Section>

      {/* What is the Program */}
      <Section id="oque-e" className="relative">
        <Card className="p-12 text-center scroll-mt-24" gradient>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 uppercase tracking-wider">
            O que é a Planilha de Treino do <span className="text-[var(--red-belt)]">GÁS INFINITO</span>?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Programa de preparação física específico para jiu-jitsu, projetado para aumentar extraordinariamente sua resistência, força e explosão. Inclui um cronograma de treinos estratégicos, voltados às necessidades reais do tatame.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-sm text-white/60 font-semibold">
            <span className="hover:text-[var(--red-belt)] transition-colors duration-300">metodose7e.com</span>
            <span className="hover:text-[var(--red-belt)] transition-colors duration-300">Hotmart</span>
          </div>
        </Card>

        <ScrollArrow targetId="bonus" />
      </Section>

      {/* Bonus Section */}
      <Section>
        <Card className="p-12" gradient>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl font-black text-[var(--red-belt)] mb-6 uppercase tracking-wider flex items-center justify-center lg:justify-start gap-3">
                <span className="text-4xl">🎁</span> Sobre o Bônus
              </h2>
              <p className="text-xl text-white/90 mb-4 leading-relaxed">
                Você receberá, via WhatsApp, uma Planilha de 6 Semanas EXTRA 7 dias após a compra.
              </p>
              <p className="text-[var(--red-belt)] font-bold bg-[var(--red-belt)]/10 px-4 py-2 rounded-xl border border-[var(--red-belt)]/30">
                Importante: insira o número de WhatsApp corretamente no momento da compra.
              </p>
            </div>
            <div className="w-64 h-48 flex-shrink-0">
              <div className="bg-gradient-to-br from-[var(--gray-belt)] to-[var(--black-belt)] border-4 border-[var(--red-belt)] rounded-2xl flex flex-col items-center justify-center shadow-xl w-full h-full p-0 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Image
                    src="/images/faixa-preta-energia.png"
                    alt="Ícone WhatsApp e PDF"
                    width={256}
                    height={180}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <ScrollArrow targetId="incluso" />
      </Section>

      {/* What's Included */}
      <Section id="incluso">
        <Card className="p-12" gradient>
          <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-wider flex items-center justify-center gap-3">
            📦 O que está incluso
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <FeatureItem title="Planilha de 17 semanas" description="Programa completo de condicionamento físico específico para jiu-jitsu" />
              <FeatureItem title="Bônus: Planilha de 6 semanas" description="Material extra enviado via WhatsApp após 7 dias da compra" />
              <FeatureItem title="Suporte em grupo via Telegram" description="Acesso exclusivo ao grupo de suporte e motivação" />
              <FeatureItem title="Treinos em PDF com vídeos" description="Material didático completo com links para demonstrações" />
            </div>
            
            <div className="bg-gradient-to-br from-[var(--gray-belt)]/30 to-[var(--black-belt)]/30 rounded-2xl p-8 border border-[var(--red-belt)]/20">
              <h3 className="font-black text-2xl text-[var(--red-belt)] mb-6 uppercase tracking-wide">Três tipos de treino:</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">1</div>
                  <span className="text-lg font-semibold">Força Base (aparelhos de musculação básica)</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">2</div>
                  <span className="text-lg font-semibold">Específico (halteres e peso corporal)</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">3</div>
                  <span className="text-lg font-semibold">Mobilidade (peso corporal)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a href="https://pay.hotmart.com/J97697022X?off=nnc0goo2&bid=1752639346953" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[var(--red-belt)] to-[var(--red-belt)]/90 text-white font-black px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
              💡 Promoção especial — basta clicar para começar.
            </a>
          </div>
        </Card>

        <ScrollArrow targetId="beneficios" />
      </Section>

      {/* Benefits */}
      <Section id="beneficios">
        <Card className="p-12" gradient>
          <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-wider flex items-center justify-center gap-3">
            💪 Benefícios que você vai alcançar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureItem title="Resistência específica" description="Mantenha a intensidade da luta até o fim" />
            <FeatureItem title="Aeróbico e cárdio específico" description="Foco no condicionamento respiratório para o tatame" />
            <FeatureItem title="Força e explosão" description="Mais potência e eficiência nos movimentos" />
            <FeatureItem title="Recuperação rápida" description="Esteja pronto para a próxima luta em tempo recorde" />
            <FeatureItem title="Prevenção de lesões" description="Exercícios inteligentes para fortalecer o corpo" />
            <div className="md:col-span-2 lg:col-span-1 flex justify-center items-center">
              <div className="rounded-2xl overflow-hidden border-4 border-[var(--red-belt)] shadow-xl bg-[var(--black-belt)]">
                <Image
                  src="/images/faixa-preta-energia.png"
                  alt="Faixa preta e energia"
                  width={256}
                  height={180}
                  className="object-cover w-64 h-48"
                  priority
                />
              </div>
            </div>
          </div>
        </Card>

        <ScrollArrow targetId="valor" />
      </Section>

      {/* Special Price */}
      <Section>
        <Card className="p-12 text-center border-2 border-[var(--red-belt)]/30" gradient>
          <h2 className="text-4xl font-black text-[var(--red-belt)] mb-8 uppercase tracking-wider flex items-center justify-center gap-3">
            💵 Valor especial
          </h2>
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl overflow-hidden border-4 border-[var(--red-belt)] shadow-xl bg-[var(--black-belt)] w-auto h-auto flex items-center justify-center">
          <Image
                src="/images/faixa-preta-energia.png"
                alt="Imagem do produto Gás Infinito"
                width={520}
                height={370}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <p className="text-2xl text-white/90 mb-4">
            O treinamento completo, normalmente vendido por <span className="line-through text-white/40 text-xl">R$ 400,00</span>
          </p>
          <p className="text-5xl font-black text-[var(--red-belt)] mb-6">
            R$ 59,90
          </p>
          <p className="text-xl text-white/80 mb-8">
            Menos do que uma única aula particular. Aproveite essa chance de mudar seu jogo no jiu-jitsu para sempre!
          </p>
          
          <a id="cta" href="https://pay.hotmart.com/J97697022X?off=nnc0goo2&bid=1752639346953" target="_blank" rel="noopener noreferrer" className="group inline-block bg-gradient-to-r from-[var(--red-belt)] to-[var(--red-belt)]/90 text-white font-black py-6 px-16 rounded-2xl text-3xl shadow-2xl hover:from-white hover:to-white/95 hover:text-[var(--red-belt)] border-4 border-transparent hover:border-[var(--red-belt)] transition-all duration-500 transform hover:scale-110 hover:shadow-3xl">
            <span className="inline-block group-hover:scale-110 transition-transform duration-300">Quero meu gás infinito</span>
          </a>
        </Card>

        <ScrollArrow targetId="autor" />
      </Section>

      {/* Author */}
      <Section id="autor">
        <Card className="p-12" gradient>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border-4 border-[var(--red-belt)] shadow-xl bg-[var(--black-belt)] w-80 h-80 flex-shrink-0 flex items-center justify-center mb-8 lg:mb-0">
              <Image
                src="/images/lucio-flavio.png"
                alt="Foto do professor Lúcio Flávio"
                width={320}
                height={320}
                className="object-cover w-80 h-80"
                priority
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-[var(--red-belt)] mb-8 uppercase tracking-wider flex items-center gap-3">
                🎓 Quem é Lúcio Flávio?
              </h2>
              {/* Galeria de imagens */}
              <div className="mb-8 grid grid-cols-3 sm:grid-cols-6 gap-3">
                {galeriaImgs.map((img, idx) => (
                  <button key={img} onClick={() => openModal(idx)} className="rounded-xl overflow-hidden border-2 border-[var(--red-belt)]/40 hover:border-[var(--red-belt)] shadow group focus:outline-none p-0 w-20 h-20 flex items-center justify-center bg-[var(--black-belt)]">
                    <Image
                      src={img}
                      alt={`Galeria ${idx + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full block"
                    />
                  </button>
                ))}
              </div>
              <div className="grid gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)]"></div>
                    <span className="text-lg">Bacharel em Educação Física (2010)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)]"></div>
                    <span className="text-lg">Faixa preta de jiu-jitsu (5º grau) e judô</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)]"></div>
                    <span className="text-lg">Criador da Metodologia GÁS INFINITO</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)]"></div>
                    <span className="text-lg">Autor do e-book &quot;Guia Extraordinário de Alto Rendimento para Jiu-Jitsu&quot;</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)]"></div>
                    <span className="text-lg">Preparador físico da GFTEAM e de atletas renomados</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[var(--red-belt)]/20 to-transparent p-6 rounded-2xl border-l-4 border-[var(--red-belt)]">
                <span className="font-black text-xl text-[var(--red-belt)] block mb-4 uppercase tracking-wider">Títulos de destaque:</span>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm">🏆</div>
                    <span>Bicampeão Mundial pela IBJJF (2005/2019)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm">🏆</div>
                    <span>Bicampeão Brasileiro pela CBJJ (2019/2021)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm">🏆</div>
                    <span>Tricampeão Internacional Master pela IBJJF (2016/2019)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm">🏆</div>
                    <span>Bicampeão Brasileiro por equipes (2018/2019)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal/Lightbox */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <button onClick={closeModal} className="absolute top-4 right-4 text-white text-3xl font-black bg-black/40 rounded-full p-2 hover:bg-[var(--red-belt)]/80 transition-all">×</button>
              <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-black bg-black/40 rounded-full p-2 hover:bg-[var(--red-belt)]/80 transition-all">&#60;</button>
              <div className="rounded-2xl overflow-hidden border-4 border-[var(--red-belt)] shadow-2xl bg-[var(--black-belt)] flex items-center justify-center">
          <Image
                  src={galeriaImgs[modalIdx]}
                  alt={`Galeria ${modalIdx + 1}`}
                  width={600}
                  height={600}
                  className="object-contain max-w-full max-h-[80vh]"
                />
              </div>
              <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-black bg-black/40 rounded-full p-2 hover:bg-[var(--red-belt)]/80 transition-all">&#62;</button>
            </div>
          )}
        </Card>
        {/* Instagram Box */}
        <div className="max-w-3xl mx-auto mt-10 mb-16">
          <div className="rounded-3xl shadow-2xl border-2 border-[var(--red-belt)] bg-gradient-to-br from-[var(--gray-belt)]/40 via-[var(--black-belt)]/60 to-[var(--gray-belt)]/40 p-8 flex flex-col items-center">
            <h3 className="text-2xl font-black text-[var(--red-belt)] mb-6 uppercase tracking-wider flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 448 512" fill="currentColor" className="inline-block"><path d="M224,202.66A53.34,53.34,0,1,0,277.34,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.36-30.36C293.19,117.33,224,116,224,116s-69.19,1.33-94.35,15.3a54,54,0,0,0-30.36,30.36C117.33,162.81,116,232,116,232s1.33,69.19,15.3,94.35a54,54,0,0,0,30.36,30.36C162.81,394.67,232,396,232,396s69.19-1.33,94.35-15.3a54,54,0,0,0,30.36-30.36C394.67,349.19,396,280,396,280S394.67,210.81,380.71,161.66ZM224,338a82,82,0,1,1,82-82A82,82,0,0,1,224,338Zm85.4-148.6a19.2,19.2,0,1,1-19.2-19.2A19.2,19.2,0,0,1,309.4,189.4Z"/></svg>
              Siga no Instagram
            </h3>
            <iframe
              src="https://www.instagram.com/lucioflaviopersonalbjj/embed/"
              title="Instagram de Lúcio Flávio"
              width="400"
              height="480"
              allowTransparency
              frameBorder="0"
              scrolling="no"
              allow="encrypted-media"
              className="rounded-2xl shadow-xl border border-[var(--red-belt)] bg-black w-full max-w-md"
              style={{ minHeight: 480 }}
            ></iframe>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-gradient-to-r from-[var(--black-belt)] to-[var(--gray-belt)] text-white flex flex-col items-center gap-4 text-lg mt-20 border-t border-white/10">
        <span className="font-black text-2xl tracking-widest uppercase text-center">O Segredo do GÁS INFINITO<br/>no Tatame</span>
        <span className="text-white/60">Copyright © 2025</span>
        <a href="https://www.instagram.com/humbertodev.js/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[var(--red-belt)] font-semibold transition-colors duration-300">Desenvolvido por: Humberto Azambuja</a>
      </footer>
    </div>
  );
}
