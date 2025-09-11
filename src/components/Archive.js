import React, { useState } from 'react';
import recipes from '../store/dummy_recipes.json';
import { TextContainer } from './../utils/sharedCSS';
import styled from 'styled-components';
import { ClickableElement } from './NavMenu';
import { Link } from 'react-router-dom';
import { parseTime } from '../utils/utilities';
import { useLocation } from 'react-router-dom';

export default function Archive() {
  const location = useLocation();
  const { state } = location?.state ?? {};
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedHoliday, setSelectedHoliday] = useState('all_holidays');

  // Main category definitions
  const mainCategories = {
    all: { label: 'All Recipes', tags: [] },
    breakfast: { label: 'Breakfast', tags: ['breakfast'] },
    main_entrees: { label: 'Main Entrees', tags: ['main'] },
    soups: { label: 'Soups', tags: ['soup'] },
    breads: { label: 'Breads', tags: ['bread'] },
    sides: { label: 'Sides', tags: ['side', 'salad', 'starter'] },
    desserts: { label: 'Desserts', tags: ['dessert'] },
    holidays: {
      label: 'Holidays',
      tags: ['holiday', 'shabbat', 'ramadan', 'mimouna'],
    },
  };

  // Holiday subcategories
  const holidayCategories = {
    all_holidays: {
      label: 'All Holidays',
      tags: ['holiday', 'shabbat', 'ramadan', 'mimouna'],
    },
    rosh_hashana: { label: 'Rosh Hashana', tags: ['rosh hashana'] },
    passover: { label: 'Passover', tags: ['passover'] },
    hanukah: { label: 'Hanukah', tags: ['hanukah'] },
  };

  // Filter recipes based on selected category
  const filteredRecipes = (() => {
    if (selectedCategory === 'holidays') {
      const holidayTags = holidayCategories[selectedHoliday].tags;
      return recipes.filter((recipe) =>
        holidayTags.some((tag) => recipe.tags.includes(tag))
      );
    } else {
      const categoryTags = mainCategories[selectedCategory].tags;
      return categoryTags.length === 0
        ? recipes
        : recipes.filter((recipe) =>
            categoryTags.some((tag) => recipe.tags.includes(tag))
          );
    }
  })();

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
    if (categoryKey !== 'holidays') {
      setSelectedHoliday('all_holidays');
    }
  };

  const handleHolidayClick = (holidayKey) => {
    setSelectedHoliday(holidayKey);
  };

  const RecipeLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
      color: var(--accent);
    }
  `;

  const RecipeCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  const RecipeTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--fg);
    margin-bottom: 4px;
  `;

  const RecipeMeta = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin: 8px 0;
  `;

  const MetaItem = styled.span`
    background: rgba(255, 255, 255, 0.08);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 13px;
    color: var(--accent);
    font-weight: 500;
  `;

  const RecipeDescription = styled.div`
    color: var(--fg);
    opacity: 0.8;
    font-size: 0.95rem;
    line-height: 1.4;
    margin: 4px 0;
  `;

  const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
    justify-content: center;
  `;

  const HolidayContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
    justify-content: center;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    max-height: ${(props) => (props.visible ? '60px' : '0')};
    overflow: hidden;
    transition: all 0.3s ease;
  `;

  const CategoryButton = styled.button`
    background: ${(props) =>
      props.active ? 'rgba(102, 227, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)'};
    border: 1px solid
      ${(props) =>
        props.active
          ? 'rgba(102, 227, 255, 0.3)'
          : 'rgba(255, 255, 255, 0.08)'};
    color: ${(props) => (props.active ? 'var(--accent)' : 'var(--fg)')};
    padding: 10px 18px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px) saturate(130%);
    -webkit-backdrop-filter: blur(8px) saturate(130%);
    min-height: 44px; /* Mobile-friendly touch target */

    &:hover {
      background: rgba(102, 227, 255, 0.1);
      border-color: rgba(102, 227, 255, 0.2);
      color: var(--accent);
      transform: translateY(-1px);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 227, 255, 0.35);
    }
  `;

  const HolidayButton = styled.button`
    background: ${(props) =>
      props.active ? 'rgba(102, 227, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)'};
    border: 1px solid
      ${(props) =>
        props.active
          ? 'rgba(102, 227, 255, 0.25)'
          : 'rgba(255, 255, 255, 0.05)'};
    color: ${(props) => (props.active ? 'var(--accent)' : 'var(--fg)')};
    padding: 6px 14px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px) saturate(130%);
    -webkit-backdrop-filter: blur(8px) saturate(130%);
    min-height: 36px; /* Smaller but still touch-friendly */
    opacity: 0.9;

    &:hover {
      background: rgba(102, 227, 255, 0.08);
      border-color: rgba(102, 227, 255, 0.15);
      color: var(--accent);
      transform: translateY(-1px);
      opacity: 1;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(102, 227, 255, 0.35);
    }
  `;

  const ResultsCount = styled.div`
    text-align: center;
    margin-bottom: 20px;
    color: var(--fg);
    opacity: 0.7;
    font-size: 14px;
  `;

  const getResultsText = () => {
    const count = filteredRecipes.length;
    const recipeText = count !== 1 ? 'recipes' : 'recipe';

    if (selectedCategory === 'holidays') {
      const holidayLabel = holidayCategories[selectedHoliday].label;
      return `Showing ${count} ${recipeText} in ${holidayLabel}`;
    } else if (selectedCategory === 'all') {
      return `Showing ${count} ${recipeText}`;
    } else {
      const categoryLabel = mainCategories[selectedCategory].label;
      return `Showing ${count} ${recipeText} in ${categoryLabel}`;
    }
  };

  return (
    <div>
      <CategoryContainer>
        {Object.entries(mainCategories).map(([key, category]) => (
          <CategoryButton
            key={key}
            active={selectedCategory === key}
            onClick={() => handleCategoryClick(key)}
          >
            {category.label}
          </CategoryButton>
        ))}
      </CategoryContainer>

      <HolidayContainer visible={selectedCategory === 'holidays'}>
        {Object.entries(holidayCategories).map(([key, holiday]) => (
          <HolidayButton
            key={key}
            active={selectedHoliday === key}
            onClick={() => handleHolidayClick(key)}
          >
            {holiday.label}
          </HolidayButton>
        ))}
      </HolidayContainer>

      <ResultsCount>{getResultsText()}</ResultsCount>

      {filteredRecipes.map((recipe) => (
        <TextContainer key={recipe.id}>
          <RecipeLink to={`/recipe/${recipe.id}`} state={{ ...state, recipe }}>
            <RecipeCard>
              <RecipeTitle>{recipe.title}</RecipeTitle>

              <RecipeMeta>
                {recipe.author && <MetaItem>By {recipe.author}</MetaItem>}
                <MetaItem>
                  {parseTime(recipe.prep_time) + parseTime(recipe.cook_time)}{' '}
                  min
                </MetaItem>
              </RecipeMeta>

              {recipe.description && (
                <RecipeDescription>{recipe.description}</RecipeDescription>
              )}
            </RecipeCard>
          </RecipeLink>
        </TextContainer>
      ))}
    </div>
  );
}
