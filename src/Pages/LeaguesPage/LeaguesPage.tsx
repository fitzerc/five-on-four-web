import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import { AddLeagueModal } from "../../Components/Modals/AddLeagueModal/AddLeagueModal";
import { FoFService, useAppContext } from "../../App";
import { AuthHttpService } from "../../services/auth_service";
import { useUserContext } from "../../Components/UserContext";
import { FiveOnFourUser, isAdmin } from "../../Models/user";
import { LeagueHttpService } from "../../services/league_service";
import { League } from "../../Models/league";
import { LeaguesCarousel } from "../../Components/Carousel/LeaguesCarousel";




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
    
    const onAddLeague = async (name: string, description: string) => {
        setShowAddLeague(false);
        await league_svc.AddLeague(name, description);
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
        <div class="my-4">
            <LeaguesCarousel leagues={leagues()} />

            <Show when={user && isAdmin(user.roles)}>
            <div class="mt-4 text-center">
                <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-content px-3 py-2 text-sm font-semibold text-bkg ring-1 ring-inset ring-content shadow-sm hover:bg-bkg hover:text-content sm:ml-3 sm:w-auto"
                    onClick={() => setShowAddLeague(true)}
                >
                    Add League
                </button>
            </div>
            </Show>
        </div>
    </>
    )
}