import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getNotificationByIdRequest } from '@/redux/notification/notificationasync'
import { RejectedPayload, StorageKeysEnum, UserAuthInfoInt } from '@/types'
import { Storages } from '@/lib/helpers'


export function NotificationDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>();
  const { notification } = useSelector((state: RootState) => state.notification);
  const user = (Storages.getStorage("local", StorageKeysEnum.user) as UserAuthInfoInt)

  useEffect(() => {
    dispatch(getNotificationByIdRequest({
      notificationId: id!,
      email : user.email

    })).unwrap().then().catch((err: RejectedPayload) => {
      console.error(err.message)
    })
  }, [id, dispatch]);

  if (!notification) {
    return null;
  }

  return (
    <div className="container p-0">
      <Card className="w-full ">
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
            {notification.type === 'sent' ? 'Sent Transaction' : 'Received Transaction'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Message</h3>
              <p>{notification.message}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Transaction Hash</h3>
              <p className=' text-[0.7rem]'>{notification.hash}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Type</h3>
              <p className="capitalize">{notification.type}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Amount</h3>
              <p>{notification.amount}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Token</h3>
              <p>{notification.token}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Date</h3>
            
            </div>
            <div>
              <h3 className="text-lg font-semibold">From</h3>
              <p>{notification.from}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Status</h3>
              <p>{notification.read ? 'Read' : 'Unread'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationDetail