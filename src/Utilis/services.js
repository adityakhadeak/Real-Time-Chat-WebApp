// export const baseUrl="http://localhost:4000"
export const baseUrl="vaarta-backend.vercel.app"
export const PostRequest=async(url,body)=>{
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

export const getRequest=async(url)=>{
    const response= await fetch(url,{
        method:"GET"
    })

    const data= await response.json()
    if(!response.ok)
    {
        return {error:true,message:data.message}
    }

    return data;
}

