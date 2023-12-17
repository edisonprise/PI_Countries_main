import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllActivities } from "../../../redux/actions/actions";
import s from "./ActivityCard.module.css";

export default function ActivityCard({ name, difficult, duration, season }) {
  const dispatch = useDispatch();

  async function handleDelete(name) {
    try {
      console.log("entró:");
      console.log("name:", name);

      await axios.delete("http://localhost:3001/activities", {
        data: { name },
      });
      alert("Actividad eliminada correctamente!");
      dispatch(getAllActivities());
    } catch (e) {
      alert("error al borrar actividad");
    }
  }
  return (
    <div className={s.container}>
      <div className={s.containerCard}>
        <h4 className={`${s.data} ${s.title}`}>{name}</h4>
        <label className={s.data}>Difficult: {difficult}/5</label>
        <label className={s.data}>Duration: {duration} min.</label>
        <label className={s.data}>Season: {season}</label>

        <button onClick={() => handleDelete(name)}>Delete</button>
      </div>
    </div>
  );
}
