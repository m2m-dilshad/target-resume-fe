import { Navbar } from './_components/Navbar';

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <div>footer</div>
    </>
  );
}
