export async function requestWP(event, endpoint, urlParams) {
  try {
    const response = await event.fetch(`http://wordpress.stockscout.eu/wp-json/wp/v2/${endpoint}?${urlParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return { data, ok: true };
  } catch (e) {
    return { error: e.message, ok: false, status: 500 };
  }
}