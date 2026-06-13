const info = (msg: string, meta?: unknown) => console.log(msg, meta ?? '');
const warn = (msg: string, meta?: unknown) => console.warn(msg, meta ?? '');
const error = (msg: string, meta?: unknown) => console.error(msg, meta ?? '');

export default { info, warn, error };
