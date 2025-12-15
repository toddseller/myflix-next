import { getServerSession } from "@/lib/get-session";

const ProfilePage = async() => {
  const session = await getServerSession();
  return (
    <pre>{JSON.stringify(session, null, 2)}</pre>
  )
}

export default ProfilePage