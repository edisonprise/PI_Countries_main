import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './AllActivities.module.css';
import { getAllActivities } from '../../redux/actions/actions';
import ActivityCard from './ActivityCard/ActivityCard';
import { Link } from 'react-router-dom';

function AllActivities() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const activities = useSelector((state) => state.allActivities);

  return (
    <div className={s.image}>
      <div className={s.container}>
        {activities.map((activity) => (
          <div key={activity.id}>
            <ActivityCard
              key={activity.id}
              name={activity.name}
              difficult={activity.difficult}
              duration={activity.duration}
              season={activity.season}
            />
          </div>
        ))}
      </div>
      <center>
        {/* Enlace que redirige hacia atrás */}
        <Link className={s.goBack} to="/">
          Go Back
        </Link>
      </center>
    </div>
  );
}

export default AllActivities;


