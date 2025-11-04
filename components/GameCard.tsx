import { GameType } from '@/types';
import { ReactNode } from 'react';
import {
  StyleSheet,
  ImageBackground,
  ViewStyle,
  View,
  Text,
} from 'react-native'

interface Props {
  game: GameType
}

const GameCard = (props : Props) => {


  return (
    <View style={styles.card}>
      <View>
        <Text>{ props.game?.name }</Text>
      </View>
      <View>
        <Text> Game name</Text>
      </View>
      <View>
        <Text> Game description</Text>
      </View>
    </View>
  )
}

export default GameCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
  }
});
