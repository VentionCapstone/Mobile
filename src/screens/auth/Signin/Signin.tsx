import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, Input, Alert } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAccountLoader } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { AlertType, SignInParams } from 'src/types';
import { EMAIL_MAX_LENGTH } from 'src/utils';

import { validateForm } from './Signin.utils';
import styles from '../auth.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Signin'>;

const Signin = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getAccountLoader);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SignInParams>({
    email: '',
    password: '',
  });

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleInputChange = (field: string, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSignIn = async () => {
    setFormInteracted(true);
    const errors = validateForm(formValues);

    if (Object.keys(errors).length === 0) {
      const response = await dispatch(AsyncThunks.signIn(formValues));

      if (response.meta.requestStatus === 'fulfilled') {
        setSuccessVisible(true);
        navigation.navigate('Profile');
      }
    } else {
      setValidationErrors(errors);
    }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);
    }
  }, [formValues, formInteracted]);

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, [dispatch]);

  return (
    <ScreenTemplate>
      <FormTemplate loading={loading} onSubmit={handleSignIn} formIsValid={formIsValid}>
        <Text style={styles.head}>Welcome back!</Text>
        <Text style={styles.description}>
          Sign in to your account and plan your next journey with us
        </Text>
        <Input
          style={styles.input}
          value={formValues.email}
          maxLength={EMAIL_MAX_LENGTH}
          placeholder="Enter your email"
          onChangeText={(text: string) => handleInputChange('email', text)}
          error={validationErrors.email}
        />
        <Input
          style={styles.input}
          value={formValues.password}
          placeholder="Enter your password"
          onChangeText={(text: string) => handleInputChange('password', text)}
          error={validationErrors.password}
          secureTextEntry
        />
        <View style={styles.container}>
          <Text style={styles.toggleText}>Don't have an account yet?</Text>
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            Sign Up
          </Text>
        </View>

        <Alert
          type={AlertType.Success}
          visible={successVisible}
          title="Login successfully"
          onClose={() => setSuccessVisible(false)}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default Signin;
