import rcWrapper from './rcWrapper';
export { rcWrapper };

import rcReducer from './rcReducer';
export { rcReducer };

import WS from './WS';

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

    WS.registerAction('SYNC_STATE', () => store.getState());

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
