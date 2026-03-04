import os
import httpx
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

GENAI_BASE_URL = "https://genailab.tcs.in"
GENAI_API_KEY = os.getenv("GENAI_API_KEY")

client = httpx.Client(verify=False)

# ------------------------
# Model Registry
# ------------------------

deepseek_r1 = ChatOpenAI(
    base_url=GENAI_BASE_URL,
    model="azure_ai/genailab-maas-DeepSeek-R1",
    api_key=GENAI_API_KEY,
    http_client=client,
    temperature=0.2
)

gpt4o = ChatOpenAI(
    base_url=GENAI_BASE_URL,
    model="azure/genailab-maas-gpt-4o",
    api_key=GENAI_API_KEY,
    http_client=client,
    temperature=0.3
)

gpt4o_mini = ChatOpenAI(
    base_url=GENAI_BASE_URL,
    model="azure/genailab-maas-gpt-4o-mini",
    api_key=GENAI_API_KEY,
    http_client=client,
    temperature=0.2
)

deepseek_v3 = ChatOpenAI(
    base_url=GENAI_BASE_URL,
    model="azure_ai/genailab-maas-DeepSeek-V3-0324",
    api_key=GENAI_API_KEY,
    http_client=client,
    temperature=0.2
)

llama_33 = ChatOpenAI(
    base_url=GENAI_BASE_URL,
    model="azure_ai/genailab-maas-Llama-3.3-70B-Instruct",
    api_key=GENAI_API_KEY,
    http_client=client,
    temperature=0.4
)

embeddings_model = OpenAIEmbeddings(
    base_url=GENAI_BASE_URL,
    model="azure/genailab-maas-text-embedding-3-large",
    api_key=GENAI_API_KEY,
    http_client=client
)