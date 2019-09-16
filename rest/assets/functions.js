
exports.success = (payload) => {
    return { "status" : "success", "payload" : payload}
}

exports.error = (message) => {
    return { "status" : "error", "message" : message}
}