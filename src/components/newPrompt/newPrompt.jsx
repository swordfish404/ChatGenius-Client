import { useRef, useEffect, useState } from 'react';
import './newPrompt.css';
import Upload from '../upload/upload';
import { IKImage } from 'imagekitio-react';
import model from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
    const [question, setQuestion] = useState("");  
    const [answer, setAnswer] = useState("");     
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},    
    });


    // creating a chat / interacting with chat model
  const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
  generationConfig:{
    //maxOutputToken: 100,
  },
});

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    }, [question, answer, img.dbData]);

    const add = async (text) => {
        setQuestion(text);

        try {
            const result = await chat.sendMessageStream( // using message stream, the answers will be faster

                Object.entries(img.aiData).length ? [img.aiData, text] : [text]
            );

            // answers will load word by word just like chatgpt
            let accumulatedText="";
            for await(const chunk of result.stream){
                const chunkText=chunk.text();
                console.log(chunkText);
                accumulatedText+=chunkText;
                setAnswer(accumulatedText);
            }
            
        } catch (error) {
            console.error("Error generating content:", error);
        } finally {
            setImg({
                isLoading: false,
                error: "",
                dbData: {},
                aiData: {}
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const text = e.target.text.value;
        if (!text) return;

        add(text);

       

    };

    return (
        <>
            {img.isLoading && <div>Loading.....</div>}
            {img.dbData?.filePath && (
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={img.dbData?.filePath}
                    width="380"
                    transformation={[{ width: 380 }]}
                />
            )}
            {question && <div className='message user'>{question}</div>}
            {answer && <div className='message'><Markdown>{answer}</Markdown></div>} 

            <div className='endChat' ref={endRef}></div>
            <form className='newForm' onSubmit={handleSubmit}>
                <Upload setImg={setImg} />
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" name="text" placeholder='Ask anything....' />
                <button type="submit">
                    <img src="/arrow.png" alt="Submit" />
                </button>
            </form>
        </>
    );
};

export default NewPrompt;
