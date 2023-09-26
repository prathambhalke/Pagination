import { useEffect, useState } from "react";
import Search from "./Search";
import "./styles.css";
import groupData from "./data.json";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = () => {
    setData(groupData);
    setFilteredData(groupData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter the data based on the searchKeyword
    const filtered = data.filter((item) => {
      const itemValues = Object.values(item).map((value) =>
        value.toString().toLowerCase()
      );
      return itemValues.some((value) =>
        value.includes(searchKeyword.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchKeyword, data]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Paginate the data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Search onSearch={handleSearch} />
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserId</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
