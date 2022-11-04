import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';

function LoginScreen() {
  const [isAuthentication, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not log you in. Please check your credentials or try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Logging you in ..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
