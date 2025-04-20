import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });
const otpCache = new NodeCache({ stdTTL: 3600 });
export { otpCache };
export default cache;
