import GameCard from '@/components/GameCard'
import Background from '@/components/layout/Background'
import MenuApp from '@/components/layout/MenuApp'
import { commonStyles } from '@/styles/commonStyles'
import { GameListType } from '@/types'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export default function Index() {
  const gameList: GameListType = [
    {
      id: 1,
      name: 'Память',
      description:
        'Упражнения для улучшения краткосрочной и долговременной памяти',
      progress: 100,
    },
    {
      id: 2,
      name: 'Внимание',
      description: 'Развитие концентрации и способности замечать детали',
      progress: 80,
      image: require('@/assets/icons/pamyat.jpg'),

    },
    {
      id: 3,
      name: 'Логика',
      description: 'Тренировка аналитического мышления и рассуждений',
      progress: 90,
      
    },
    {
      id: 4,
      name: 'Мышление',
      description: 'Упражнения на гибкость ума и креативность',
      progress: 50,
    },
    {
      id: 5,
      name: 'Реакция',
      description: 'Повышение скорости принятия решений и ответов на стимулы',
      progress: 20,
    },
    {
      id: 6,
      name: 'Восприятие',
      description:
        'Развитие способности быстро обрабатывать визуальную и слуховую информацию',
      progress: 40,
    },
    {
      id: 7,
      name: 'Речь',
      description: 'Улучшение словарного запаса и речевой памяти',
      progress: 20,
    },
    {
      id: 8,
      name: 'Координация',
      description: 'Тренировка взаимодействия мозга и тела, мелкой моторики',
      progress: 30,
    },
  ]

  return (
    // <GestureHandlerRootView style={commonStyles.flexContainer}>

    // </GestureHandlerRootView>
    <Background>
      <MenuApp />
      <View style={styles.wrapper}>
        {gameList.map((game) => (
          <GameCard game={game} />
        ))}
      </View>
    </Background>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})
