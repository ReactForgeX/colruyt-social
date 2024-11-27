import Toast from 'react-native-toast-message';

export function handleError(error: any, fallback: string = 'Service is temporarily unavailable') {
  console.error('Error:', error);

  let message = fallback;

  // Handle specific OpenAI API errors
  if (error?.response?.status === 429) {
    message = 'Rate limit exceeded. Please try again later.';
  } else if (error?.response?.status === 401) {
    message = 'Authentication error. Please check your settings.';
  } else if (error?.response?.status === 503) {
    message = 'Service is currently unavailable. Please try again later.';
  } else if (error instanceof Error) {
    // Use the error message if it's meaningful
    message = error.message.includes('fetch failed')
      ? 'Network error. Please check your connection.'
      : error.message;
  }

  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
    position: 'bottom',
    visibilityTime: 4000,
  });

  return message;
}
