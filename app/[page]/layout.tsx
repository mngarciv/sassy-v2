import Footer from "components/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="shell py-16 md:py-24">
        <div className="max-w-3xl">{children}</div>
      </div>
      <Footer />
    </>
  );
}
