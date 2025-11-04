import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import ru from './ru.json'
import it from './it.json'
import Config from 'react-native-config' // или process.env.EXPO_PUBLIC_APP_LOCALE

i18n.use(initReactI18next).init({
  lng: Config.APP_LOCALE || process.env.EXPO_PUBLIC_APP_LOCALE,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    it: { translation: it },
  },
})

export default i18n
