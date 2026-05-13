import React, { useContext } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 20px;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.card};
  padding: 15px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${props => props.theme.border};
`;

const SettingText = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.text};
  font-weight: bold;
`;

export default function SettingsScreen() {
    const { isDarkMode, toggleTheme } = useContext(GameContext);

    return (
        <Container>
            <SettingRow>
                <SettingText>Темна тема</SettingText>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDarkMode ? '#3498db' : '#f4f3f4'}
                />
            </SettingRow>
        </Container>
    );
}