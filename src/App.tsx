import "./App.css";
import { useGetAllProductsQuery } from "@redux/api";
import { ErrorComponent, Loading } from "@src/components";

function App() {
  const { data, error, isError, /*isFetching*/ isLoading } =
    useGetAllProductsQuery();
  // const [addNewProduct, { isLoading: isNewProductBeingAdded }] =
  //   useAddNewProductMutation();

  if (isError) return <ErrorComponent error={error} />;
  if (isLoading) return <Loading />;

  return (
    <>
      {/* {isNewProductBeingAdded && <>New Data is being added...</>} */}
      {data?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}

export default App;
