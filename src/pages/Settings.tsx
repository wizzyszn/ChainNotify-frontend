import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from 'lucide-react'
import { toast } from '@/components/ui/Toast'
import { Spinner } from '@/components/ui/Spinner'

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(160, 'Bio must be 160 characters or less').optional(),
})

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
})

type ProfileFormData = z.infer<typeof profileSchema>
type NotificationFormData = z.infer<typeof notificationSchema>

export function Settings() {
  const [isLoading, setIsLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: profileErrors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })
  const { register: registerNotifications, handleSubmit: handleSubmitNotifications } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
  })

  const onProfileSubmit = (data: ProfileFormData) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast.success('Profile updated successfully!')
      setIsLoading(false)
    }, 1500)
  }

  const onNotificationSubmit = (data: NotificationFormData) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast.success('Notification preferences updated!')
      setIsLoading(false)
    }, 1500)
  }

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your profile information</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profilePicture || '/placeholder.svg'} alt="Profile picture" />
                    <AvatarFallback>
                      {profilePicture ? '' : 'Upload'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={16} />
                    <span>Change Picture</span>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...registerProfile('firstName')} />
                  {profileErrors.firstName && <p className="text-red-500 text-sm">{profileErrors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...registerProfile('lastName')} />
                  {profileErrors.lastName && <p className="text-red-500 text-sm">{profileErrors.lastName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...registerProfile('email')} />
                  {profileErrors.email && <p className="text-red-500 text-sm">{profileErrors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" {...registerProfile('bio')} />
                  {profileErrors.bio && <p className="text-red-500 text-sm">{profileErrors.bio.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <><Spinner size={20} color="white" /> <span className="ml-2">Saving...</span></> : 'Save Changes'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitNotifications(onNotificationSubmit)}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch id="emailNotifications" {...registerNotifications('emailNotifications')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <Switch id="pushNotifications" {...registerNotifications('pushNotifications')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <Switch id="smsNotifications" {...registerNotifications('smsNotifications')} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <><Spinner size={20} color="white" /> <span className="ml-2">Saving...</span></> : 'Save Preferences'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

