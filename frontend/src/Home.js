import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });
  const navigate = useNavigate();
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };
  // Sortering Funksjon
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = data;

  if (sortBy === "navn")
    sortedItems = data.slice().sort((a, b) => a.navn.localeCompare(b.navn));

  if (sortBy === "etternavn")
    sortedItems = data
      .slice()
      .sort((a, b) => a.etternavn.localeCompare(b.etternavn));

  if (sortBy === "email")
    sortedItems = data.slice().sort((a, b) => a.email.localeCompare(b.email));

  return (
    <div className="d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="bg-white rounded  p-3">
        <h2>Brukere</h2>
        <Link to="/create" className="btn btn-success ">
          Opprette ny bruker
        </Link>
        <br></br>
        <span>Sorter</span>
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sorter etter rekefølge</option>
          <option value="navn">Sorter etter Navn</option>
          <option value="etternavn">Sorter etter Etternavn</option>
          <option value="email">Sorter etter Email</option>
        </select>
        <table className="table">
          <thead>
            <tr>
              <th>Navn</th>
              <th>Etternavn</th>
              <th>Fødselsedato</th>
              <th>Adresse</th>
              <th>Telefonnummer</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((d, i) => (
              <tr>
                <td>{d.navn}</td>
                <td>{d.etternavn}</td>
                <td>{d.fødselsedato}</td>
                <td>{d.adresse}</td>
                <td>{d.telefonnummer}</td>
                <td>{d.email}</td>
                <td>
                  <Link to={`/update/${d.id}`} className="btn btn-primary">
                    Oppdatere
                  </Link>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="btn btn-danger"
                  >
                    Slette
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
