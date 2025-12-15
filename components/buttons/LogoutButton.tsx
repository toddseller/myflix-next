'use client'

import { LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import ROUTES from "@/constants/routes"

const LogoutButton = () => {
  const router = useRouter();
  
  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(ROUTES.SIGN_IN);
        },
      },
    });
  };
  return (
    <Button
    variant="destructive"
    className="base-medium w-fit cursor-pointer px-4 py-3"
    onClick={() => {onSignOut()} }>
      <LogOut className="size-5 text-black dark:text-white" />
      <span className="text-dark300_light900 max-lg:hidden">Logout</span>
    </Button>
)
}

export default LogoutButton