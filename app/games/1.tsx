import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import colors from '@/assets/color'
import MenuApp from '@/components/layout/MenuApp'
import Background from '@/components/layout/Background'
import { ProgressBar } from 'react-native-paper'

export default function KartovedScreen() {
  return (
    <Background>
      <MenuApp />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Картовед</Text>

        {/* Блок с карточкой и описанием */}
        <View style={styles.card}>
          <Image
            source={require('@/assets/images/bac.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.description}>
            “Картовед” — это упражнение на тренировку рабочей памяти и
            концентрации внимания. Ваша задача — запоминать взаимосвязанные
            изображения и воспроизводить их порядок после короткой паузы.
          </Text>

          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Уровень */}
        <View style={styles.levelBox}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelLabel}>Уровень</Text>
            <Text style={styles.levelValue}>3 / 30</Text>
          </View>

          <ProgressBar
            progress={0.1}
            color="#3a8ef6"
            style={styles.progressBar}
          />

          <Text style={styles.progressText}>
            Вы развиваете способность удерживать визуальные образы. Продолжайте,
            и скорость восприятия улучшится!
          </Text>
        </View>

        {/* Личная статистика */}
        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>Ваша статистика</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Точность</Text>
              <Text style={styles.statValue}>84%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Скорость</Text>
              <Text style={styles.statValue}>1.3 сек</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Лучший результат</Text>
              <Text style={styles.statValue}>92%</Text>
            </View>
          </View>
        </View>

        {/* Кнопки */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeText}>Поменять</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startBtn}>
            <Text style={styles.startText}>Начать</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primaryBackground,
    opacity: 0.9,
    paddingHorizontal: 35,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    color: colors.colorText,
    letterSpacing: 1.2,
  },
  card: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 16,
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    color: colors.colorText,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#0a74da',
  },
  levelBox: {
    backgroundColor: '#e9f4ff',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  levelValue: {
    fontSize: 16,
  },
  progressBar: {
    height: 6,
    borderRadius: 4,
    marginTop: 10,
  },
  progressText: {
    marginTop: 8,
    fontSize: 13,
    color: '#444',
  },
  statsBox: {
    backgroundColor: '#f2f8ff',
    borderRadius: 16,
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 20,
    height: 130,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    // textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#555',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007bff',
    marginTop: 3,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'space-between',
  },
  changeBtn: {
    backgroundColor: '#fff',
    width: '45%',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  startBtn: {
    width: '45%',
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    color: '#333',
  },
  startText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
})
