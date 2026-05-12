import httpx
from backend.config.settings import settings

class AIEngine:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.base_url = "https://openrouter.ai/api/v1"

    async def get_completion(self, prompt: str, task_type: str):
        # AI Routing Engine Logic
        model = self.route_model(task_type)
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://sap-orchestra.ai",
            "X-Title": "SAP Cognitive Workflow Orchestra"
        }

        # Orchestration-aware system prompt
        system_prompt = (
            "You are the SAP Cognitive Workflow Intelligence engine. "
            "Your role is to provide enterprise-grade orchestration analysis, risk assessment, and operational diagnostics. "
            "Focus on efficiency, SLA compliance, and bottleneck remediation. "
            "Use a professional, precise, and authoritative tone suitable for C-level enterprise reporting."
        )

        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3 # Low temperature for consistent enterprise analysis
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(f"{self.base_url}/chat/completions", headers=headers, json=payload, timeout=30.0)
                if response.status_code != 200:
                    return f"AI Service Error ({response.status_code}): {response.text}"
                data = response.json()
                return data['choices'][0]['message']['content']
            except Exception as e:
                return f"AI Service Interruption: {str(e)}"

    def route_model(self, task_type: str) -> str:
        # Optimized Model Selection based on task complexity and cost
        if task_type == "workflow_summary":
            return settings.DEEPSEEK_MODEL # Efficient for summarization
        elif task_type in ["risk_analysis", "bottleneck_detection"]:
            return settings.QWEN_MODEL # Strong reasoning for analysis
        elif task_type == "executive_summary":
            return settings.GEMINI_MODEL # Excellent for high-level synthesis
        elif task_type == "copilot":
            return settings.LLAMA_MODEL # Fast and responsive for chat
        else:
            return settings.LLAMA_MODEL

    async def analyze_bottleneck(self, workflow_data: str):
        prompt = (
            f"Perform a deep bottleneck analysis on the following enterprise workflow dataset:\n{workflow_data}\n\n"
            "Identify the root cause of delays, calculate the impact on downstream processes, "
            "and provide three actionable remediation steps."
        )
        return await self.get_completion(prompt, "risk_analysis")

    async def generate_copilot_response(self, context: str, query: str):
        prompt = (
            f"Enterprise Context: {context}\n"
            f"User Query: {query}\n\n"
            "Provide an intelligent, orchestration-aware response. If the query is about system status, "
            "be specific about KPIs and any detected anomalies."
        )
        return await self.get_completion(prompt, "copilot")
