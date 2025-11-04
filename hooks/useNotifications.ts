import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import {
  NotificationRequest,
  SchedulableTriggerInputTypes,
} from 'expo-notifications'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useQuotes } from './useQuotes'

const DAILY_NOTIFICATIONS_KEY = '@daily_notifications_ids'
export const DAILY_NOTIFICATIONS_TIMERS = '@daily_notifications_timers'

async function saveDailyId(id: string) {
  const existing = await AsyncStorage.getItem(DAILY_NOTIFICATIONS_KEY)
  const ids = existing ? JSON.parse(existing) : []
  ids.push(id)
  await AsyncStorage.setItem(DAILY_NOTIFICATIONS_KEY, JSON.stringify(ids))
}

async function loadDailyIds(): Promise<string[]> {
  const data = await AsyncStorage.getItem(DAILY_NOTIFICATIONS_KEY)
  return data ? JSON.parse(data) : []
}

async function loadDailyTimers(): Promise<string[]> {
  const data = await AsyncStorage.getItem(DAILY_NOTIFICATIONS_TIMERS)
  return data ? JSON.parse(data) : []
}

async function clearDailyIds() {
  await AsyncStorage.removeItem(DAILY_NOTIFICATIONS_KEY)
}

export default function useNotifications() {
  const [isGranted, setIsGranted] = useState(false)
  const [notificationsList, setNotificationsList] = useState<
    NotificationRequest[]
  >([])

  const { favorites } = useQuotes()

  useEffect(() => {
    // Устанавливаем обработчик (один раз за всё приложение)
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })

    // Запрашиваем разрешения корректным способом
    ;(async () => {
      const settings = await Notifications.getPermissionsAsync()
      let granted = settings.granted

      if (!granted) {
        const request = await Notifications.requestPermissionsAsync()
        granted = request.granted
      }

      setIsGranted(granted)
    })()
    getNotifications()
  }, [])

  const sendImmediate = useCallback(
    async (title: string, body: string) => {
      if (!isGranted) return null
      return Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: null,
      })
    },
    [isGranted],
  )

  const scheduleDelayed = useCallback(
    async (title: string, body: string, seconds: number) => {
      if (!isGranted) return null
      return Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: { seconds },
      })
    },
    [isGranted],
  )

  const scheduleDaily = useCallback(
    async (title: string, body: string, hour: number, minute: number) => {
      if (!isGranted) {
        Alert.alert(
          'Уведомления не разрешены',
          'Пожалуйста, разрешите уведомления в настройках приложения.',
        )
        return null
      }
      const id = await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: {
          hour,
          minute,
          // repeats: true,
          type: SchedulableTriggerInputTypes.DAILY,
        },
      })
      console.log(`Scheduled daily notification with ID: ${id}`)
      getNotifications()
      await saveDailyId(id)
      return id
    },
    [isGranted],
  )

  const getNotifications = useCallback(async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync()
    setNotificationsList(notifications)
    return notifications
  }, [isGranted])

  const cancelNotification = useCallback(async (id: string) => {
    console.log(`Cancelling notification with ID: ${id}`)
    await Notifications.cancelScheduledNotificationAsync(id)
    getNotifications()
  }, [])

  const cancelAllNotifications = useCallback(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
    await clearDailyIds()
  }, [])

  const cancelDailyNotifications = useCallback(async () => {
    const ids = await loadDailyIds()
    for (const id of ids) {
      await Notifications.cancelScheduledNotificationAsync(id)
    }
    await clearDailyIds()
  }, [])

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          'Уведомление кликнуто:',
          response.notification.request.identifier,
        )
      },
    )
    return () => subscription.remove()
  }, [])

  async function scheduleWeeklyNotifications(hour = 9, minute = 0) {
    for (let i = 0; i < 7; i++) {
      const quote = favorites[Math.floor(Math.random() * favorites.length)]

      console.log(`Scheduling weekly notification for day ${i + 1} at ${hour}:${minute} with quote:`, quote.text);

      const schrez = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Цитата дня',
          body: quote.text,
        },
        trigger: {
          weekday: i + 1, // 1 = Sunday
          hour,
          minute,
          // repeats: true,
          type: SchedulableTriggerInputTypes.WEEKLY,
        },
      })

      console.log(`Scheduled weekly notification with ID: schrez`, schrez);
    }
  }

  

  const refreshAllDailyNotifications = useCallback(
    
    async (timerList: null | { hour: number; minute: number }[] = null) => {
      if (timerList === null) {
        timerList = await loadDailyTimers()
      }

      await cancelAllNotifications()

      if (!timerList || timerList.length === 0) {
        return
      }

      timerList.forEach(async (trigger) => {
        await scheduleWeeklyNotifications(trigger.hour, trigger.minute)
      })
    },
    [isGranted],
  )

  return {
    isGranted,
    notificationsList,
    refreshAllDailyNotifications,
    getNotifications,
    sendImmediate,
    scheduleDelayed,
    scheduleDaily,
    cancelNotification,
    cancelAllNotifications,
    cancelDailyNotifications,
  }
}
