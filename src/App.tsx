import { createSignal, type Component } from 'solid-js';

import { Navbar } from './Components/Navigation/Navbar';
import logo from './assets/images/CRL-Logo.jpg'
import { Route, Routes } from '@solidjs/router';
import { HomePage } from './Pages/HomePage/HomePage';
import { TeamsPage } from './Pages/TeamsPage/TeamsPage';
import { LeaguesPage } from './Pages/LeaguesPage/LeaguesPage';
import { SignUp } from './Pages/SignUp/SignUp';

const App: Component = () => {
  const user = {
    first_name: 'Chris',
    last_name: 'Fitzer',
    email: 'fitzer.c@gmail.com',
    image_url: 'https://media.licdn.com/dms/image/C4E03AQHdOj_dHWj77Q/profile-displayphoto-shrink_200_200/0/1646058389402?e=1698883200&v=beta&t=6zyPAY9kRVtyLFH5guX5gkVJNmAqKobftlqlomVs5-o',
  }
  
  const [menuState, setMenuState] = createSignal(false);
  const [userMenuState, setUserMenuState] = createSignal(false);

  return (
     <div class="min-h-full h-screen bg-bkg">
        <Navbar
          user={user}
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
        </Routes>
        
    </div>
  );
};

export default App;
