const fetch = require("node-fetch");

exports.handler = async function (event) {
  const city = event.queryStringParameters.city;
  const apiKey = process.env.OPENCAGE_API_KEY;

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    city
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch timezone" }),
      headers: { "Content-Type": "application/json" },
    };
  }
};
