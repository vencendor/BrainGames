import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import {
  NotificationRequest,
  SchedulableTriggerInputTypes,
} from 'expo-notifications'
import { useCallback, useEffect, useState } from 'react'
import { useQuotes } from './useQuotes'

export const DAILY_NOTIFICATIONS_TIMERS = '@daily_notifications_timers'

async function loadDailyTimers(): Promise<string[]> {
  const data = await AsyncStorage.getItem(DAILY_NOTIFICATIONS_TIMERS)
  return data ? JSON.parse(data) : []
}

export default function useNotifications() {
  const [isGranted, setIsGranted] = useState(false)
  const [notificationsList, setNotificationsList] = useState<
    NotificationRequest[]
  >([])

  const [notificationTimers, setNotificationTimers] = useState([])

  const { favorites } = useQuotes()

  // Устанавливаем обработчик (один раз за всё приложение)
  useEffect(() => {
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

    // Загружаем таймеры уведомлений из AsyncStorage
    AsyncStorage.getItem(DAILY_NOTIFICATIONS_TIMERS).then((timersJson) => {
      if (timersJson) {
        const parsed = JSON.parse(timersJson)
        setNotificationTimers(parsed)
      }
    })
  }, [])

  // Устанавливаем слушатель для получения уведомлений
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

  async function addNotificationTimer(h: number, m: number) {
    const existing = await AsyncStorage.getItem(DAILY_NOTIFICATIONS_TIMERS)
    const ids = existing ? JSON.parse(existing) : []
    ids.push({ hour: h, minute: m })
    await AsyncStorage.setItem(DAILY_NOTIFICATIONS_TIMERS, JSON.stringify(ids))
    setNotificationTimers(ids)
    await refreshAllDailyNotifications(ids)
  }

  async function cancelNotificationTimer(index: number) {
    const existing = await AsyncStorage.getItem(DAILY_NOTIFICATIONS_TIMERS)
    const ids = existing
      ? JSON.parse(existing).filter((_timer, tid: number) => tid !== index)
      : []
    await AsyncStorage.setItem(DAILY_NOTIFICATIONS_TIMERS, JSON.stringify(ids))
    setNotificationTimers(ids)
    await refreshAllDailyNotifications(ids)
  }

  const getNotifications = useCallback(async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync()
    setNotificationsList(notifications)
    return notifications
  }, [isGranted])

  const cancelAllNotifications = useCallback(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }, [])

  async function scheduleWeeklyNotifications(hour = 9, minute = 0) {
    for (let i = 0; i < 7; i++) {
      const quote = favorites[Math.floor(Math.random() * favorites.length)]

      console.log(
        `Scheduling weekly notification for day ${
          i + 1
        } at ${hour}:${minute} with quote:`,
        quote.text,
      )

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

      console.log(`Scheduled weekly notification with ID: schrez`, schrez)
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
    notificationTimers,
    refreshAllDailyNotifications,
    getNotifications,
    addNotificationTimer,
    cancelNotificationTimer,

    cancelAllNotifications,
  }
}
