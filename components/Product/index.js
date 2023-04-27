import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import Comments from "../Comments";
import ProductForm from "../ProductForm";
import { useState } from "react";
import { StyledButton } from "../Button/Button.styled";

export default function Product({ onSubmit }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      {isEditMode ? (
        <ProductForm onSubmit={onSubmit} heading={"Edit Product"} />
      ) : (
        <>
          <h2>{data.name}</h2>
          <p>Description: {data.description}</p>
          <p>
            Price: {data.price} {data.currency}
          </p>
          {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
          <StyledButton
            type="button"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            edit fish
          </StyledButton>
          <StyledLink href="/">Back to all</StyledLink>
        </>
      )}
    </ProductCard>
  );
}
