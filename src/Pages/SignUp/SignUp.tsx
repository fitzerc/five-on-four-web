import { createSignal } from "solid-js";
import { LoginInfo } from "../../Components/Modals/LoginModal/LoginModal"
import { useNavigate, Navigator } from "@solidjs/router";
import { FoFService, useAppContext } from "../../App";
import { AuthHttpService } from "../../services/auth_service";

async function signupClicked(new_user: LoginInfo, nav: Navigator, api_svc: AuthHttpService): Promise<void> {
    await api_svc.SignUp(new_user);
    nav('/');
}

export function SignUp() {
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const nav = useNavigate();
    
    const { services } = useAppContext();
    const api_svc: AuthHttpService = services.find((svc: FoFService) => svc.svc_name == 'api_service').svc;
    
    //todo: disable sign up until stuff is filled out
    return (
        <div class="relative transform my-4 max-w-xs mx-auto">
            <div class="mb-4">
              <label class="text-content text-sm font-bold mb-2" for="username">
                    Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-content leading-tight focus:outline-none focus:shadow-outline focus:shadow-outline-bkg"
                id="email"
                type="text"
                value={email()}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />
             </div>
              <div class="mb-6 align-middle">
                <label class="block text-content text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    value={password()}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="******************" />
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div class="flex items-center mx-auto">
              <button
                class="bg-content hover:bg-bkg hover:text-content text-bkg font-bold rounded p-2 ring-accent-1 hover:ring-1 hover:shadow-outline hover:ring-content focus:ring-accent-1 focus:shadow-outline"
                type="button"
                onClick={() => signupClicked({email: email(), password: password()}, nav, api_svc)}
              >
                Sign Up
              </button>
            </div>
        </div>
    )
}