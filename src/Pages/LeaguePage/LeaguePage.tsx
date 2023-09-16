import { Show, createSignal, onMount } from "solid-js"
import { useUserContext } from "../../Components/UserContext";
import { AuthHttpService } from "../../services/auth_service";
import { LeagueHttpService } from "../../services/league_service";
import { FoFService, useAppContext } from "../../App";
import { useParams } from "@solidjs/router";
import { League } from "../../Models/league";
import { TeamsCarousel } from "../../Components/Carousel/TeamsCarousel";
import { isAdmin } from "../../Models/user";
import { AddTeamModal } from "../../Components/Modals/AddTeamModal/AddTeamModal";
import { TeamHttpService } from "../../services/team_service";
import { AddSeasonModal } from "../../Components/Modals/AddSeasonModal/AddSeasonModal";

export function LeaguePage() {
    const params = useParams();
    const { services } = useAppContext();
    const api_svc: AuthHttpService = services.find((svc: FoFService) => svc.svc_name === 'api_service').svc;
    const league_svc: LeagueHttpService = services.find((svc: FoFService) => svc.svc_name === 'league_service').svc;
    const team_svc: TeamHttpService = services.find((svc: FoFService) => svc.svc_name === 'team_service').svc;
    
    const {user, setUser} = useUserContext();
    const [league, setLeague] = createSignal(new League());
    const [teams, setTeams] = createSignal([]);
    const [showAddTeam, setShowAddTeam] = createSignal(false);
    const [showAddSeason, setShowAddSeason] = createSignal(false);

    onMount(async (): Promise<void> => {
        if (!user.token) {
            const tmpUser = await api_svc.Refresh();
            setUser(tmpUser);
        }
        
        const l = await league_svc.GetLeagueById(params.id);
        setLeague(l);
    });
    
    const onAddTeam = async(name: string) => {
        if (league().ID){
            await team_svc.AddTeam(league().ID ?? 0, name);
        }
    }
    
    const onAddSeason = async(name: string, startDate: string, endDate: string) => {
        if (league().ID) {
            //TODO: add seasonService
            console.log(name);
        }
    }

    return (
        <>
            <AddTeamModal
                showModal={showAddTeam()}
                onSave={onAddTeam}
                onCancel={() => setShowAddTeam(false)}
            />
            <AddSeasonModal
                showModal={showAddSeason()}
                onSave={onAddSeason}
                onCancel={() => setShowAddSeason(false)}
            />
            <div class="my-4">
                <TeamsCarousel teams={teams()} />

                <Show when={user && isAdmin(user.roles)}>
                    <div class="mt-4 text-center">
                        <button
                            type="button"
                            class="inline-flex w-full justify-center rounded-md bg-content px-3 py-2 text-sm font-semibold text-bkg ring-1 ring-inset ring-content shadow-sm hover:bg-bkg hover:text-content sm:ml-3 sm:w-auto"
                            onClick={() => setShowAddTeam(true)}
                        >
                            Add Team
                        </button>
                        <button
                            type="button"
                            class="inline-flex w-full justify-center rounded-md bg-content px-3 py-2 text-sm font-semibold text-bkg ring-1 ring-inset ring-content shadow-sm hover:bg-bkg hover:text-content sm:ml-3 sm:w-auto"
                            onClick={() => setShowAddSeason(true)}
                        >
                            Add Season
                        </button>
                    </div>
                </Show>
            </div>
        </>
    );
}