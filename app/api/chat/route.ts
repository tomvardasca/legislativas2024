import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import {
  JSONValue,
  createCallbacksTransformer,
  createStreamDataTransformer,
  experimental_StreamData,
  trimStartOfStreamHelper,
  type AIStreamCallbacksAndOptions,
} from 'ai';
import {
  MessageContent,
  OpenAI,
  OpenAIAgent,
  QueryEngineTool,
  SimpleDirectoryReader,
  TextQaPrompt,
  VectorStoreIndex,
} from "llamaindex";
import { Response } from 'llamaindex';
import { createChatEngine } from './utils';

type ParserOptions = {
  image_url?: string;
};

function createParser(
  res: AsyncIterable<Response>,
  data: experimental_StreamData,
  opts?: ParserOptions
) {
  const it = res[Symbol.asyncIterator]();
  const trimStartOfStream = trimStartOfStreamHelper();
  return new ReadableStream<string>({
    start() {
      // if image_url is provided, send it via the data stream
      if (opts?.image_url) {
        const message: JSONValue = {
          type: 'image_url',
          image_url: {
            url: opts.image_url,
          },
        };
        data.append(message);
      } else {
        data.append({}); // send an empty image response for the user's message
      }
    },
    async pull(controller): Promise<void> {
      const { value, done } = await it.next();
      if (done) {
        controller.close();
        data.append({}); // send an empty image response for the assistant's message
        data.close();
        return;
      }

      const text = trimStartOfStream(value.response ?? '');
      if (text) {
        controller.enqueue(text);
      }
    },
  });
}

export function LlamaIndexStream(
  res: AsyncIterable<Response>,
  opts?: {
    callbacks?: AIStreamCallbacksAndOptions;
    parserOptions?: ParserOptions;
  }
): { stream: ReadableStream; data: experimental_StreamData } {
  const data = new experimental_StreamData();
  return {
    stream: createParser(res, data, opts?.parserOptions)
      .pipeThrough(createCallbacksTransformer(opts?.callbacks))
      .pipeThrough(createStreamDataTransformer(true)),
    data,
  };
}

export const dynamic = 'force-dynamic';

export const runtime = 'nodejs'

const convertMessageContent = (
  textMessage: string,
  imageUrl: string | undefined
): MessageContent => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: 'text',
      text: textMessage,
    },
    {
      type: 'image_url',
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

// Define a custom prompt
const newTextQaPrompt = (history: any[]): TextQaPrompt => ({ context, query }) => {
  return `Please ALWAYS repondes in portuguese from Portugal. Como assistente, o meu objetivo é ajudar a esclarecer dúvidas sobre os programas eleitorais dos partidos políticos para as eleições legislativas de 2024 em Portugal. 
  Fornecerei informações precisas e atualizadas sobre as propostas dos partidos, destacando áreas-chave como economia, saúde, educação e meio ambiente.  
  Incorporarei também informações detalhadas sobre o processo eleitoral, com base nos documentos fornecidos, incluindo cadernos de apoio, informações sobre o voto de mobilidade e esclarecimentos para o dia da eleição em território nacional. 
  Evitarei opiniões políticas ou especulações, focando-me em factos. Se necessário, posso pedir esclarecimentos para garantir respostas precisas. A minha comunicação será clara, direta e imparcial, adaptando-me ao nível de conhecimento do usuário sobre o tema. 
  O PSD fez uma coligação com o CDS-PP e com o PPM, esta coligação é a AD - Aliança Democrática.
  Os partidos que vão a eleições são: 
  PS - Partido Socialista	com ideologias de Social democracia	e posicionado na Centro-esquerda, tem como líder Pedro Nuno Santos e tem como slogan "Mais Ação" e "Portugal Inteiro".
  AD - Aliança Democrática, coligação com  PSD(Partido Social Democrata) CDS-PP(CDS-Partido Popular) e o PPM (Partido Popular Monárquico) com ideologias de Reformismo, Conservadorismo liberal, Democracia cristã, Liberalismo económico, e posicionado na Centro-direita a direita, tem como líder	Luís Montenegro e slogan "Acreditar na Mudança"
  CH - Chega com ideologias de Conservadorismo nacional e Populismo de direita, posicionado na Extrema-direita, tem como líder André Ventura e slogan "Limpar Portugal"
  IL - Iniciativa Liberal	 com ideologias de Liberalismo clássico e Liberalismo económico, posicionado na Centro-direita, tem como líder Rui Rocha e slogan "Portugal com Futuro"
  BE - Bloco de Esquerdacom ideologias de Socialismo democrático, posicionado	Extrema-esquerda, tem como líder Mariana Mortágua e tem como slogan "Não lhes dês descanso"
  PCP-PEV	- Coligação Democrática Unitária(CDU), coligação com Partido Comunista Português(PCP) e Partido Ecologista "Os Verdes"(PEV), com ideologias Comunismo, Marxismo-leninismo, Ecossocialismo e posiciona-se à Esquerda e
  Extrema-esquerda, tem como líder Paulo Raimundo e slogan "Mais CDU, vida melhor"
  PAN - Pessoas Animais Natureza, tem como ideologias o Bem estar animal e o Ambientalismo, posiciona-se no Centro a
  Centro-esquerda, tem como líder	Inês Sousa Real e slogan "Avançamos pelas Causas"
  L - LIVRE tem como ideologias o	Ecossocialismo e Pró-europeísmo, e posiciona-se à Esquerda, os líderes é Rui Tavares e Teresa Mota e o slogan: "Contrato com o Futuro"
  R.I.R. - Reagir Incluir Reciclar com ideologias	Humanismo, Pacifismo e Ambientalismo, é Sincrético e o líder Márcia Henriques
  PCTP/MRPP -	Partido Comunista dos Trabalhadores Portugueses com ideologias	Marxismo-Leninismo-Maoísmo e Comunismo, posicionado à Extrema-esquerda e com a líder Cidália Guerreiro
  ADN	- Alternativa Democrática Nacional com a ideologia Conservadorismo nacional e
  Conservadorismo social, posicionado à Extrema-direita e com o líder	Bruno Fialho.
  JPP	- Juntos pelo Povo	com ideologia Catch-all party e Regionalismo, posiciona-se no Centro-esquerda e tem como líder Élvio Sousa.
  A21	- Alternativa 21, coligação entre o Partido da Terra(MPT) e o Aliança(A), com ideologias Conservadorismo verde e Liberalismo económico, posicionado à Centro-direita e com o líder Pedro Pimenta e Jorge Nuno de Sá
  VP - Volt Portugal com ideologia de Social Liberalismo e Federalismo Europeu, posicionado ao Centro, e com os líderes Ana Carvalho e Duarte Costa.
  E - Ergue-te, com ideologias de Nacionalismo português e Anti-imigração, posicionado à Extrema-direita e com o líder José Pinto Coelho
  NC - Nós, Cidadãos!	com uma ideologia de Liberalismo, posicionad de	Centro-direita a direita, com o líder Joaquim Rocha Afonso
  PTP - Partido Trabalhista Português	com ideologia de Socialismo democrático, Social-democracia, Trabalhismo e Pró-europeísmo, posicionado de Centro a Centro-esquerda e com o líder Amândio Madaleno
  ND - Nova Direita com ideologia de Conservadorismo e Liberalismo Económico, posicionado à Direita e com a líder Ossanda Liber
  . NÃO TENTAREI inventar uma resposta.
  Quando perguntado sobre os programa eleitoral dos partidos PCTP/MRPP, JPP, A21, NC, e PTP, informarei que ainda não publicaram o seu programa eleitoral para as eleições legislativas de 2024.
  Se a pergunta não está relacionada com o contexto, responde afávelmente que apenas podes responder sobre o contexto que foste treinado.
  As respostas serão SEMPRE em português de Portugal.

  A informação de context está em baixo:
  ---------------------
  ${context}
  ---------------------

  O histórico de mensagens:
  ---------------------
  ${history.map(h => h.content).join("\n")}
  ---------------------
  
  A respostas será SEMPRE em português de Portugal.
  Questão: ${query}
  Resposta em markdown:`;
};

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  // const userId = (await auth())?.user.id

  // if (!userId) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   })
  // }

  const userMessage = messages.pop();

  const llm = new OpenAI({
    model: 'gpt-3.5-turbo-16k',
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.3,

  });


  const chatEngine = await createChatEngine(llm, newTextQaPrompt(messages));

  // Calling LlamaIndex's ChatEngine to get a streamed response
  // const response = await chatEngine.chat({
  //   message: userMessage.content,
  //   chatHistory: messages,
  //   stream: true,
  // });



  const response = await chatEngine.query({
    query: userMessage.content,
    stream: true,
  });

  // Transform LlamaIndex stream to Vercel/AI format
  const { stream, data: streamData } = LlamaIndexStream(response);


  // Return a StreamingTextResponse, which can be consumed by the Vercel/AI client
  return new StreamingTextResponse(stream, {}, streamData);


  // if (previewToken) {
  //   openai.apiKey = previewToken
  // }

  // const res = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages,
  //   temperature: 0.7,
  //   stream: true
  // })

  // const stream = OpenAIStream(res, {
  //   async onCompletion(completion) {
  //     const title = json.messages[0].content.substring(0, 100)
  //     const id = json.id ?? nanoid()
  //     const createdAt = Date.now()
  //     const path = `/chat/${id}`
  //     const payload = {
  //       id,
  //       title,
  //     //  userId,
  //       createdAt,
  //       path,
  //       messages: [
  //         ...messages,
  //         {
  //           content: completion,
  //           role: 'assistant'
  //         }
  //       ]
  //     }
  //     // await kv.hmset(`chat:${id}`, payload)
  //     // await kv.zadd(`user:chat:${userId}`, {
  //     //   score: createdAt,
  //     //   member: `chat:${id}`
  //     // })
  //   }
  // })

  // return new StreamingTextResponse(stream)
}
