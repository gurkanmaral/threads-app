
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import {redirect} from "next/navigation"
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
import { Form, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import SearchBar from "@/components/SearchBar";





const Page = async () =>{

    const user = await currentUser()

    if(!user) return null;
    
    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

   
   
  
 

  


  return (
    <section>
        <h1 className="head-text mb-10">
           Search
        
        </h1>
        <SearchBar userId={user?.id} />
    </section>
  )
}

export default Page