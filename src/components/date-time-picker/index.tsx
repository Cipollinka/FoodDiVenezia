import dayjs from 'dayjs';
import React, {useEffect, useMemo, useState} from 'react';
import DatePicker from 'react-native-date-picker';

import TextInput from '../text-input';

interface IProps {
  value: string;
  mode?: 'date' | 'time' | 'datetime';
  label?: string;
  onChange?: (date: string) => void;
}

const DateTimePicker: React.FC<IProps> = ({
  value,
  mode = 'date',
  label,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  const inputValue = useMemo(() => {
    if (mode === 'date') {
      return dayjs(date).format('DD.MM.YYYY');
    }

    if (mode === 'datetime') {
      return dayjs(date).format('DD.MM.YYYY, hh:mm');
    }

    return dayjs(date).format('hh:mm');
  }, [date, mode]);

  return (
    <>
      <TextInput
        editable={false}
        value={value ? inputValue : ''}
        placeholder="Date"
        label={label}
        onPress={() => setOpen(true)}
      />
      <DatePicker
        modal
        mode={mode}
        open={open}
        date={date}
        onConfirm={e => {
          setOpen(false);
          setDate(e);
          onChange && onChange(dayjs(e).format());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DateTimePicker;
