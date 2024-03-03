import Markdown from 'react-markdown'

const markdown = `
# Política de Privacidade 
# do Assistente IA para Programas Eleitorais
# Eleições Legislativas 2024

## 1. Introdução

Bem-vindo ao Assistente IA para Programas Eleitorais, um website dedicado a fornecer informações claras e acessíveis sobre os programas eleitorais das eleições legislativas de 2024. A sua privacidade é de extrema importância para nós. Esta Política de Privacidade estabelece como coletamos, usamos, processamos e protegemos as informações dos usuários que visitam e utilizam nosso serviço.

## 2. Informações Coletadas

Ao utilizar o Assistente IA, podemos coletar as seguintes informações:

- **Dados fornecidos pelo usuário:** Isso inclui informações que você nos fornece diretamente, como endereço de e-mail, quando se inscreve para receber atualizações ou quando entra em contato conosco através de formulários de contato.
- **Dados de uso e navegação:** Coletamos informações sobre como você acessa e usa o nosso serviço, incluindo informações sobre o dispositivo e o navegador que você usa, o seu endereço IP, as páginas visitadas e as buscas realizadas no nosso website.

## 3. Uso das Informações

Utilizamos as informações coletadas para:

- Fornecer, operar e manter nosso website;
- Melhorar, personalizar e expandir nosso website;
- Compreender e analisar como você usa nosso website;
- Desenvolver novos produtos, serviços, características e funcionalidades;
- Comunicar-se com você, diretamente ou através de um dos nossos parceiros, incluindo para atendimento ao cliente, para fornecer atualizações e outras informações relacionadas ao website, e para fins de marketing e promoção;
- Enviar e-mails e atualizações sobre os programas eleitorais, conforme solicitado pelo usuário.

## 4. Compartilhamento de Informações

Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:

- **Consentimento:** Compartilharemos suas informações com terceiros quando tivermos o seu consentimento para fazê-lo.
- **Prestadores de serviços:** Podemos compartilhar suas informações com terceiros que realizam serviços em nosso nome, como hospedagem de sites, análise de dados e entrega de e-mail.
- **Requisitos legais:** Podemos divulgar suas informações se acreditarmos que é necessário para cumprir com uma obrigação legal, proteger e defender nossos direitos ou propriedade, prevenir ou investigar possíveis irregularidades em conexão com o serviço, proteger a segurança pessoal dos usuários do serviço ou do público, e proteger contra responsabilidade legal.

## 5. Segurança das Informações

Adotamos medidas de segurança adequadas para prevenir a perda, o uso ou a alteração não autorizada das suas informações pessoais. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro e não podemos garantir a segurança absoluta das suas informações pessoais.

## 6. Direitos do Usuário

Você tem o direito de acessar, corrigir, excluir ou limitar o uso das suas informações pessoais. Se desejar exercer algum desses direitos, por favor, entre em contato conosco através dos meios fornecidos no nosso website.

## 7. Alterações à Política de Privacidade

Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações, publicando a nova Política de Privacidade nesta página. Você é aconselhado a revisar esta Política de Privacidade periodicamente para quaisquer alterações.

## 8. Contato

Se tiver alguma dúvida sobre esta Política de Privacidade, por favor, entre em contato conosco através do e-mail geral@legislativas2024.chat ou pelo formulário disponível no nosso website.

Esta política é efetiva a partir de 28 de Fevereiro de 2024.`;
export default function PrivacyPolicy() {
    return (<Markdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 p-5"
    >{markdown}</Markdown>)
}