import React, { memo, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Close } from './Close';
import { STROBE_COLORS } from './colors';
import { AnimatedGradient } from './AnimatedGradient';

export type Waveform = {
  bits: number;
  channels: number;
  data: number[];
  length: number;
  sample_rate: number;
  samples_per_pixel: number;
}

export type StrobeProps = {
  // "mini" strobe
  liteMode?: boolean;
  paused: boolean;
  buttonPosition?: 'bottomCenter' | 'bottomRight';
  defaultText?: string;
  defaultColor1Index?: number;
  defaultColor2Index?: number;
  maxSampleValue?: number;
  strobeColorsArray?: string[];
  syncInterval: number;
  useGradient?: boolean;
  progress: number;
  songDuration: number;
  waveform?: Waveform;
  samplesInSec: number;
  updatesInSecond?: number;
  showCloseButton?: boolean;
  closeStrobe: () => void;
  // Custom style props
  customLiteContainerStyle?: ViewStyle;
  customContainerStyle?: ViewStyle;
  customBlockStyle?: ViewStyle;
  customTextContainerStyle?: ViewStyle;
  customStrobeTextStyle?: ViewStyle;
};

const Strobe: React.FC<StrobeProps> = ({
  paused,
  liteMode,
  songDuration,
  defaultText,
  defaultColor1Index,
  defaultColor2Index,
  maxSampleValue,
  strobeColorsArray,
  syncInterval,
  showCloseButton,
  useGradient,
  progress,
  buttonPosition,
  waveform,
  samplesInSec,
  updatesInSecond,
  customLiteContainerStyle,
  customBlockStyle,
  customContainerStyle,
  customStrobeTextStyle,
  customTextContainerStyle,
  closeStrobe
}) => {

  const LAST_COLOR_INDEX = strobeColorsArray.length - 1;
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  // in milliseconds
  const updateRate = Math.round(1e3 / updatesInSecond);

  const [volume, setVolume] = useState(0);
  const [colorsArray, setColorsArray] = useState([STROBE_COLORS[defaultColor1Index], STROBE_COLORS[defaultColor2Index]]);

  useEffect(() => {
    if (waveform) {
      let i = 0;
      const samplesInUpdateRate = Math.round(samplesInSec / updatesInSecond);
      const played = progress / songDuration;

      let intervalId = setInterval(() => {
        ++i;
        const index = Math.round(played * waveform.length * 2) + samplesInUpdateRate * i;
        const newVolume = (Math.abs(waveform.data[index]) + Math.abs(waveform.data[index + 1])) / 2;
        if (!isNaN(newVolume) && typeof newVolume === 'number' && !pausedRef.current) 
          setVolume(newVolume / (maxSampleValue / 100));
        if (i === syncInterval / updateRate)
          clearInterval(intervalId);
      }, updateRate);
    }
  }, [progress]);

  useEffect(() => {
    const newIndex1 = Math.floor(volume / (100 / LAST_COLOR_INDEX));
    const newIndex2 = useGradient? LAST_COLOR_INDEX - newIndex1: newIndex1;
    setColorsArray([STROBE_COLORS[newIndex1], STROBE_COLORS[newIndex2]]);
  }, [volume]);

  return (
    <AnimatedGradient style={liteMode? customLiteContainerStyle ?? s?.liteContainer: customContainerStyle ?? s?.container} colorsArray={colorsArray} animationDuration={updateRate}>
      {!liteMode && colorsArray[0] === STROBE_COLORS[0] && colorsArray[1] === STROBE_COLORS[0] && pausedRef.current &&
        <View style={customTextContainerStyle ?? s?.textContainer}>
          <Text style={customStrobeTextStyle ?? s?.strobeText}>
            {defaultText}
          </Text>
        </View>
      }
      {!liteMode && showCloseButton &&
        <View style={[customBlockStyle ?? s?.block, {alignItems: buttonPosition === 'bottomCenter'? 'center': 'flex-end'}]}>
          <Close closeStrobe={closeStrobe} />
        </View>
      }
    </AnimatedGradient>
  );
};

Strobe.defaultProps = {
  liteMode: false,
  buttonPosition: 'bottomRight',
  defaultText: 'This is\nstrobe',
  defaultColor1Index: 0,
  defaultColor2Index: 0,
  maxSampleValue: 128,
  updatesInSecond: 5,
  strobeColorsArray: STROBE_COLORS,
  showCloseButton: true,
  useGradient: false
}

const s =
  StyleSheet.create({
    liteContainer: {
      width: 40,
      height: 40,
      borderRadius: 20
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative'
    },
    block: {
      width: '100%',
      justifyContent: "flex-end",
      paddingHorizontal: 28,
      paddingVertical: 28,
      position: 'absolute',
      bottom: 0
    },
    textContainer: {
      width: '100%',
      alignItems: 'center'
    },
    strobeText: {
      color: '#fff',
      fontWeight: '900',
      fontSize: 40
    }
  });

const MemorizedComponent = memo(Strobe);
export { MemorizedComponent as Strobe };