const register = async (req, res) => {
  const body = req.body;

  try {
    console.log(body);
    res.status(200).json({ message: "User created successfully", data: body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { register };
