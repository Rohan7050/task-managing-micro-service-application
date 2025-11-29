import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  // ArrowPathIcon,
  ChartPieIcon,
  // CursorArrowRaysIcon,
  // FingerPrintIcon,
  // SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAuthStore } from "@/store/auth.store";
import { useBoardStore } from "@/store/board.store";

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Features', href: '#' },
//   { name: 'Marketplace', href: '#' },
//   { name: 'Company', href: '#' },
// ]

// const products = [
//   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]

function NavBar() {
  const {user, logout} = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 gives current route
  const {boards, setBoards} = useBoardStore();
  const currentPath = location.pathname;
  const logoutHandler = () => {
    logout();
    setBoards([]);
    navigate("/login")
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const navigateToBoardDetailsPage = (id: string, close: Function): void => {
    navigate('/boards/' + id)
    close();
  }


  return (
    <header className="absolute bg-gray-900 inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
          </div>
          {user && <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            {({close}) => (
              <>
                <PopoverButton className="flex items-end gap-x-1 text-sm/6 font-semibold text-white">
                  Boards
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-500" />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  <div className="p-4">
                    {boards.map((item: {id: string, name: string, desc: string}) => (
                      <div
                        key={item.id}
                        onClick={() => navigateToBoardDetailsPage(item.id, close)}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-white/5"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                          <ChartPieIcon aria-hidden="true" className="size-6 text-gray-400 group-hover:text-white" />
                        </div>
                        <div className="flex-auto">
                          <p className="block font-semibold text-start text-white">
                            {item.name}
                            <span className="absolute inset-0" />
                          </p>
                          <p className="mt-1 text-start text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>
        </PopoverGroup>}
          {user 
          ? <div className="lg:flex lg:flex-1 lg:justify-end">
              <button onClick={() => logoutHandler()} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Logout</button>
            </div>
          : <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to={currentPath === "/login" ? '/register' : '/login'} className="text-sm/6 font-semibold text-white">
              {currentPath === "/login" ? 'Register' : 'Log in'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>}
          
        </nav>
      </header>
  )
}

export default NavBar