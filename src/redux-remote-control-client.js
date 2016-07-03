const DEFAULT_OPTIONS = {
  host: 'localhost',
  port: '8888',
};

function throttle(delayMs, action) {
  let wait;

  return data => {
    if (!wait) {
      action(data);

      wait = setTimeout(() => {
        wait = undefined;
      }, delayMs);
    }
  };
}

function mouseEvent(name, e) {
  return `${name}_${e.clientX},${e.clientY}`;
}

export function syncMiddleware(opts) {
  const options = { ...DEFAULT_OPTIONS, ...opts };

  return store => {
    const ws = new WebSocket(`ws://${options.host}:${options.port}`);

    ws.onopen = () => {
      window.onmousemove = throttle(50, e => {
        ws.send(mouseEvent('WMP', e));
      });

      window.onmousedown = e => {
        ws.send(mouseEvent('WMD', e));
      };

      window.onmouseup = e => {
        ws.send(mouseEvent('WMU', e));
      };

      ws.send(JSON.stringify({
        action: 'SYNC_STATE',
        data: store.getState(),
      }));
    };

    return next => action => {
      ws.send(JSON.stringify({
        action: 'ACTION',
        data: action,
      }));

      next(action);
    };
  };
}

export function rcWrapper(app) {
  return app;
}
