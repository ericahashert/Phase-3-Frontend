function DishCard( {restaurant} ) {
  const {name, ingredients, vegetarian, image_url} = restaurant;

  function handleClick(){
    
  }
  
//   should we also do rating? can't access it from the current table, though

  return (
    <li className="individual-card">
      <img src={image_url} alt={name} />
      <h4>{name}</h4>
      <p>Ingredients: {ingredients}</p>
      <p>Vegitarian?: {vegetarian}</p>
      <btn className = "order-btn">
        Add to order
      </btn>
    </li>
  );
}


export default DishCard;