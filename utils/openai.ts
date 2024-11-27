import { EXPO_PUBLIC_OPENAI_API_KEY } from '@env';
import OpenAI from 'openai';

import { handleError } from './error-handler';

const openai = new OpenAI({
  apiKey: EXPO_PUBLIC_OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',
  dangerouslyAllowBrowser: true,
});

export async function enhanceText(text: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that improves text to be more professional, engaging, and well-structured. Keep the same meaning but make it better.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content || text;
  } catch (error) {
    handleError(error, 'Unable to enhance text. Please try again later.');
    return text;
  }
}
