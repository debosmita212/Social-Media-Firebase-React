import {getDocs,collection} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { Post } from './post';
//getDocs is getting all the documents

export interface Post{
    id:string,
    userId:string,
    title:string,
    username:string,
    description:string,
}

//It is a component
export const Main= ()=>{
    const [postsList,setPostsList]=useState<Post[] | null>(null);
    const postsRef=collection(db,"posts");

    const getPosts=async()=>{
        const data=await getDocs(postsRef);
        setPostsList(data.docs.map((doc)=>({...doc.data(),id:doc.id}))as Post[]);
    };
    useEffect(()=>{
        getPosts();
    },[]); //call only once
    return(
        <div>
            {postsList?.map((post)=>(
                <Post post={post}/>
            ))}
        </div>
    );
};