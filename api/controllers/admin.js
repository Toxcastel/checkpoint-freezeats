const adminCtrl = {
    getAdmin: (req, res) => {
        console.log("ENTRE A GETADMIN");
        console.log("QUE SOY: ", req.authRole);
        res.status(200).send(req.authRole);
    },
};

module.exports = adminCtrl;
