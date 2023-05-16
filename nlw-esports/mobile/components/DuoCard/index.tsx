import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { THEME } from '../../src/theme';
import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';
import { GameController } from 'phosphor-react-native'

export interface DuoCardProps {
  hoursEnd: string,
  hoursStart: string,
  id: string,
  name: string,
  useVoiceChanel: boolean,
  weekDays: string,
  yearsPlaying: number,
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />
      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hoursStart} às ${data.hoursEnd}`}
      />
      <DuoInfo
        label="Chamada de audio?"
        value={data.useVoiceChanel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChanel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}