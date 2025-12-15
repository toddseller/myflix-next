import { getServerSession } from "@/lib/get-session"
import NavLinks from "./navbar/NavLinks"
import LogoutButton from "../buttons/LogoutButton"

const LeftSidebar = async () => {
  const session = await getServerSession()
  const username = session?.user.username
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks username={username} />
      </div>

      <div className="">
        <LogoutButton />
      </div>
    </section>
  )
}

export default LeftSidebar