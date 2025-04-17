"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudOff, Calendar, Clock, Sun, CloudSun, CloudRain, Snowflake, Wind } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusBarProps {
  className?: string
}

// Tipos para el clima
type WeatherType = "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "snowy" | "windy"

interface WeatherInfo {
  type: WeatherType
  temperature: number
  location: string
}

export function StatusBar({ className }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isConnected, setIsConnected] = useState(true) // Simulamos conexión activa por defecto

  // Simulamos datos del clima - en una implementación real, esto vendría de una API
  const [weather, setWeather] = useState<WeatherInfo>({
    type: "partly-cloudy",
    temperature: 22,
    location: "Madrid",
  })

  // Actualizar la hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Formatear la fecha y hora
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentTime)

  const formattedTime = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentTime)

  // Capitalizar primera letra
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

  // Función para renderizar el icono del clima según el tipo
  const renderWeatherIcon = (type: WeatherType) => {
    switch (type) {
      case "sunny":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "partly-cloudy":
        return <CloudSun className="h-4 w-4 text-blue-400" />
      case "cloudy":
        return <Cloud className="h-4 w-4 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-4 w-4 text-blue-500" />
      case "snowy":
        return <Snowflake className="h-4 w-4 text-blue-300" />
      case "windy":
        return <Wind className="h-4 w-4 text-gray-400" />
      default:
        return <Sun className="h-4 w-4 text-yellow-500" />
    }
  }

  // Función para obtener el color de fondo según el clima
  const getWeatherBgClass = (type: WeatherType) => {
    switch (type) {
      case "sunny":
        return "bg-yellow-50"
      case "partly-cloudy":
        return "bg-blue-50"
      case "cloudy":
        return "bg-gray-100"
      case "rainy":
        return "bg-blue-100"
      case "snowy":
        return "bg-blue-50"
      case "windy":
        return "bg-gray-50"
      default:
        return "bg-yellow-50"
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between py-2 px-4 bg-gradient-to-r from-white to-primary-light/10 backdrop-blur-sm border rounded-lg shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <div className={`p-1.5 rounded-full ${isConnected ? "bg-green-100" : "bg-red-100"}`}>
          {isConnected ? <Cloud className="h-4 w-4 text-green-600" /> : <CloudOff className="h-4 w-4 text-red-600" />}
        </div>
        <span className="text-sm font-medium text-secondary-blue">
          {isConnected ? "Base de datos conectada" : "Sin conexión a la base de datos"}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-sm border border-primary-light/20">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-secondary-blue">{capitalizedDate}</span>
        </div>
        <div className="flex items-center gap-2 bg-primary-light/20 px-3 py-1 rounded-full shadow-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-secondary-blue">{formattedTime}</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full shadow-sm ${getWeatherBgClass(weather.type)}`}>
          {renderWeatherIcon(weather.type)}
          <span className="text-sm font-medium text-secondary-blue">
            {weather.temperature}°C · {weather.location}
          </span>
        </div>
      </div>
    </div>
  )
}
