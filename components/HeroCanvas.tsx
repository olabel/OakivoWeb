import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: 'cloud' | 'pipeline' | 'erp' | 'guardrail' | 'shield';
  status: 'healthy' | 'healing' | 'locked';
  pulse: number;
  healTimer: number;
}

interface TelemetryPulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 680);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      radius: 190,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Named architecture nodes representing hybrid Atlantic cloud infrastructure
    const nodeLabels = [
      { label: 'AWS ca-central-1', type: 'cloud' },
      { label: 'Azure Canada Central', type: 'cloud' },
      { label: 'Kubernetes Cluster', type: 'pipeline' },
      { label: 'CI/CD Security Gate', type: 'guardrail' },
      { label: 'ERP Database (Zero-Trust)', type: 'erp' },
      { label: 'OAuth 2.0 / mTLS Gateway', type: 'shield' },
      { label: 'SBOM Validator', type: 'guardrail' },
      { label: 'CSPM Continuous Engine', type: 'guardrail' },
      { label: 'SRE Event-Driven Runbook', type: 'pipeline' },
      { label: 'Logistics API Broker', type: 'erp' },
      { label: 'Dieppe Edge Proxy', type: 'shield' },
      { label: 'Telemetry SIEM Ingest', type: 'pipeline' },
      { label: 'Immutable Audit Vault', type: 'shield' },
    ] as const;

    const nodes: Node[] = [];
    const count = Math.min(Math.max(nodeLabels.length, Math.floor(width / 65)), 22);

    for (let i = 0; i < count; i++) {
      const preset = nodeLabels[i % nodeLabels.length];
      nodes.push({
        x: Math.random() * (width - 120) + 60,
        y: Math.random() * (height - 120) + 60,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: preset.type === 'shield' || preset.type === 'erp' ? 4.5 : 3.5,
        label: preset.label,
        type: preset.type,
        status: 'healthy',
        pulse: Math.random() * Math.PI,
        healTimer: 0,
      });
    }

    // Telemetry pulse packets travelling along node connections
    const pulses: TelemetryPulse[] = [];
    for (let p = 0; p < 8; p++) {
      pulses.push({
        fromIndex: Math.floor(Math.random() * nodes.length),
        toIndex: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        color: p % 2 === 0 ? '#10B981' : '#00F0FF',
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep, cinematic dark-mode vignette with cyan/emerald ambient aura
      const radialGlow = ctx.createRadialGradient(
        mouse.x, mouse.y, 20,
        mouse.x, mouse.y, width * 0.65
      );
      radialGlow.addColorStop(0, 'rgba(0, 240, 255, 0.06)');
      radialGlow.addColorStop(0.4, 'rgba(16, 185, 129, 0.03)');
      radialGlow.addColorStop(1, 'rgba(7, 10, 15, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Update nodes positions & bounce
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        if (n.x < 40 || n.x > width - 40) n.vx *= -1;
        if (n.y < 40 || n.y > height - 40) n.vy *= -1;

        // Subtle interactive mouse repulsion/attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          n.x -= (dx / dist) * force * 1.8;
          n.y -= (dy / dist) * force * 1.8;
        }

        // Random periodic self-healing simulation trigger
        if (Math.random() < 0.0008 && n.status === 'healthy') {
          n.status = 'healing';
          n.healTimer = 120;
        }

        if (n.status === 'healing') {
          n.healTimer--;
          if (n.healTimer <= 0) {
            n.status = 'locked';
            setTimeout(() => {
              n.status = 'healthy';
            }, 3000);
          }
        }
      }

      // Draw mesh connection pipelines
      const maxDist = 180;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            if (n1.status === 'healing' || n2.status === 'healing') {
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 1.5})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
              ctx.lineWidth = 0.75;
            }
            ctx.stroke();
          }
        }
      }

      // Draw active telemetry data packets traversing pipelines
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        const n1 = nodes[pulse.fromIndex % nodes.length];
        const n2 = nodes[pulse.toIndex % nodes.length];
        
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.fromIndex = pulse.toIndex;
          pulse.toIndex = Math.floor(Math.random() * nodes.length);
        }

        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes & labels
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let color = '#00F0FF';
        if (n.type === 'shield' || n.type === 'guardrail') color = '#10B981';
        if (n.type === 'erp') color = '#6366F1';
        if (n.status === 'healing') color = '#F59E0B';
        if (n.status === 'locked') color = '#10B981';

        const pulseScale = Math.sin(n.pulse) * 1.2;
        const currentRadius = Math.max(2, n.radius + pulseScale);

        // Outer glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = n.status === 'healing' ? 'rgba(245, 158, 11, 0.15)' : `${color}18`;
        ctx.fill();

        // Inner solid core node
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label rendering (subtle futuristic font)
        if (width > 640) {
          ctx.font = '10px "Space Grotesk", "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(226, 232, 240, 0.75)';
          ctx.fillText(n.label, n.x + 10, n.y + 3);

          if (n.status === 'healing') {
            ctx.fillStyle = '#F59E0B';
            ctx.font = '8px monospace';
            ctx.fillText('⚡ AUTO-HEALING GUARDRAIL', n.x + 10, n.y + 14);
          } else if (n.status === 'locked') {
            ctx.fillStyle = '#10B981';
            ctx.font = '8px monospace';
            ctx.fillText('✓ ZERO-TRUST ENFORCED', n.x + 10, n.y + 14);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle bottom fade to blend smoothly into problem section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#070A0F] to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroCanvas;
