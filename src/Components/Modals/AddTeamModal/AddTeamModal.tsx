import { Show, createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import "./AddTeamModal.css"

interface AddTeamModalProps {
    showModal: boolean;
    onSave: any;
    onCancel: any;
}

export function AddTeamModal(props: AddTeamModalProps) {
    const [teamName, setTeamName] = createSignal('');

    return (
        <Show when={props.showModal}>
            <Portal>
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="fixed inset-0 bg-accent-3 bg-opacity-75 transition-opacity"></div>
                        <div class="fixed inset-0 z-10 overflow-y-auto">
                            <div class="flex min-h-full items-end justify-center p-4 text-center items-center sm:items-center sm:p-0">
                                <div class="relative transform overflow-hidden rounded-lg bg-bkg text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="flex justify-center bg-content px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <div class="text-center mt-3 sm:ml-4 sm:mt-0 text-left">
                                            <h3
                                                class="text-base font-semibold leading-6 text-bkg"
                                                id="modal-title"
                                            >
                                                Add Team
                                            </h3>
                                            <div class="mt-2">
                                                <input
                                                    class="team-input"
                                                    value={teamName()}
                                                    onChange={e => setTeamName(e.target.value)}
                                                    type="text"
                                                    placeholder="Team Name" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 pb-2 pt-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        class="inline-flex w-full justify-center rounded-md bg-content px-3 py-2 text-sm font-semibold text-bkg ring-1 ring-inset ring-content shadow-sm hover:bg-bkg hover:text-content sm:ml-3 sm:w-auto"
                                        onClick={props.onCancel}>Cancel</button>
                                    <button
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-bkg px-3 py-2 text-sm font-semibold text-content shadow-sm ring-1 ring-inset ring-content hover:bg-content hover:text-bkg sm:mt-0 sm:w-auto"
                                        onClick={() => {
                                            props.onSave(teamName());
                                            setTeamName('');
                                        }}>
                                            Save
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        </Show>
    )
}