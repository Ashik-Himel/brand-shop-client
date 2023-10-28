import { useParams } from "react-router-dom";
import { register } from 'swiper/element/bundle';
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";
import { axiosInstance } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
register();

const BrandProducts = () => {
  const {category} = useParams();
  const {data: products, isLoading: isLoading1} = useQuery({queryKey: ["products", category], queryFn: () => axiosInstance(`/products/categories/${category}`)});
  const {data: banners, isLoading: isLoading2} = useQuery({queryKey: ["banners", category], queryFn: () => axiosInstance(`/banners/${category}`)});

  if (isLoading1 || isLoading2) return <Loading />

  return (
    <main className="min-h-[calc(100vh-396px)]">
      <Helmet>
        <title>{category} - Brand Shop</title>
      </Helmet>

      {
        banners?.data && <section>
          <swiper-container autoplay loop speed="500" navigation pagination>
            {
              banners?.data?.map(banner => <swiper-slide key={banner}><img className="w-full max-h-[450px]" src={banner} alt="Banner" /></swiper-slide>)
            }
          </swiper-container>
        </section>
      }

      {
        products?.data?.length !== 0 ? <section className="my-12">
          <div className="container">
            <h2 className="text-primary text-3xl font-medium border-b-2 border-primary pb-1 mb-6 max-w-[280px]">{category}&apos;s Products</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {
                products?.data?.map(product => <ProductCard key={product.slug} product={product} />)
              }
            </div>
          </div>
        </section> : <section>
          <div className="container py-8">
            <img className="w-32 mx-auto" src="/favicon.png" alt="Icon" />
            <h2 className="text-3xl font-medium mt-4 text-center">No Product Found !!!</h2>
          </div>
        </section>
      }
    </main>
  );
};

export default BrandProducts;