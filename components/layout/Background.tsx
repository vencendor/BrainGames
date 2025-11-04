import { ImageBackground, StyleSheet } from 'react-native'

type PropsType = {
  children: React.ReactNode
}

const backgroundImages = [
  // require('@/assets/background/fon_27.png'),
  // require('@/assets/background/fon_28.png'),
  // require('@/assets/background/fon_29.png'),
  require('@/assets/background/fon_34.png'),
  // require('@/assets/background/fon_31.png'),
]

const Background = (props: PropsType) => {
  // Randomly select a background image
  const imageIndex = Math.floor(Math.random() * backgroundImages.length)
  const randomImage = backgroundImages[imageIndex]
  return (
    <ImageBackground source={randomImage} style={styles.background}>
      {props.children}
    </ImageBackground>
  )
}

export default Background

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
