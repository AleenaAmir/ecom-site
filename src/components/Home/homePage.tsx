import Image from "next/image";
import ProductCard from "./ProductCart";
import { products } from "./product";


const categories = [
  { name: "Dining", img: "https://res.cloudinary.com/dstnwi5iq/image/upload/v1741529266/images_3_epcv5c.jpg" },
  { name: "Living", img: "https://res.cloudinary.com/dstnwi5iq/image/upload/v1741529265/images_6_limlw1.jpg" },
  { name: "Bedroom", img: "https://res.cloudinary.com/dstnwi5iq/image/upload/v1694798823/qixtbql13qsmdqglaths.jpg" },
];

const Homepage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[450px] flex items-center justify-end p-16 bg-gray-100">
  {/* Background Image Container */}
  <div className="absolute inset-0">
    <Image 
      src="https://res.cloudinary.com/dstnwi5iq/image/upload/v1694798355/sjh9isnnoybdvncikvyn.jpg" 
      alt="Hero" 
      width={1920} 
      height={450} 
      className="object-cover w-full h-full"
    />
  </div>

  {/* Content Box */}
  <div className="relative bg-white p-6 md:p-10 max-w-sm shadow-lg">
    <h3 className="text-sm uppercase text-gray-500">New Arrival</h3>
    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Discover Our New Collection</h1>
    <p className="text-gray-600 mt-2">
      Buy your favorite items from our new collection and enjoy the latest trends.
    </p>
    <button className="mt-4 px-6 py-2 bg-yellow-600 text-white font-medium uppercase shadow-md hover:bg-yellow-700 transition">
      Buy Now
    </button>
  </div>
</section>


      {/* Browse The Range Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-semibold text-gray-900">Browse The Range</h2>
        <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4 md:px-20">
          {categories.map((category) => (
            <div key={category.name} className="relative group overflow-hidden">
              <Image src={category.img} alt={category.name} width={400} height={400} className="object-cover w-full" />
              <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center text-white font-semibold text-lg">
                {category.name}
              </div>
            </div>
          ))}
        </div>
          </section>
          <section className="text-center py-16">
        <h2 className="text-3xl font-semibold">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-20 mt-8">
          {products?.map((product, index) => (
            //@ts-ignore
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
