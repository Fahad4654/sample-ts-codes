interface CompletionOptions {
  prefix: string;
  suffix?: string;
  numResults?: number;
  temperature?: number;
}

type CompletionResult = {
  code: string;
  score: number;
};

class AICompletionHelper {
  private apiKey: string;
  private endpoint: string;

  constructor(apiKey: string, endpoint: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  async getCompletions(options: CompletionOptions): Promise<CompletionResult[]> {
    const { prefix, suffix = "", numResults = 3, temperature = 0.7 } = options;

    const requestBody = JSON.stringify({
      prompt: prefix + suffix,
      max_tokens: 100,
      n: numResults,
      temperature: temperature,
    });

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices.map((choice: any) => ({
        code: prefix + choice.text,
        score: choice.logprobs?.token_logprobs?.reduce((a: number, b: number) => a + b, 0) || 0,
      }));
    } catch (error) {
      console.error("Error fetching completions:", error);
      return [];
    }
  }
}

export { AICompletionHelper, CompletionOptions, CompletionResult };