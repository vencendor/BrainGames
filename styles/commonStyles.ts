import { StyleSheet } from 'react-native'
import colors from '@/assets/color'

export const commonStyles = StyleSheet.create({
  // --- Layout ---
  flexContainer: {
    flex: 1,
  },
  fullWidthContainer: {
    flex: 1,
    width: '100%',
  },
  paddedContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
  },
  mainWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  

  // ---Text ---
  baseTitle: {
    color: colors.colorText,
    fontFamily: 'Nunito_700Bold',
    textShadowColor: colors.lightShadowColor,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.8,
    fontFamily: 'Nunito_700Bold',
    marginLeft: 10,
    color: colors.inputText,
  },
  
})