import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebase);

export default function AddBirthday() {
  const [isDatePickedVisible, setIsDatePickedVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  const handlerConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({...formData, dateBirth});
    hideDatePicket();
  };
  const hideDatePicket = () => {
    setIsDatePickedVisible(false);
  };

  const showDatePicket = () => {
    setIsDatePickedVisible(true);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const onSubmit = () => {
    let errors = {};
    if (!formData.name || !formData.lastname || !formData.dateBirth) {
      if (!formData.name) errors.name = true;
      if (!formData.lastname) errors.lastname = true;
      if (!formData.dateBirth) errors.dateBirth = true;
    } else {
      const data = formData;
      data.dateBirth.setYear(0);
      db.collection('cumples')
        .add(data)
        .then(() => {
          console.log('ok');
        })
        .catch(() => {
          setFormError({name: true, lastname: true, dateBirth: true});
        });
    }
    setFormError(errors);
  };
  return (
    <React.Fragment>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.name && {borderColor: '#940c0c'}]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'name')}
        />
        <TextInput
          style={[styles.input, formError.lastname && {borderColor: '#940c0c'}]}
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'lastname')}
        />
        <View
          style={[
            styles.input,
            styles.datePicket,
            formError.dateBirth && {borderColor: '#940c0c'},
          ]}>
          <Text
            style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 15,
            }}
            onPress={showDatePicket}>
            {formData.dateBirth
              ? moment(formData.dateBirth).format('LL')
              : 'Fecha de nacimiento'}
          </Text>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addButton}>Crear Cumpleaños</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickedVisible}
        mode="date"
        onConfirm={handlerConfirm}
        onCancel={hideDatePicket}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 15,
    fontSize: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  datePicket: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#fff',
  },
});
