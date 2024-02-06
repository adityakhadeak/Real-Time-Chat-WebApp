export const baseUrl="http://localhost:3000"

export const PostRequest=async(url,body)=>{
    const response= await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body
    })

    const  data=await response.json()
    console.log(data)

    if(!response.ok)
    {
        return{error:true,message:data.message}
    }
    return data;
}