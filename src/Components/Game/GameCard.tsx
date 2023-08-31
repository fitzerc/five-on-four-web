
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
        <div class="w-28 h-28 bg-gray-700 items-center text-center text-xs text-white rounded-2xl border border-zinc-300">
            <div class="">{props.game_info.date}</div>
            <div class="">{props.game_info.away_team}</div>
            <div class="">vs</div>
            <div>{props.game_info.home_team}</div>
            <div>{props.game_info.time}</div>
        </div>
    )
}