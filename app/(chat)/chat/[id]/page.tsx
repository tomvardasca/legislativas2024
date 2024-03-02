import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { Chat } from '@/components/chat'
import { nanoid } from '@/lib/utils'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  return {
    title: 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const id = nanoid()

  return <Chat id={id} />
}
