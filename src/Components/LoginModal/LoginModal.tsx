import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import "./LoginModal.css"

interface LoginModalProps {
    showModal: boolean;
    onCancel: any;
    onLogin: any;
}

export interface LoginInfo {
    email: string;
    password: string;
}

export function LoginModal(props: LoginModalProps){
    return (
      <Show when={props.showModal}>
        <Portal>
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/*
              Background backdrop, show/hide based on modal state.
      
              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            */}
            <div class="fixed inset-0 bg-accent-3 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center items-center sm:items-center sm:p-0">
                  {/*
                  Modal panel, show/hide based on modal state.

                  Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                  Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  */}
                <div class="relative transform overflow-hidden rounded-lg bg-bkg text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="flex justify-center bg-content px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="text-center mt-3 sm:ml-4 sm:mt-0 text-left">
                        <h3 class="text-base font-semibold leading-6 text-bkg" id="modal-title">Sign Up</h3>
                        <div class="mt-2">
                          <p class="text-sm text-bkg">Fill out the form to create an account.</p>
                        </div>
                        <div class="mt-2">
                          <input class="login-input" type="text" placeholder="Email" />
                        </div>
                        <div class="mt-2">
                          <input class="login-input" type="password" placeholder="Password" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 pt-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-content px-3 py-2 text-sm font-semibold text-bkg ring-1 ring-inset ring-content shadow-sm hover:bg-bkg hover:text-content sm:ml-3 sm:w-auto"
                      onClick={() => props.onLogin({email: 'steve@gmail.com', password: 'pw123'})}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-bkg px-3 py-2 text-sm font-semibold text-content shadow-sm ring-1 ring-inset ring-content hover:bg-content hover:text-bkg sm:mt-0 sm:w-auto"
                      onClick={() => props.onCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div class="text-center text-content my-1">
                    No Account?
                    <A
                      onClick={() => props.onCancel}
                      class="text-blue-600 dark:text-blue-500 hover:underline"
                      href="/signup"
                    >
                      {"  "}Sign Up
                    </A>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    )
}