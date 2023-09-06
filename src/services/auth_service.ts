import { LoginInfo } from "../Components/LoginModal/LoginModal";
import { FiveOnFourUser } from "../User/user";

export class AuthHttpService {
  private readonly base_url = 'http://localhost:1323';
  private readonly api_url = `${this.base_url}/api`;
  
  public async Logout(): Promise<FiveOnFourUser> {
    let req = {
      method: "GET",
      headers: {
        'Content-Type': 'applicaiton/json',
      },
      credentials: 'include',
    };
  
    const res = await fetch(`${this.api_url}/logout`, req);
  
    return await res.json().then<FiveOnFourUser>(r => {
      return {
        email: r.email,
        first_name: r.first_name,
        last_name: r.last_name,
        token: r.token,
        picture: r.picture,
      };
    });
  }
    
  public async Login(loginInfo: LoginInfo): Promise<FiveOnFourUser> {
    let req = {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    const res = await fetch(`${this.base_url}/login`, req);

    return await res.json().then<FiveOnFourUser>(r => {
      return {
        email: r.email,
        first_name: r.first_name,
        last_name: r.last_name,
        token: r.token,
        picture: r.picture,
      };
    });
  }
    
  public async Refresh(): Promise<FiveOnFourUser> {
    let req = {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      const res = await fetch(`${this.base_url}/refresh`, req);

      return await res.json().then<FiveOnFourUser>(r => {
        return {
          email: r.email,
          first_name: r.first_name,
          last_name: r.last_name,
          token: r.token,
          picture: r.picture,
        };
    });
  }
  
  public async SignUp(newUser: LoginInfo): Promise<void> {
    let req = {
      method: "POST",
      body: JSON.stringify(newUser),
      url: `${this.base_url}/signup`,
      headers: {
          'Content-Type': 'application/json',
      },
    };

    await fetch('http://localhost:1323/signup', req);
  }
  
  public async UpdateUser(newUser: FiveOnFourUser): Promise<FiveOnFourUser> {
    let req = {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    const res = await fetch(`${this.api_url}/users`, req);
    return await res.json().then(r => {
      return {
        email: r.email,
        first_name: r.first_name,
        last_name: r.last_name,
        token: r.token,
        picture: r.picture,
      };
    });
  }

  public async UpdateProfilePicture(pic: Blob): Promise<void> {
    let req = {
      method: "PUT",
      body: pic,
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    await fetch(`${this.api_url}/users/image`, req);
  }
}