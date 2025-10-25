// Debug utility to check scroll setup
export const debugScroll = () => {
  console.log("Scroll Debug Information:", {
    // Document dimensions
    documentHeight: document.documentElement.scrollHeight,
    documentClientHeight: document.documentElement.clientHeight,

    // Body dimensions
    bodyHeight: document.body.scrollHeight,
    bodyClientHeight: document.body.clientHeight,

    // Window dimensions
    windowHeight: window.innerHeight,
    windowScrollY: window.pageYOffset,

    // Computed styles
    bodyOverflowY: getComputedStyle(document.body).overflowY,
    htmlOverflowY: getComputedStyle(document.documentElement).overflowY,

    // Check if elements have height
    scrollableHeight:
      document.documentElement.scrollHeight - window.innerHeight,
    canScroll: document.documentElement.scrollHeight > window.innerHeight,

    // Check for fixed positioning issues
    fixedElements: Array.from(document.querySelectorAll("*"))
      .filter((el) => getComputedStyle(el).position === "fixed")
      .map((el) => ({ tagName: el.tagName, className: el.className })),
  });
};

// Add to window for easy access in browser console
if (typeof window !== "undefined") {
  (window as any).debugScroll = debugScroll;
}
