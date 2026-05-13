import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 15px;
`;

const ChallengeCard = styled.View`
  background-color: ${props => props.theme.card};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.border};
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.text};
`;

const Progress = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.primary};
  margin-top: 5px;
`;

const StatusCircle = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.completed ? props.theme.success : 'transparent'};
  border-width: 2px;
  border-color: ${props => props.completed ? props.theme.success : props.theme.border};
`;

export default function ChallengesScreen() {
    const { challenges } = useContext(GameContext);

    const renderItem = ({ item }) => (
        <ChallengeCard>
            <Container style={{ padding: 0, backgroundColor: 'transparent' }}>
                <Title>{item.title}</Title>
                <Progress>{item.current >= item.target ? item.target : item.current} / {item.target}</Progress>
            </Container>
            <StatusCircle completed={item.completed} />
        </ChallengeCard>
    );

    return (
        <Container>
            <FlatList
                data={challenges}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}