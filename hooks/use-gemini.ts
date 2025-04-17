"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Tipos para TypeScript
export interface GeminiRequest {
  prompt: string
  restaurantId: string
  contextType?: "financial" | "operational" | "credits" | "forecasts" | "all"
  timeframe?: "month" | "quarter" | "year" | "all"
}

export interface GeminiResponse {
  response: string
  context: string
}

// Crear cliente de Supabase con verificación de variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificar que las variables de entorno estén definidas
let supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export function useGemini() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<GeminiResponse | null>(null)

  const askGemini = async (request: GeminiRequest) => {
    setLoading(true)
    setError(null)

    try {
      // Verificar que el cliente de Supabase esté inicializado
      if (!supabase) {
        throw new Error("La conexión a Supabase no está configurada. Verifica las variables de entorno.")
      }

      // Llamar a la Edge Function de Supabase
      const { data, error } = await supabase.functions.invoke("gemini-ai", {
        body: JSON.stringify(request),
      })

      if (error) throw new Error(error.message)

      setResponse(data as GeminiResponse)
      return data as GeminiResponse
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    askGemini,
    loading,
    error,
    response,
    isConfigured: !!supabase,
  }
}
