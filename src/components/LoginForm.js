import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      console.log('Error 1');
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
      console.log('Error 2');
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };
  return (
    <React.Fragment>
      <View style={styles.login}>
        <TextInput
          style={[styles.input, formError.email && styles.error]}
          placeholder="Correo electrónico"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'email')}
        />
        <TextInput
          style={[styles.input, formError.password && styles.error]}
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange={(e) => onChange(e, 'password')}
        />
        <TouchableOpacity onPress={login}>
          <Text>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  login: {
    height: 100,
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    color: '#fff',
    width: '80%',
    marginBottom: 15,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  register: {
    flex: 0,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  error: {
    borderColor: '#940c0c',
  },
});
