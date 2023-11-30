import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'jalali-moment';

const MyDatePicker = () => {
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const today = moment().locale('fa').format('YYYY/MM/DD');
    setCurrentDate(today);
  }, []);

  return (
    <div>
      <DatePicker className='w-100 border-0 text-danger'
        selected={currentDate ? new Date(currentDate) : null}
        onChange={date => setCurrentDate(date)}
        dateFormat="yyyy/M/d"
        isPersian
        readOnly={true}
        // placeholderText="انتخاب تاریخ"
      />
    </div>
  );
};

export default MyDatePicker;
