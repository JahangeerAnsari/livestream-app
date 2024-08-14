import { getSelf } from "./auth-service";
import { db } from "./db"

export const getRecommended = async () =>{
 let userId;
 try {
  const self = await getSelf();
  userId = self.id;
 } catch{
  userId = null;
 }

 // show only login users
 // dont Recommended user which are already following
 let users = [];
 if(userId){
  users = await db.user.findMany({
   where:{
    AND:[
     {
      NOT:{
       id:userId
      }
     },{
      NOT:{
       followedBy:{
        some:{
         followedId:userId
        }
       }
      }
     }
    ]
   }, orderBy:{
    createdAt:'desc'
   }
  })
 }else{
  users = await db.user.findMany({
   orderBy:{
    createdAt:'desc'
   }
  });
 }
 return users;
  
 
}
// await new Promise((resolve => setTimeout(resolve,5000))