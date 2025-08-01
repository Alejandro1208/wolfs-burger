import React from "react";
import { useData } from "../../contexts/DataContext";
import HeroBanner from "../../components/public/HeroBanner";
import ProductCard from "../../components/public/ProductCard";
import CategoryCard from "../../components/public/CategoryCard";

const HomePage = () => {
    const { products, categories, loading } = useData();
    const featuredProducts = products.filter(product => product.is_featured);

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
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Nuestros Productos{" "}
                            <span className="text-gradient">Destacados</span>
                        </h2>
                    </div>
                    {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10"><p className="text-gray-500">Aún no hay productos destacados.</p></div>
                    )}
                </div>
            </section>
            
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Explora Nuestras{" "}
                            <span className="text-gradient">Categorías</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                image={category.image_url}
                                description={category.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;