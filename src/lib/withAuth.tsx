import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../store/store'; // Adjust path according to your structure

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { accessToken } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!accessToken) {
        router.push('/login');
      }
    }, [accessToken, router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
