import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";

export default function Layout({ children }) {
  return (
    <div className="flex grow">
      <Navbar />
      <div className="flex flex-col grow m-10">
        {/* breadcurmbs start */}
        <Breadcrumbs />
        {/* breadcurmbs end */}
        <>{children}</>
      </div>
    </div>
  );
}
