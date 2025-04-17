import { ComparativasCharts } from "@/components/comparativas/comparativas-charts"
import { comparativaIngresosGastos, ocupacionData } from "@/lib/mock-data"

export default function ComparativasPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-blue">Comparativas</h2>
      </div>

      {/* Pasamos los datos como props al componente cliente */}
      <ComparativasCharts comparativaIngresosGastos={comparativaIngresosGastos} ocupacionData={ocupacionData} />
    </div>
  )
}
