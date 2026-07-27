## Atualizações de conteúdo

### 1. Serviços (`src/components/Services.tsx`)
- Remover "teste do pezinho" da descrição de "Sala de Vacinação".
- Criar novo card "Teste do Pezinho" — disponível **todos os dias**.
- Atualizar card "Testes Rápidos" listando: **HIV, Sífilis, Hepatites B e C, Gravidez, COVID-19 e Dengue**.
- Adicionar nota sobre teste rápido de gravidez: 2h de retenção urinária (preferência 1ª urina da manhã) e mínimo 7 dias de atraso menstrual.

### 2. Equipe (`src/components/Team.tsx`)
Substituir a grade genérica por uma organização por blocos nominais:

- **Recepção & Administrativo**
  - Samuel Gomes (manhã/tarde – Sulclean)
  - Raphaella (manhã – Jovem Aprendiz CIEE)
  - Helena (tarde – Jovem Aprendiz CIEE)
  - Camilla Lovato – Agente Administrativa

- **ESF Área 19**
  - Dr. Lucas de Almeida (médico)
  - Enf. Maria das Graças (RT), Enf. Residente Vanessa (Obstetrícia), Téc. Enf. Ezedir
  - ACS: Carina, Patrícia, Iolanda, Mariele, Cláudia

- **ESF Área 20**
  - Dra. Cátia Augusta (médica)
  - Enf. Denise Vedootto (RT), Enf. Residente Anny (Obstetrícia), Téc. Enf. Mariana
  - ACS: Giovanni, Mara Paz, Maristela, Elisane (afastada por laudo)

- **Saúde Bucal**
  - Dentista Sabrina — atende toda a população adscrita, sem divisão por áreas, com agendamento próprio.

- **Serviços Gerais**
  - Jocélia (Sulclean)

Layout: cards agrupados por equipe, com ícone, cargo em destaque e lista de nomes.

### 3. Rodapé (`src/components/Footer.tsx`)
- Adicionar link da página do Facebook ao lado do Instagram: `https://www.facebook.com/profile.php?id=61579852984607&locale=pt_BR`.

### 4. Chatbot (`src/components/Chatbot.tsx`)
- Atualizar FAQ de testes rápidos com a lista completa (HIV, Sífilis, Hepatites B/C, Gravidez, COVID, Dengue) e as orientações do teste de gravidez.
- Nova FAQ "teste do pezinho" → disponível todos os dias.
- Atualizar FAQ de vacinação removendo pezinho.
- Adicionar Facebook nas respostas sobre redes sociais/contato.

### 5. Formulário de agendamento (`src/components/BookingForm.tsx`)
- Adicionar "Teste do Pezinho" às especialidades.
- Atualizar rótulo dos testes rápidos: "Testes Rápidos (HIV, sífilis, hepatites, gravidez, COVID, dengue)".

Nenhuma alteração de backend/banco.
