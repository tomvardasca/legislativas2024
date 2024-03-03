import {
    serviceContextFromDefaults,
    SimpleDirectoryReader,
    storageContextFromDefaults,
    VectorStoreIndex,
    LLM,
    SimpleDocumentStore,
    ContextChatEngine,
    OpenAIEmbedding,
    TextQaPrompt,
    ResponseSynthesizer,
    CompactAndRefine,
} from 'llamaindex';

export const STORAGE_CACHE_DIR = './cache';
export const CHUNK_SIZE = 1024;
export const CHUNK_OVERLAP = 20;

async function getDataSource(llm: LLM) {
    const serviceContext = serviceContextFromDefaults({
        llm,
        chunkSize: CHUNK_SIZE,
        chunkOverlap: CHUNK_OVERLAP,
        embedModel: new OpenAIEmbedding(),
    });
    let storageContext = await storageContextFromDefaults({
        persistDir: `${STORAGE_CACHE_DIR}`,
    });

    const numberOfDocs = Object.keys(
        (storageContext.docStore as SimpleDocumentStore).toDict()
    ).length;
    if (numberOfDocs === 0) {
        throw new Error(
            `StorageContext is empty - call 'npm run generate' to generate the storage first`
        );
    }
    return await VectorStoreIndex.init({
        storageContext,
        serviceContext,
        logProgress: true,
    });
}

export async function createChatEngine(llm: LLM, qaPrompt: TextQaPrompt) {
    const index = await getDataSource(llm);
    const retriever = index.asRetriever({});
    retriever.similarityTopK = 5;

    // Create an instance of response synthesizer
    const responseSynthesizer = new ResponseSynthesizer({
        responseBuilder: new CompactAndRefine(index.serviceContext, qaPrompt),
    });

    return index.asQueryEngine({ retriever, responseSynthesizer });
    // return new ContextChatEngine({
    //     chatModel: llm,
    //     retriever,
    //     contextSystemPrompt: () => "",
    // });
}