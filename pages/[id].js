import Product from "../components/Product";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { useState } from "react";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  async function updateProduct(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    `/api/products/${id}`,
    updateProduct
  );

  async function handleEditProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    await trigger(productData);
    router.push("/");
  }

  if (isMutating) {
    return <h1>Submitting your changes</h1>;
  }

  return (
    <>
      <Product onSubmit={handleEditProduct} />
    </>
  );
}
