import { Route } from "react-router-dom";
import UserActivationResend from "../../Pages/UserActivationResend/UserActivationResend";
import UserActivation from "../../Pages/UserActivation/UserActivation";
import PasswordRecover from "../../Pages/PasswordRecover/PasswordRecover";
import PasswordRecoverSend from "../../Pages/PasswordRecoverSend/PasswordRecoverSend";
import About from "../../Pages/About/About";


export const FreeRoutes = () => {
	return (
    <>
        {/* can only be acceced if logged in */}        
				<Route path='/user/activation' element={<UserActivation />}/>
				<Route path='/user/activation_resend' element={<UserActivationResend />}/>

				<Route path='/auth/password_recover' element={<PasswordRecover />}/>
				<Route path='/auth/password_recover_send' element={<PasswordRecoverSend />}/>

				<Route path='/about' element={<About />}/>
				
    </>
	);
}