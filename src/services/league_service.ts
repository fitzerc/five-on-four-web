import { League } from "../Models/league";


export class LeagueHttpService {
  private readonly base_url = 'http://localhost:1323';
  private readonly api_url = `${this.base_url}/api`;
  
  public async GetLeagues(): Promise<League[]> {
      let req = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
      };
      
      const res = await fetch(`${this.api_url}/leagues`, req);
      return await res.json().then<League[]>();
  }
  
  public async AddLeague(name: string): Promise<void> {
    const body = {league_name: name};
    let req = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    };
    
    const res = await fetch(`${this.api_url}/leagues`, req)
  }
}