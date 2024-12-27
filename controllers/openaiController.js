const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data[0].url;
    res.status(200).json({ success: true, data: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate image due to internal error.",
    });
  }
};

module.exports = { generateImage };
