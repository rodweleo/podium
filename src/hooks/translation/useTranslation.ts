import axios from "axios";

export const useTranslation = () => {
    

    const translate = async (payload: string) => {
        try{
            const response = await axios.post("http://localhost:8080/api/translate", {
                payload: payload
            },{
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:5173"
                }
            });

            return response.data.translated_text;
        }catch(e){
            console.error(e)
        }
    }

    return {
        translate
    }
    
}
