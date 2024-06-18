import { RootState } from "@/store/store"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux"

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const authState = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if(!authState.accessToken){
        router.push("/");
      }
    },[authState, router])

    return <WrappedComponent {...props} />
  }

  return ComponentWithAuth;
}

export default withAuth;