
export interface GameInfo {
    date: string;
    away_team: string;
    home_team: string;
    time: string;
    result: number[] | null
}

interface GameCardProps {
    game_info: GameInfo;
}

export function GameCard(props: GameCardProps) {
    
    return (
        <div class="w-28 h-28 bg-content items-center text-center text-xs text-bkg rounded-2xl border border-accent-1">
            <div class="py-2">{props.game_info.date}</div>
            <div class="">{props.game_info.away_team}</div>
            <div class="">vs</div>
            <div>{props.game_info.home_team}</div>
            <div class="pt-1">{props.game_info.time}</div>
        </div>
    )
}