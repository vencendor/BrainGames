import React, { ReactNode } from 'react';
import { StyleSheet, ImageBackground, ViewStyle } from 'react-native';

interface WallpaperProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const Wallpaper: React.FC<WallpaperProps> = ({ children, style }) => {
  const image = require('@/assets/background/fon_7.jpg');

  return (
    <ImageBackground source={image} style={style}>
      {children}
    </ImageBackground>
  );
};

export default Wallpaper;

const styles = StyleSheet.create({});
