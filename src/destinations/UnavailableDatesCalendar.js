import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const UnavailableDatesCalendar = ({ unavailableDates, width, height }) => {
    return (
        <div style={{ width: width, height: height, backgroundColor: 'white', padding: '20px' }}>
            <Calendar
                localizer={localizer}
                events={unavailableDates.map(date => ({
                    title: 'Unavailable',
                    start: date,
                    end: date,
                }))}
                startAccessor="start"
                endAccessor="end"
                views={['month']}
                eventPropGetter={(event, start, end, isSelected) => {
                    const style = {
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '0px',
                        border: 'none',
                    };
                    return { style };
                }}
            />
        </div>
    );
};

export default UnavailableDatesCalendar;
