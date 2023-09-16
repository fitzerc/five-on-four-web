import { Index, Show, createSignal } from "solid-js";
import { League } from "../../Models/league";
import { LeagueCard } from "../LeagueCard/LeagueCard";
import { useNavigate } from "@solidjs/router";
import { Team } from "../../Models/team";
import { TeamCard } from "../TeamCard/TeamCard";

export interface LeaguesCarouselProps {
    teams: Team[];    
}

export function TeamsCarousel(props: LeaguesCarouselProps) {
    const [curIdx, setCurIdx] = createSignal(0);
    const navigate = useNavigate();

    const teamClicked = (t: Team) => {
        navigate("/teams/" + t.ID, { replace: true });
    }
    
    const previous = () => {
        if (curIdx() == 0) {
            setCurIdx(props.teams.length - 1)
        } else {
            setCurIdx(curIdx() - 1);
        }
    };
    const forward = () => {
        if (curIdx() + 1 >= props.teams.length) {
            setCurIdx(0);
        } else {
            setCurIdx(curIdx() + 1);
        }
    };

    return (
        <div class="relative mx-auto max-w-2xl overflow-hidden rounded-md bg-content p-2 sm:p-4">
            <div class="absolute right-5 top-5 z-10 rounded-full bg-bkg px-2 text-center text-sm text-white">
                <span>{curIdx() + 1}</span>/<span>{props.teams.length}</span>
            </div>

            <button onClick={previous} class="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bkg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button onClick={forward} class="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bkg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            <div class="relative h-80">
                {/* Add transitions */}
                <Index each={props.teams}>
                    {(team, i) =>
                        <Show when={curIdx() === i}>
                            <div class="items-center justify-center flex">
                                <TeamCard team={team()} onTeamClick={() => teamClicked(team())} />
                            </div>
                        </Show>
                    }
                </Index>
            </div>
        </div>
   );
}