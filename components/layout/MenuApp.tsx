import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito'
import axios from 'axios'
import { Link } from 'expo-router'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import {
  GoogleSignin,
  SignInResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import {
  ChevronRight,
  Info,
  Lightbulb,
  Menu,
  PlusCircle,
  Rocket,
  Settings,
  Star,
} from 'lucide-react-native'

const GOOGLE_ANDROID_CLIENT_ID =
  '1036203146319-fhvua4nv6ddmrndi97u50bu5a5jm0kvk.apps.googleusercontent.com'

import { default as color, default as colors } from '@/assets/color'
import { useEffect, useState } from 'react'
const MenuApp = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  })
  const [menuVisible, setMenuVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<SignInResponse | null>(null)
  const [tasks, setTasks] = useState([])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [],
      webClientId: GOOGLE_ANDROID_CLIENT_ID,
    })
  }, [])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      console.log('User Info:', userInfo)
      setUserInfo(userInfo)
      const tokens = await GoogleSignin.getTokens()
      fetchTasks(tokens.accessToken)
    } catch (error: any) {
      console.log('Error :', error)
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated')
      } else {
        console.log('Some other error happened:', error)
      }
    }
  }

  const fetchTaskHandler = async () => {
    try {
      const tokens = await GoogleSignin.getTokens()
      fetchTasks(tokens.accessToken)
    } catch (error: any) {
      console.log('Error fetching tokens:', error)
    }
  }

  const signOutHandler = async () => {
    await GoogleSignin.signOut()
    setUserInfo(null)
  }

  const fetchTasks = async (token: string) => {
    console.log('Access Token:', token)

    try {
      const response = await axios.get(
        'https://www.googleapis.com/tasks/v1/users/@me/lists',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      console.log(response)
      setTasks(response.data.items)
    } catch (error: any) {
      console.log(
        'Error fetching tasks:',
        error.response ? error.response.data : error.message,
      )
    }
  }

  return (
    fontsLoaded && (
      <View style={styles.container}>
        <TouchableOpacity style={styles.burgerButton} onPress={toggleMenu}>
          <Menu color={color.primaryBackground} size={33} />
        </TouchableOpacity>
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />

          <View style={styles.menuContainer}>
            <View style={styles.userContainer}>
              <View style={styles.avatarContainer}></View>
              <Text style={styles.menuText}>Михаил круг</Text>
              <TouchableOpacity
                style={styles.userAuthorization}
                onPress={signIn}
              >
                <Text> Авторизация</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.menuItem}>
              <Settings size={22} color={colors.colorText} />
              <Link href="/" style={styles.menuText}>
                Главная
              </Link>
              <ChevronRight
                size={22}
                color={colors.colorText}
                style={styles.iconArrow}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Settings size={22} color={colors.colorText} />
              <Link href="/SettingsPage" style={styles.menuText}>
                Настройки
              </Link>
              <ChevronRight
                size={22}
                color={colors.colorText}
                style={styles.iconArrow}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Info size={22} color={colors.colorText} />
              <Link href="/aboutApp" style={styles.menuText}>
                О приложении
              </Link>
              <ChevronRight
                size={22}
                color={colors.colorText}
                style={styles.iconArrow}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  )
}

export default MenuApp

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: colors.inputText,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  userContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '98%',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    zIndex: 1000,
  },
  burgerButton: {
    paddingRight: 10,
    marginBottom: 20,
  },
  line: {
    width: 30,
    height: 3,
    backgroundColor: colors.menuBurger,
    marginVertical: 3,
    borderRadius: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '80%',
    backgroundColor: colors.primaryBackground,

    marginTop: 70,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    padding: 5,
    paddingRight: 8,
    paddingTop: 50,
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Forum_400Regular',
    letterSpacing: 0.5,
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 20,
    fontWeight: '600',
    color: colors.colorText,
    textAlign: 'left',
  },
  menuItem: { width: '95%', flexDirection: 'row', alignItems: 'center' },
  iconArrow: { marginLeft: 'auto' },
  userAuthorization: { marginLeft: 'auto' },
})
