"use client";

import { useRef, useState, useEffect } from "react";
import { IoLogoWhatsapp as WhatsApp } from "react-icons/io5";

type DraggableWhatsAppProps = {
  onClick: () => void;
};

const DraggableWhatsApp = ({ onClick }: DraggableWhatsAppProps) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [snappedRight, setSnappedRight] = useState(true);
  const [dragging, setDragging] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const didDrag = useRef(false);

  // Initialize position — vertically centered, right edge
  useEffect(() => {
    setPos({ x: window.innerWidth - 56, y: window.innerHeight / 2 - 28 });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    didDrag.current = false;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
    setDragging(true);
    btnRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true;

    const newX = Math.max(
      0,
      Math.min(window.innerWidth - 48, dragStart.current.posX + dx),
    );
    const newY = Math.max(
      0,
      Math.min(window.innerHeight - 48, dragStart.current.posY + dy),
    );
    setPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    const snapRight = pos.x > window.innerWidth / 2 - 24;
    setSnappedRight(snapRight);
    setPos((p) => ({
      x: snapRight ? window.innerWidth - 48 : 0,
      y: p.y,
    }));
    if (!didDrag.current) onClick();
  };

  useEffect(() => {
    setPos({ x: window.innerWidth - 48, y: window.innerHeight / 2 - 24 });
  }, []);

  return (
    <div
      ref={btnRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 1000,
        cursor: dragging ? "grabbing" : "grab",
        transition: dragging ? "none" : "left 0.2s ease, top 0.1s ease",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {/* Label peeks from edge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#25D366",
          borderRadius: snappedRight ? "12px 0 0 12px" : "0 12px 12px 0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          width: 48,
          height: 48,
        }}
      >
        <WhatsApp size={26} color="white" />
      </div>
    </div>
  );
};

export default DraggableWhatsApp;
