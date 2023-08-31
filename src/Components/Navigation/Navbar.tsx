import { Setter, Show, createSignal, onCleanup, onMount } from "solid-js"
import { FiveOnFourUser } from "../../User/user";
import { A } from "@solidjs/router";
import { Portal } from "solid-js/web";
import "./Navbar.css";
import { LoginModal } from "../LoginModal/LoginModal";

export interface NavbarProps {
    user: FiveOnFourUser;
    menuState: boolean;
    setMenuState: Setter<boolean>;
    userMenuState: boolean;
    setUserMenuState: Setter<boolean>;
    logo: string;
}

export function Navbar(props: NavbarProps) {
    const signedIn = false;
    /* Handle Menu Close on click outside menu */
    let userMenuDivRef: HTMLDivElement;
    let userBtnRef: HTMLButtonElement;

    let menuDivRef: HTMLDivElement;
    let menuBtnRef: HTMLButtonElement;
    
    const [signupModalShown, setSignupModalShown] = createSignal(false);
    
    const handleOutsideUserMenuClick = (event: MouseEvent) => {
        if(userMenuDivRef && !userMenuDivRef.contains(event.target as Node) && userBtnRef && !userBtnRef.contains(event.target as Node)) {
            props.setUserMenuState(false);
        }
    }

    const handleOutsideMenuClick = (event: MouseEvent) => {
        if(menuDivRef && !menuDivRef.contains(event.target as Node) && menuBtnRef && !menuBtnRef.contains(event.target as Node)) {
            props.setMenuState(false);
        }
    }
    
    onMount(() => {
        document.addEventListener('click', handleOutsideUserMenuClick);
        document.addEventListener('click', handleOutsideMenuClick);
    });
    
    onCleanup(() => {
        document.removeEventListener('click', handleOutsideUserMenuClick);
        document.removeEventListener('click', handleOutsideMenuClick);
    });
    /* end menu close stuff */

    return (
      <>
        <Show when={signupModalShown()}>
          <Portal>
            <LoginModal
              onCancel={setSignupModalShown(false)}
              onLogin={(name: any) => {
                  console.log(name);
                  setSignupModalShown(false);
                }
              }
            />
          </Portal>
        </Show>
        <nav class="bg-gray-800 dark:bg-gray-500">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <A href="/">
                        <img class="h-12 w-12 rounded-full" src={props.logo} alt="Your Company"/>
                    </A>
                  </div>
                  <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                      {/*Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"*/}
                      <A href="/leagues" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Leagues</A>
                      <A href="/teams" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Teams</A>
                      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</a>
                      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Sponsors</a>
                    </div>
                  </div>
                </div>

                <div class="hidden md:block">
                  <div class="ml-4 flex items-center md:ml-6">
                    <Show when={signedIn} fallback={
                      <button
                        type="button"
                        class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">View notifications</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </button>
                    }>
                      <button
                        type="button"
                        class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">View notifications</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                      </button>
                    </Show>

                    {/* Profile dropdown */}
                    <Show when={signedIn}>
                      <div class="relative ml-3">
                        <div>
                        <button
                          type="button"
                          class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                          ref={userBtnRef!}
                          onClick={(e) => {
                              e.preventDefault();
                              props.setUserMenuState(!props.userMenuState)
                          }}>
                          <span class="absolute -inset-1.5"></span>
                          <span class="sr-only">Open user menu</span>
                          <img class="h-8 w-8 rounded-full" src={props.user.image_url} alt=""/>
                        </button>
                      </div>
    
                      {/*
                      Dropdown menu, show/hide based on menu state.
    
                      Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                      Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                      */}
                      <Show when={props.userMenuState}>
                        <div ref={userMenuDivRef!}
                            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabindex="-1"
                        >
                          {/* Active: "bg-gray-100", Not Active: "" */}
                          <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                          <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                          <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                        </div>
                    </Show>
                  </div>
                </Show>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
                ref={menuBtnRef!}
                onClick={(e) => {
                    e.preventDefault();
                    props.setMenuState(!props.menuState);
                }}
            >
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                {/* Menu open: "hidden", Menu closed: "block" */}
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/* Menu open: "block", Menu closed: "hidden" */}
                <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <Show when={props.menuState}>
            <div ref={menuDivRef!} class="md:hidden" id="mobile-menu">
              <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <A href="/leagues" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Leagues</A>
                <A href="/teams" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Teams</A>
                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About</a>
                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Sponsors</a>
              </div>
              <div class="border-t border-gray-700 pb-3 pt-4">
                <Show when={signedIn} fallback={
                  <a
                    href='#'
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                        setSignupModalShown(!signupModalShown());
                        props.setMenuState(false);
                      }
                    }
                    >
                    Sign Up/Login
                  </a>
                }>
                  <div class="flex items-center px-5">
                    <div class="flex-shrink-0">
                      <img class="h-10 w-10 rounded-full" src={props.user.image_url} alt=""/>
                    </div>
                    <div class="ml-3">
                      <div class="text-base font-medium leading-none text-white">{props.user.first_name + ' ' + props.user.last_name}</div>
                      <div class="text-sm font-medium leading-none text-gray-400">{props.user.email}</div>
                    </div>
                    <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span class="absolute -inset-1.5"></span>
                      <span class="sr-only">View notifications</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                    </button>
                  </div>
                  <div class="mt-3 space-y-1 px-2">
                    <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
                    <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
                    <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Logout</a>
                  </div>
                </Show>
              </div>
            </div>
        </Show>
      </nav>
      </>
    )
}