import { createSignal, type Component } from 'solid-js';

import { Navbar } from './Navigation/Navbar';
import logo from './assets/images/CRL-Logo.jpg'

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
     <div class="min-h-full">
        <Navbar
          user={user}
          menuState={menuState()}
          setMenuState={setMenuState}
          userMenuState={userMenuState()}
          setUserMenuState={setUserMenuState}
          logo={logo}
        />
    </div>
  );
};

export default App;
