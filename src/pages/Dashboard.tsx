import { WalletConnectButton } from '@/components/WalletConnectButton';

import { ThemeToggle } from '@/components/ThemeToggle';

import DashboardContent from '@/components/dashboard/DashboardContent';

export default function Dashboard() {
  return (
      <div className="container mx-auto p-4 min-h-screen bg-[url('/blockchain-bg.jpg')] bg-cover bg-center bg-fixed">
        <div className="backdrop-blur-sm bg-background/30 min-h-screen -m-4 p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Blockchain Dashboard</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <WalletConnectButton />
            </div>
          </div>
          <DashboardContent />
        </div>
      </div>
  )
}
