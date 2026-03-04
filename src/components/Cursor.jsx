import React, { useEffect, useState } from "react";
import "./Cursor.scss";

/**
 * CustomCursor Component
 *
 * A React component that creates a custom cursor that follows the user's mouse movements.
 * This component replaces the default browser cursor with a custom-styled cursor element.
 *
 * @component
 * @example
 * // Basic usage in your App component
 * function App() {
 *   return (
 *     <div>
 *       <CustomCursor />
 *       <YourOtherComponents />
 *     </div>
 *   );
 * }
 *
 * @example
 * // Usage with conditional rendering
 * function App() {
 *   const [isCursorEnabled, setIsCursorEnabled] = useState(true);
 *
 *   return (
 *     <div>
 *       {isCursorEnabled && <CustomCursor />}
 *       <button onClick={() => setIsCursorEnabled(!isCursorEnabled)}>
 *         Toggle Custom Cursor
 *       </button>
 *     </div>
 *   );
 * }
 *
 * @returns {JSX.Element} A div element that follows mouse movements
 */
const CustomCursor = () => {
  /**
   * State to store the current mouse position
   * @type {[Object, Function]}
   * @property {number} x - The X coordinate of the mouse cursor
   * @property {number} y - The Y coordinate of the mouse cursor
   */
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /**
   * Effect hook that sets up and cleans up the mouse move event listener
   *
   * This effect:
   * 1. Creates a mousemove event handler that updates the position state
   * 2. Adds the event listener to the window
   * 3. Returns a cleanup function that removes the event listener
   *
   * The empty dependency array ensures this effect runs only once when
   * the component mounts, and the cleanup runs when it unmounts.
   */
  useEffect(() => {
    /**
     * Handles mouse movement events and updates the cursor position
     *
     * @param {MouseEvent} e - The mouse event object from the DOM
     * @param {number} e.clientX - The X coordinate relative to the viewport
     * @param {number} e.clientY - The Y coordinate relative to the viewport
     */
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener to track mouse movements
    window.addEventListener("mousemove", moveCursor);

    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []); // Empty dependency array = run once on mount and cleanup on unmount

  /**
   * Render the custom cursor element
   *
   * The cursor is positioned absolutely using the state coordinates.
   * The actual styling (size, color, shape, etc.) should be defined in Cursor.scss
   *
   * Note: The cursor element should be positioned relative to its nearest
   * positioned ancestor or the viewport, depending on your CSS setup.
   */
  return (
    <div
      className="cursor"
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
};

export default CustomCursor;

/**
 * SCSS Requirements (Cursor.scss):
 *
 * The component expects the following CSS classes to be defined:
 *
 * .cursor {
 *   position: fixed;        // or absolute, depending on your layout
 *   width: 20px;            // Example size
 *   height: 20px;           // Example size
 *   border-radius: 50%;     // For circular cursor
 *   background-color: #000; // Cursor color
 *   pointer-events: none;    // Allows clicking through the cursor
 *   transform: translate(-50%, -50%); // Centers cursor on mouse point
 *   transition: transform 0.1s ease;   // Optional smooth movement
 *   z-index: 9999;          // Ensures cursor appears above other elements
 * }
 *
 * Optional hover effects:
 * .cursor.hover {
 *   transform: translate(-50%, -50%) scale(1.5);
 *   background-color: #ff0000;
 * }
 *
 * To add hover effects, you would need to track hover state in the component:
 *
 * const [isHovering, setIsHovering] = useState(false);
 *
 * // Add event listeners to elements you want to trigger hover effects
 * // Then conditionally add the 'hover' class to the cursor div
 */
