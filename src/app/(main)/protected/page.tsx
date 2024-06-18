import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser"
import withAuth from "@/lib/withAuth";


const ProtectedPage: React.FC = () => {
  const { user,logout } = useUser();

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl" >Authenticated Page</h1>
      <p className="text-3xl">Welcome, {user?.name}</p>
      <Button size="lg" onClick={logout}>Log Out</Button>
    </div>
  )
}

export default withAuth(ProtectedPage);