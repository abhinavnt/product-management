import { Header } from "@/components/Header/Navbar";
import { ProductListing } from "@/components/home/Product-listing";
import { Sidebar } from "@/components/sidebar/Sidebar";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <ProductListing />
      </div>
    </div>
  )
}
