import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import { AddLeagueModal } from "../../Components/AddLeagueModal/AddLeagueModal";
import { FoFService, useAppContext } from "../../App";
import { AuthHttpService } from "../../services/auth_service";
import { useUserContext } from "../../Components/UserContext";
import { FiveOnFourUser, isAdmin } from "../../Models/user";
import { LeagueHttpService } from "../../services/league_service";
import { League } from "../../Models/league";




export function LeaguesPage() {
    let addLeagueDivRef: HTMLDivElement;
    
    const {user, setUser} = useUserContext();
    const { services } = useAppContext();
    const api_svc: AuthHttpService = services.find((svc: FoFService) => svc.svc_name === 'api_service').svc;
    const league_svc: LeagueHttpService = services.find((svc: FoFService) => svc.svc_name === 'league_service').svc;

    const [showAddLeague, setShowAddLeague] = createSignal(false);

    const l: League[] = []
    const [leagues, setLeagues] = createSignal(l);

    const handleOutsideAddLeagueClick = (event: MouseEvent) => {
        if(addLeagueDivRef && !addLeagueDivRef.contains(event.target as Node) && addLeagueDivRef && !addLeagueDivRef.contains(event.target as Node)) {
            setShowAddLeague(false);
        }
    }

    onMount(async (): Promise<void> => {
        document.addEventListener('click', handleOutsideAddLeagueClick);
        if (!user.token) {
            const tmpUser = await api_svc.Refresh();
            setUser(tmpUser)
        }
        
        const tmpLeagues = await league_svc.GetLeagues();
        setLeagues(tmpLeagues);
    });
    
    onCleanup(() => {
        document.removeEventListener('click', handleOutsideAddLeagueClick);
    });
    
    const onAddLeague = async (name: string) => {
        setShowAddLeague(false);
        await league_svc.AddLeague(name);
        const tmpLeagues = await league_svc.GetLeagues();
        setLeagues(tmpLeagues);
    }

    return (
    <>
        <AddLeagueModal
            showModal={showAddLeague()}
            onSave={onAddLeague}
            onCancel={() => setShowAddLeague(false)}
        />
        <div class="relative transform my-4 max-w-xs mx-auto">
            <div class="mb-4">
                <h2>Cenior Rhino Leagues</h2>
            </div>
            <div class="mb-4">
                <div>List</div>
                <div>Of</div>
                <div>Leagues</div>

                <For each={leagues()}>
                    {league =>
                        <div>
                            <h3>{league.league_name}</h3>
                        </div>
                    }
                </For>

                <Show when={user && isAdmin(user.roles)}>
                    <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md bg-content px-3 py-2 text-sm font-semibold text-bkg ring-1 ring-inset ring-content shadow-sm hover:bg-bkg hover:text-content sm:ml-3 sm:w-auto"
                        onClick={() => setShowAddLeague(true)}
                    >
                        Add League
                    </button>
                </Show>
            </div>
        </div>
    </>
    )
}