export const baseUrl="http://localhost:3000"

export const registerUserPostRequest=async(url,body)=>{
    console.log(body)
    const response= await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body
    })

    const  data=await response.json()

    if(!response.ok)
    {
        return{error:true,message:data.message}
    }
    
    return data;
}