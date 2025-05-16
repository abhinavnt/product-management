import { Header } from "@/components/Header/Navbar"
import ProductDetailPage from "@/components/home/ProductDetial"


const ProductDetials = () => {
  return (
     <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
           
            <ProductDetailPage />
          </div>
        </div>
  )
}

export default ProductDetials
