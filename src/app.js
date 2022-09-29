import classNames from 'classnames';
import { useState, useRef } from 'react';
import './app.css';

export default function App() {
  const [tapped, setTapped] = useState(false);

  const timeoutRef = useRef();
  function onTap() {
    clearTimeout(timeoutRef.current);
    setTapped(true);
  }

  const [lastPointerEvent, setLastPointerEvent] = useState(null);

  return (
    <div
      className="app"
      onPointerDown={(e) => {
        setTapped(false);

        let touchHeight = e.height ?? 0;
        let touchWidth = e.width ?? 0;

        let visualizationModified = false;
        if (touchHeight < 3) {
          touchHeight = 15;
          visualizationModified = true;
        }

        if (touchWidth < 3) {
          touchWidth = 15;
          visualizationModified = true;
        }

        setLastPointerEvent({
          width: touchWidth,
          height: touchHeight,
          x: e.clientX,
          y: e.clientY,
          visualizationModified,
        });
      }}>
      <div>
        <button className="btn" onClick={onTap}>
          Button One
        </button>
        <button className="btn" onClick={onTap}>
          Button Two
        </button>
      </div>
      <div>
        {lastPointerEvent && (
          <div
            className={classNames('pointer-visualization', {
              'pointer-visualization-tapped': tapped,
              'pointer-visualization-modded':
                lastPointerEvent.visualizationModified,
            })}
            style={{
              '--width': `${lastPointerEvent.width}px`,
              '--height': `${lastPointerEvent.height}px`,
              '--x': `${lastPointerEvent.x}px`,
              '--y': `${lastPointerEvent.y}px`,
            }}>
            <div className="pointer-visualization-center" />
          </div>
        )}
      </div>
    </div>
  );
}
