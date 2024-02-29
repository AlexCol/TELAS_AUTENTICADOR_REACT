import AppRoutes from './Components/AppRoutes/AppRoutes'
import { AuthProvider } from './Context/AuthContext';
import { useAuth } from './Hooks/useAuth';


function App() {
	const {auth, loading} = useAuth();
	
	return (
    <>
			<AuthProvider value={auth}>
        {loading ? "Loading..." : <AppRoutes />}
      </AuthProvider>
    </>
  )
}

export default App
