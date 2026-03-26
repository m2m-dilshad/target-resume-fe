import authBg from '@/assets/images/auth-bg-2.png';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${authBg.src})`,
      }}
    >
      <div className="grid min-h-screen md:grid-cols-2">
        {/* RIGHT SIDE FORM */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-xl p-8">{children}</div>
        </div>
        {/* LEFT SIDE */}
        <div className="hidden md:block" />
      </div>
    </div>
  );
}
