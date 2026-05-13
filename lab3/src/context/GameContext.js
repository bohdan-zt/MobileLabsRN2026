import React, { createContext, useState } from 'react';

export const GameContext = createContext();

// Початковий стан наших завдань (челенджів)
const initialChallenges = [
    { id: 1, type: 'tap', title: 'Зробити 10 кліків', target: 10, current: 0, completed: false },
    { id: 2, type: 'double_tap', title: 'Зробити подвійний клік 5 разів', target: 5, current: 0, completed: false },
    { id: 3, type: 'long_press', title: 'Утримувати об\'єкт 3 секунди', target: 1, current: 0, completed: false },
    { id: 4, type: 'drag', title: 'Перетягнути об\'єкт', target: 1, current: 0, completed: false },
    { id: 5, type: 'swipe_right', title: 'Зробити свайп вправо', target: 1, current: 0, completed: false },
    { id: 6, type: 'swipe_left', title: 'Зробити свайп вліво', target: 1, current: 0, completed: false },
    { id: 7, type: 'pinch', title: 'Змінити розмір об\'єкта', target: 1, current: 0, completed: false },
    { id: 8, type: 'score', title: 'Отримати 100 очок', target: 100, current: 0, completed: false },
    // ВЛАСНЕ ЗАВДАННЯ:
    { id: 9, type: 'triple_tap', title: 'Кастомне: Потрійний клік (1 раз)', target: 1, current: 0, completed: false },
];

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [challenges, setChallenges] = useState(initialChallenges);
    const [isDarkMode, setIsDarkMode] = useState(false); // Стан для теми

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Функція для реєстрації будь-якої дії (жесту)
    const registerAction = (actionType, pointsToAdd = 0) => {
        setScore((prevScore) => {
            const newScore = prevScore + pointsToAdd;

            // Оновлюємо прогрес челенджів
            setChallenges((prevChallenges) =>
                prevChallenges.map((challenge) => {
                    // Якщо челендж вже виконано, пропускаємо
                    if (challenge.completed) return challenge;

                    // Якщо тип дії збігається
                    if (challenge.type === actionType) {
                        const newCurrent = challenge.current + 1;
                        return { ...challenge, current: newCurrent, completed: newCurrent >= challenge.target };
                    }

                    // Окрема перевірка для челенджу на загальну кількість балів (100 очок)
                    if (challenge.type === 'score') {
                        return { ...challenge, current: newScore, completed: newScore >= challenge.target };
                    }

                    return challenge;
                })
            );

            return newScore;
        });
    };

    return (
        <GameContext.Provider value={{ score, challenges, registerAction, isDarkMode, toggleTheme }}>
            {children}
        </GameContext.Provider>
    );
};