import { useSearchParams } from 'react-router-dom';

import { ResetPassword } from '../../components/reset-password/reset-password';
import { SendEmail } from '../../components/send-email/send-email';

export const ForgotPassword = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  if (code) {
    return <ResetPassword code={code} />;
  }

  return <SendEmail />;
};
