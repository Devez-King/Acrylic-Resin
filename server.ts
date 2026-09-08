import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for AI-powered executive report generation & Q&A
app.post("/api/ai-insights", async (req, res) => {
  try {
    const { promptType, customQuery } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on the server. Please check your environment variables or secrets.",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let systemInstruction = `You are a senior chemical industry market research analyst and strategy consultant specializing in specialty chemicals, polymers, and acrylic resin markets. Provide professional, data-driven, executive-level insights in Korean (한국어) suitable for C-level corporate reporting and strategic planning. Use precise industry terminology (e.g., Solid Type, Solution Type, VOC 규제, 고형분, 수성 에멀젼, CAGR, M&A 동향).`;

    let userPrompt = "";
    if (promptType === "executive_summary") {
      userPrompt = `아크릴 수지(Acrylic Resin) 글로벌 시장조사 보고서에 대한 핵심 경영진 요약(Executive Summary)을 작성해 주세요. 
      - 글로벌 시장 규모 및 성장 전망 (2024년 ~ 2030년 예상 CAGR 약 6.2%)
      - Solid Type vs Solution Type 시장 트렌드 및 기술적 차별성
      - 글로벌 Top 10 제조사 경쟁 구도 (Arkema, BASF, Dow, Evonik 등)
      - 주요 Application(도료, 접착제, 건축, 전자 등)별 수요 동향 및 기회 요인
      전문적이고 구조화된 마크다운 형식으로 작성해 주십시오.`;
    } else if (promptType === "swot") {
      userPrompt = `현재 글로벌 아크릴 수지 시장에 대한 종합 SWOT 분석(Strength, Weakness, Opportunity, Threat)을 작성해 주세요. 친환경 규제(VOC), 원가 변동, 신흥국 수요 중심으로 전문적인 분석을 제공해 주십시오.`;
    } else if (promptType === "strategy") {
      userPrompt = `글로벌 화학/소재 기업 관점에서 아크릴 수지 사업 다각화 및 고부가 고형 타입(Solid Type) 전환 전략을 위한 3가지 핵심 제언을 도출해 주세요.`;
    } else if (customQuery) {
      userPrompt = `사용자 질문: "${customQuery}"에 대해 글로벌 아크릴 수지 시장 데이터 및 산업 동향을 바탕으로 전문적인 답변을 제공해 주세요.`;
    } else {
      userPrompt = `아크릴 수지 시장조사 보고서에 대한 최신 동향과 인사이트를 요약해 주세요.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    res.json({
      success: true,
      insight: response.text || "AI 분석 결과를 생성하지 못했습니다.",
    });
  } catch (error: any) {
    console.error("AI Insights Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "AI 인사이트 생성 중 오류가 발생했습니다.",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
