

export class TeamHttpService {
  private readonly base_url = 'http://localhost:1323';
  private readonly api_url = `${this.base_url}/api`;
  
  public async AddTeam(season_id: number, name: string): Promise<void> {
    const body = {
        team_name: name,
        season_id
    }

    let req = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    };
    
    const res = await fetch(`${this.api_url}/teams`, req);
  }

  public async UpdateTeamPicture(pic: Blob, teamId: number): Promise<void> {
    let req = {
      method: "PUT",
      body: pic,
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    await fetch(`${this.api_url}/teams/${teamId}/image`, req);
  }
}