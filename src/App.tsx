import { createSignal, type Component, createContext, useContext, Context } from 'solid-js';

import { Navbar } from './Components/Navigation/Navbar';
import logo from './assets/images/CRL-Logo.jpg'
import { Route, Routes } from '@solidjs/router';
import { HomePage } from './Pages/HomePage/HomePage';
import { TeamsPage } from './Pages/TeamsPage/TeamsPage';
import { LeaguesPage } from './Pages/LeaguesPage/LeaguesPage';
import { SignUp } from './Pages/SignUp/SignUp';
import { UserContext, UserContextProvider } from './Components/UserContext';
import { SetStoreFunction, createStore } from 'solid-js/store';
import { AuthHttpService } from './services/auth_service';
import { ProfilePage } from './Pages/ProfilePage/ProfilePage';

export class FoFService {
  svc_name: string = '';
  svc: any;
}

export const AppContext = createContext();

export function AppContextProvider(props: any) {
  const [services, set_services] = createStore<FoFService[]>([
    {
      svc_name: 'api_service',
      svc: new AuthHttpService(),
    },
  ]);
  
  return (
    <AppContext.Provider value={{services, set_services}}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

const App: Component = () => {
  const [menuState, setMenuState] = createSignal(false);
  const [userMenuState, setUserMenuState] = createSignal(false);

  return (
     <div class="min-h-full h-screen bg-bkg">
        <UserContextProvider>
          <Navbar
            menuState={menuState()}
            setMenuState={setMenuState}
            userMenuState={userMenuState()}
            setUserMenuState={setUserMenuState}
            logo={logo}
          />
        
          <Routes>
            <Route path="/" component={HomePage} />
            <Route path="/leagues" component={LeaguesPage} />
            <Route path="/teams" component={TeamsPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component={ProfilePage} />
          </Routes>
        </UserContextProvider>
        
    </div>
  );
};

export default App;
