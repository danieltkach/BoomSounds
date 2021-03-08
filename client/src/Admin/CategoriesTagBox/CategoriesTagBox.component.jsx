import React from 'react';

const CategoriesTagBox = ({
  cats,
  selectedCategories,
  setSelectedCategories,
}) => {
  function toggleCategoryHandler(id) {
    if (selectedCategories.includes(id)) {
      const newCategories = selectedCategories.filter((c) => c !== id);
      setSelectedCategories(newCategories);
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  }

  return (
    <>
      <div className="tags_box">
        {cats.map((c) => (
          <button
            type="button"
            className={`category-tag ${
              selectedCategories.includes(c.id) ? 'selected-tag' : ''
            }`}
            key={c.id}
            onClick={() => toggleCategoryHandler(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoriesTagBox;
