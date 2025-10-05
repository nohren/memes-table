import React, { useState, useMemo, useEffect } from 'react';
//import recipes from '../store/dummy_recipes.json';
import recipes from '../store/recipes'; // live recipes, uncomment dummy_recipes to test
import { TextContainer } from './../utils/sharedCSS';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { debugLog, parseTime, debugDidMount, fuzzyMatchWithWords } from '../utils/utilities';
import { useLocation } from 'react-router-dom';
import SearchContainer from './SearchContainer';

const ArchiveContainer = styled.div`
  min-block-size: 100vh;
  min-block-size: 100svh;
`;

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
      props.active ? 'rgba(102, 227, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)'};
  color: ${(props) => (props.active ? 'var(--accent)' : 'var(--fg)')};
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px) saturate(130%);
  -webkit-backdrop-filter: blur(8px) saturate(130%);
  min-height: 44px;

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
      props.active ? 'rgba(102, 227, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${(props) => (props.active ? 'var(--accent)' : 'var(--fg)')};
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px) saturate(130%);
  -webkit-backdrop-filter: blur(8px) saturate(130%);
  min-height: 36px;
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

const NoResults = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--fg);
  opacity: 0.6;

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

export default function Archive() {
  const location = useLocation();
  const { state } = location?.state ?? {};
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedHoliday, setSelectedHoliday] = useState('all_holidays');
  const [searchQuery, setSearchQuery] = useState('');

  // debugDidMount('Archive');

  // debugLog('rendering archive');
  // console.log('selectedCategory', selectedCategory);
  // console.log('selectedHoliday', selectedHoliday);
  // debugLog('searchQuery', searchQuery);

  const holidayTags = [
    'holiday',
    'shabbat',
    'passover',
    'mimouna',
    'purim',
    'rosh hashana',
    'hanukah',
  ];

  // Main category definitions
  const mainCategories = {
    all: { label: 'All Recipes', tags: [] },
    breakfast: { label: 'Breakfast', tags: ['breakfast'] },
    main_entrees: { label: 'Main Entrees', tags: ['main'] },
    quick: { label: 'Quick', tags: ['quick'] },
    soups: { label: 'Soups', tags: ['soup'] },
    breads: { label: 'Breads', tags: ['bread'] },
    sides: { label: 'Sides', tags: ['side', 'salad', 'starter'] },
    desserts: { label: 'Desserts', tags: ['dessert'] },
    holidays: {
      label: 'Holidays',
      tags: holidayTags,
    },
    other: {
      // TODO: add a catch-all category for recipes whos tags don't fit other categories
      label: 'Other',
      tags: [],
    },
  };

  // Holiday subcategories
  const holidayCategories = {
    all_holidays: {
      label: 'All Holidays',
      tags: holidayTags,
    },
    rosh_hashana: { label: 'Rosh Hashana', tags: [holidayTags[5]] },
    passover: { label: 'Passover', tags: [holidayTags[2]] },
    hanukah: { label: 'Hanukah', tags: [holidayTags[6]] },
    shabbat: { label: 'Shabbat', tags: [holidayTags[1]] },
    mimouna: { label: 'Mimouna', tags: [holidayTags[3]] },
    purim: { label: 'Purim', tags: [holidayTags[4]] },
  };

  // generate set membership to quickly catch tags that do not have representation
  const tagSet = useMemo(
    () =>
      new Set([
        ...holidayTags,
        ...Object.values(mainCategories).flatMap((cat) => cat.tags),
      ]),
    []
  );

  // Simple fuzzy search function
  // TODO: implement fuzzy search with levenshtein distance
   const fuzzySearch = (query, text) => {
    if (!query) return true;
    const searchTerm = query.toLowerCase();
    const searchText = text.toLowerCase();
    return fuzzyMatchWithWords(searchTerm, searchText);
  };

  // Search in recipe fields
  const searchInRecipe = (recipe, query) => {
    if (!query) return true;

    const searchFields = [
      recipe.dish,
      // recipe.title,
      // recipe.description || '',
      // recipe.author || '',
      // recipe.ingredients?.join(' ') || '',
      // `${parseTime(recipe.prep_time) + parseTime(recipe.cook_time)}`,
    ];

    const distances = searchFields.map((field) => {
      const res = fuzzySearch(query, field)
      let out;
      if (res.pass) {
        out = res.distance;
      } else out = Infinity
      return out;
    });
    const minDistance = Math.min(...distances);
    return minDistance !== Infinity ? minDistance : null;
  };

  // Filter recipes based on selected category and search
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    // Apply category filter
    if (selectedCategory === 'holidays') {
      const holidayTags = holidayCategories[selectedHoliday].tags;
      filtered = filtered.filter((recipe) =>
        holidayTags.some((tag) => recipe.tags.includes(tag))
      );
    } else if (selectedCategory === 'other') {
      filtered = filtered.filter((recipe) => {
        return recipe.tags.every((tag) => !tagSet.has(tag));
      });
    } else {
      const categoryTags = mainCategories[selectedCategory].tags;
      if (categoryTags.length > 0) {
        filtered = filtered.filter((recipe) =>
          categoryTags.some((tag) => recipe.tags.includes(tag))
        );
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      // console.log('filtered before', filtered);
      filtered = filtered.reduce((acc,recipe) => {
        const res = searchInRecipe(recipe, searchQuery) // returns distance or null
        if (res !== null) {
          // console.log('recipe: ', recipe.dish, 'd: ',res)
          acc.push({ recipe, d:res})
        }
        return acc;
      }, []).sort((a,b) =>
        a.d - b.d).map((item) => item.recipe);
      // console.log('filtered after', filtered);
    }

    return filtered;
  }, [selectedCategory, selectedHoliday, searchQuery]);

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
    if (categoryKey !== 'holidays') {
      setSelectedHoliday('all_holidays');
    }
  };

  const handleHolidayClick = (holidayKey) => {
    setSelectedHoliday(holidayKey);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const getResultsText = () => {
    const count = filteredRecipes.length;
    const recipeText = count !== 1 ? 'recipes' : 'recipe';

    if (searchQuery.trim()) {
      if (selectedCategory === 'holidays') {
        const holidayLabel = holidayCategories[selectedHoliday].label;
        return `Found ${count} ${recipeText} for "${searchQuery}" in ${holidayLabel}`;
      } else if (selectedCategory === 'all') {
        return `Found ${count} ${recipeText} for "${searchQuery}"`;
      } else {
        const categoryLabel = mainCategories[selectedCategory].label;
        return `Found ${count} ${recipeText} for "${searchQuery}" in ${categoryLabel}`;
      }
    } else {
      if (selectedCategory === 'holidays') {
        const holidayLabel = holidayCategories[selectedHoliday].label;
        return `Showing ${count} ${recipeText} in ${holidayLabel}`;
      } else if (selectedCategory === 'all') {
        return `Showing ${count} ${recipeText}`;
      } else {
        const categoryLabel = mainCategories[selectedCategory].label;
        return `Showing ${count} ${recipeText} in ${categoryLabel}`;
      }
    }
  };

  return (
    <ArchiveContainer>
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

      <SearchContainer
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clearSearch={clearSearch}
        selectedCategory={selectedCategory}
        selectedHoliday={selectedHoliday}
      />

      <ResultsCount>{getResultsText()}</ResultsCount>

      {filteredRecipes.length === 0 ? (
        <NoResults>
          <h3>No recipes found</h3>
          <p>
            {searchQuery.trim()
              ? 'Try adjusting your search or browse by category'
              : 'No recipes match the selected category'}
          </p>
        </NoResults>
      ) : (
        filteredRecipes.map((recipe) => (
          <TextContainer key={recipe.id}>
            <RecipeLink
              to={`/recipe/${recipe.id}`}
              state={{ ...state, recipe }}
            >
              <RecipeCard>
                <RecipeTitle>{recipe.title}</RecipeTitle>

                <RecipeMeta>
                  {recipe.author && <MetaItem>By {recipe.author}</MetaItem>}
                  <MetaItem>
                    {parseTime(recipe.prep_time) + parseTime(recipe.cook_time)}{' '}
                    min
                  </MetaItem>
                  {recipe.tags &&
                    recipe.tags.map((tag) => (
                      <MetaItem key={tag}>{tag}</MetaItem>
                    ))}
                </RecipeMeta>

                {recipe.description && (
                  <RecipeDescription>{recipe.description}</RecipeDescription>
                )}
              </RecipeCard>
            </RecipeLink>
          </TextContainer>
        ))
      )}
    </ArchiveContainer>
  );
}

// TODO:
// create "quick" category filter
// add "holidays" to tags in dummy recipe json