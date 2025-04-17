"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useGemini } from "@/hooks/use-gemini"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BrainCircuit,
  Send,
  Clock,
  BarChart,
  CreditCard,
  Calendar,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  contextSummary?: string
}

interface GeminiAssistantProps {
  restaurantId: string
}

export function GeminiAssistant({ restaurantId }: GeminiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [contextType, setContextType] = useState<"financial" | "operational" | "credits" | "forecasts" | "all">("all")
  const [timeframe, setTimeframe] = useState<"month" | "quarter" | "year" | "all">("month")
  const { askGemini, loading, error, response, isConfigured } = useGemini()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll al final de los mensajes cuando se añade uno nuevo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mensaje de bienvenida
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "0",
          role: "assistant",
          content: isConfigured
            ? "¡Hola! Soy tu asistente financiero de NÜA. ¿En qué puedo ayudarte hoy con el análisis de tu restaurante?"
            : "Bienvenido al asistente de NÜA. Parece que la conexión a Supabase no está configurada. Por favor, configura las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para continuar.",
          timestamp: new Date(),
        },
      ])
    }
  }, [isConfigured])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || loading || !isConfigured) return

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      // Enviar solicitud a Gemini
      const result = await askGemini({
        prompt: input,
        restaurantId,
        contextType,
        timeframe,
      })

      if (result) {
        // Añadir respuesta del asistente
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
          timestamp: new Date(),
          contextSummary: result.context,
        }

        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (err) {
      console.error("Error al comunicarse con Gemini:", err)

      // Mensaje de error
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
          timestamp: new Date(),
        },
      ])
    }
  }

  // Mostrar alerta si Supabase no está configurado
  if (!isConfigured) {
    return (
      <Card className="w-full h-[600px] flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarImage src="/gemini-logo.png" alt="Gemini" />
                <AvatarFallback>
                  <BrainCircuit className="h-4 w-4 text-primary-foreground" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">Asistente Financiero NÜA</CardTitle>
            </div>
          </div>
          <CardDescription>
            Powered by Google Gemini AI - Análisis financiero inteligente para tu restaurante
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 flex items-center justify-center">
          <Alert variant="destructive" className="max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error de configuración</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                La conexión a Supabase no está configurada. Para utilizar el asistente, necesitas configurar las
                siguientes variables de entorno:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>NEXT_PUBLIC_SUPABASE_URL</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              </ul>
              <p className="mt-2">
                Puedes configurar estas variables en tu archivo .env.local o en la configuración de tu plataforma de
                despliegue.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarImage src="/gemini-logo.png" alt="Gemini" />
              <AvatarFallback>
                <BrainCircuit className="h-4 w-4 text-primary-foreground" />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">Asistente Financiero NÜA</CardTitle>
          </div>
          <Tabs defaultValue="chat" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="config">Configuración</TabsTrigger>
            </TabsList>
            <TabsContent value="config" className="mt-2">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Contexto</label>
                    <Select value={contextType} onValueChange={(value) => setContextType(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de contexto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <div className="flex items-center gap-2">
                            <BrainCircuit className="h-4 w-4" />
                            <span>Completo</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="financial">
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4" />
                            <span>Financiero</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="operational">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Operativo</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="credits">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Créditos</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="forecasts">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            <span>Pronósticos</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Periodo</label>
                    <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Periodo de tiempo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Último mes</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="quarter">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Último trimestre</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="year">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Último año</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="all">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Todo el historial</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <CardDescription>
          Powered by Google Gemini AI - Análisis financiero inteligente para tu restaurante
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 overflow-hidden pt-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/gemini-logo.png" alt="Gemini" />
                        <AvatarFallback>
                          <BrainCircuit className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Asistente NÜA</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  {message.contextSummary && (
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" />
                      <span>Basado en: {message.contextSummary}</span>
                    </div>
                  )}
                  <div className="mt-1 text-xs opacity-70 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Input
            placeholder="Pregunta sobre tus finanzas, operaciones o pronósticos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
