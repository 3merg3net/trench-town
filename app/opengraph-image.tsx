import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'radial-gradient(800px 400px at 10% 0%, rgba(65,234,212,.25), transparent 60%), radial-gradient(800px 400px at 90% 0%, rgba(127,90,240,.22), transparent 60%), #0a0b0f',
          color: 'white',
          padding: 64,
          fontFamily: 'Inter, system-ui',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* simple icon */}
            <div style={{ width: 64, height: 64, background: 'linear-gradient(90deg,#41EAD4,#7F5AF0)', borderRadius: 16, opacity: .2 }} />
            <div style={{ fontFamily: 'Orbitron', fontSize: 56, letterSpacing: 2 }}>
              TRENCH <span style={{ opacity: .65 }}>TOWN</span>
            </div>
          </div>
          <div style={{ fontSize: 28, opacity: .85 }}>Most SAFU launchpad on Base</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
