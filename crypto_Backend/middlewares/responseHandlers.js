const successResponse = (res, data) => {
    res.status(200).json({ success: true, data });
  };
  
  const errorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).json({ success: false, message });
  };
  
  module.exports = { successResponse, errorResponse };
  