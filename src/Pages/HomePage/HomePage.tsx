import { For, createSignal } from "solid-js";
import { Announcements } from "../../Components/Announcements/Announcements";
import { GameCard, GameInfo } from "../../Components/Game/GameCard";
import { useUserContext } from "../../Components/UserContext";

export function HomePage() {
    const inputannouncements = [
        {
            from: 'Big Guy',
            date: '8/31/2023 2:00 pm',
            message: '@Bravo all games cancelled due to the weather.'
        },
        {
            from: 'Little Guy',
            date: '8/31/2023 2:15 pm',
            message: '@Commando all weather cancelled due to the games'
        }
    ]

    const [announcements, setAnnouncements] = createSignal(inputannouncements);

    const inputgames: GameInfo[] = [
        {
            date: '8/24/2023',
            away_team: 'Knights',
            home_team: 'Bulldogs',
            time: '',
            result: [2, 5]
        },
        {
            date: '8/31/2023',
            away_team: 'Bunkers',
            home_team: 'Bulldogs',
            time: '8:15 PM',
            result: null
        },
        {
            date: '9/5/2023',
            away_team: 'Bunkers',
            home_team: 'Silverbacks',
            time: '9:45 PM',
            result: null
        },
    ]

    const [games, setGames] = createSignal(inputgames);
  
    return (
        <>
            <div class="my-4 flex justify-center gap-1">
                <For each={games()}>
                { game =>
                    <GameCard game_info={game} />
                }
                </For>
            </div>
            <Announcements announcements={announcements()} />
        </>
    )
}