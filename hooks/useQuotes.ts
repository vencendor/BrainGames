import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadRandomQuotes } from '../services/quotes'
import { QuoteListType, QuoteType } from '@/types'

const FAVORITES_KEY = 'FAVORITE_QUOTES'

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const fetchQuotes = async () => {
    try {
      const loadedList = await loadRandomQuotes()
      setQuotes((qt) => [...qt, ...loadedList])
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить цитаты')
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const [favorites, setFavorites] = useState<QuoteListType>([])

  useEffect(() => {
    ;(async () => {
      const json = await AsyncStorage.getItem(FAVORITES_KEY)
      if (json) setFavorites(JSON.parse(json))
    })()
  }, [])

  const addFavorite = async (quote: QuoteType) => {
    const updated = [...favorites, quote]
    setFavorites(updated)
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  }

  const voteQuotePersonal = async (quoteId: string, vote: string) => {
    const updated = favorites.map((q) => {
      if (q.id === quoteId) {
        console.log('voteQuotePersonal', q)
        q.personal_votes = q.personal_votes || 0
        return {
          ...q,
          personal_votes:
            vote === 'up'
              ? q.personal_votes + 1
              : q.personal_votes > 1
              ? q.personal_votes - 1
              : 0,
        }
      }
      return q
    })
    setFavorites(updated ?? [])
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  }

  const removeFavorite = async (quote: QuoteType) => {
    const updated = favorites.filter((q) => q.id !== quote.id)
    setFavorites(updated)
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  }

  return {
    quotes,
    loading,
    fetchQuotes,
    addFavorite,
    removeFavorite,
    voteQuotePersonal,
    favorites,
  }
}
