# Facebook Pixel - Gás Infinito Landing Page

## Configuração Implementada

### ID do Pixel
- **Pixel ID**: `1751428175392069`
- **Token de Acesso**: Configurado no arquivo de configuração

### Arquivos Implementados

1. **`src/app/components/FacebookPixel.tsx`**
   - Componente principal que carrega o script do Facebook Pixel
   - Inicializa o pixel com o ID configurado
   - Rastreia automaticamente PageView

2. **`src/app/hooks/useFacebookPixel.ts`**
   - Hook personalizado para rastrear eventos
   - Funções para diferentes tipos de eventos (Purchase, Lead, ViewContent, etc.)

3. **`src/app/config/facebookPixel.ts`**
   - Configurações centralizadas do pixel
   - Informações do produto e eventos disponíveis

4. **`src/app/layout.tsx`**
   - Integra o componente FacebookPixel no layout principal

5. **`src/app/page.tsx`**
   - Implementa rastreamento de eventos nos botões de CTA
   - Rastreia visualização de conteúdo e cliques nos botões

### Eventos Rastreados

- **PageView**: Carregamento da página
- **ViewContent**: Visualização do conteúdo do produto
- **InitiateCheckout**: Clique nos botões de CTA
- **Lead**: Geração de leads através dos CTAs
- **Purchase**: Compra do produto (quando implementado)

### Como Funciona

1. **Carregamento Automático**: O pixel é carregado automaticamente em todas as páginas
2. **Rastreamento de Página**: Cada visualização de página é rastreada
3. **Rastreamento de Conteúdo**: A visualização do produto é rastreada
4. **Rastreamento de Conversão**: Cliques nos botões de CTA são rastreados como leads e início de checkout

### Configurações do Produto

- **Nome**: Gás Infinito - Planilha de Treino
- **Preço**: R$ 29,90
- **Moeda**: BRL (Real Brasileiro)
- **Categoria**: Product

### Monitoramento

Para monitorar o funcionamento do pixel:

1. **Facebook Events Manager**: Acesse o painel do Facebook
2. **Test Events**: Use a ferramenta de teste de eventos
3. **Console do Navegador**: Verifique se não há erros JavaScript
4. **Facebook Pixel Helper**: Extensão do Chrome para debug

### Manutenção

- As configurações estão centralizadas no arquivo `config/facebookPixel.ts`
- Para alterar o ID do pixel, modifique apenas o arquivo de configuração
- O hook `useFacebookPixel` pode ser reutilizado em outras páginas

### Segurança

- O token de acesso está configurado no lado do cliente
- Para maior segurança, considere mover configurações sensíveis para variáveis de ambiente
- O pixel rastreia apenas eventos de conversão e não coleta dados pessoais sensíveis
