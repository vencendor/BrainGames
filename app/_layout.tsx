import '../locales/i18n' // инициализация до использования переводов
import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
      <Stack
        // initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="aboutApp" options={{ title: 'aboutApp' }} />
      </Stack>
    )
}
