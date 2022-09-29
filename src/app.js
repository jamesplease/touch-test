import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import './app.css';

export default function App() {
  const [tapped, setTapped] = useState(false);
  const buttonOneRef = useRef();
  const buttonTwoRef = useRef();

  const timeoutRef = useRef();
  function onTap() {
    console.log('tapped');
    clearTimeout(timeoutRef.current);
    setTapped(true);
    // timeoutRef.current = setTimeout(() => {
    //   setTapped(false);
    // }, 250);
  }

  const [lastPointerEvent, setLastPointerEvent] = useState(null);

  const [buttonOnePosition, setButtonOnePosition] = useState(null);

  useEffect(() => {
    const oneBoundingClientRect = buttonOneRef.current.getBoundingClientRect();
    const twoBoundingClientRect = buttonTwoRef.current.getBoundingClientRect();

    setButtonOnePosition({
      left: oneBoundingClientRect.left,
      left: oneBoundingClientRect.left,
    });
  }, []);

  return (
    <div
      className="app"
      onPointerDown={(e) => {
        console.log('e', e);
        setTapped(false);

        let touchHeight = e.height ?? 0;
        let touchWidth = e.width ?? 0;

        let visualizationModified = false;
        if (touchHeight === 0 || touchHeight === 1) {
          touchHeight = 6;
          visualizationModified = true;
        }

        if (touchWidth === 0 || touchWidth === 1) {
          touchWidth = 6;
          visualizationModified = true;
        }

        const halfHeight = touchHeight / 2;
        const halfWidth = touchWidth / 2;

        setLastPointerEvent({
          width: e.height,
          height: e.width,
          x: e.clientX,
          y: e.clientY,
          visualizationModified,
        });
      }}>
      <div>
        <button ref={buttonOneRef} className="btn" onClick={onTap}>
          Button One
        </button>
        <button ref={buttonTwoRef} className="btn" onClick={onTap}>
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
