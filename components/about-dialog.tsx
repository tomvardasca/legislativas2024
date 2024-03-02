import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { type DialogProps } from '@radix-ui/react-dialog'

export function AboutDialog(props: DialogProps) {
  return (<Dialog {...props}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sobre</DialogTitle>
        <DialogDescription>
          Assistente de IA para programas eleitorais dos partidos para as Eleições Legislativas 2024
        </DialogDescription>
      </DialogHeader>
      <div className="p-4 space-y-1 text-sm border rounded-md">
        Este assistente IA foi treinado nos Programas Eleitorais publicados nos websites dos partidos.
        Para contactos os exclarecimentos envie email para <a href='mailto:geral@legislativas2024.chat'>geral@legislativas2024.chat</a>
      </div>
    </DialogContent>
  </Dialog>);
}