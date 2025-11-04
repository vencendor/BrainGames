import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  ScrollView,
} from 'react-native'
import MenuApp from '@/components/layout/MenuApp'
import Background from '@/components/layout/Background'
import colors from '@/assets/color'
import { Link } from 'expo-router'
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito'
import { useTranslation } from 'react-i18next'
const AboutApp = () => {
  const { t } = useTranslation()
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  })
  if (!fontsLoaded) {
    return null
  }
  return (
    <Background>
      <MenuApp />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.paragraph}>
          {t('about_paragraph1')}
        </Text>
        <Link href="/" style={styles.link}>
          {t('about_link_start')}
        </Link>
      </ScrollView>
    </Background>
  )
}

export default AboutApp

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackground,
    opacity: 0.9,
    paddingTop: 50,
    paddingHorizontal: 35,
    marginTop: 20,
    marginHorizontal: 'auto',
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },

  paragraph: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  link: {
    fontSize: 15,
    marginBottom: 12,
    lineHeight: 24,
    color: colors.colorText,
    textDecorationLine: 'underline',
  },
})
