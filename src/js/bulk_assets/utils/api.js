/* global fetch */
import 'whatwg-fetch';

export class Asset {
  constructor(lid) {
    this.lid = lid; // Line item record ID

    this.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Knack-REST-API-Key': 'renderer',
      'x-knack-new-builder': 'true',
      'X-Knack-Application-Id': '561b466a8e7bba4440bef26c',
      'Content-Type': 'application/json',
    };
  }

  add({ cardNumber, pin }) {
    fetch('https://us-api.knack.com/v1/scenes/scene_438/views/view_828/records', {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        field_677: cardNumber,
        field_678: pin,
        field_679: this.lid,
      })
    })
      .then((response) => {
        if (response.ok) {
          // Asset added successfully
          console.log('[tpm-plus] success');
        }
      })
      .catch((error) => {
        console.error('[tpm-plus] Request failed: ', error);
      });
  }
}
