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

  return (
    <div className="d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="bg-white rounded  p-3">
        <h2>Brukere</h2>
        <Link to="/create" className="btn btn-success">
          Opprette ny bruker
        </Link>
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
            {data.map((d, i) => (
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
