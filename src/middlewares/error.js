export const errLastHandler = (err, req, res, next) => {
  if (err) {
    let stackErr = err.stack.split('\n');
    stackErr.shift();
    stackErr = stackErr.map((at) => at.replace('    at', 'at'));
    res.status(500).json({
      stt: 'error',
      msg: err.message,
      data: stackErr
    });
  }
};