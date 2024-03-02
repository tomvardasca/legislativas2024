import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Qual a proposta do partido X para a educação?',
    message: `Qual a proposta do partido X para a educação? \n`
  },
  {
    heading: 'O que o partido Y propõe para a saúde?',
    message: 'O que o partido Y propõe para a saúde? \n'
  },
  {
    heading: 'Como o partido Z pretende abordar a questão ambiental?',
    message: 'Como o partido Z pretende abordar a questão ambiental? \n'
  },
  {
    heading: 'Quais são as principais propostas dos partidos para a economia?',
    message: `Quais são as principais propostas dos partidos para a economia? \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Bem-vindo ao Assistente para programas eleitorais dos partidos
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Este assistente foi especialmente preparado para fornecer informações sobre os programas eleitorais dos partidos para as eleições legislativas de 2024 em Portugal. Foi treinado para incluir detalhes dos programas eleitorais dos partidos. Com uma abordagem neutra e baseada em fatos, o assistente visa ajudar os eleitores a fazer escolhas informadas, sem emitir opiniões políticas ou especulações.
        </p>
        <p className="mb-2 leading-normal text-muted-foreground">
          Este assistente é limitado a 5 perguntas a cada 4 horas.
        </p>
        <p className="leading-normal text-muted-foreground">
          Pode tentar um dos seguintes exemplos:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
