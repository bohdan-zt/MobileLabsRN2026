import React, { useContext } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';

// --- Styled Components ---
const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-items: center;
  justify-content: center;
`;

const ScoreText = styled.Text`
  font-size: 64px;
  font-weight: bold;
  color: ${props => props.theme.text};
  position: absolute;
  top: 10%;
`;

const TargetCircle = styled(Animated.View)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${props => props.theme.primary};
  justify-content: center;
  align-items: center;
  elevation: 8;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  shadow-offset: 0px 4px;
`;

const TargetText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

export default function GameScreen() {
    const { score, registerAction } = useContext(GameContext);

    // Значення для анімації перетягування та масштабування
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    // Функція-обгортка, щоб безпечно викликати оновлення стейту з UI потоку
    const handleAction = (type, points) => {
        registerAction(type, points);
    };

    // --- Налаштування жестів ---
    const singleTap = Gesture.Tap().onStart(() => {
        runOnJS(handleAction)('tap', 1);
    });

    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        runOnJS(handleAction)('double_tap', 2);
    });

    const tripleTap = Gesture.Tap().numberOfTaps(3).onStart(() => {
        runOnJS(handleAction)('triple_tap', 5); // Наше кастомне завдання
    });

    // Exclusive гарантує, що спрацює лише найскладніший жест
    const taps = Gesture.Exclusive(tripleTap, doubleTap, singleTap);

    const longPress = Gesture.LongPress().minDuration(3000).onStart(() => {
        runOnJS(handleAction)('long_press', 5);
    });

    const drag = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            runOnJS(handleAction)('drag', 2);
        });

    // Fling вправо (1) та вліво (2)
    const swipeRight = Gesture.Fling().direction(1).onStart(() => {
        runOnJS(handleAction)('swipe_right', Math.floor(Math.random() * 10) + 1);
    });

    const swipeLeft = Gesture.Fling().direction(2).onStart(() => {
        runOnJS(handleAction)('swipe_left', Math.floor(Math.random() * 10) + 1);
    });

    const pinch = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = event.scale;
        })
        .onEnd(() => {
            scale.value = withSpring(1);
            runOnJS(handleAction)('pinch', 3);
        });

    // Об'єднуємо всі жести. Drag і Pinch працюють одночасно.
    const composed = Gesture.Simultaneous(
        Gesture.Race(taps, longPress, swipeRight, swipeLeft),
        drag,
        pinch
    );

    // Застосовуємо анімації до стилів
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value }
        ],
    }));

    return (
        <Container>
            <ScoreText>{score}</ScoreText>
            <GestureDetector gesture={composed}>
                <TargetCircle style={animatedStyle}>
                    <TargetText>TAP ME</TargetText>
                </TargetCircle>
            </GestureDetector>
        </Container>
    );
}
