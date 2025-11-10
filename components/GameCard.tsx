import { GameType } from '@/types'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { Link } from 'expo-router' // добавляем импорт

interface Props {
  game: GameType
}

const GameCard = ({ game }: Props) => {
  const rotation = (game.progress / 100) * 180 - 90

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation}deg` }],
  }))

  return (
    <Link
      href="/games/1" 
      asChild
    >
      <TouchableOpacity activeOpacity={0.8} style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              game.image ? game.image : require('@/assets/icons/zamok.png')
            }
            style={styles.image}
          />
        </View>

        <View style={styles.nameWrapper}>
          <Text style={styles.nameText}>{game.name}</Text>
        </View>

        <View style={styles.gaugeWrapper}>
          <Image
            source={require('@/assets/images/speedometr.png')}
            style={styles.gaugeBg}
          />
          <Animated.View style={[styles.pointer, animatedStyle]} />
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default GameCard

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: '#546E8F',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '42%',
    height: '20%',
  },
  imageWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#3FC4FF',
    borderRadius: 40,
    position: 'absolute',
    overflow: 'hidden',
    top: '-20%',
    zIndex: 10,
    boxShadow: '0 2px 5px #40464F',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameWrapper: {
    marginTop: '25%',
  },
  nameText: {
    color: '#fff',
    letterSpacing: 1.5,
    fontSize: 16,
    fontWeight: '600',
  },
  gaugeWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugeBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  pointer: {
    position: 'absolute',
    width: 3,
    height: 30,
    backgroundColor: '#3FC4FF',
    bottom: 33,
    borderRadius: 2,
    transformOrigin: 'bottom center',
  },
})
