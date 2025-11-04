import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'myQuotesList'
const isWeb = Platform.OS === 'web'

export type Item = {
  id: string
  name: string
}

async function saveList(list: Item[]): Promise<void> {
  const json = JSON.stringify(list)
  if (isWeb) {
    localStorage.setItem(STORAGE_KEY, json)
  } else {
    await AsyncStorage.setItem(STORAGE_KEY, json)
  }
}

async function loadList(): Promise<Item[]> {
  if (isWeb) {
    const json = localStorage.getItem(STORAGE_KEY)
    return json ? JSON.parse(json) : []
  } else {
    const json = await AsyncStorage.getItem(STORAGE_KEY)
    return json ? JSON.parse(json) : []
  }
}

async function addToList(item: Item): Promise<void> {
  const list = await loadList()
  if (!list.find((i) => i.id === item.id)) {
    list.push(item)
    await saveList(list)
  }
}

async function removeFromList(id: string): Promise<void> {
  const list = await loadList()
  const newList = list.filter((i) => i.id !== id)
  await saveList(newList)
}

async function getById(id: string): Promise<Item | undefined> {
  const list = await loadList()
  return list.find((i) => i.id === id)
}

export { saveList, loadList, addToList, removeFromList, getById }
