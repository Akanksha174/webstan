import React, { useState, useEffect, useRef } from 'react';

const RotatingCube = () => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Size of cube
      const size = 80;
      
      // Draw cube (simplified 3D representation)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation * Math.PI / 180);
      
      // Front face
      ctx.fillStyle = '#4F46E5';
      ctx.fillRect(-size/2, -size/2, size, size);
      
      // Top face (perspective)
      ctx.fillStyle = '#6366F1';
      ctx.beginPath();
      ctx.moveTo(-size/2, -size/2);
      ctx.lineTo(-size/4, -size);
      ctx.lineTo(size/4 + size/2, -size);
      ctx.lineTo(size/2, -size/2);
      ctx.closePath();
      ctx.fill();
      
      // Side face (perspective)
      ctx.fillStyle = '#8285F7';
      ctx.beginPath();
      ctx.moveTo(size/2, -size/2);
      ctx.lineTo(size/4 + size/2, -size);
      ctx.lineTo(size/4 + size/2, -size + size);
      ctx.lineTo(size/2, size/2);
      ctx.closePath();
      ctx.fill();
      
      // Document icon on front
      ctx.fillStyle = 'white';
      ctx.fillRect(-size/4, -size/4, size/2, size/2);
      ctx.fillStyle = '#4F46E5';
      ctx.fillRect(-size/4 + 10, -size/4 + 10, size/2 - 20, 5);
      ctx.fillRect(-size/4 + 10, -size/4 + 20, size/2 - 20, 5);
      ctx.fillRect(-size/4 + 10, -size/4 + 30, size/2 - 30, 5);
      
      ctx.restore();
      
      // Update rotation for next frame
      setRotation(prevRotation => (prevRotation + 0.5) % 360);
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [rotation]);

  return <canvas ref={canvasRef} width="300" height="300" className="rotating-cube" />;
};

export default RotatingCube;