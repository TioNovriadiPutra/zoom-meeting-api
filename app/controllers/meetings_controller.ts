import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

export default class MeetingsController {
  async getMeetings({ response }: HttpContext) {
    try {
      const credential = `${env.get('ZOOM_CLIENT_ID')}:${env.get('ZOOM_CLIENT_SECRET')}`

      const encrypted = Buffer.from(credential).toString('base64')

      const token = await axios.post('https://zoom.us/oauth/token', null, {
        headers: {
          'Authorization': `Basic ${encrypted}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'client_credentials',
        },
      })

      const data = await axios.get(`${env.get('ZOOM_URL')}/users/me/meetings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.ok({
        data,
      })
    } catch (error) {
      return error.response.data
    }
  }
}
