const getAllProducts = async (req, res) => {
	res.status(200).json({ msg: "products Route" });
};

module.exports = { getAllProducts };
