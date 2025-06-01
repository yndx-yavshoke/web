
// Import both versions
import LoginPageMobile from './LoginPage.mobile';
import LoginPageDesktop from './LoginPage.desktop';
import { isDesktop } from '@/src/shared/lib/is-desktop/isDesktop';

export const LoginPage = () => {
  return isDesktop() ? <LoginPageDesktop /> : <LoginPageMobile />;
};
