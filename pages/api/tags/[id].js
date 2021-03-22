// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (request, response) => {
  const result = await fetch(`${process.env.API_BASE_URL}/instrumentations/${request.query.id}/pictures`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.API_AUTHORIZATION}`,
      'Api-Key': process.env.API_KEY
    }
  });

  const data = await result.json();
  response.statusCode = 200;
  response.json(data);
};
