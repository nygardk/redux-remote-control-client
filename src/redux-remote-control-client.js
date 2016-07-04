import rcWrapper from './rcWrapper';
export { rcWrapper };
import WS, { STATUS_SHARING } from './WS';

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

export function syncMiddleware(options) {
  WS.configure(options);

  return store => {
    window.onmousemove = throttle(50, e => {
      WS.whenSharing(ws => {
        ws.send(mouseEvent('WMP', e));
      });
    });

    window.onmousedown = e => {
      WS.whenSharing(ws => {
        ws.send(mouseEvent('WMD', e));
      });
    };

    window.onmouseup = e => {
      WS.whenSharing(ws => {
        ws.send(mouseEvent('WMU', e));
      });
    };

    WS.onOpen((ws, status) => {
      if (status !== STATUS_SHARING) {
        return;
      }

      ws.send(JSON.stringify({
        action: 'SYNC_STATE',
        data: store.getState(),
      }));
    });

    return next => action => {
      WS.whenSharing(ws => {
        ws.send(JSON.stringify({
          action: 'ACTION',
          data: action,
        }));
      });

      next(action);
    };
  };
}
