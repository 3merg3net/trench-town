// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #020307 0%, #0a0b0f 60%, #001933 100%)',
          fontFamily: 'system-ui, Segoe UI, Helvetica, Arial, sans-serif',
          color: '#e0e6f0',
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            background: 'linear-gradient(90deg, #007bff 10%, #00aaff 40%, #d2a93d 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            lineHeight: 1.1,
          }}
        >
          TRENCH&nbsp;TOWN
        </div>

        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            color: '#c8d0e0',
            opacity: 0.85,
          }}
        >
          Bond-Strong Launchpad on Base
        </div>

        <div
          style={{
            marginTop: 60,
            fontSize: 22,
            color: '#808b9c',
            letterSpacing: '0.1em',
          }}
        >
          ⚡ HOLD THE LINE • STAY BASED ⚡
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

