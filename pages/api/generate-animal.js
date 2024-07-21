pages/api/generate-animal.js

import { HfInference } from "@huggingface/inference";

const HF_API_KEY = process.env.HF_API_KEY;

const inference = new HfInference(HF_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      // const response = await inference.textGeneration({
      //   model: "gpt2", // 根据需要选择适当的模型
      //   inputs: prompt,
      //   parameters: {
      //     max_new_tokens: 50,
      //   },
      // });
      const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: 'POST',
        headers: {
          'Authorization': `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`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: prompt })
      });

      // const generatedAnimal = response.generated_text;
      // res.status(200).json({ animal: generatedAnimal });
      const data = await response.json();
      console.log(data,'xasss')
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
