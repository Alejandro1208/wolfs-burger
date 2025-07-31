import React, { useState, useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { useData } from "../../contexts/DataContext";

const ProductForm = ({ product, onClose }) => {
    const { categories, addProduct, updateProduct } = useData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category_id: "",
        pedidosya_link: "",
    });
    const [isFeatured, setIsFeatured] = useState(false);
    const [existingImages, setExistingImages] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [newImagePreviews, setNewImagePreviews] = useState([]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                category_id: product.category_id || "",
                pedidosya_link: product.pedidosya_link || "",
            });
            setIsFeatured(product.is_featured === true);
            setExistingImages(product.images || []);
        }
    }, [product]);

    const handleInputChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length) {
            setNewImageFiles((prev) => [...prev, ...files]);
            const previews = files.map((file) => URL.createObjectURL(file));
            setNewImagePreviews((prev) => [...prev, ...previews]);
        }
    };

    const removeExistingImage = (id) =>
        setExistingImages((prev) => prev.filter((img) => img.id !== id));

    const removeNewImage = (index) => {
        setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
        setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const submissionData = new FormData();
        Object.keys(formData).forEach((key) =>
            submissionData.append(key, formData[key])
        );
        submissionData.append("is_featured", isFeatured);

        if (product) {
            submissionData.append("id", product.id);
            submissionData.append(
                "existing_images",
                JSON.stringify(existingImages)
            );
        }

        newImageFiles.forEach((file) => {
            submissionData.append("new_images[]", file);
        });

        try {
            const result = product
                ? await updateProduct(submissionData)
                : await addProduct(submissionData);
            if (result.success) {
                onClose();
            } else {
                setError(result.error || "Ocurrió un error al guardar.");
            }
        } catch (e) {
            setError("Ocurrió un error de conexión.");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {product ? "Editar Producto" : "Nuevo Producto"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    id="product-form"
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4 flex-grow overflow-y-auto"
                >
                    {error && (
                        <p className="text-red-500 bg-red-50 p-3 rounded-md text-sm">
                            {error}
                        </p>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre del Producto *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="input-styled"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Descripción *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="input-styled"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Precio *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                min="0"
                                step="0.01"
                                className="input-styled"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Categoría *
                            </label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleInputChange}
                                required
                                className="input-styled"
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Enlace de PedidosYa
                        </label>
                        <input
                            type="url"
                            name="pedidosya_link"
                            value={formData.pedidosya_link}
                            onChange={handleInputChange}
                            className="input-styled"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            id="is_featured"
                            name="is_featured"
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                            htmlFor="is_featured"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Marcar como Producto Destacado
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Imágenes
                        </label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {existingImages.map((img) => (
                                <div key={img.id} className="relative group">
                                    <img
                                        src={img.image_url}
                                        alt="Imagen existente"
                                        className="w-full h-24 object-cover rounded-md border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeExistingImage(img.id)
                                        }
                                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                            {newImagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={preview}
                                        alt="Nueva imagen"
                                        className="w-full h-24 object-cover rounded-md border border-dashed border-indigo-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(index)}
                                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                            <label
                                htmlFor="image-upload"
                                className="w-full h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <Upload size={24} className="text-gray-400" />
                                <span className="text-xs text-gray-500 mt-1">
                                    Subir imagen
                                </span>
                                <input
                                    id="image-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </form>

                <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        disabled={loading}
                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all disabled:opacity-50"
                    >
                        {loading ? "Guardando..." : "Guardar Producto"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
