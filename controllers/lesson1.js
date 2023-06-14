const homeroute = (req, res) => {
    res.send("Alan Lamoreaux");
};

const anotherpersonroute = (req, res) => {
    res.send("Amy Lamoreaux");
};

module.exports = {
    homeroute,
    anotherpersonroute
};