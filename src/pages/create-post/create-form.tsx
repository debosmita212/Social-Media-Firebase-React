import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//useForm is for getting the data
//yup is for structuring the data
//@hookform/resolvers is for merging both of them
import {addDoc,collection} from 'firebase/firestore';
//addDoc create a new entry in database
//collection specifies which collection we are refering to
import { db,auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

//type of form data so create an interface
interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
    const [user]=useAuthState(auth);
    const navigate=useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title!"),
    description: yup.string().required("You must add a description!"),
  });
  //register is for actually validating
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef=collection(db,"posts"); //database,collection
  const onCreatePost = async(data: CreateFormData) => {
    await addDoc(postsRef,{
       /* title:data.title,
        description:data.description,*/
        ...data, //another way of including all the things in data
        username: user?.displayName,
        userId:user?.uid,
    });
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{color:"red"}}>{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />    
      <p style={{color:"red"}}>{errors.description?.message}</p>
      <input type="submit" className="submitForm"/>
    </form>
  );
};
