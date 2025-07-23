import React from "react";
import { useData } from "../../contexts/DataContext";
import HeroBanner from "../../components/public/HeroBanner";
import ProductCard from "../../components/public/ProductCard";
import CategoryCard from "../../components/public/CategoryCard";

const HomePage = () => {
    const { products, categories, loading } = useData();

    const featuredProducts = products.slice(0, 6);

    const categoryData = {
        1: {
            image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
            description: "Hamburguesas artesanales con ingredientes premium",
        },
        2: {
            image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg",
            description: "Bebidas refrescantes para acompañar tu comida",
        },
        3: {
            image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
            description: "Papas fritas doradas y crocantes",
        },
        4: {
            image: "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg",
            description: "Combos completos al mejor precio",
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <HeroBanner />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Explora Nuestras{" "}
                            <span className="text-gradient">Categorías</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Desde hamburguesas gourmet hasta acompañamientos
                            perfectos, tenemos todo lo que necesitas para una
                            experiencia gastronómica completa.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                image={categoryData[category.id]?.image}
                                description={
                                    categoryData[category.id]?.description
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Nuestras{" "}
                            <span className="text-gradient">Burgers</span>{" "}
                            Destacadas
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Descubre nuestras hamburguesas más populares,
                            preparadas con ingredientes frescos y recetas únicas
                            que conquistarán tu paladar.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
