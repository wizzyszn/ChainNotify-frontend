import { StatCard } from '../StatCard'
import { Activity, Blocks, Coins, Wallet } from 'lucide-react'
import { Chart } from '../Chart'
import { RecentTransactions } from '../RecentTransactions'

type Props = {}

function DashboardContent({}: Props) {
  return (
    <> <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
    <StatCard 
      title="Total Transactions" 
      value="1,234,567" 
      icon={<Activity className="h-4 w-4 text-primary" />} 
    />
    <StatCard 
      title="Block Height" 
      value="8,901,234" 
      icon={<Blocks className="h-4 w-4 text-primary" />} 
    />
    <StatCard 
      title="Gas Price (Gwei)" 
      value="25" 
      icon={<Coins className="h-4 w-4 text-primary" />} 
    />
    <StatCard 
      title="Active Addresses" 
      value="567,890" 
      icon={<Wallet className="h-4 w-4 text-primary" />} 
    />
  </div>
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
    <Chart />
    <div className="lg:col-span-2">
      <RecentTransactions />
    </div>
  </div></>
  )
}

export default DashboardContent