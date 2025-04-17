"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeminiAssistant } from "@/components/gemini-assistant"
import { BrainCircuit, MessageSquare, Lightbulb, FileText } from "lucide-react"

export default function AsistentePage() {
  // En una aplicación real, obtendrías este ID de la sesión del usuario
  const restaurantId = "123e4567-e89b-12d3-a456-426614174000"

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-blue">Asistente Inteligente</h2>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat Asistente
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Insights Automáticos
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Informes Generados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Asistente Financiero NÜA</CardTitle>
                <CardDescription>
                  Consulta cualquier aspecto de tu negocio y obtén análisis inteligentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GeminiAssistant restaurantId={restaurantId} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Preguntas Sugeridas
                </CardTitle>
                <CardDescription>Prueba estas preguntas para sacar el máximo partido al asistente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <p className="font-medium">¿Cuál es mi margen de beneficio actual y cómo puedo mejorarlo?</p>
                  </div>
                  <div className="rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <p className="font-medium">
                      ¿Qué días de la semana tengo menor ocupación y qué estrategias puedo implementar?
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <p className="font-medium">
                      Analiza mis costes de personal y compáralos con el estándar del sector
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <p className="font-medium">¿Cuál es la proyección de ingresos para el próximo trimestre?</p>
                  </div>
                  <div className="rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <p className="font-medium">¿Qué impacto tendría aumentar los precios un 5% en mi beneficio neto?</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Insights Automáticos</CardTitle>
              <CardDescription>Descubrimientos y recomendaciones generadas automáticamente por IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-60">
                <BrainCircuit className="h-16 w-16 text-primary/20 mb-4" />
                <p className="text-text-secondary">Funcionalidad en desarrollo</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Los insights automáticos estarán disponibles próximamente
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Informes Generados</CardTitle>
              <CardDescription>Informes detallados creados por IA basados en tus datos financieros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-60">
                <FileText className="h-16 w-16 text-primary/20 mb-4" />
                <p className="text-text-secondary">Funcionalidad en desarrollo</p>
                <p className="text-sm text-muted-foreground mt-2">
                  La generación automática de informes estará disponible próximamente
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
