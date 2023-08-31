import { For } from "solid-js";

export interface Announcement {
    from: string;
    date: string;
    message: string;
}

interface AnnouncementsProps {
    announcements: Announcement[];
}

export function Announcements(props: AnnouncementsProps) {

    return (
        <div class="w-auto mx-3 rounded-2xl h-52 bg-content">
            <h2 class="text-center text-bkg font-bold">Announcements</h2>

            <For each={props.announcements}>
                {a =>
                    <div class="w-auto h-auto mx-2">
                        <span class="text-bkg text-xs font-bold">{a.from} </span>
                        <span class="text-bkg text-xs font-normal">({a.date}):<br/>
                            <div class="ml-2">
                                {a.message}
                            </div>
                        </span>
                    </div>
                }
            </For>
        </div>
    )
}