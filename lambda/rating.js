/*eslint-disable */

// URL: /rating/{id}

exports.handler = (event, context, callback) => {
    const {id} = event["pathParameters"];
    const ratingsObject = {
        "10": 4.45,
        "20": 4.38,
        "30": 4.54,
        "40": 4.53,
        "50": 4.47,
        "60": 4.54,
        "70": 4.62,
        "80": 4.02,
        "90": 4.1,
        "100": 3.93,
        "110": 3.9,
        "120": 3.92,
    };
    const retObject = { "rating": ratingsObject[id] };
    callback(null, {statusCode: 200, body: JSON.stringify(retObject)});
};
/* eslint-enable */
