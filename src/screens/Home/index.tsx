import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParams } from '../../routes/app.routes';
import { View, FlatList, Text } from 'react-native';
import { useCallback, useState } from 'react';

import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { useFocusEffect } from '@react-navigation/native';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';


import { styles } from './styles';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

type Props = NativeStackScreenProps<RootStackParams>

export function Home({navigation: { navigate }}: Props) {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);  
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigate('AppointmentCreate');
  }

  async function loadAppointment() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if(category) {
      setAppointments(storage.filter(item => item.category === category));
    }else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointment();
  },[category]));

  return(
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>

      <CategorySelect 
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {
        loading ? <Load /> :
        <>
        <ListHeader 
          title='Partidas agendadas'
          subtitle={`Total ${appointments.length}`}
        />
  
        <FlatList 
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Appointment 
              data={item}
              onPress={() => handleAppointmentDetails(item)}
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          contentContainerStyle={{paddingBottom: 69}}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
        </>
      }
    </Background>
  );
}