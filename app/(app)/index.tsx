import { useSession } from "@/src/features/auth/SessionProvider";
import { MainPage } from "@/src/layouts/main-page/MainPage";
import { UserPage } from "@/src/layouts/user-page/UserPage";

export default function Index() {
  const { isAuthenticated } = useSession();

  return isAuthenticated ? <UserPage /> : <MainPage />;
}
