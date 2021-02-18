export const successResponse = (msg, data) => ({
  stt: 'success',
  msg,
  data
});

export const errorResponse = (msg) => ({
  stt: 'failure',
  msg,
  data: null
});
