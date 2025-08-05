import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Layout({
  children,
  pageHeading,
}: {
  children: React.JSX.Element;
  pageHeading: string;
}) {
  return (
    <>
      <Nav props={{ pageHeading }} />
      {children}

      <Footer />
    </>
  );
}
