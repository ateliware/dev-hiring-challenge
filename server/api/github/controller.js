
const request = require("request");

exports.getByQuery = async (req, res) => {

    var options = {
        method: 'GET',
        url: 'https://github-trending-api.now.sh/repositories',
        qs: { language: req.query.language, since: 'daily' }
    };

    request(options, function (error, response, body) {
        if (error) return res.staus(500).json(error);
        return res.status(200).json(JSON.parse(body));
    });
};
