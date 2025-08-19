# 🥋 Gás Infinito - Landing Page

Landing page para o produto **Gás Infinito** - Planilha de Treino específica para jiu-jitsu, desenvolvida com Next.js 14 e TypeScript.

## ✨ Funcionalidades Implementadas

### 🎯 **Facebook Pixel**
- ✅ Pixel configurado com ID: `1751428175392069`
- ✅ Rastreamento automático de PageView
- ✅ Rastreamento de eventos de conversão (Lead, InitiateCheckout)
- ✅ Hook personalizado para rastreamento de eventos
- ✅ Configurações centralizadas e fáceis de manter

### 🎨 **Design e UX**
- ✅ Interface moderna e responsiva
- ✅ Animações suaves e interativas
- ✅ Galeria de imagens com modal
- ✅ Scroll suave entre seções
- ✅ Botões de CTA otimizados

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Hooks** - Gerenciamento de estado
- **Facebook Pixel** - Rastreamento de conversões

## 📁 Estrutura do Projeto

```
gas-infinito-lp/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── FacebookPixel.tsx
│   │   ├── config/
│   │   │   └── facebookPixel.ts
│   │   ├── hooks/
│   │   │   └── useFacebookPixel.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   └── images/
└── README.md
```

## ⚙️ Configuração

### 1. **Instalação**
```bash
npm install
```

### 2. **Executar em Desenvolvimento**
```bash
npm run dev
```

### 3. **Build para Produção**
```bash
npm run build
npm start
```

## 🔧 Configurações Personalizáveis

### **Facebook Pixel**
- ID do pixel configurável via arquivo de configuração
- Eventos personalizáveis
- Hook reutilizável para outras páginas

## 📊 Eventos Rastreados

- **PageView** - Visualização da página
- **ViewContent** - Visualização do produto
- **InitiateCheckout** - Clique nos CTAs
- **Lead** - Geração de leads
- **Purchase** - Compra (quando implementado)

## 🎨 Personalização

### **Cores**
As cores estão definidas como variáveis CSS no arquivo `globals.css`:
- `--red-belt`: #C4121F (Vermelho principal)
- `--black-belt`: #000000 (Preto)
- `--gray-belt`: #1a1a1a (Cinza escuro)
- `--white-belt`: #ffffff (Branco)

### **Fontes**
- **Geist Sans** - Fonte principal
- **Geist Mono** - Fonte monospace

## 📱 Responsividade

A landing page é totalmente responsiva e otimizada para:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops
- 📺 Telas grandes

## 📈 Analytics e Conversão

- **Facebook Pixel** para rastreamento de conversões
- **Eventos personalizados** para análise detalhada
- **Rastreamento de leads** e cliques nos CTAs
- **Dados para campanhas** do Facebook Ads

## 🚀 Deploy

### **Vercel (Recomendado)**
```bash
npm run build
vercel --prod
```

### **Outros**
A aplicação pode ser deployada em qualquer plataforma que suporte Next.js.

## 📞 Suporte

- **Desenvolvedor**: Humberto Azambuja
- **Instagram**: [@humbertodev.js](https://www.instagram.com/humbertodev.js/)
- **Produto**: Gás Infinito - Professor Lúcio Flávio

## 📄 Licença

Este projeto foi desenvolvido especificamente para o produto Gás Infinito. Todos os direitos reservados.

---

**🎯 Transforme seu gás no tatame com a metodologia Gás Infinito!**
