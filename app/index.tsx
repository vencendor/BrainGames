import GameCard from '@/components/GameCard'
import Background from '@/components/layout/Background'
import MenuApp from '@/components/layout/MenuApp'
import { commonStyles } from '@/styles/commonStyles'
import { GameListType } from '@/types'
import { View } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export default function Index() {
  const gameList: GameListType = [
    {
      id: 1,
      name: 'Game 1',
      description: 'Description for Game 1',
    },
  ]

  return (
    <GestureHandlerRootView style={commonStyles.flexContainer}>
      <Background>
        <MenuApp />
        <View style={styles.wrapper}>
          {gameList.map((game) => (
            <GameCard game={game} />
          ))}
        </View>
      </Background>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})
