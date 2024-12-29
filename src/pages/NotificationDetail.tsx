import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ArrowLeft, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for notifications (this should be replaced with actual data fetching logic)
const mockNotifications = [
  { id: 1, message: "You received 2 USDT from 0xABC...", timestamp: new Date('2023-06-01T10:30:00'), token: "USDT", read: false, from: "0xABC123...", to: "Your wallet", amount: "2 USDT", transactionHash: "0x123...789" },
  { id: 2, message: "You sent 0.5 ETH to 0xDEF...", timestamp: new Date('2023-06-02T14:45:00'), token: "ETH", read: true, from: "Your wallet", to: "0xDEF456...", amount: "0.5 ETH", transactionHash: "0x456...012" },
  { id: 3, message: "Smart contract execution successful", timestamp: new Date('2023-06-03T09:15:00'), token: null, read: false, contractAddress: "0xGHI789...", functionName: "executeSwap", status: "Success" },
  { id: 4, message: "You received 100 LINK from 0xGHI...", timestamp: new Date('2023-06-04T16:20:00'), token: "LINK", read: false, from: "0xGHI789...", to: "Your wallet", amount: "100 LINK", transactionHash: "0x789...345" },
]

export function NotificationDetail() {
  const { id } = useParams<{ id: string }>()
  const notification = mockNotifications.find(n => n.id === Number(id))

  if (!notification) {
    return <div>Notification not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Link to="/d/notifications">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Notifications
              </Button>
            </Link>
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold mt-4">Notification Details</CardTitle>
          <CardDescription>
            {format(notification.timestamp, 'PPpp')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Message</h3>
              <p>{notification.message}</p>
            </div>
            {notification.token && (
              <div>
                <h3 className="text-lg font-semibold">Token</h3>
                <p>{notification.token}</p>
              </div>
            )}
            {notification.from && (
              <div>
                <h3 className="text-lg font-semibold">From</h3>
                <p>{notification.from}</p>
              </div>
            )}
            {notification.to && (
              <div>
                <h3 className="text-lg font-semibold">To</h3>
                <p>{notification.to}</p>
              </div>
            )}
            {notification.amount && (
              <div>
                <h3 className="text-lg font-semibold">Amount</h3>
                <p>{notification.amount}</p>
              </div>
            )}
            {notification.transactionHash && (
              <div>
                <h3 className="text-lg font-semibold">Transaction Hash</h3>
                <p>{notification.transactionHash}</p>
              </div>
            )}
            {notification.contractAddress && (
              <div>
                <h3 className="text-lg font-semibold">Contract Address</h3>
                <p>{notification.contractAddress}</p>
              </div>
            )}
            {notification.functionName && (
              <div>
                <h3 className="text-lg font-semibold">Function Name</h3>
                <p>{notification.functionName}</p>
              </div>
            )}
            {notification.status && (
              <div>
                <h3 className="text-lg font-semibold">Status</h3>
                <p>{notification.status}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

