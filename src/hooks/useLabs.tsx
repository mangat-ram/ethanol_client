// import { useEffect } from "react";
// import { useUser } from "./useUser"


// export const useLabs =  () => {
  
//   const { user } = useUser();
//   const username = user?.userName;
//   if(!user && !username){

//   }

//   useEffect(() => {
//     async function fetchLabs(){
//       try{
//         const res = await axios.get(`https://ethanol-09r4.onrender.com/api/v1/`)
//       }catch(err : any){
//         throw new Error(err);
//       }

//     }
//   },[user])

// }