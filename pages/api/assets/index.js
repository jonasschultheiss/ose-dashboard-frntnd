// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (request, response) => {
  const result = await fetch(`${process.env.API_BASE_URL}/assets`, {
    method: 'GET'
  });

  const data = await result.json();
  response.statusCode = 200;
  response.json(data);
};
