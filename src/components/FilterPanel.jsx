import styled from 'styled-components'
import { useProject } from '../contexts/ProjectContext'

const FilterContainer = styled.div`
  padding: 2rem;
  color: white;
  height: calc(100vh - 80px);
  background: rgba(20, 20, 40, 0.3);
  backdrop-filter: blur(10px);
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FilterSection = styled.div`
  margin-bottom: 1rem;
`

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #4ecdc4;
`

const FilterOption = styled.div`
  margin: 0.4rem 0;
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.9rem;
    
    input {
      margin-right: 0.5rem;
    }
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  margin-bottom: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #4ecdc4;
  }
`

const DateFilter = styled.select`
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  margin-bottom: 1rem;

  option {
    background: #1a1a2e;
  }
`

const FilterPanel = () => {
  const { setFilters } = useProject()

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  return (
    <FilterContainer>
      <FilterSection>
        <FilterTitle>Search Projects</FilterTitle>
        <SearchInput 
          type="text" 
          placeholder="Search by keyword..."
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </FilterSection>

      <FilterSection>
        <FilterTitle>Project Type</FilterTitle>
        <FilterOption>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleFilterChange('humanitarian', e.target.checked)}
            />
            Humanitarian Aid
          </label>
        </FilterOption>
        <FilterOption>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleFilterChange('disaster', e.target.checked)}
            />
            Disaster Response
          </label>
        </FilterOption>
        <FilterOption>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleFilterChange('training', e.target.checked)}
            />
            Training Opportunities
          </label>
        </FilterOption>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Time Period</FilterTitle>
        <DateFilter 
          onChange={(e) => handleFilterChange('timeFrame', e.target.value)}
          defaultValue="all"
        >
          <option value="all">All Time</option>
          <option value="month">Past Month</option>
          <option value="6months">Past 6 Months</option>
          <option value="year">Past Year</option>
        </DateFilter>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Region</FilterTitle>
        <FilterOption>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleFilterChange('africa', e.target.checked)}
            />
            Africa
          </label>
        </FilterOption>
        <FilterOption>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleFilterChange('asia', e.target.checked)}
            />
            Asia
          </label>
        </FilterOption>
        <FilterOption>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleFilterChange('americas', e.target.checked)}
            />
            Americas
          </label>
        </FilterOption>
        <FilterOption>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleFilterChange('europe', e.target.checked)}
            />
            Europe
          </label>
        </FilterOption>
      </FilterSection>
    </FilterContainer>
  )
}

export default FilterPanel 