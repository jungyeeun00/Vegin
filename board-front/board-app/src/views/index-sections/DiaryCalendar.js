import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';


const RenderHeader = ({ currMonth, prevMonth, nextMonth }) => {
    return (
        <div className='header-main'>
            <div className='col col-start'>
                <span className='text'>
                    <span className='month'> {format(currMonth, 'M')}월 </span>
                    <span className='year'> {(format(currMonth, 'yyyy'))} </span>
                </span>
            </div>
            <div className='col col-end'>
                <FontAwesomeIcon icon={faArrowCircleLeft} onClick={prevMonth} />
                <FontAwesomeIcon icon={faArrowCircleRight} onClick={nextMonth} />
            </div>
        </div>
    )
}

const RenderDays = () => {
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className='col' key={i}>
                {date[i]}
            </div>
        )
    }

    return (
        <div className='calendar-days'>{days}</div>
    )
}

const RenderCells = ({ currMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                className={`col cell ${!isSameMonth(day, monthStart)
                    ? 'disabled'
                    : isSameDay(day, selectedDate)
                        ? 'selected'
                        : format(currMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span className={
                        format(currMonth, 'M') !== format(day, 'M')
                            ? 'text not-valid'
                            : ''
                    }
                    
                    >{formattedDate}일</span>
                </div>
            )
            day = addDays(day, 1);
        }
        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return (
        <div className='body'>
            {rows}
        </div>
    )
}
const DiaryCalendar = () => {
    const [currMonth, setCurrMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const history = useHistory();

    const prevMonth = () => {
        setCurrMonth(subMonths(currMonth, 1));
    };

    const nextMonth = () => {
        setCurrMonth(addMonths(currMonth, 1));
    }

    const onDateClick = (day) => {
        setSelectedDate(day);
        const currDate = format(day, "yyyy-MM-dd");
        history.push({pathname:`/diary-list/${currDate}`, state:{currDate: currDate}});
    }

    return (
        <>
            <div>
                <RenderHeader
                    currMonth={currMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays />
                <RenderCells
                    currMonth={currMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </div>
        </>
    );
};

export default DiaryCalendar;