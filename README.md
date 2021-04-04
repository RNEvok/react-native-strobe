# React Native Strobe

Customizable strobe for react native.

### Prerequisites

If you want to use this library, you also need to install:

```
react-native-linear-gradient
```

## Installing

Using npm:

```
npm install react-native-strobe
```

Using yarn:

```
yarn add react-native-strobe
```

## Props

liteMode: boolean;

```
render strobe as a small block
```
paused: boolean;

```
is the track paused at the moment
```
buttonPosition?: 'bottomCenter' | 'bottomRight';

```
Position of "close" button
```
defaultText?: string;

```
Placeholder
```
defaultColor1Index?: number;

```
Default index (in strobeColorsArray) of first strobe color
```
defaultColor2Index?: number;

```
Default index (in strobeColorsArray) of second strobe color
```
maxSampleValue?: number;

```
128 by default
```
strobeColorsArray?: string[];

```
Your's array of colors for strobe
```
syncInterval: number;

```
interval (in milliseconds) between updates of the progress prop
```
useGradient?: boolean;

```
Use gradient  feautures
```
progress: number;

```
(In seconds) - current playing time
```
songDuration: number;

```
(In seconds) - track duration
```
waveform?: Waveform;

```
Waveform data:
type Waveform = {
  bits: number;
  channels: number;
  data: number[];
  length: number;
  sample_rate: number;
  samples_per_pixel: number;
}
```
samplesInSec: number;

```
Use this formula to calculate samplesInSec number:
samplesInSec = Math.round(waveform.length * 2 / durationSec)
waveform - samples array
durationSec - duration of the track
```
updatesInSecond?: number;

```
5 by default
```
showCloseButton?: boolean;

```
default is true
```
closeStrobe: () => void;

```
callback when close button is pressed
```
customLiteContainerStyle?: ViewStyle;

```
Override LiteContainerStyle
```
customContainerStyle?: ViewStyle;

```
Override ContainerStyle
```
customBlockStyle?: ViewStyle;

```
Override BlockStyle
```
customTextContainerStyle?: ViewStyle;

```
Override TextContainerStyle
```
customStrobeTextStyle?: ViewStyle;

```
Override StrobeTextStyle
```

## Built With

* [react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient)

## Authors

* **Me** - *Initial work* -

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details