export const STATUS_SHARING = 'SHARING';
export const STATUS_RECEIVING = 'RECEIVING';
export const STATUS_CLOSED = 'CLOSED';

const DEFAULT_OPTIONS = {
  host: 'localhost',
  port: '8888',
};

let ws;
const actions = [];
let status = STATUS_CLOSED;
let options = DEFAULT_OPTIONS;

export default {
  connection: ws,
  status,

  configure(opts) {
    options = { ...DEFAULT_OPTIONS, opts };
  },

  onOpen(action) {
    actions.push(action);
  },

  openConnection(id) {
    return new Promise((resolve, reject) => {
      ws = new WebSocket(`ws://${options.host}:${options.port}/${id || ''}`);

      ws.onopen = () => {
        if (id) {
          status = STATUS_RECEIVING;
        } else {
          status = STATUS_SHARING;
        }

        actions.forEach(action => action(ws, status));

        resolve();
      };

      ws.onerror = () => {
        reject();
      };
    });
  },

  whenSharing(action) {
    if (ws && status === STATUS_SHARING) {
      action(ws);
    }
  },

  closeConnection() {
    if (!ws) {
      return Promise.reject();
    }

    return new Promise((resolve) => {
      status = STATUS_CLOSED;
      ws.close();
      ws = undefined;
      resolve();
    });
  },
};
