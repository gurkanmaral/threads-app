import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import UserCard from "../cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";


async function RightSidebar() { 

  const user = await currentUser();
  if(!user) return null;

  const similarAccounts = await fetchUsers({
    userId:user.id,
    pageSize:4,
  })

  const similarCommunities = await fetchCommunities({
    pageSize:4,
  })

  return (
    <section className="custom-scrollbar rightsidebar">
        <div className="flex flex-1 flex-col justfiy-start">
          <h3 className="text-heading-4-medium text-light-1">
            Suggested Communities
          </h3>
          <div className='mt-7 flex w-[350px] flex-col gap-10'>
          {similarCommunities.communities.length > 0 ? (
            <>
              {similarCommunities.communities.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )}
        </div>
        </div>
        <div className="flex flex-1 flex-col justfiy-start">
          <h3 className="text-heading-4-medium text-light-1">
          Suggested Accounts
          </h3>
          <div className='mt-7 flex w-[350px] flex-col gap-10'>
          {similarAccounts.users.length > 0 ? (
            <>
              {similarAccounts.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )}
        </div>
        </div>
    </section>
  )
}

export default RightSidebar