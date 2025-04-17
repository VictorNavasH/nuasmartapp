import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || ""
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || ""
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""

interface GeminiRequest {
  prompt: string
  restaurantId: string
  contextType?: "financial" | "operational" | "credits" | "forecasts" | "all"
  timeframe?: "month" | "quarter" | "year" | "all"
}

serve(async (req) => {
  // Manejar preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    // Crear cliente de Supabase con rol de servicio para acceder a todos los datos
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Extraer datos de la solicitud
    const { prompt, restaurantId, contextType = "all", timeframe = "month" } = (await req.json()) as GeminiRequest

    // Verificar que tenemos todos los datos necesarios
    if (!prompt || !restaurantId) {
      return new Response(JSON.stringify({ error: "Se requiere prompt y restaurantId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Obtener datos de contexto según el tipo solicitado
    const context = await getContextData(supabase, restaurantId, contextType, timeframe)

    // Preparar el prompt para Gemini con el contexto
    const enhancedPrompt = preparePromptWithContext(prompt, context)

    // Llamar a la API de Gemini
    const geminiResponse = await callGeminiAPI(enhancedPrompt)

    // Devolver la respuesta
    return new Response(
      JSON.stringify({
        response: geminiResponse,
        context: context.summary, // Incluir resumen del contexto para referencia
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})

async function getContextData(supabase, restaurantId, contextType, timeframe) {
  const context = {
    financial: null,
    operational: null,
    credits: null,
    forecasts: null,
    summary: "",
  }

  // Determinar el rango de fechas según el timeframe
  const { startDate, endDate } = getDateRange(timeframe)

  // Obtener datos según el tipo de contexto solicitado
  if (contextType === "all" || contextType === "financial") {
    const { data: financialData } = await supabase
      .from("financial_metrics")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false })

    context.financial = financialData

    // Calcular métricas financieras clave
    if (financialData && financialData.length > 0) {
      const totalRevenue = financialData.reduce((sum, item) => sum + (item.revenue || 0), 0)
      const totalCosts = financialData.reduce((sum, item) => sum + (item.costs || 0), 0)
      const avgTicket = financialData.reduce((sum, item) => sum + (item.average_ticket || 0), 0) / financialData.length
      const avgOccupation =
        financialData.reduce((sum, item) => sum + (item.occupation_rate || 0), 0) / financialData.length

      context.summary += `Resumen financiero (${timeframe}): Ingresos totales: €${totalRevenue.toFixed(2)}, Costes totales: €${totalCosts.toFixed(2)}, Ticket medio: €${avgTicket.toFixed(2)}, Ocupación media: ${avgOccupation.toFixed(2)}%. `
    }
  }

  if (contextType === "all" || contextType === "operational") {
    const { data: operationalData } = await supabase
      .from("operational_data")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false })

    context.operational = operationalData

    // Añadir resumen operativo
    if (operationalData && operationalData.length > 0) {
      const totalCustomers = operationalData.reduce((sum, item) => sum + (item.customers || 0), 0)
      const totalTables = operationalData.reduce((sum, item) => sum + (item.tables || 0), 0)

      context.summary += `Resumen operativo: ${totalCustomers} comensales atendidos, ${totalTables} mesas servidas. `
    }
  }

  if (contextType === "all" || contextType === "credits") {
    const { data: creditsData } = await supabase.from("credits").select("*").eq("restaurant_id", restaurantId)

    context.credits = creditsData

    // Añadir resumen de créditos
    if (creditsData && creditsData.length > 0) {
      const totalDebt = creditsData.reduce((sum, item) => sum + (item.pending_balance || 0), 0)
      const monthlyPayments = creditsData.reduce((sum, item) => sum + (item.monthly_payment || 0), 0)

      context.summary += `Resumen de créditos: Deuda total: €${totalDebt.toFixed(2)}, Pagos mensuales: €${monthlyPayments.toFixed(2)}. `
    }
  }

  if (contextType === "all" || contextType === "forecasts") {
    const { data: forecastsData } = await supabase
      .from("forecasts")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .gte("forecast_date", startDate)
      .order("forecast_date", { ascending: true })

    context.forecasts = forecastsData

    // Añadir resumen de pronósticos
    if (forecastsData && forecastsData.length > 0) {
      const nextMonthForecast = forecastsData[0]

      context.summary += `Pronóstico próximo mes: Ingresos esperados: €${nextMonthForecast.expected_revenue?.toFixed(2)}, Ocupación esperada: ${nextMonthForecast.expected_occupation?.toFixed(2)}%. `
    }
  }

  return context
}

function getDateRange(timeframe) {
  const now = new Date()
  let startDate
  const endDate = now.toISOString().split("T")[0] // Formato YYYY-MM-DD

  switch (timeframe) {
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString().split("T")[0]
      break
    case "quarter":
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).toISOString().split("T")[0]
      break
    case "year":
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().split("T")[0]
      break
    case "all":
    default:
      startDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate()).toISOString().split("T")[0] // 5 años atrás por defecto
      break
  }

  return { startDate, endDate }
}

function preparePromptWithContext(userPrompt, context) {
  // Instrucciones para Gemini
  const systemPrompt = `
  Eres un asistente financiero especializado en análisis de restaurantes para la plataforma NÜA Finance.
  Utiliza los siguientes datos de contexto para proporcionar análisis precisos y recomendaciones útiles.
  Responde siempre en español y enfócate en información práctica y accionable.
  
  CONTEXTO FINANCIERO DEL RESTAURANTE:
  ${context.summary}
  
  INSTRUCCIONES ADICIONALES:
  - Sé conciso pero informativo
  - Utiliza términos financieros apropiados
  - Proporciona recomendaciones específicas cuando sea posible
  - Menciona tendencias o patrones relevantes
  - Si no tienes suficiente información, indícalo claramente
  
  PREGUNTA DEL USUARIO:
  `

  return `${systemPrompt}${userPrompt}`
}

async function callGeminiAPI(prompt) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

  const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(`Error en la API de Gemini: ${data.error?.message || "Error desconocido"}`)
  }

  // Extraer el texto de la respuesta
  return data.candidates[0].content.parts[0].text
}
