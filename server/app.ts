import express from "express"
import dotenv from "dotenv";
dotenv.config()
import cors from "cors";

import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(express.json());

app.post("/api/translate", async (req, res) => {
    
    const { payload } = req.body;

    try{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
        })

        const modified_prompt: string = `Translate '${payload} to Swahili. Only return the translation. Keep it a sentence.'`
        const result = await model.generateContent(modified_prompt)
        const response = result.response;
        const text = response.text();

        res.status(200).json({
            translated_text: text
        })
    }catch(e){
        res.status(500).json(e)
    } 
})

app.post("/api/moderate/text", async (req, res) => {
    
    const { payload } = req.body;

    try{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
        })

        /*const generationConfig = {
            temperature: 0.9,
            topK: 0,
            topP: 1,
            maxOutputTokens: 2048
        }

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            }
        ]

        const parts = [
            {
                text: `input: ${payload}`
            },
            {
                text: "output: "
            }
        ]*/

        const prompt = `Determine if the text needs to be moderated and if so, rewrite in a few of the following ways: constructive, neutral, disagreement, stating needs, or moving on. 
        If the text does not need to be modified, return No moderation needed. Provide the output in a string that is easy to print to the console.
            Text: ${payload}
        `
        const result = await model.generateContent(prompt)
        const response = result.response;
        const text = response.text();

        if(text.includes("No moderation needed")){
            return res.json({
                moderation_output: "No action needed on the post"
            })
        }else{
            return res.json({
                moderation_output: "Send a notification to the user who published the post"
            })
        }
        res.status(200).json({
            moderation_output: text
        })
    }catch(e){
        res.status(500).json(e)
    } 
})

app.listen(8080, () => {
    console.log(`Server is live on port 8080`)
})