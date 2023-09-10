import { Show, createSignal, onMount } from "solid-js";
import { FoFService, useAppContext } from "../../App";
import { useUserContext } from "../../Components/UserContext";
import { AuthHttpService } from "../../services/auth_service";

export function ProfilePage() {
    const { services } = useAppContext();
    const {user, setUser} = useUserContext();
    const api_svc: AuthHttpService = services.find((svc: FoFService) => svc.svc_name == 'api_service').svc;

    const [image, set_image] = createSignal<File>();
    const [first_name, setFirstName] = createSignal<string>(user.first_name);
    const [last_name, setLastName] = createSignal<string>(user.last_name);
    
    
    const fileSelected = (files: FileList | null) => {
        if (files && files.length > 0) {
            set_image(files[0]);
        }
    };
    
    onMount(async () => {
        if (!user.token) {
            const tmpUser = await api_svc.Refresh();
            setUser(tmpUser)
        }
    });
    
    //TODO: toaster to confirm save?
    const saveProfile = async (): Promise<void> => {
        if (image()) {
            await api_svc.UpdateProfilePicture(image() as Blob);
        }

        if (first_name().length > 0 && first_name() != user.first_name) {
            setUser({...user, first_name: first_name()})
        }
        
        if (last_name().length > 0 && last_name() != user.last_name) {
            setUser({...user, last_name: last_name()})
        }
        
        const tmp_user = await api_svc.UpdateUser(user);
        setUser(tmp_user);
    };

    return (
        <div class="relative transform my-4 max-w-xs mx-auto">
            <div class="mb-4">
              <label class="text-content text-sm font-bold mb-2" for="first_name">
                    First Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-content leading-tight focus:outline-none focus:shadow-outline focus:shadow-outline-bkg"
                id="first_name"
                type="text"
                value={first_name()}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name" />
            </div>
            <div class="mb-4">
              <label class="text-content text-sm font-bold mb-2" for="last_name">
                    Last Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-content leading-tight focus:outline-none focus:shadow-outline focus:shadow-outline-bkg"
                id="first_name"
                type="text"
                value={last_name()}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name" />
            </div>
                <div class="mb-6 align-middle">
                  <label class="block text-content text-sm font-bold mb-2">
                    Select a Profile Picture
                  </label>
                    {/*TODO: style Choose File button */}
                    <input
                        type="file"
                        accept="image/*"
                        class="bg-bkg rounded"
                        onChange={(e) => fileSelected(e.target.files)}
                    />
                </div>
                <Show when={image()}>
                    <img class="h-20 w-20 rounded-full" src={URL.createObjectURL(image() as Blob)} />
                </Show>
                <div class="my-6 align-middle">
                    <button
                        class="bg-content hover:bg-bkg hover:text-content text-bkg font-bold rounded p-2 ring-accent-1 hover:ring-1 hover:shadow-outline hover:ring-content focus:ring-accent-1 focus:shadow-outline"
                        onClick={saveProfile}
                    >
                        Save
                    </button>
                    <button onClick={() => console.log(user)}>Ok</button>
                </div>
        </div>
    )
}