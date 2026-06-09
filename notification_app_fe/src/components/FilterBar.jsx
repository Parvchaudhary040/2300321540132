function FilterBar({ filter, setFilter }) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="event">Event</option>
      <option value="news">News</option>
      <option value="placement">Placement</option>
    </select>
  );
}

export default FilterBar;