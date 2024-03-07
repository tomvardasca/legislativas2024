<a href="https://wwww.legislativas2024.chat/">
  <img alt="Eleições Legislativas Portugal 2024 AI Chatbot" src="![alt text](https://github.com/tomvardasca/legislativas2024/blob/main/app/opengraph-image.png?raw=true">
  <h1 align="center">Eleições Legislativas Portugal 2024 AI Chatbot</h1>
</a>

<p align="center">
  An open-source AI chatbot for Portugal 2024 Legislative elections built with the Vercel app template built with Next.js, the Vercel AI SDK, OpenAI, and Vercel KV. base on the Vercel Template and also using lLamaIndex.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for OpenAI (default), Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Phosphor Icons](https://phosphoricons.com)
- Rate limiting with [Vercel KV](https://vercel.com/storage/kv)
- [LlamaIndex.ts](https://ts.llamaindex.ai) LlamaIndex.TS to augment LLM models.


## Model Providers

This template ships with OpenAI `gpt-3.5-turbo` as the default. The MD from pdfs was extracted with [marker](https://github.com/VikParuchuri/marker).
To augment the LLM please run `pnpm ingest`.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

App should now be running on [localhost:3000](http://localhost:3000/).
