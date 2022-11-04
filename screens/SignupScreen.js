import { useContext, useState } from 'react';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';

function SignupScreen() {
  const [isAuthentication, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Creating user ..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
