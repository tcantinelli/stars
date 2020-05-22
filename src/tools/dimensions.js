import { useState, useEffect } from 'react';

/**
 * Get width and height of the viewport.
 * @return {object} dimensions
 */

export default function useWindowSize() {

    function getSize() {
      return {
        width: window.innerWidth * 0.999,
        height: window.innerHeight * 0.99
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  }