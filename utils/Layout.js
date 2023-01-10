import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";

export default function Layout({ children, contractInfo }) {
  return (
    <div className="flex grow">
      <Navbar account_address={contractInfo.contractActiveAddress} />
      <div className="flex flex-col grow m-10">
        {/* breadcurmbs start */}
        <Breadcrumbs />
        {/* breadcurmbs end */}
        <>{children}</>
      </div>
    </div>
  );
}
