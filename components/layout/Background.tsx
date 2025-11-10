import { ImageBackground, StyleSheet, View } from 'react-native'

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
  return <View style={styles.background}>
    {props.children}
    </View>
}

export default Background

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#293646',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
