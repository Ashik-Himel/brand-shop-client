import HomeCard from "./HomeCard";
import PropTypes from 'prop-types';
import { axiosInstance } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const HomeCardsSection = ({type}) => {
  const {data: products, isLoading} = useQuery({queryKey: ["products", type], queryFn: () => axiosInstance(`/products/types/${type}`)});

  if (isLoading) return <Loading />;

  return (
    <section className="mt-12">
      <div className="container">
        <h2 className="text-primary text-3xl font-medium border-b-2 border-primary pb-1 mb-6 max-w-[220px]">
          {type}s
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.data?.map((product) => (
            <HomeCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCardsSection;

HomeCardsSection.propTypes = {
  type: PropTypes.string
}