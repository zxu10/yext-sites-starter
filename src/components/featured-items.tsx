type FeaturedItem = {
    name: string;
    image: string;
    description: string;
}

const formatItem = (item: FeaturedItem) => {
    return (
        <>
            <div>
                <img src={item.image} width="300"></img>
            </div>
        </>
    )
}

const Items:FeaturedItem[] = {
    "0": { name: "Item 1", image: "#", description:"xxx" },
    "1": { name: "Item 2", image: "#", description:"xxx" },
    "2": { name: "Item 3", image: "#", description:"xxx" }
 };


const FeaturedItems = () => {

    return (
      <>
        <div className="centered-container">
            <div className="flex">
                formatItem("Item 1", )
            </div>
        </div>
      </>
    );
  };
  
  export default FeaturedItems;