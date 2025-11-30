interface OAuth2Config {
  clientId: string;
  clientSecret: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  redirectUri: string;
  scope: string;
}

class OAuth2Client {
  private config: OAuth2Config;

  constructor(config: OAuth2Config) {
    this.config = config;
  }

  generateAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope,
    });

    if (state) {
      params.append('state', state);
    }

    return `${this.config.authorizationEndpoint}?${params.toString()}`;
  }

  async getToken(code: string): Promise<any> {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret
    });

    const response = await fetch(this.config.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }
}

export { OAuth2Client, OAuth2Config };