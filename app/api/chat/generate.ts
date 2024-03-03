import { OpenAIEmbedding, SimpleDirectoryReader, VectorStoreIndex, serviceContextFromDefaults, storageContextFromDefaults, OpenAI, ServiceContext } from "llamaindex";
import { CHUNK_OVERLAP, CHUNK_SIZE, STORAGE_CACHE_DIR } from "./utils";

const STORAGE_DIR = './docs';

async function getRuntime(func: Function) {
    const start = Date.now();
    await func();
    const end = Date.now();
    return end - start;
}

async function generateDatasource(serviceContext: ServiceContext) {
    console.log(`Generating storage context...`);
    // Split documents, create embeddings and store them in the storage context
    const ms = await getRuntime(async () => {
        const storageContext = await storageContextFromDefaults({
            persistDir: STORAGE_CACHE_DIR,
        });
        const documents = await new SimpleDirectoryReader().loadData({
            directoryPath: STORAGE_DIR,

        });
        documents.forEach(document => {
            document.text = document.text.replaceAll('\n', ' ');
            document.text = document.text.replaceAll('\r', ' ');
        });
        console.log({ documents }, documents.length)
        await VectorStoreIndex.fromDocuments(documents, {
            storageContext,
            serviceContext,
            logProgress: true
        });
        const numberOfDocs = Object.keys(
            (storageContext.docStore as any).toDict()
        ).length;
        console.log({ numberOfDocs, storageContext });
    });
}

(async () => {
    const serviceContext = serviceContextFromDefaults({
        llm: new OpenAI({
            model: 'gpt-3.5-turbo-16k',
            apiKey: process.env.OPENAI_API_KEY,
            temperature: 0.3,
        }),
        chunkSize: CHUNK_SIZE,
        chunkOverlap: CHUNK_OVERLAP,
        embedModel: new OpenAIEmbedding(),
    });

    await generateDatasource(serviceContext);
    console.log('Finished generating storage.');
})();