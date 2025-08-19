'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useFacebookPixel } from "./hooks/useFacebookPixel";

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
  const baseClasses = "rounded-3xl shadow-2xl border border-white/10 backdrop-blur-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl w-full overflow-hidden";
  const bgClasses = gradient 
    ? "bg-gradient-to-br from-[var(--gray-belt)]/40 via-[var(--black-belt)]/60 to-[var(--gray-belt)]/40" 
    : "bg-[var(--gray-belt)]/30";
  
  return (
    <div id={id} className={`${baseClasses} ${bgClasses} ${className}`}>
      {children}
    </div>
  );
}

// Commented out unused component
/* function FloatingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-[var(--gray-belt)]/90 via-[var(--black-belt)]/80 to-[var(--gray-belt)]/90 border border-[var(--red-belt)]/30 rounded-3xl shadow-2xl px-8 py-6 text-white backdrop-blur-xl hover:border-[var(--red-belt)]/60 transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
} */

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
  const { trackPurchase, trackInitiateCheckout, trackLead, trackViewContent } = useFacebookPixel();
  // Commented out unused variables
  /* const floatingCards = [
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
  ]; */
  // const [cardIdx, setCardIdx] = useState(0);
  // const prevCard = () => setCardIdx((prev) => (prev === 0 ? floatingCards.length - 1 : prev - 1));
  // const nextCard = () => setCardIdx((prev) => (prev === floatingCards.length - 1 ? 0 : prev + 1));

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

  // Função para rastrear clique no CTA
  const handleCTAClick = () => {
    trackInitiateCheckout();
    trackLead();
  };

  // Função para rastrear visualização do conteúdo
  useEffect(() => {
    trackViewContent();
  }, [trackViewContent]);

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
        <div className="relative mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--gray-belt)]/80 to-[var(--black-belt)]/80 border border-[var(--red-belt)]/50 shadow-2xl backdrop-blur-xl animate-pulse">
          {/* Energy rays effect */}
          <div className="absolute -inset-0.5 bg-[var(--red-belt)]/20 rounded-full blur-md"></div>
          <div className="absolute -inset-1 bg-[var(--red-belt)]/10 rounded-full blur-lg"></div>
          <div className="absolute -inset-2 bg-[var(--red-belt)]/5 rounded-full blur-xl"></div>
          {/* Animated glow effect */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--red-belt)]/0 via-[var(--red-belt)]/30 to-[var(--red-belt)]/0 opacity-70 blur-xl"></div>
          <span className="text-sm font-bold tracking-widest text-[var(--red-belt)] uppercase">🔥 Gás Infinito – Performance Jiu-Jitsu</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9] bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent drop-shadow-2xl">
          💥 CHEGA DE FADIGA! TREINE COM EFICIÊNCIA, EM QUALQUER LUGAR, E TRANSFORME SEU GÁS DENTRO DO TATAME!
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed">
          Treino 100% prático | <span className="text-[var(--red-belt)] font-bold">Sem equipamentos</span> | Ideal para quem quer performance no jiu-jitsu mesmo com pouco tempo
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a href="https://pay.hotmart.com/U100991696O?off=npmpk04i" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-white to-white/95 text-[var(--red-belt)] font-black py-5 px-12 rounded-2xl text-2xl shadow-2xl border-2 border-transparent hover:from-[var(--red-belt)] hover:to-[var(--red-belt)]/90 hover:text-white hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl" onClick={handleCTAClick}>
            <span className="inline-block group-hover:scale-110 transition-transform duration-300">QUERO MINHA PLANILHA AGORA – De R$ 97,00 por apenas R$ 29,90</span>
          </a>
        </div>

        <ScrollArrow targetId="se-identifica" />
      </Section>

      {/* Pain Points - Você se identifica com isso? */}
      <Section id="se-identifica" className="relative">
        <Card className="p-6 sm:p-12 text-center" gradient>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-8 uppercase tracking-wider">
            Você se identifica com isso?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-10 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[var(--red-belt)]/10 to-transparent p-4 sm:p-6 rounded-2xl border-l-4 border-[var(--red-belt)] text-left flex items-start sm:items-center">
              <div className="w-8 h-8 rounded-full bg-[var(--red-belt)]/20 flex items-center justify-center text-[var(--red-belt)] font-bold text-xl mr-4 flex-shrink-0">⚠️</div>
              <p className="text-base sm:text-xl text-white/90">Fica sem gás mesmo treinando musculação?</p>
            </div>
            
            <div className="bg-gradient-to-r from-[var(--red-belt)]/10 to-transparent p-4 sm:p-6 rounded-2xl border-l-4 border-[var(--red-belt)] text-left flex items-start sm:items-center">
              <div className="w-8 h-8 rounded-full bg-[var(--red-belt)]/20 flex items-center justify-center text-[var(--red-belt)] font-bold text-xl mr-4 flex-shrink-0">⚠️</div>
              <p className="text-base sm:text-xl text-white/90">Trava na luta e perde posição por falta de força?</p>
            </div>
            
            <div className="bg-gradient-to-r from-[var(--red-belt)]/10 to-transparent p-4 sm:p-6 rounded-2xl border-l-4 border-[var(--red-belt)] text-left flex items-start sm:items-center">
              <div className="w-8 h-8 rounded-full bg-[var(--red-belt)]/20 flex items-center justify-center text-[var(--red-belt)] font-bold text-xl mr-4 flex-shrink-0">⚠️</div>
              <p className="text-base sm:text-xl text-white/90">Tem pouco tempo e não consegue treinar de forma eficiente?</p>
            </div>
            
            <div className="bg-gradient-to-r from-[var(--red-belt)]/10 to-transparent p-4 sm:p-6 rounded-2xl border-l-4 border-[var(--red-belt)] text-left flex items-start sm:items-center">
              <div className="w-8 h-8 rounded-full bg-[var(--red-belt)]/20 flex items-center justify-center text-[var(--red-belt)] font-bold text-xl mr-4 flex-shrink-0">⚠️</div>
              <p className="text-base sm:text-xl text-white/90">Já tentou treinos genéricos de academia e não sentiu evolução nenhuma no tatame?</p>
            </div>
          </div>
          
          <p className="text-2xl font-bold text-[var(--red-belt)] mb-8 max-w-4xl mx-auto bg-[var(--red-belt)]/10 p-4 rounded-xl border border-[var(--red-belt)]/30">
            📢 Você não está sozinho — e o problema não é você. É o treino errado.
          </p>
        </Card>
        <ScrollArrow targetId="oque-e" />
      </Section>

      {/* What is the Program */}
      <Section id="oque-e" className="relative">
        <Card className="p-6 sm:p-12 text-center scroll-mt-24" gradient>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-8 uppercase tracking-wider">
            O que é a Planilha de Treino do <span className="text-[var(--red-belt)]">GÁS INFINITO</span>?
          </h2>
          
          <div className="mb-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed text-left">
                <span className="font-bold text-[var(--red-belt)]">📂 PLANILHA DE TREINO COM PESO CORPORAL – ESPECÍFICA PARA JIU-JITSU</span>
              </p>
              
              <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed text-left">
                🧠 Criada pelo Professor Lúcio Flávio – Faixa Preta 5º grau, campeão mundial e criador da Metodologia GÁS INFINITO.
              </p>
              
              <div className="bg-gradient-to-br from-[var(--gray-belt)]/30 to-[var(--black-belt)]/30 rounded-2xl p-4 sm:p-6 border border-[var(--red-belt)]/20 mb-6 text-left">
                <h3 className="font-black text-lg sm:text-xl text-[var(--red-belt)] mb-4">O que está incluso:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--red-belt)] font-bold text-xl flex-shrink-0">✅</span>
                    <span className="text-white/90">Planilha em PDF com circuitos prontos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--red-belt)] font-bold text-xl flex-shrink-0">✅</span>
                    <span className="text-white/90">Exercícios com link direto para vídeos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--red-belt)] font-bold text-xl flex-shrink-0">✅</span>
                    <span className="text-white/90">Organização para facilitar a execução</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--red-belt)] font-bold text-xl flex-shrink-0">✅</span>
                    <span className="text-white/90">Bônus: Treino completo de mobilidade para prevenir lesões e aumentar amplitude</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-xl font-bold text-center bg-[var(--red-belt)]/10 p-4 rounded-xl border border-[var(--red-belt)]/30">
                📌 Ideal para treinar em casa, no tatame ou na academia.
              </p>
            </div>
            
            <div className="w-64 h-48 flex-shrink-0">
              <div className="bg-gradient-to-br from-[var(--gray-belt)] to-[var(--black-belt)] border-4 border-[var(--red-belt)] rounded-2xl flex flex-col items-center justify-center shadow-xl w-full h-full p-0 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/faixa-preta-energia.png"
                    alt="Planilha de Treino GÁS INFINITO"
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

        <ScrollArrow targetId="metodologia" />
      </Section>
      
      {/* Authority Block - Bloco de Autoridade */}
      <Section id="metodologia">
        <Card className="p-6 sm:p-12" gradient>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 uppercase tracking-wider flex items-center justify-center gap-3 text-center">
            🔬 POR QUE ESSA PLANILHA FUNCIONA DE VERDADE?
          </h2>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            📚 A metodologia GÁS INFINITO foi desenvolvida a partir de mais de 30 anos de experiência real no tatame e nos bastidores do alto rendimento e que já ajudou mais de 1900 amantes do jiu-jitsu a melhorarem seu rendimento dentro do tatame.
          </p>
          
          <div className="bg-gradient-to-br from-[var(--gray-belt)]/30 to-[var(--black-belt)]/30 rounded-2xl p-4 sm:p-8 border border-[var(--red-belt)]/20 mb-8">
            <h3 className="font-black text-xl sm:text-2xl text-[var(--red-belt)] mb-6">💪 Os pilares que você vai aplicar com essa planilha:</h3>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-lg sm:text-xl mb-3">Eficiência de Movimentação</h4>
                <p className="text-white/80">Muito mais equilíbrio, coordenação, agilidade e mobilidade. Melhor capacidade de agir e reagir na luta, além de prevenir lesões e aprender melhor as posições.</p>
              </div>
              
              <div className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-lg sm:text-xl mb-3">Resistência à Acidose</h4>
                <p className="text-white/80">Músculos com maior capacidade de utilizar e reciclar energia. Mais força, potência e Isometria. Lute mais intenso e sem morrer no gás. Recupere rápido e volte para a luta a todo vapor.</p>
              </div>
            </div>
          </div>
          
          <p className="text-xl font-bold text-center bg-[var(--red-belt)]/10 p-4 rounded-xl border border-[var(--red-belt)]/30">
            📎 Tudo isso com seu próprio peso corporal.
            <br/>
            🚫 Sem equipamentos. Sem enrolação. Sem risco de lesão por treino mal planejado.
          </p>
        </Card>
        
        <ScrollArrow targetId="depoimentos" />
      </Section>
      
      {/* Testimonials - Depoimentos */}
      <Section id="depoimentos">
        <Card className="p-6 sm:p-12" gradient>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 uppercase tracking-wider flex items-center justify-center gap-3 text-center">
            📢 Atletas que já aplicaram a Metodologia GÁS INFINITO dizem:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-[var(--gray-belt)]/20 to-[var(--black-belt)]/20 p-4 sm:p-6 rounded-2xl border border-[var(--red-belt)]/20">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="var(--red-belt)" className="mr-1">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-base sm:text-lg italic text-white/90 mb-4">&quot;Fala mestrao, passando so pra agradecer pelo treino da planilha, me deu um gás real!!! Comecei perdendo a primeira luta por 2 a 0 e ainda sim corri atrás do prejuízo e consegui vencer por 9 a 4, infelizmente perdi a final por uma má escolha mas não perdi no gás, pelo contrário, o gás me ajudou a recuperar e virar o jogo! Obrigado e parabéns pelo trabalho.&quot;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">WT</div>
                <div className="ml-3">
                  <p className="font-bold">Wallace Teixeira</p>
                  <p className="text-white/60 text-sm">Aluno Gás Infinito</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--gray-belt)]/20 to-[var(--black-belt)]/20 p-4 sm:p-6 rounded-2xl border border-[var(--red-belt)]/20">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="var(--red-belt)" className="mr-1">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-base sm:text-lg italic text-white/90 mb-4">&quot;Bom dia Sensei, tudo bem e contigo? Muito obrigado. Sei que faz pouco tempo, mas só queria dizer que estou gostando muito dos treinos! Estou voltando de alguns problemas no pulmão e já sinto que os treinos estão e farão muita diferença!&quot;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">RK</div>
                <div className="ml-3">
                  <p className="font-bold">Rodrigo Kibe</p>
                  <p className="text-white/60 text-sm">Aluno Gás Infinito</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--gray-belt)]/20 to-[var(--black-belt)]/20 p-4 sm:p-6 rounded-2xl border border-[var(--red-belt)]/20">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="var(--red-belt)" className="mr-1">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-base sm:text-lg italic text-white/90 mb-4">&quot;Mestre sua planilha me ajudou muito, eu sentia muita dificuldade nos treinos fazendo levantada técnica sentia muita dor os treinos específicos voltado para o jiu-jítsus melhorou bastante. Outra coisa que eu gostei muito é que dá pra fazer em casa. Eu gosto muito de treinar em casa e tenho alguns altares improvisados que dá pra fazer tranquilamente até com o peso do nosso corpo mesmo os treinos específicos e de mobilidade.&quot;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">VA</div>
                <div className="ml-3">
                  <p className="font-bold">Vitória Amaral</p>
                  <p className="text-white/60 text-sm">Aluna Gás Infinito</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--gray-belt)]/20 to-[var(--black-belt)]/20 p-4 sm:p-6 rounded-2xl border border-[var(--red-belt)]/20">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="var(--red-belt)" className="mr-1">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-base sm:text-lg italic text-white/90 mb-4">&quot;Boa noite mestre. A planilha de treino tem me ajudado muito a fortalecer o meu quadril, os treinos de mobilidade tem me ajudado bastante melhorando minha amplitude me sinto flexível 💪🏽. O que mais gostei da sua planilha é que posso fazer em casa até com o peso do corpo ou com alters, eu tenho alguns e dá para treinar tranquilo! Obrigado mestre Lúcio 🙏🏾&quot;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">NA</div>
                <div className="ml-3">
                  <p className="font-bold">Neto Aranha</p>
                  <p className="text-white/60 text-sm">Aluno Gás Infinito</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-gradient-to-br from-[var(--gray-belt)]/20 to-[var(--black-belt)]/20 p-4 sm:p-6 rounded-2xl border border-[var(--red-belt)]/20">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="var(--red-belt)" className="mr-1">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-base sm:text-lg italic text-white/90 mb-4">&quot;Exercícios específicos - A série de exercícios específicos me ajudaram a desenvolver coordenação motora e equilíbrio. Também percebi que o trabalho com peso corporal me ajudou a promover maior força e resistência. Uma grande vantagem desses exercícios está no aumento gradual da intensidade, permitindo minha adaptação regular e contínua com vistas à minha evolução física.<br/><br/>Exercícios de mobilidade - A série de exercícios de mobilidade me ajudaram a melhorar a amplitude do meu movimento. Os exercícios de fuga de quadril e movimento com balanço me ajudaram a corrigir a postura e manter a base forte. Senti bastante trabalho nas articulações e músculos de forma gradativa e sem riscos de lesões. Também pude sentir alívio das tensões musculares decorrentes da intensidade dos treinos anteriores.<br/><br/>Enfim, obtive muitos benefícios com os exercícios como maior controle corporal, resistência e velocidade de movimento nas lutas.&quot;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold">MF</div>
                <div className="ml-3">
                  <p className="font-bold">Mônica S de Freitas</p>
                  <p className="text-white/60 text-sm">59 anos - Aluna Gás Infinito</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <ScrollArrow targetId="valor" />
      </Section>

      {/* Special Price - Oferta e Urgência */}
      <Section id="valor">
        <Card className="p-6 sm:p-12 text-center border-2 border-[var(--red-belt)]/30" gradient>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--red-belt)] mb-8 uppercase tracking-wider flex items-center justify-center gap-3">
            💵 Valor especial
          </h2>
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl overflow-hidden border-4 border-[var(--red-belt)] shadow-xl bg-[var(--black-belt)] w-full max-w-[520px] h-auto flex items-center justify-center">
              <Image
                src="/images/faixa-preta-energia.png"
                alt="Imagem do produto Gás Infinito"
                width={520}
                height={370}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
          <div className="space-y-6 mb-8 max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl text-white/90">
              🎯 De <span className="line-through text-white/40 text-lg sm:text-xl">R$ 97,00</span> por apenas <span className="text-4xl sm:text-5xl font-black text-[var(--red-belt)]">R$ 29,90</span>
            </p>
            <div className="space-y-3 text-base sm:text-lg">
              <p className="flex items-start gap-2">
                <span className="text-[var(--red-belt)] font-bold flex-shrink-0 mt-1">💸</span>
                <span>Investimento único com acesso vitalício</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[var(--red-belt)] font-bold flex-shrink-0 mt-1">🎁</span>
                <span>BÔNUS de mobilidade incluso</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[var(--red-belt)] font-bold flex-shrink-0 mt-1">🚀</span>
                <span>Acesso imediato: Ao realizar a compra vai receber o acesso por e-mail + link dos vídeos direto na planilha</span>
              </p>
            </div>
          </div>
          
          <div className="bg-[var(--red-belt)]/20 p-4 sm:p-6 rounded-2xl border border-[var(--red-belt)]/30 mb-10 max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl font-bold">
              ⏰ ATENÇÃO: Oferta por tempo limitado.
              <br/>
              Essa condição promocional pode sair do ar a qualquer momento.
            </p>
          </div>
          
          <p className="text-lg sm:text-xl text-white/80 mb-10">
            📌 Treine onde quiser. Evolua como poucos.
          </p>
          
          <a id="cta" href="https://pay.hotmart.com/U100991696O?off=npmpk04i" target="_blank" rel="noopener noreferrer" className="group inline-block bg-gradient-to-r from-[var(--red-belt)] to-[var(--red-belt)]/90 text-white font-black py-4 sm:py-6 px-8 sm:px-16 rounded-2xl text-xl sm:text-3xl shadow-2xl hover:from-white hover:to-white/95 hover:text-[var(--red-belt)] border-4 border-transparent hover:border-[var(--red-belt)] transition-all duration-500 transform hover:scale-110 hover:shadow-3xl" onClick={handleCTAClick}>
            <span className="inline-block group-hover:scale-110 transition-transform duration-300">QUERO COMEÇAR AGORA</span>
          </a>
        </Card>

        {/* Final CTA - Call to Action Final */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[var(--gray-belt)]/80 via-[var(--black-belt)]/80 to-[var(--gray-belt)]/80 rounded-3xl shadow-2xl border-2 border-[var(--red-belt)]/40 p-6 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
              🎯 Pronto para mudar seu jogo com um treino pensado para o tatame?
            </h2>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              👊 Clique abaixo e garanta agora sua planilha:
            </p>
            
            <a href="https://pay.hotmart.com/U100991696O?off=npmpk04i" target="_blank" rel="noopener noreferrer" className="group inline-block bg-white text-[var(--red-belt)] font-black py-4 sm:py-6 px-6 sm:px-12 rounded-2xl text-xl sm:text-2xl shadow-2xl border-4 border-transparent hover:bg-[var(--red-belt)] hover:text-white hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl mb-6 break-words w-full sm:w-auto" onClick={handleCTAClick}>
              <span className="inline-block group-hover:scale-110 transition-transform duration-300">QUERO COMEÇAR AGORA - De R$ 97,00 por apenas R$ 29,90</span>
            </a>
            
            <p className="text-base sm:text-lg text-white/90">
              📥 Acesso imediato | Vídeos incluídos | Bônus liberado
            </p>
          </div>
        </div>
        
        {/* Guarantees and Support - Rodapé com garantias e suporte */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[var(--gray-belt)]/30 via-[var(--black-belt)]/30 to-[var(--gray-belt)]/30 rounded-xl p-4 sm:p-8 border border-white/10 flex flex-col md:flex-row justify-center gap-4 sm:gap-8 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] overflow-hidden rounded-full bg-[var(--red-belt)]/20 border border-[var(--red-belt)]/30 flex items-center justify-center text-[var(--red-belt)] text-2xl shadow-inner">🔒</div>
              <span className="text-base sm:text-lg">Compra 100% segura</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] overflow-hidden rounded-full bg-[var(--red-belt)]/20 border border-[var(--red-belt)]/30 flex items-center justify-center text-[var(--red-belt)] text-2xl shadow-inner">📞</div>
              <span className="text-base sm:text-lg">Suporte direto com a equipe do Professor Lúcio Flávio</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] overflow-hidden rounded-full bg-[var(--red-belt)]/20 border border-[var(--red-belt)]/30 flex items-center justify-center text-[var(--red-belt)] text-2xl shadow-inner">📩</div>
              <span className="text-base sm:text-lg">Entrega imediata no seu e-mail após confirmação do pagamento</span>
            </div>
          </div>
        </div>
        
        <ScrollArrow targetId="autor" />
      </Section>

      {/* Author */}
      <Section id="autor">
        <Card className="p-6 sm:p-12" gradient>
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border-4 border-[var(--red-belt)] shadow-xl bg-[var(--black-belt)] w-full max-w-[320px] h-auto flex-shrink-0 flex items-center justify-center mb-8 lg:mb-0">
              <Image
                src="/images/lucio-flavio.png"
                alt="Foto do professor Lúcio Flávio"
                width={320}
                height={320}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--red-belt)] mb-4 uppercase tracking-wider flex items-center gap-3">
                🎓 Quem é Lúcio Flávio?
              </h2>
              
              <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
                🎯 Sou o criador da Metodologia GÁS INFINITO, um método específico para melhorar a performance no jiu-jitsu com foco em:
              </p>
              
              <div className="space-y-3 mb-6">
                <p className="text-base sm:text-lg bg-white/5 p-3 rounded-lg">Eficiência de movimentação</p>
                <p className="text-base sm:text-lg bg-white/5 p-3 rounded-lg">Resistência à fadiga e acidose</p>
                <p className="text-base sm:text-lg bg-white/5 p-3 rounded-lg">Prevenção de lesões</p>
                <p className="text-base sm:text-lg bg-white/5 p-3 rounded-lg">Treinos práticos e específicos para a luta</p>
              </div>
              
              <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
                👨‍🏫 Também sou:
              </p>
              {/* Galeria de imagens */}
              <div className="mb-8 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                {galeriaImgs.map((img, idx) => (
                  <button key={img} onClick={() => openModal(idx)} className="rounded-xl overflow-hidden border-2 border-[var(--red-belt)]/40 hover:border-[var(--red-belt)] shadow group focus:outline-none p-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-[var(--black-belt)]">
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
              <div className="grid gap-4 sm:gap-6 mb-8">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)] mt-2"></div>
                    <span className="text-base sm:text-lg">Criador do Curso de Alto Rendimento para Aulas de Jiu-Jitsu</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)] mt-2"></div>
                    <span className="text-base sm:text-lg">Autor do eBook &quot;Guia Extraordinário de Alto Rendimento&quot; com 88 modelos prontos para aulas</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)] mt-2"></div>
                    <span className="text-base sm:text-lg">Professor responsável pelo treino de competição da Equipe GFTEAM na Matriz no Rio de Janeiro, Brasil</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)] mt-2"></div>
                    <span className="text-base sm:text-lg">Responsável pelo módulo de alto rendimento do Curso de Instrutores da GFTEAM</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)] mt-2"></div>
                    <span className="text-base sm:text-lg">Coordenador de cursos da GFTEAM</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-[var(--red-belt)] mt-2"></div>
                    <span className="text-base sm:text-lg">Preparador físico de atletas de elite, como: Thamires Aquino, Ricardo Evangelista, Patrick Gaudio, Jhennifer Aquino, Maria Delahaye, Flávia Soares, Rodrigo Souza, Letícia Gomes... e muitos outros</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[var(--red-belt)]/20 to-transparent p-4 sm:p-6 rounded-2xl border-l-4 border-[var(--red-belt)]">
                <span className="font-black text-lg sm:text-xl text-[var(--red-belt)] block mb-4 uppercase tracking-wider">Títulos de destaque:</span>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">🏆</div>
                    <span className="text-base sm:text-lg">Bi-Campeão Mundial IBJJF (2005 / 2019)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">🏆</div>
                    <span className="text-base sm:text-lg">Tri-Campeão Brasileiro CBJJ (2019 / 2021 / 2025)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">🏆</div>
                    <span className="text-base sm:text-lg">Tri-Campeão Internacional Master IBJJF (2016 / 2018 / 2019)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--red-belt)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">🏆</div>
                    <span className="text-base sm:text-lg">Bi-Campeão Brasileiro por Equipes CBJJ (2018 / 2019)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal/Lightbox - Close button above image */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm overflow-auto py-12 px-4">
              <div className="relative max-w-full max-h-full flex flex-col items-center">
                {/* Close button positioned above the image */}
                <div className="w-full flex justify-end mb-4">
                  <button 
                    onClick={closeModal} 
                    className="text-white text-4xl font-black bg-[var(--red-belt)] rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[var(--red-belt)]/80 transition-all"
                    aria-label="Fechar"
                  >
                    ×
                  </button>
                </div>
                
                <div className="rounded-xl overflow-hidden border-4 border-[var(--red-belt)] shadow-2xl bg-[var(--black-belt)] flex items-center justify-center">
                  <Image
                    src={galeriaImgs[modalIdx]}
                    alt={`Galeria ${modalIdx + 1}`}
                    width={600}
                    height={600}
                    className="object-contain max-w-full max-h-[70vh]"
                  />
                </div>
                
                {/* Navigation buttons below image on mobile, on sides for larger screens */}
                <div className="w-full flex justify-between mt-4 sm:mt-0">
                  <button 
                    onClick={prevImg} 
                    className="sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2 text-white text-3xl font-black bg-black/60 rounded-full p-3 hover:bg-[var(--red-belt)] transition-all"
                    aria-label="Imagem anterior"
                  >
                    &#60;
                  </button>
                  <button 
                    onClick={nextImg} 
                    className="sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2 text-white text-3xl font-black bg-black/60 rounded-full p-3 hover:bg-[var(--red-belt)] transition-all"
                    aria-label="Próxima imagem"
                  >
                    &#62;
                  </button>
                </div>
              </div>
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
