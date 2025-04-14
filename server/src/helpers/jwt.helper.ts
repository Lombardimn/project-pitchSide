import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../connection/config'

export const createAccessToken = (payload: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_KEY,
      {
        expiresIn: '1h'
      },
      (err, token) => {
        if (err) reject(err)
        if (token) {
          resolve(token)
        } else {
          reject(new Error('Token generation failed'))
        }
      }
    )
  })
}
