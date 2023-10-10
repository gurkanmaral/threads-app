"use client";

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import UserCard from "./cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.actions";
import Image from "next/image";



const SearchBar = ({userId}:{userId:string}) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [results,setResults] = useState([])

    const handleChange =(e:any)=>{

        setSearchQuery(e.target.value)


    }


   // Fetch users
useEffect(()=>{
    const fetchUsersOnSearch = async()=>{

        const result = await fetchUsers({
            userId:userId,
            searchString:searchQuery || "",
            pageNumber:1,
            pageSize:25
        })
        setResults(result)   
    }
    fetchUsersOnSearch()
},[userId, searchQuery])


  return (
    <div>
        <div className="searchbar">
        <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
        <Input onChange={handleChange} 
        className="account-search_input no-focus"
        placeholder="Search..."
        value={searchQuery}
        />

        </div>
        
    <div>
    <div className="mt-14 flex flex-col gap-9">
            {results?.users?.length === 0 ? (
                <p className="no-result"> No users</p>
            ): (
                <>
                {results?.users?.map((person)=>(
                    <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType="User"
                    />

                   
                ))}
                </>
            )}
        </div>
    </div>

    </div>
  )
}

export default SearchBar