// export const baseUrl="http://localhost:4000"
// export const baseUrl="https://vaarta-backend.vercel.app/"
export const baseUrl="https://vaartabackend.onrender.com/"
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

