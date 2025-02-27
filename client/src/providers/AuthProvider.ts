import useUserStore from "@/store/UserStore";
import { useEffect } from "react";

function AuthProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const checkAuth = useUserStore(state => state.checkAuth)

  useEffect(() => {
      if (localStorage.getItem('accessToken')) {
          checkAuth()
      }
  }, [checkAuth])

  return children
}

export default AuthProvider;

