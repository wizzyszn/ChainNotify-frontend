import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Bell, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationsRequest, markAllAsReadRequest, markAsReadRequest} from '@/redux/notification/notificationasync'
import { Notifications as NotificationInt, RejectedPayload, StorageKeysEnum, UserAuthInfoInt } from '@/types'
import { Storages } from '@/lib/helpers'



export function Notifications() {
  const dispatch = useDispatch<AppDispatch>()
  const user = Storages.getStorage("local", StorageKeysEnum.user) as UserAuthInfoInt;
  const { notifications } = useSelector((state: RootState) => state.notification)
  //const [tokenFilter, setTokenFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    try {
      dispatch(getNotificationsRequest({
        email: user?.email as string
      })).unwrap().catch((error: RejectedPayload) => {
        console.error('Failed to fetch notifications:', error)
      })
    } catch (error) {
      console.error('Error in notifications fetch:', error)
    }
  }, [dispatch, user?.email])

  const handleMarkAsRead = async (id: string) => {
    try {
      await dispatch(markAsReadRequest({
        notificationId: id,
        email: user?.email as string
      })).unwrap()
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllAsReadRequest({
        email: user?.email as string
      })).unwrap()
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);

    }
  }

  const getNotificationMessage = (notification: NotificationInt) => {
    if (notification.message) return notification.message
    
    const formattedAmount = notification.amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    })
    
    return notification.type === 'received' 
      ? `Received ${formattedAmount} ETH from ${notification.from}`
      : `Sent ${formattedAmount} ${notification.token} to ${notification.hash}`
  }

  const filteredNotifications = notifications.filter(notif => {
    //const matchesToken = tokenFilter ? notif.token === tokenFilter : true
    const matchesDate = dateFilter ? format(new Date(notif.date), 'yyyy-MM-dd') === dateFilter : true
    return matchesDate
  })

  // Get unique tokens for the filter dropdown
 // const uniqueTokens = Array.from(new Set(notifications.map(notif => notif.token)))

  return (
    <div className="container p-0">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Bell className="h-6 w-6" />
            Notifications
          </CardTitle>
          <CardDescription>
            View and manage your recent notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
            
              <div className="flex items-center gap-2">
                <Label htmlFor="date-filter">Filter by Date:</Label>
                <Input
                  id="date-filter"
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-[180px]"
                />
              </div>
            </div>
            <Button onClick={handleMarkAllAsRead} variant="outline">
              <Check className="mr-2 h-4 w-4" /> Mark All as Read
            </Button>
          </div>
          <div className="space-y-4">
            {filteredNotifications.map((notif) => (
              <Card key={notif?._id} className={`${notif?.read ? 'bg-muted' : 'bg-card'}`}>
                <CardContent className="flex items-start justify-between p-4">
                  <Link to={`/d/notifications/${notif?._id}`} className="flex-grow">
                    <div>
                      <p className="font-medium">{getNotificationMessage(notif)}</p>
                      <p className="text-sm text-muted-foreground">
                        {/*format(new Date(notif?.date), 'PPpp')*/}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className={`inline-block ${notif?.type === 'received' ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs px-2 py-1 rounded`}>
                          {notif?.type.charAt(0).toUpperCase() + notif?.type.slice(1)}
                        </span>
                        <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          {notif?.token}
                        </span>
                      </div>
                    </div>
                  </Link>
                  {!notif?.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => notif?._id && handleMarkAsRead(notif?.hash)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Notifications;