import React from 'react';

type Props = {
  q: string;
  setQ: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  onSearch: () => void;
};

const Header: React.FC<Props> = ({ q, setQ, category, setCategory, onSearch }) => {
  return (
    <header className="header">
      <h1><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>newslook</a></h1>
      <div className="controls">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search topic (e.g., budget, cricket, startups)"
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
        <button onClick={onSearch}>Search</button>
      </div>
    </header>
  );
};

export default Header;
