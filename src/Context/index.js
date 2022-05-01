import React, { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext();

const ScheduleProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const createEvent = ({
    title, description, location, init, end,
  }) => {
    const newEvents = events;
    newEvents.push({
      id: events.length,
      title,
      description,
      location,
      init,
      end,
      images: [],
    });
    setEvents(newEvents);
  };

  const deleteEvent = (event) => {
    const newEvents = events.filter((item) => item.id !== event.id);
    setEvents(newEvents);
  };

  const addImage = (id, imageUri) => {
    const newEvents = events.map((item) => (
      item.id === id ? { ...item, images: [...item.images, imageUri] } : item
    ));
    setEvents(newEvents);
  };

  return (
    <ScheduleContext.Provider value={{
      events,
      createEvent,
      deleteEvent,
      addImage,
    }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleProvider;

export function useSchedule() {
  const context = useContext(ScheduleContext);
  return { ...context };
}
