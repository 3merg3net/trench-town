export default function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#41EAD4"/>
          <stop offset="100%" stopColor="#7F5AF0"/>
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#g)" opacity=".22"/>
      <path d="M24 42h16v3H35v7h-6v-7h-5v-3z" fill="#7F5AF0"/>
    </svg>
  );
}
