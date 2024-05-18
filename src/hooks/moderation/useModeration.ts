import axios from "axios";

export const useModeration = () => {
    

    const moderate = async (payload: string) => {
        try{
            const response = await axios.post("http://localhost:8080/api/moderate/text", {
                payload: payload
            },{
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:5173"
                }
            });

            return response.data.moderation_output;
        }catch(e){
            console.error(e)
        }
    }

    return {
        moderate
    }
    
}
