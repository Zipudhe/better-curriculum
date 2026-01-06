// auth.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config"
import crypto from "crypto"

type AccessTokenPayload = {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  refresh_token_expires_in: number,
  scope: string
}

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) { }

  getLinkedInAuthorizationURL(): string {

    const linkedInBaseUrl = "https://www.linkedin.com/oauth/v2/authorization"
    const client_id = this.configService.getOrThrow("LINKED_IN_CLIENT_ID")
    const redirect_uri = this.configService.getOrThrow("LINKED_IN_REDIRECT_URI")
    const scopes = ['r_profile_basicinfo', 'r_verify'];

    const state = crypto.randomBytes(8).toString("hex")

    const params = new URLSearchParams({
      response_type: "code",
      client_id,
      redirect_uri,
      state,
      scope: scopes.join(" ")
    })

    return `${linkedInBaseUrl}?${params.toString()}`
  }

  async handleLinkedInCallback(code: string) {

    const client_id = this.configService.getOrThrow("LINKED_IN_CLIENT_ID")
    const client_secret = this.configService.getOrThrow("LINKED_IN_CLIENT_SECRET")
    const redirect_uri = this.configService.getOrThrow("LINKED_IN_REDIRECT_URI")

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id,
      client_secret,
      redirect_uri
    })

    const data = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?${params.toString()}`,
      {
        headers: new Headers({ "Content-type": "x-www-form-urlencoded" })
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Faield to get access token")
        }

        return response.json()
      })
      .then((payload: AccessTokenPayload) => payload)

    console.log({ data })

    return data
  }

}
