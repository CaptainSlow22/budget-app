import Groq from "groq-sdk";

const groq = new Groq({ apiKey: `${process.env.NEXT_PUBLIC_GROQ_API_KEY}`, dangerouslyAllowBrowser:true });

interface Props {
    totalBudget: number;
    totalSpent: number;
    totalIncome: number;
}

export async function financialAdvice({ totalBudget, totalSpent, totalIncome }: Props) {
  try {
    const chatCompletion = await getGroqChatCompletion({ totalBudget, totalSpent, totalIncome });

    const advice = chatCompletion.choices[0]?.message?.content || "No advice provided";
    console.log(advice);

    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment.";
  }
}

export async function getGroqChatCompletion({ totalBudget, totalSpent, totalIncome }: Props) {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Based on the following financial data:
              - Total Budget: ${totalBudget} USD
              - Expenses: ${totalSpent} USD
              - Incomes: ${totalIncome} USD
              Provide detailed financial advice in 2 sentences to help the user manage their finances more effectively.`,
        },
      ],
      model: "llama3-8b-8192", // Ensure the model name is correct for your use case
    });
  } catch (error) {
    console.error("Error fetching chat completion from Groq:", error);
    throw error;
  }
}
