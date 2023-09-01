import { LoginInfo } from "../../Components/LoginModal/LoginModal"

export function SignUp() {
    const signupClicked = (newUser: LoginInfo) => {
        console.log(newUser);
    }
    
    //todo: bind variables
    //todo: disable sign up until stuff is filled out

    return (
        <div class="relative transform my-4 max-w-xs mx-auto">
            <div class="mb-4">
              <label class="text-content text-sm font-bold mb-2" for="username">
                    Email
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-content leading-tight focus:outline-none focus:shadow-outline focus:shadow-outline-bkg" id="username" type="text" placeholder="Email" />
              </div>
              <div class="mb-6 align-middle">
                <label class="block text-content text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div class="flex items-center mx-auto">
              <button
                class="bg-content hover:bg-bkg hover:text-content text-bkg font-bold rounded p-2 ring-accent-1 hover:ring-1 hover:shadow-outline hover:ring-content focus:ring-accent-1 focus:shadow-outline"
                type="button"
                onClick={() => signupClicked({email: 'fitzer.c@gmail.com', password: 'test123'})}
              >
                Sign Up
              </button>
            </div>
        </div>
    )
}