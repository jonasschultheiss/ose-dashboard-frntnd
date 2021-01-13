// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const result = await fetch(
    `${process.env.API_BASE_URL}/assets?per_page=100&include=status%2C%20pictures%2C%20product%2C%20instrumentations%2C%20product.manufacturer`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.API_AUTHORIZATION}`,
        'Api-Key': process.env.API_KEY,
      },
    }
  );

  const data = await result.json();
  res.statusCode = 200;
  res.json(data);
};
