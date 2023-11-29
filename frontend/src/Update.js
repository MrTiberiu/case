import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

function Update() {
  const [navn, setNavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [fødselsedato, setFødselsedato] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, {
        navn,
        etternavn,
        fødselsedato,
        adresse,
        telefonnummer,
        email,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-info  justify-content-center align-items-center">
      <div className="w-50 bg-white p-3 ">
        <form method="post">
          <h2>Oppdater bruker</h2>
          <div className="mb-2 ">
            <label htmlFor="">Navn:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Skriv inn Navn..."
              onChange={(e) => setNavn(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Etternavn:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Skriv inn Etternavn..."
              onChange={(e) => setEtternavn(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Fødsesedato:</label>
            <input
              className="form-control"
              type="date"
              placeholder="Skriv inn Fødsesedato..."
              onChange={(e) => setFødselsedato(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Adresse:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Skriv inn Adresse..."
              onChange={(e) => setAdresse(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Telefonnummer:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Skriv inn Telefonnummer..."
              onChange={(e) => setTelefonnummer(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Skriv inn Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>
            Oppdater
          </button>
          <Link className="m-2 btn btn-danger" to="/">
            Tilbake
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
