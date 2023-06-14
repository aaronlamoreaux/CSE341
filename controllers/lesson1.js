const homeroute = (req, res) => {
    res.send("Aaron Lamoreaux");
};

const brotherroute = (req, res) => {
    res.send("Alan Lamoreaux");
};

module.exports = {
    homeroute,
    brotherroute
};