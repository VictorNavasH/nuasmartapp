import { StatCard } from "@/components/stats/stat-card"
import { DollarSign, Users, ShoppingCart, Package } from "lucide-react"

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Clientes Totales"
        value={350}
        icon={<Users size={18} />}
        trend={4.2}
        trendLabel="vs. mes anterior"
      />

      <StatCard
        title="Ventas Totales"
        value={23500}
        icon={<ShoppingCart size={18} />}
        trend={12}
        trendLabel="vs. mes anterior"
        currency={true}
      />

      <StatCard
        title="Gastos Totales"
        value={45230}
        icon={<DollarSign size={18} />}
        trend={3.8}
        trendLabel="vs. mes anterior"
        currency={true}
        description="68.5% sobre ventas"
      />

      <StatCard
        title="Productos en Stock"
        value={128}
        icon={<Package size={18} />}
        trend={-1.4}
        trendLabel="vs. mes anterior"
      />
    </div>
  )
}

export default KPICards
