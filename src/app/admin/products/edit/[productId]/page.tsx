import ProductCreation from "../../_components/ProductCreation";



export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = parseInt((await params).productId);

  return (
    <div className="container py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      <ProductCreation productId={productId} />
    </div>
  );
}
