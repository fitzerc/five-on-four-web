import { Index, Show } from "solid-js";
import { Team } from "../../Models/team";
import logo from "../../assets/images/AB-LOGO.jpg";


export interface TeamCardProps {
    team: Team;
    onTeamClick: any;
}

export function TeamCard(props: TeamCardProps) {
    return (
    <div class="w-80 h-80 pb-6 bg-content rounded-2xl shadow border border-bkg flex-col justify-start items-center gap-3 inline-flex">
        <div class="pt-3 px-4 h-60 w-60">
            <img class="w-full" src={logo} />
        </div>
        <div class="self-stretch h-24 px-6 flex-col justify-start items-start gap-1 flex">
            <div class="self-stretch justify-start items-center inline-flex">
                <div class="text-bkg text-lg font-bold font-['Commissioner'] leading-normal">
                    {props.team.team_name}                        
                </div>
            </div>
            <div class="self-stretch justify-center items-start inline-flex">
                <div class="grow shrink basis-0 h-14 flex-col justify-start items-start gap-2 inline-flex">
                    <div class="self-stretch text-bkg text-lg font-thin font-['Commissioner'] leading-normal">
                        {props.team.team_name}
                    </div>
                </div>
                <div class="shrink basis-0 flex-col justify-end items-end gap-3 inline-flex">
                    <div class="flex-col justify-end items-end flex">
                        <button
                            class="inline-flex w-full rounded-md bg-bkg px-3 py-2 text-sm font-semibold text-content ring-1 ring-inset ring-content shadow-sm hover:ring-bkg hover:bg-content hover:text-bkg sm:ml-3 sm:w-auto"
                            onClick={props.onTeamClick}
                        >
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}