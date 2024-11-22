import { enhanceText } from './openai';

async function testOpenAI() {
  try {
    const result = await enhanceText('Hello world');
    console.log('Success:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testOpenAI();
