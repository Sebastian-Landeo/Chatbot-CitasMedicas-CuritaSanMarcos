const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chat = async (prompt, text) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Enviar el contenido en un array sin "role" ni "content"
        const completion = await model.generateContent([prompt, text]);

        const response = await completion.response;
        return response.text();
    } catch (err) {
        console.error("Error al conectar con Gemini:", err);
        return "ERROR";
    }
};

module.exports = chat;